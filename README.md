# Blog System — Backend

A RESTful API for a full-stack blog application built with Node.js, Express.js, and MongoDB. The backend handles user authentication, blog post management, database operations, and protected API endpoints.

The backend is designed to work with a React frontend, providing the functionality required to register users, authenticate accounts, retrieve blog posts, and manage posts.

## 🚀 Live Demo
 https://blog-system-one-phi.vercel.app

## ✨ Features

### Authentication
- User registration.
- User login using email and password.
- Password hashing using bcrypt.
- JSON Web Token (JWT) generation for authentication.
- Protected API endpoints for authenticated users.

### Blog Post Management
- Retrieve all blog posts.
- Retrieve a specific blog post by ID.
- Create new blog posts.
- Update existing blog posts.
- Delete blog posts.
- Associate each post with its author.

### Database
- MongoDB Atlas for cloud database hosting.
- Mongoose for data modeling and database operations.
- Separate models for users and blog posts.

### Security
- Password hashing before storing passwords.
- JWT-based authentication.
- Middleware for authenticating protected requests.
- Input validation for registration and blog post creation.
- CORS configuration to control which frontend origins can access the API.

## 🛠️ Technologies Used

| Technology           | Purpose                                    |
|----------------------|--------------------------------------------|
| Node.js              | JavaScript runtime for the backend         |
| Express.js           | Web framework for building the REST API    |
| MongoDB Atlas        | Cloud database                             |
| Mongoose             | MongoDB object modeling                    |
| JSON Web Token (JWT) | Authentication                             |
| bcrypt               | Password hashing and password verification |
| dotenv               | Loading environment variables              |
| Git & GitHub         | Version control and source code management |
| Render               | Backend deployment                         |

### Directory Responsibilities

**controllers/**

Contains the application logic for processing requests.

- `authController.js`: Handles user registration and login.
- `postController.js`: Handles blog post operations, including retrieving, creating, updating, and deleting posts.

**middleware/**

Contains middleware used during request processing.

- `authMiddleware.js`: Verifies authentication tokens and identifies the authenticated user for protected operations.

**models/**

Defines the data structures used to interact with MongoDB through Mongoose.

- `User.js`: Defines the user model.
- `Post.js`: Defines the blog post model and its relationship with the author.

**routes/**

Defines the API endpoints and connects incoming requests to the appropriate controllers.

- `authRoutes.js`: Defines authentication routes.
- `postRoutes.js`: Defines blog post routes.

**server.js**

The application's entry point. It configures and starts the Express server and initializes the application services.

## 🔌 API Endpoints

The API uses the `/api` prefix.

### Authentication Routes

| Method | Endpoint               | Description             | Authentication |
|--------|------------------------|-------------------------|----------------|
| POST   | `/api/auth/register`   | Register a new user     | Not required   |
| POST   | `/api/auth/login`      | Log in an existing user | Not required   |

### Blog Post Routes

| Method | Endpoint         | Description              | Authentication |
|--------|------------------|--------------------------|----------------|
| GET    | `/api/posts`     | Retrieve all blog posts  | Not required   |
| GET    | `/api/posts/:id` | Retrieve a specific post | Not required   |
| POST   | `/api/posts`     | Create a new post        | Required       |
| PUT    | `/api/posts/:id` | Update an existing post  | Required       |
| DELETE | `/api/posts/:id` | Delete a post            | Required       |

## 🔐 Authentication Flow

The application uses JSON Web Tokens (JWT) to authenticate users.

The authentication process works as follows:

1. A user submits registration information.
2. The backend validates the submitted data and checks for an existing username or email.
3. The password is hashed before the user is saved to MongoDB.
4. After successful registration or login, the backend generates a JWT.
5. The frontend receives the token and stores it for subsequent authenticated requests.
6. For protected endpoints, the frontend sends the token in the HTTP `Authorization` header.
7. The authentication middleware verifies the token and identifies the authenticated user.
8. The backend processes the request if authentication and any required authorization checks succeed.

Authenticated requests use the following header format:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🗄️ Database Models

The application uses MongoDB Atlas to store user accounts and blog posts.

### User Model

The user model includes fields such as:

- `username`
- `email`
- `password`
- `firstName`
- `lastName`
- `profilePicture`
- `createdAt`
- `updatedAt`

Passwords are hashed before being stored in the database.

### Post Model

The post model includes:

- `title`
- `content`
- `user`
- `createdAt`
- `updatedAt`

The `user` field references the corresponding user document through a MongoDB ObjectId.

This relationship allows the application to associate blog posts with their authors.

## 🔗 Frontend Integration

The backend provides REST API endpoints consumed by the React frontend.

The frontend uses the API service in `src/services/api.js` to communicate with the backend.

The deployed frontend connects to the backend using the `VITE_API_URL` environment variable.

## 🎯 Project Goals

This project was developed to practice and demonstrate full-stack web development concepts, including:

- Building RESTful APIs with Express.js.
- Implementing user registration and authentication.
- Working with JWT and password hashing.
- Designing MongoDB schemas using Mongoose.
- Organizing backend code using routes, controllers, middleware, and models.
- Connecting a React frontend to a backend API.
- Configuring environment variables and CORS.
- Deploying a full-stack application using cloud services.

## 👨‍💻 Author

**Sami Ibrahim Mousa Maali**

---

If you find this project useful, feel free to explore the repositories and review the implementation.
