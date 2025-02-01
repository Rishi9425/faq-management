**FAQ Management System with Multi-language Support**
This project implements a Django-based FAQ management system that supports multilingual content. It allows for dynamic translation of FAQ questions and answers and provides a REST API to retrieve FAQs in various languages. The system leverages a WYSIWYG editor (django-ckeditor) for formatting answers, uses Google Translate for translation support, and includes a caching mechanism for improved performance.

**Table of Contents**
Project Description
Features
Installation
Step 1: Set up the Environment
Step 2: Install Dependencies
Step 3: Run the Application
Docker Setup
API Usage
Fetch FAQs in English
Fetch FAQs in Hindi
Fetch FAQs in Bengali

**Project Description**
This project allows users to manage FAQs through a Django application. The FAQs are stored with a rich-text editor for formatting answers, and multilingual translations are automatically handled via Google Translate API. The system also caches translations using Redis for faster access.

**Features**
Multilingual Support: FAQs can be translated and retrieved in multiple languages, including Hindi, Bengali, and English.
WYSIWYG Editor: Use django-ckeditor for rich-text formatted answers.
Translation: Automatically translates FAQs on creation using the Google Translate API.
Cache: Translations are cached using Redis to improve performance.
REST API: Allows CRUD operations on FAQs with language support via query parameters.
Admin Interface: A user-friendly admin panel to manage FAQ entries.
Installation
Step 1: Set up the Environment
Clone this repository to your local machine.
git clone https://github.com/Rishi9425/faq-management.git
cd faq-management

Ensure you have Python 3.8+ installed. You can verify this by running:
python --version
If Python is not installed, download and install Python.

It's recommended to use a virtual environment for Python project
python -m venv venv
source venv/bin/activate  # On Windows use 'venv\Scripts\activate'

**Step 2: Install Dependencies**
Install required dependencies using pip.
pip install -r requirements.txt
Install Docker if you haven't already:

**Step 3: Run the Application**
Apply migrations to set up the database.
python manage.py migrate
Create a superuser to access the Django admin panel.
python manage.py createsuperuser
Run the server.
python manage.py runserver
Access the app in your browser at http://localhost:8000/.

Docker Setup
To run the application inside a Docker container, follow these steps:

Build and start the Docker containers.
docker-compose up --build
Once the containers are up, the app will be available at http://localhost:8000/.

To stop the containers, run:
docker-compose down
API Usage

**Fetch FAQs in English (default)**
http://127.0.0.1:8000/api/faqs/

**Fetch FAQs in Hindi**
http://127.0.0.1:8000/api/faqs/?lang=hi

**Fetch FAQs in Bengali**
http://127.0.0.1:8000/api/faqs/?lang=bn
