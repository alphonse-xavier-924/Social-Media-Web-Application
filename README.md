# Social Media Application Backend

## Overview
This project is a backend for a social media application built using the MENG stack (MongoDB, Express, Node.js, GrpahQL). The application allows users to create posts, comment, like/unlike posts, and follow/unfollow other users. It uses GraphQL for data querying and JWT for user authentication.

## Features
- User Authentication: Secure login and registration using JWT.
- Post Management: Create, read, update, and delete posts.
- Comment System: Add, delete, and manage comments on posts.
- Like/Unlike Posts: Users can like or unlike posts.
- Follow System: Users can follow or unfollow other users.
- User Feed: Displays posts from followed users.
- Data Security: Implemented with Express middleware for authentication and authorization.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and posts.
- **GraphQL**: Query language for APIs, used for fetching and mutating data.
- **JWT (JSON Web Tokens)**: Authentication mechanism.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Bcrypt**: Library for hashing passwords.

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-media-app-backend.git
   cd social-media-app-backend
