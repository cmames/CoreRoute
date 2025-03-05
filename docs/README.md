**coreroute**

***

# CoreRoute

[![npm version](https://badge.fury.io/js/coreroute.svg?kill_cache=1)](https://badge.fury.io/js/coreroute.svg)
[![License: GPL-3.0-or-later](https://img.shields.io/badge/License-GPL--3.0--or--later-blueviolet)](https://spdx.org/licenses/GPL-3.0-or-later.html)
![GitHub last commit](https://img.shields.io/github/last-commit/cmames/coreroute)

![GitHub top language](https://img.shields.io/github/languages/top/cmames/coreroute)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/cmames/coreroute)

**A Simplified HTTP Router for Node.js Applications**

CoreRoute is a lightweight and straightforward HTTP router class designed for Node.js applications. It provides a streamlined approach to defining routes for various HTTP methods and serving static files, making it an ideal choice for simpler projects where the full complexity of frameworks like ExpressJS might be overkill.

**Key Features:**

*   **Simplified Routing:** Define routes for GET, PUT, POST, DELETE, PATCH, and ALL HTTP methods with ease.
*   **Dynamic Route Parameters:**  Define routes with dynamic segments (e.g., `/user/:id`) and easily access route parameters within your request handlers using `req.params`.
*   **Static File Serving:**  Enable serving static files from a designated folder with a single method call, automatically handling common MIME types.
*   **Lightweight & Focused:** Designed to be a lean and efficient alternative to larger frameworks for basic routing needs, offering only essential routing and static file serving functionalities.
*   **TypeScript Ready:**  Written in TypeScript and provides type definitions for a seamless and type-safe TypeScript development experience.
*   **Easy to Use:**  Simple and intuitive API for quick setup and route definition, making it accessible for developers of all levels.
*   **Graceful Server Shutdown:** Includes a `close()` method to gracefully stop the server, useful for testing and programmatic server management.

**Table of Contents**

*   [Installation](#installation)
*   [Usage](#usage)
    *   [TypeScript Example](#typescript-example)
    *   [JavaScript Example](#javascript-example)
*   [For Developers - Building from Source](#for-developers---building-from-source)
*   [Documentation](#documentation)
*   [License](#license)
*   [Author](#author)

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

## Building from Source
**for developpers**

If you want to clone the CoreRoute repository and build it yourself from source, follow these steps:

After following these steps, you will have a local build of CoreRoute, and you can start experimenting with it, running tests, or modifying the code.

## For Developers - Building from Source

**Warning: These instructions are primarily for developers who wish to contribute to CoreRoute or modify the library's source code. If you simply want to use CoreRoute in your project, please refer to the [Installation](#installation) section above to install the published package from npm.**

If you are a developer and want to build CoreRoute from source, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [URL_DE_VOTRE_REPO_GIT]
    cd coreroute
    ```
    *(Replace `[URL_DE_VOTRE_REPO_GIT]` with the actual URL of your Git repository)*

2.  **Install dependencies:**

    Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed. Then, install the project dependencies by running:

    ```bash
    npm install
    # or if you use yarn:
    yarn install
    ```

3.  **Build the TypeScript code:**

    To compile the TypeScript source code into JavaScript, run the build script defined in `package.json`:

    ```bash
    npm run build
    # or if you use yarn:
    yarn run build
    ```

    This command will typically use the TypeScript compiler (`tsc`) to generate the JavaScript files in the `dist` directory.

4.  **Generate documentation (optional):**

    To generate the API documentation in Markdown format, you can use the `docs` script:

    ```bash
    npm run docs
    ```
    This will generate the documentation files in the `docs` directory. Make sure you have the `typedoc` and `typedoc-plugin-markdown` dependencies installed (they are listed in `devDependencies` in `package.json`).

5.  **Run examples (optional):**

    After building the project, you can run the example code provided in the repository to test CoreRoute.  Navigate to the directory containing the example files (if any) and run them using Node.js. For example, if you have an example file named `example.js`:

    ```bash
    node example.js
    ```
    Or if you have examples in TypeScript that are compiled to JavaScript in the `dist` directory, you might run them from there:

    ```bash
    node dist/example.js
    ```
    Adjust the path and filename according to your project's structure and example file names.

You can then modify the source code, rebuild, and test your changes.  If you intend to contribute back to the project, please follow the contribution guidelines (if any) outlined in the repository.

## Documentation

For detailed API documentation, please refer to the generated documentation in the [**docs**](./docs) folder of this npm package after installation. You can find information about all classes, methods, and types available in CoreRoute within the documentation.

## License

This project is licensed under the [GPL-3.0-or-later License](https://spdx.org/licenses/GPL-3.0-or-later.html) - see the [LICENSE](_media/LICENSE) file for details.

## Author

**Mames Christophe**
