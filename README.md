FAQ Management System with Multi-language Support

This project allows users to manage FAQs through a Node.js application. The FAQs are stored with a rich-text editor for formatting answers, and multilingual translations are automatically handled via Google Translate API. The system also caches translations using Redis for faster access.

## Features

- **Multilingual Support**: FAQs can be translated and retrieved in multiple languages, including Hindi, Bengali, and English.
- **WYSIWYG Editor**: Use a rich-text editor for formatted answers.
- **Translation**: Automatically translates FAQs on creation using the Google Translate API.
- **Cache**: Translations are cached using Redis to improve performance.
- **REST API**: Allows CRUD operations on FAQs with language support via query parameters.
- **Admin Interface**: A user-friendly admin panel to manage FAQ entries.

## Installation

### Step 1: Set up the Environment

Clone this repository to your local machine.

```sh
git clone https://github.com/Rishi9425/faq-management.git
cd faq-management
```

Ensure you have Node.js 16+ installed. You can verify this by running:

```sh
node --version
```

If Node.js is not installed, download and install it from [Node.js official site](https://nodejs.org/).

It's recommended to use `npm` or `yarn` as a package manager.

```sh
npm install # or yarn install
```

Install Docker if you haven't already.

### Step 2: Configure the Environment

Create a `.env` file and configure the necessary variables.

```sh
PORT=5000
REDIS_URL=redis://localhost:6379
GOOGLE_TRANSLATE_API_KEY=your_api_key_here
DATABASE_URL=mongodb://localhost:27017/faqs
```

### Step 3: Run the Application

Apply database migrations (if using MongoDB, ensure it's running).

```sh
node scripts/migrate.js # Run any necessary setup scripts
```

Create an admin user (if applicable).

```sh
node scripts/createAdmin.js
```

Run the server.

```sh
npm start # or yarn start
```

Access the app in your browser at [http://localhost:5000/](http://localhost:5000/).

## Docker Setup

To run the application inside a Docker container, follow these steps:

Build and start the Docker containers.

```sh
docker-compose up --build
```

Once the containers are up, the app will be available at [http://localhost:5000/](http://localhost:5000/).

To stop the containers, run:

```sh
docker-compose down
```

## API Usage

Fetch FAQs in English (default):

```
http://127.0.0.1:5000/api/faqs/
```

Fetch FAQs in Hindi:

```
http://127.0.0.1:5000/api/faqs/?lang=hi
```

Fetch FAQs in Bengali:

```
http://127.0.0.1:5000/api/faqs/?lang=bn
```

