# User Data API

## Overview

This is an Express.js API with advanced caching, rate limiting, and asynchronous processing to handle user data efficiently. The API leverages TypeScript for type safety and improved maintainability.

## Features

- **Advanced In-Memory Caching**: LRU cache with conditional caching to prevent redundant data storage.
- **Rate Limiting**: Controls API usage with request limits and burst handling.
- **Asynchronous Processing**: Uses a job queue to process user data requests efficiently, avoiding blocking operations.
- **Monitoring and Metrics**: Tracks cache statistics, request duration, and API performance metrics.

## Requirements

- **Node.js** (version 14 or higher)


## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/user-api.git
   cd user-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Redis (required for Bull queue)**:
   ```bash
   redis-server
   ```

4. **Run the Application in Development Mode**:
   ```bash
   npm run dev
   ```
   This will start the server using ts-node-dev for hot reloading in development mode.

5. **Build and Start the Application in Production Mode**:
   ```bash
   npm run build
   npm start
   ```
   The build command compiles TypeScript files into JavaScript, and start runs the compiled code.

## API Endpoints

### User Endpoints

- **GET /api/users/**: 
  - Retrieve user data by ID.
  - Checks the cache first. If data is not in the cache, it fetches the user through an asynchronous job queue.
  - Returns 404 if the user is not found.

- **POST /api/users**: 
  - Create a new user.
  - Expects JSON data with id, name, and email.
  - Adds the new user to mock data and caches it.

### Cache Endpoints

- **GET /api/cache-status**: 
  - Returns cache statistics.
  - Provides details on cache size, hits, misses, and average response time.

- **DELETE /api/cache**: 
  - Clears the entire cache.

### Monitoring Endpoint

- **GET /metrics**: 
  - Exposes Prometheus-compatible metrics.
  - Includes request duration, cache hits/misses, and other performance data.

## Testing the API

### Using Postman

1. Open Postman and create a new request.
2. Set the request type to GET or POST as appropriate and enter the URL (e.g., http://localhost:3000/api/users/1).
3. For POST requests, go to the Body tab, select raw, and set the format to JSON. Provide data like:
   ```json
   {
     "id": 1,
     "name": "John Doe",
     "email": "john@example.com"
   }
   ```
4. Click Send to test the API and check the response. Note that the API implements caching, rate limiting, and asynchronous processing, which may affect the response time and behavior.

### Using Curl

For quick testing in the terminal, you can use curl:

- **Get User**:
   ```bash
   curl -X GET http://localhost:3000/api/users/1
   ```

- **Create User**:
   ```bash
   curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"id":1,"name":"John Doe","email":"john@example.com"}'
   ```

- **Check Cache Status**:
   ```bash
   curl -X GET http://localhost:3000/api/cache-status
   ```

- **Clear Cache**:
   ```bash
   curl -X DELETE http://localhost:3000/api/cache
   ```

## Explanation of Implementation

### Caching Strategy

The API implements an LRU (Least Recently Used) Cache using the lru-cache library. This cache stores user data with a 60-second time-to-live (TTL) and uses an eviction policy to keep only the most recently accessed data, which prevents memory overflow and optimizes data retrieval.

Key features of the caching strategy:

- **Conditional Caching**: The cache is only updated with new user data if the data is not already cached. This prevents redundant cache writes, reducing unnecessary operations.
- **Concurrent Requests Handling**: When multiple requests for the same user ID come in, only the first request fetches the data. Subsequent requests wait for the first one to complete and then use the cached result.
- **Stale Entry Pruning**: A background task runs every 10 seconds to remove stale entries from the cache, ensuring that outdated data does not persist.

### Rate Limiting

To prevent abuse and control server load, we implemented a rate-limiting strategy using express-rate-limit:

- **Limit**: Allows up to 10 requests per minute per IP, with burst handling for up to 5 requests every 10 seconds.
- **Response on Limit Exceeded**: Returns HTTP status 429 with a message if the rate limit is exceeded.

### Asynchronous Processing

We use the Bull queue for asynchronous processing:

- **Job Queue**: When a user request is made and the data isn’t cached, a job is added to the queue to simulate a delayed database fetch.
- **Concurrent Request Handling**: Only the first request fetches data if multiple requests are made for the same user ID, while subsequent requests wait for the cache to be populated.