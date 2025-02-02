import FAQ from "../models/faqModel.js";
import redisClient from "../config/redis.js";
import translateText from "../utils/translate.js";

// Get all FAQs with language support
export const getFAQs = async (req, res) => {
  const  lang  = req.query;
  const cacheKey = `faqs:${lang}`;

  try {
    // Check cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Get FAQs from database
    const faqs = await FAQ.find().lean();

    let transformedFaqs;
    
    switch (lang) {
      case "en":
        // English output
        transformedFaqs = faqs.map(faq => ({
          _id: faq._id,
          question: faq.question,
          answer: faq.answer
        }));
        break;

      case "hi":
        // Hindi output
        transformedFaqs = faqs.map(faq => ({
          _id: faq._id,
          question: faq.translations.hi.question,
          answer: faq.translations.hi.answer
        }));
        break;

      case "bn":
        // Bengali output
        transformedFaqs = faqs.map(faq => ({
          _id: faq._id,
          question: faq.translations.bn.question,
          answer: faq.translations.bn.answer
        }));
        break;

      default:
        // Default to English if unknown language
        transformedFaqs = faqs.map(faq => ({
          _id: faq._id,
          question: faq.question,
          answer: faq.answer
        }));
    }

    // Cache the results
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(transformedFaqs));
    
    return res.json(transformedFaqs);
  } catch (error) {
    console.error('Error in getFAQs:', error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Create new FAQ with translations
export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Validate input
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and Answer are required" });
    }

    // Create translations
    const translations = {
      hi: {
        question: await translateText(question, "hi"),
        answer: await translateText(answer, "hi"),
      },
      bn: {
        question: await translateText(question, "bn"),
        answer: await translateText(answer, "bn"),
      }
    };

    // Create new FAQ with translations
    const newFAQ = new FAQ({
      question,
      answer,
      translations
    });

    await newFAQ.save();

    // Invalidate all language caches
    await Promise.all([
      redisClient.del("faqs:en"),
      redisClient.del("faqs:hi"),
      redisClient.del("faqs:bn")
    ]);

    res.status(201).json(newFAQ);
  } catch (error) {
    console.error('Error in createFAQ:', error);
    res.status(500).json({ message: "Error creating FAQ" });
  }
};

