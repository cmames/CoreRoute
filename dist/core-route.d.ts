/**
 * @module core-route
 *
 * Contains the main {@link CoreRoute} class, which is the HTTP router implementation for CoreRoute.
 *
 * This module exports the {@link CoreRoute} class and related interfaces and types necessary for
 * defining and using the router.
 */
import * as http from 'http';
import * as https from 'https';
import { CoreRouteResponse } from './core-route-response.js';
/**
 * @module http-augmentation
 * @description Augmentation of the built-in 'http' module to add custom properties.
 *
 * This module augmentation extends the `http.IncomingMessage` interface
 * to include the `params` property, which is used to store route parameters
 * extracted during request dispatching in CoreRoute.
 */
declare module 'http' {
    /**
     * Interface augmentation for `http.IncomingMessage`.
     *
     * Adds the `params` property to the `IncomingMessage` interface
     * to store route parameters.
     *
     * @interface IncomingMessage
     * @extends http.IncomingMessage
     */
    interface IncomingMessage {
        /**
         *  `params` property added to `IncomingMessage` by CoreRoute.
         *  It's an object to store route parameters extracted from the URL path
         *  during dynamic routing.
         *
         *  @property params
         *  @type {Record<string, string>}
         */
        params: Record<string, string>;
    }
}
/**
 * Interface defining the structure of a route.
 * Each route associates a URL pattern with a handler function.
 * @interface
 */
export interface Route {
    /**
     * The URL pattern to match for this route.
     * Can include parameters in the format `:paramName`.
     * Example: '/api/users/:userId'
     */
    routePattern: string;
    /**
     * The regular expression generated from the `routePattern`.
     * Used internally for efficient URL matching.
     * @internal // Mark as internal as it's not meant for direct external use.
     */
    regex: RegExp;
    /**
     * An array of parameter names extracted from the `routePattern`.
     * Example: ['userId'] for the pattern '/api/users/:userId'.
     * @internal // Mark as internal as it's not meant for direct external use.
     */
    paramNames: string[];
    /**
     * The handler function to be executed when the route is matched.
     * It receives the request and response objects as arguments.
     * @param req - The incoming HTTP request object.
     * @param res - The HTTP server response object.
     */
    handler: (req: http.IncomingMessage, res: CoreRouteResponse) => void;
}
/**
 * Type definition for route handler functions in CoreRoute.
 * A CoreRouteRequestHandler function is responsible for processing incoming HTTP requests
 * for a specific route and sending back a response.
 *
 * @param {http.IncomingMessage} req - The incoming HTTP request object.
 * @param {CoreRouteResponse} res - The CoreRoute response object.
 * @returns {void} - Route handlers should not return any value; they should manage the response directly using the 'res' object.
 */
export type CoreRouteRequestHandler = (req: http.IncomingMessage, res: CoreRouteResponse) => void | Promise<void>;
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
     * Retrieves the current CORS headers configuration.
     * <br>
     * This method allows developers to inspect the current CORS policy.
     *
     * @public
     * @returns {Object} An object containing the configured CORS headers.
     */
    getCors(): {
        [x: string]: string | string[];
    };
    /**
         * Sets a new CORS header configuration.
         * <br>
         * This method allows developers to override the default CORS policy for the entire application,
         * providing fine-grained control over cross-origin requests.
         *
         * @public
         * @param {Object} options An object containing key-value pairs of CORS headers.
         * @example
         * // To allow requests only from a specific domain
         * const coreRoute = new CoreRoute();
         * coreRoute.setCors({
         * 'Access-Control-Allow-Origin': 'https://mon-application.com',
         * 'Access-Control-Allow-Methods': 'GET, POST',
         * 'Access-Control-Allow-Headers': 'Content-Type'
         * });
         *
         * // To re-enable the default wildcard policy
         * coreRoute.setCors({
         * 'Access-Control-Allow-Origin': '*',
         * 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
         * 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
         * });
         */
    setCors(options: {
        [key: string]: string | string[];
    }): void;
    /**
     * Defines a callback function for handling GET requests to a specific route.<br>
     *<br>
     * @param {string} routePattern The path for the GET request (e.g., '/api/users').
     * @param {CoreRouteRequestHandler} callback The function to handle the GET request.
     *                           This function receives `req` and `res` objects as arguments.
     * @example
     * coreroute.get('/api/users', (req, res) => {
     *   res.status(200).json({ message: 'User data' });
     * });
     */
    get(routePattern: string, callback: CoreRouteRequestHandler): void;
    /**
     * Defines a CoreRouteRequestHandler function for handling PUT requests to a specific route.<br>
     *<br>
     * @param {string} routePattern The path for the PUT request.
     * @param {CoreRouteRequestHandler} callback The function to handle the PUT request.
     *                           This function receives `req` and `res` objects as arguments.
     * @example
     * coreroute.put('/api/items/:id', (req, res) => {
     *   res.status(200).json({ message: `Item ${req.params.id} updated` });
     * });
     */
    put(routePattern: string, callback: CoreRouteRequestHandler): void;
    /**
     * Defines a CoreRouteRequestHandler function for handling POST requests to a specific route.<br>
     *<br>
     * @param {string} routePattern The path for the POST request.
     * @param {CoreRouteRequestHandler} callback The function to handle the POST request.
     *                           This function receives `req` and `res` objects as arguments
     * @example
     * coreroute.post('/api/items', (req, res) => {
     *   // Handle create item logic
     * });
     */
    post(routePattern: string, callback: CoreRouteRequestHandler): void;
    /**
     * Defines a CoreRouteRequestHandler function for handling DELETE requests to a specific route.<br>
     *<br>
     * @param {string} routePattern The path for the DELETE request.
     * @param {CoreRouteRequestHandler} callback The function to handle the DELETE request.
     *                           This function receives `req` and `res` objects as arguments.
     * @example
     * coreroute.delete('/api/items/:id', (req, res) => {
     *   // Handle delete item logic
     * });
     */
    delete(routePattern: string, callback: CoreRouteRequestHandler): void;
    /**
     * Defines a CoreRouteRequestHandler function for handling PATCH requests to a specific route.<br>
     *<br>
     * @param {string} routePattern The path for the PATCH request.
     * @param {CoreRouteRequestHandler} callback The function to handle the PATCH request.
     *                           This function receives `req` and `res` objects as arguments.
     * @example
     * coreroute.patch('/api/items/:id', (req, res) => {
     *   // Handle partial update item logic
     * });
     */
    patch(routePattern: string, callback: CoreRouteRequestHandler): void;
    /**
     * Defines a CoreRouteRequestHandler function for handling requests for ALL HTTP methods to a specific route.<br>
     * This is useful for implementing route handlers that should respond to any type of HTTP request.<br>
     *<br>
     * @param {string} routePattern The path for the ALL methods request.
     * @param {CoreRouteRequestHandler} callback The function to handle all types of requests to this route.
     *                           This function receives `req` and `res` objects as arguments.
    * @example
     * coreroute.all('/api/items', (req, res) => {
     *   // Handle request for any HTTP method to /api/items
     * });
     */
    all(routePattern: string, callback: CoreRouteRequestHandler): void;
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
    /**
     * Retrieves the underlying HTTP or HTTPS server instance.
     * This is useful for adding advanced features like WebSockets.
     * @returns {http.Server | https.Server | null} The server instance, or null if the server has not been started.
     */
    getServerInstance(): http.Server | https.Server | null;
    /**
     * Closes the server instance gracefully.
     * This method stops the server from accepting new connections and
     * closes all active connections. It is useful for shutting down the server programmatically,
     * for example during testing or when the application needs to exit.
     *
     * @example
     * ```typescript
     * coreRoute.close(); // Stop the server
     * ```
     */
    close(): void;
}
