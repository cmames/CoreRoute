/**
 * A Simplified HTTP Router for Node.js Applications.
 *
 * CoreRoute is a lightweight and straightforward HTTP router class designed for Node.js applications.
 * It provides a streamlined approach to defining routes for various HTTP methods and serving static files,
 * making it an ideal choice for simpler projects where the full complexity of frameworks like ExpressJS
 * might be overkill.
 *
 * @remarks
 * This documentation provides details on the CoreRoute API, including classes, methods, and interfaces.
 * For getting started guides and usage examples, please refer to the main [README.md](./README.md) file.
 *
 * @license [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later.html)
 * @author Mames Christophe
 */

export { CoreRoute } from './core-route';
export { MimeTypes } from './mime-type';

// types ans interfaces re-exports

export { Route } from './core-route';
export type { CoreRouteRequestHandler } from './core-route';
export type { MimeTypeMap } from './mime-type';