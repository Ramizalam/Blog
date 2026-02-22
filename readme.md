# Blog Backend API Documentation

This backend is built with Express, TypeScript, and Prisma. It provides endpoints for user authentication and blog management.

## Base URL
`http://localhost:5000/api/v1`

---

## Authentication Endpoints

### 1. Signup
Create a new user account.
- **URL**: `/auth/signup`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "msg": "User successfully created",
    "token": "eyJhbGciOiJIUzI1..."
  }
  ```

### 2. Signin
Login to an existing account.
- **URL**: `/auth/signin`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "msg": "Welcome back John Doe",
    "token": "eyJhbGciOiJIUzI1..."
  }
  ```

---

## Blog Endpoints
*All blog endpoints require an `Authorization` header with a valid JWT token:*  
`Authorization: Bearer <token>`

### 3. Create Blog
Create a new blog post.
- **URL**: `/blogs`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog."
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "msg": "Post successfully created"
  }
  ```

### 4. Get My Blog
Get the first blog post associated with the authenticated user.
- **URL**: `/blogs`
- **Method**: `GET`
- **Response (200 OK)**:
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog."
  }
  ```

### 5. Get Bulk Blogs
Fetch all blog posts from all users.
- **URL**: `/blogs/bulk`
- **Method**: `GET`
- **Response (200 OK)**:
  ```json
  [
    {
      "title": "My First Blog",
      "content": "...",
      "author": { "name": "John Doe" }
    }
  ]
  ```

### 6. Update Blog
Update an existing blog post.
- **URL**: `/blogs/update`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "id": "post-uuid",
    "title": "Updated Title",
    "content": "Updated content."
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "msg": "Post updated successfully"
  }
  ```

### 7. Delete Blog
Delete a specific blog post by ID.
- **URL**: `/blogs/:id`
- **Method**: `DELETE`
- **Response (200 OK)**:
  ```json
  {
    "msg": "Post deleted successfully"
  }
  ```

---

## Error Responses
The API uses standard HTTP status codes:
- `400 Bad Request`: Missing fields or invalid ID.
- `401 Unauthorized`: Invalid credentials or missing/invalid token.
- `403 Forbidden`: Authentication failed.
- `411 Length Required`: Input validation (Zod) failed.
- `500 Internal Server Error`: Server-side issues.
