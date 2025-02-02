import { translate } from "@vitalets/google-translate-api";

/**
 * Translates text to target language using Google Translate
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (e.g., 'hi', 'bn')
 * @returns {Promise<string>} - Translated text or original text if translation fails
 */
const translateText = async (text, targetLang) => {
  // Return original text if no text or target language provided
  if (!text?.trim() || !targetLang?.trim()) {
    console.warn('Missing text or target language for translation');
    return text;
  }

  try {
    // Add timeout to prevent hanging
    const translationPromise = translate(text, { 
      to: targetLang,
      timeout: 10000 // 10 seconds timeout
    });

    const { text: translatedText } = await translationPromise;

    // Verify we got a valid translation back
    if (!translatedText) {
      throw new Error('Empty translation received');
    }

    return translatedText;

  } catch (error) {
    // Log detailed error information
    console.error('Translation failed:', {
      originalText: text,
      targetLanguage: targetLang,
      error: error.message,
      stack: error.stack
    });

    // Handle specific error types
    if (error.name === 'TooManyRequestsError') {
      console.error('Rate limit exceeded for translations');
    } else if (error.name === 'TimeoutError') {
      console.error('Translation request timed out');
    }

    // Return original text as fallback
    return text;
  }
};

export default translateText;