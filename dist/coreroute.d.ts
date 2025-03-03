import * as http from 'http';
import * as https from 'https';
/**
 * Type definition for route handler functions in CoreRoute.
 * A RouteHandler function is responsible for processing incoming HTTP requests
 * for a specific route and sending back a response.
 *
 * @param {http.IncomingMessage} req - The incoming HTTP request object.
 * @param {http.ServerResponse} res - The HTTP server response object.
 * @returns {void} - Route handlers should not return any value; they should manage the response directly using the 'res' object.
 */
export type RouteHandler = (req: http.IncomingMessage, res: http.ServerResponse) => void;
/**
 * @author Mames Christophe
 * @license GPL-3.0-or-later
 * @class
 * A simplified HTTP Router class for Node.js applications.<br>
 * <br>
 * This class allows you to define routes for different HTTP methods (GET, PUT, POST, DELETE, PATCH, ALL)<br>
 * and to serve static files from a specified folder. It is designed as a lightweight alternative<br>
 * to full-fledged frameworks like ExpressJS for simpler projects.<br>
 *<br>
 */
export declare class CoreRoute {
    #private;
    /**
     * Constructor for the CoreRoute class.<br>
     * Initializes route storage and server settings.<br>
     */
    constructor();
    /**
     * Defines a callback function for handling GET requests to a specific route.<br>
     *<br>
     * @param {string} route The path for the GET request (e.g., '/api/users').
     * @param {function} callback The function to handle the GET request.
     *                           This function receives `req` and `res` objects as arguments.
     * @param {http.IncomingMessage} callback.req - An http.IncomingMessage object.
     * @param {http.ServerResponse} callback.res - An http.ServerResponse object.
     * @example
     * coreroute.get('/api/users', (req, res) => {
     *   res.writeHead(200, {'Content-Type': 'application/json'});
     *   res.end(JSON.stringify({ message: 'User data' }));
     * });
     */
    get(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void): void;
    /**
     * Defines a callback function for handling PUT requests to a specific route.<br>
     *<br>
     * @param {string} route The path for the PUT request.
     * @param {function} callback The function to handle the PUT request.
     *                           This function receives `req` and `res` objects as arguments.
     * @param {http.IncomingMessage} callback.req - An http.IncomingMessage object.
     * @param {http.ServerResponse} callback.res - An http.ServerResponse object.
     * @example
     * coreroute.put('/api/items/:id', (req, res) => {
     *   // Handle update item logic
     * });
     */
    put(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void): void;
    /**
     * Defines a callback function for handling POST requests to a specific route.<br>
     *<br>
     * @param {string} route The path for the POST request.
     * @param {function} callback The function to handle the POST request.
     *                           This function receives `req` and `res` objects as arguments
     * @param {http.IncomingMessage} callback.req - An http.IncomingMessage object.
     * @param {http.ServerResponse} callback.res - An http.ServerResponse object..
     * @example
     * coreroute.post('/api/items', (req, res) => {
     *   // Handle create item logic
     * });
     */
    post(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void): void;
    /**
     * Defines a callback function for handling DELETE requests to a specific route.<br>
     *<br>
     * @param {string} route The path for the DELETE request.
     * @param {function} callback The function to handle the DELETE request.
     *                           This function receives `req` and `res` objects as arguments.
     * @param {http.IncomingMessage} callback.req - An http.IncomingMessage object.
     * @param {http.ServerResponse} callback.res - An http.ServerResponse object.
     * @example
     * coreroute.delete('/api/items/:id', (req, res) => {
     *   // Handle delete item logic
     * });
     */
    delete(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void): void;
    /**
     * Defines a callback function for handling PATCH requests to a specific route.<br>
     *<br>
     * @param {string} route The path for the PATCH request.
     * @param {function} callback The function to handle the PATCH request.
     *                           This function receives `req` and `res` objects as arguments.
     * @param {http.IncomingMessage} callback.req - An http.IncomingMessage object.
     * @param {http.ServerResponse} callback.res - An http.ServerResponse object.
     * @example
     * coreroute.patch('/api/items/:id', (req, res) => {
     *   // Handle partial update item logic
     * });
     */
    patch(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void): void;
    /**
     * Defines a callback function for handling requests for ALL HTTP methods to a specific route.<br>
     * This is useful for implementing route handlers that should respond to any type of HTTP request.<br>
     *<br>
     * @param {string} route The path for the ALL methods request.
     * @param {function} callback The function to handle all types of requests to this route.
     *                           This function receives `req` and `res` objects as arguments.
     * @param {http.IncomingMessage} callback.req - An http.IncomingMessage object.
     * @param {http.ServerResponse} callback.res - An http.ServerResponse object.
     * @example
     * coreroute.all('/api/items', (req, res) => {
     *   // Handle request for any HTTP method to /api/items
     * });
     */
    all(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void): void;
    /**
     * Enables serving static files from a specified folder.<br>
     * When enabled, if a requested path does not match any defined API routes,<br>
     * the server will attempt to serve a file from the static folder.<br>
     *<br>
     * @param {string} folder The path to the folder containing static files (e.g., './public').
     * @example
     * coreroute.serveStaticFiles('./public'); // Serve static files from the 'public' directory
     */
    serveStaticFiles(folder: string): void;
    /**
     * Starts the server on the specified port, optionally with HTTPS.<br>
     * This method can start either an HTTP server or an HTTPS server based on the arguments provided.<br>
     * <br>
     * **Overloads:**
     *
     * 1.  `listen(port: number, callback?: () => void): void` - Starts an HTTP server.
     * 2.  `listen(port: number, options?: https.ServerOptions, callback?: () => void): void` - Starts an HTTPS server if `options` are provided, otherwise defaults to HTTP.
     *
     * @param {number} port The port number on which the server should listen.
     * @param {https.ServerOptions | (() => void)} [optionsOrCallback] Either HTTPS server options or a callback function.
     *                                                    If it's an object, it's treated as HTTPS options.
     *                                                    If it's a function, it's treated as the callback for HTTP server start.
     *                                                    If omitted, no callback is executed after server starts.
     * @param {() => void} [callback] An optional callback function to be executed once the server starts listening.
     *                                 This is used only when the second argument is HTTPS options.
     * @returns {void}
     * @example
     * ```typescript
     * // Start HTTP server with a callback
     * router.listen(3000, () => {
     *   console.log('HTTP server listening on port 3000');
     * });
     *
     * // Start HTTPS server with options and a callback
     * const httpsOptions = { ... };
     * router.listen(443, httpsOptions, () => {
     *   console.log('HTTPS server listening on port 443');
     * });
     *
     * // Start HTTP server without a callback
     * router.listen(8080);
     *
     * // Start HTTPS server with options but without a callback
     * const httpsOptionsNoCallback = { ... };
     * router.listen(8443, httpsOptionsNoCallback);
     * ```
     */
    listen(port: number, optionsOrCallback?: https.ServerOptions | (() => void), callback?: () => void): void;
}
