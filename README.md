# CoreRoute

![NPM Version](https://img.shields.io/npm/v/coreroute)
![GitHub License](https://img.shields.io/github/license/cmames/coreroute)
![GitHub last commit](https://img.shields.io/github/last-commit/cmames/coreroute)

![GitHub top language](https://img.shields.io/github/languages/top/cmames/coreroute)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/cmames/coreroute)

**Tired of bloated and complex frameworks for your simple Node.js APIs?  Introducing CoreRoute: the lean, mean, routing machine for Node.js.**

CoreRoute is a **lightweight yet powerful** HTTP router class specifically crafted for Node.js applications.  It's designed for developers who need **efficient routing and static file serving without the overhead of heavyweight frameworks** like ExpressJS, especially for smaller projects, microservices, or rapid prototyping.

CoreRoute provides a **simplified and intuitive API** to define routes for all common HTTP methods (GET, POST, PUT, DELETE, PATCH), including **dynamic routes with parameters** for flexible URL handling.  Serving static files from a designated folder is just a single line of code away.  Built with **TypeScript** for type safety and developer productivity, CoreRoute is also incredibly **easy to use and set up**, making it accessible for developers of all skill levels. And for clean server management, CoreRoute includes a `close()` method for **graceful server shutdown**.

**Ready to streamline your Node.js routing?  Dive into CoreRoute and experience the simplicity and efficiency.**

**Table of Contents**

*   [Features](#Features)
*   [Installation](#installation)
*   [Usage](#usage)
    *   [TypeScript Example](#typescript-example)
    *   [JavaScript Example](#javascript-example)
*   [For Developers - Building from Source](#for-developers---building-from-source)
*   [Documentation](#documentation)
*   [License](#license)
*   [Author](#author)

## Features

CoreRoute is packed with features designed to make your Node.js routing simple, efficient, and enjoyable:

*   **Simplified and Intuitive Routing:**
    *   Define routes for all standard HTTP methods: GET, PUT, POST, DELETE, PATCH, and ALL.
    *   Clean and easy-to-understand API for route definition.
    *   Focus on essential routing functionalities without unnecessary complexity.

*   **Dynamic Route Parameters:**
    *   Create routes with dynamic segments in the URL pattern (e.g., `/products/:productId`, `/blog/:category/:postId`).
    *   Access route parameters directly within your request handlers using `req.params`.
    *   Effortlessly build APIs that handle variable URL paths.

*   **Effortless Static File Serving:**
    *   Enable static file serving from a specified folder with a single method call (`serveStaticFiles('./public')`).
    *   Automatic handling of common MIME types for efficient file delivery.
    *   Serve HTML, CSS, JavaScript, images, and other static assets with ease.
    *   Refuses to serve files or folders beginning with a dot, such as .htaccess

*   **Lightweight and High-Performance:**
    *   Lean implementation focused solely on routing and static file serving.
    *   Minimal dependencies and optimized code for maximum efficiency.
    *   Ideal for resource-constrained environments and applications where performance is critical.

*   **TypeScript Ready for Type Safety and Developer Productivity:**
    *   Written entirely in TypeScript.
    *   Provides comprehensive type definitions for all APIs.
    *   Enhances code maintainability, reduces errors, and improves the development experience for TypeScript users.

*   **Developer-Friendly API and Setup:**
    *   Simple and straightforward API designed for ease of use and quick learning.
    *   Minimal setup required to get started with routing in your Node.js application.
    *   Accessible for developers of all experience levels, from beginners to experts.

*   **Graceful Server Shutdown (`close()` method):**
    *   Provides a `close()` method to gracefully shut down the HTTP server instance.
    *   Allows for clean server termination, essential for testing, CI/CD pipelines, and programmatic server management.
    *   Ensures no pending connections are left open during server shutdown.

## Installation

You can install CoreRoute using npm:

```bash
npm install coreroute
```

## Usage

Getting started with CoreRoute is simple. Here's a basic example demonstrating how to create a router, define static file serving, handle a basic route, define a dynamic route with parameters, and gracefully close the server.

**Note:** For static file serving to work, you need to create a 'public' folder in your project root and place your static files inside it.

### TypeScript Example

```typescript
import { CoreRoute } from 'coreroute';
import * as http from 'http';

const router = new CoreRoute();

// Serve static files from the 'public' folder in the project root
router.serveStaticFiles('./public');

// Define a basic route for the homepage
router.get('/', (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to CoreRoute!');
});

// Define a dynamic route with a parameter ':id' for users
router.get('/user/:id', (req: http.IncomingMessage, res: http.ServerResponse) => {
    const userId = req.params?.id; // Access the 'id' parameter from req.params
    if (userId) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`User ID: ${userId}`);
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('User ID is missing in the URL.');
    }
});

// Start the server and listen on port 3000
router.listen(3000).then(() => {
    console.log('Server listening on port 3000');
});

// Example of closing the server programmatically (e.g., after some operation or in tests)
setTimeout(() => {
    router.close();
    console.log('Server closed programmatically.');
}, 10000); // Close server after 10 seconds (example)
```

### JavaScript Example
```javascript
import { CoreRoute } from 'coreroute';

const router = new CoreRoute();

// Serve static files from the 'public' folder in the project root
router.serveStaticFiles('./public');

// Define a basic route for the homepage
router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to CoreRoute!');
});

// Define a dynamic route with a parameter ':id' for users
router.get('/user/:id', (req, res) => {
    const userId = req.params?.id; // Access the 'id' parameter from req.params
    if (userId) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`User ID: ${userId}`);
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('User ID is missing in the URL.');
    }
});

// Start the server and listen on port 3000
router.listen(3000).then(() => {
    console.log('Server listening on port 3000');
});

// Example of closing the server programmatically (e.g., after some operation or in tests)
setTimeout(() => {
    router.close();
    console.log('Server closed programmatically.');
}, 10000); // Close server after 10 seconds (example)
```

## For Developers - Building from Source

**Warning: These instructions are primarily for developers who wish to contribute to CoreRoute or modify the library's source code. If you simply want to use CoreRoute in your project, please refer to the [Installation](#installation) section above to install the published package from npm.**

If you are a developer and want to build CoreRoute from source, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/cmames/CoreRoute.git
    cd coreroute
    ```

2.  **Install dependencies:**

    Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed. Then, install the project dependencies by running:

    ```bash
    npm install
    # or if you use yarn:
    yarn install
    ```

3.  **Lint the code with ESLint (before build):**

    CoreRoute includes ESLint for code linting and maintaining code quality. **Before building, it's recommended to run ESLint to catch and fix any linting issues.** You can run the linting script using:

    ```bash
    npm run lint
    # or if you use yarn:
    yarn run lint
    ```
    This command will execute ESLint with the project's configuration.  **The build process also includes linting, ensuring that only code passing ESLint checks is built.**

4.  **Run tests (recommended before build):**

    CoreRoute is equipped with unit tests to ensure the stability and correctness of the library. **It's highly recommended to run the tests before building to verify that all functionalities are working as expected.** Use the following command to execute the test suite:

    ```bash
    npm test
    # or if you use yarn:
    yarn test
    ```
    This command will run the Jest test runner and execute all tests defined in the `test` directory. **Ensure all tests pass before proceeding with the build.**

5.  **Build the TypeScript code:**

    Once you have passed the linting and tests, you can compile the TypeScript source code into JavaScript. Run the build script defined in `package.json`:

    ```bash
    npm run build
    # or if you use yarn:
    yarn run build
    ```

    This command will typically use the TypeScript compiler (`tsc`) to generate the JavaScript files in the `dist` directory.  **Note that the build script typically includes a linting step before compilation.**

6.  **Generate documentation (optional):**

    To generate the API documentation in Markdown format, you can use the `docs` script:

    ```bash
    npm run docs
    ```
    This will generate the documentation files in the `docs` directory. Make sure you have the `typedoc` and `typedoc-plugin-markdown` dependencies installed (they are listed in `devDependencies` in `package.json`).

7.  **Run examples (optional):**

    After building the project, you can run the example code provided in the repository to test CoreRoute.  Navigate to the directory containing the example files (if any) and run them using Node.js. For example, if you have an example file named `example.js`:

    ```bash
    node example.js
    ```
    Or if you have examples in TypeScript that are compiled to JavaScript in the `dist` directory, you might run them from there:

    ```bash
    node dist/example.js
    ```
    Adjust the path and filename according to your project's structure and example file names.

You can then modify the source code, **ensuring you run linting and tests after your changes**, rebuild, and test your changes further.  If you intend to contribute back to the project, please follow the contribution guidelines (if any) outlined in the repository.

## Documentation

For detailed API documentation, please refer to the generated documentation in the [**docs**](./docs/markdown/) folder of this npm package after installation. You can find information about all classes, methods, and types available in CoreRoute within the documentation.

## License

This project is licensed under the [GPL-3.0-or-later License](https://spdx.org/licenses/GPL-3.0-or-later.html) - see the [LICENSE](./LICENSE) file for details.

## Author

**Mames Christophe**

