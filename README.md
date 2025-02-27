# CoreRoute

[![npm version](https://badge.fury.io/js/coreroute.svg)](https://badge.fury.io/js/coreroute.svg) [![License: GPL-3.0-or-later](https://img.shields.io/badge/License-GPL--3.0--or--later-blueviolet)](https://spdx.org/licenses/GPL-3.0-or-later.html)

**A Simplified HTTP Router for Node.js Applications**

CoreRoute is a lightweight and straightforward HTTP router class designed for Node.js applications. It provides a streamlined approach to defining routes for various HTTP methods and serving static files, making it an ideal choice for simpler projects where the full complexity of frameworks like ExpressJS might be overkill.

**Key Features:**

*   **Simplified Routing:** Define routes for GET, PUT, POST, DELETE, PATCH, and ALL HTTP methods with ease.
*   **Static File Serving:**  Enable serving static files from a designated folder with a single method call.
*   **Lightweight & Focused:** Designed to be a lean and efficient alternative to larger frameworks for basic routing needs.
*   **TypeScript Ready:**  Written in TypeScript and provides type definitions for a seamless TypeScript development experience.
*   **Easy to Use:**  Simple and intuitive API for quick setup and route definition.

**Table of Contents**

*   [Installation](#installation)
*   [Usage](#usage)
    *   [TypeScript Example](#typescript-example)
    *   [JavaScript Example](#javascript-example)
*   [Documentation](#documentation)
*   [License](#license)
*   [Author](#author)

## Installation

You can install CoreRoute using npm:

```bash
npm install coreroute
```

## Usage
Getting started with CoreRoute is simple. Here's a basic example demonstrating how to create a router, define a route, and start the server.  
**Note:**  For static file serving to work, you need to create a 'public' folder in your project root and place your static files inside it.  

### TypeScript Example
```typescript
import CoreRoute from 'coreroute';
import * as http from 'http';

const router = new CoreRoute();

router.get('/api/hello', (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World from CoreRoute!');
});

router.serveStaticFiles('./public'); // Serve static files from the 'public' folder

router.listen(3000, () => {
    console.log('Server listening on port 3000');
});
```

### Javascript Example
```javascript
import CoreRoute from 'coreroute';
import * as http from 'http';

const router = new CoreRoute();

router.get('/api/hello', (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World from CoreRoute!');
});

router.serveStaticFiles('./public'); // Serve static files from the 'public' folder

router.listen(3000, () => {
    console.log('Server listening on port 3000');
});
```
## Documentation

For detailed API documentation, please refer to the generated documentation in the [**docs**](./docs) folder of this npm package after installation. You can find information about all classes, methods, and types available in CoreRoute within the documentation.

## License

This project is licensed under the [GPL-3.0-or-later License](https://spdx.org/licenses/GPL-3.0-or-later.html) - see the [LICENSE](./LICENSE) file for details.

## Author

**Mames Christophe**

