# Prompt Fusion

Welcome to **Prompt Fusion** – a collaborative platform where users can share, discover, and manage prompts for various AI software. Whether you're looking to enhance your creative projects or optimize your workflows, Prompt Fusion is your go-to hub for AI prompts.

## Features

- **Post, Update, Delete Prompts**: Users can create new prompts, update existing ones, or delete them as needed.
- **Dynamic Searching**: Search for personalized prompts that are synced with the backend for real-time results.
- **Search by Tags**: Find prompts easily using tags.
- **User Authentication**: Sign in using your Google account.
- **Profile Browsing**: Visit other users' profiles to see the prompts they've posted.

## Tech Stack

- **Next.js**: A React framework for server-side rendering and generating static websites.
- **NextAuth**: Authentication for Next.js applications.
- **MongoDB**: A NoSQL database for storing user data and prompts.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Tailwind CSS**: A utility-first CSS framework for designing the user interface.
- **bcryptjs**: A library to hash passwords for secure authentication.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Galib-23/Prompt-Fusion.git
   cd prompt-fusion

2. **Install Dependencies**:
   ```bash
   npm install

3. **Set up environment variables**:
    ```env
    NEXTAUTH_URL=http://localhost:3000
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/prompt-fusion?retryWrites=true&w=majority
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

4. **Run the development server**
    ```bash
    npm run dev
