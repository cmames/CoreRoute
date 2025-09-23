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
import * as fs from "fs";
import * as path from "path";
import { MimeTypes } from './mime-type.js';
import { CoreRouteResponse } from './core-route-response.js';
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
export class CoreRoute {
    #gets;
    #puts;
    #posts;
    #deletes;
    #patchs;
    #serverInstance;
    #staticFolder;
    #isStaticServingEnabled;
    #corsOptions = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    /**
     * Constructor for the CoreRoute class.<br>
     * Initializes route storage and server settings.<br>
     */
    constructor() {
        this.#gets = [];
        this.#puts = [];
        this.#posts = [];
        this.#deletes = [];
        this.#patchs = [];
        this.#serverInstance = null;
        this.#staticFolder = '';
        this.#isStaticServingEnabled = false;
    }
    /**
     * Retrieves the current CORS headers configuration.
     * <br>
     * This method allows developers to inspect the current CORS policy.
     *
     * @public
     * @returns {Object} An object containing the configured CORS headers.
     */
    getCors() {
        return { ...this.#corsOptions }; // Return a copy to prevent external modification
    }
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
    setCors(options) {
        this.#corsOptions = { ...options };
    }
    /**
     * Defines a callback function for handling GET requests to a specific route.<br>
     *<br>
     * @param {string} routePattern The path for the GET request (e.g., '/api/users').
     * @param {CoreRouteRequestHandler} callback The function to handle the GET request.
     *                           This function receives `req` and `res` objects as arguments.
     * @example
     * coreroute.get('/api/users', (req, res) => {
     *   res.writeHead(200, {'Content-Type': 'application/json'});
     *   res.end(JSON.stringify({ message: 'User data' }));
     * });
     */
    get(routePattern, callback) {
        const { regex, paramNames } = this.#pathToRegex(routePattern);
        this.#gets.push({
            routePattern: routePattern,
            regex: regex,
            paramNames: paramNames,
            handler: callback
        });
    }
    /**
     * Defines a CoreRouteRequestHandler function for handling PUT requests to a specific route.<br>
     *<br>
     * @param {string} routePattern The path for the PUT request.
     * @param {CoreRouteRequestHandler} callback The function to handle the PUT request.
     *                           This function receives `req` and `res` objects as arguments.
     * @example
     * coreroute.put('/api/items/:id', (req, res) => {
     *   // Handle update item logic
     * });
     */
    put(routePattern, callback) {
        const { regex, paramNames } = this.#pathToRegex(routePattern);
        this.#puts.push({
            routePattern: routePattern,
            regex: regex,
            paramNames: paramNames,
            handler: callback
        });
    }
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
    post(routePattern, callback) {
        const { regex, paramNames } = this.#pathToRegex(routePattern);
        this.#posts.push({
            routePattern: routePattern,
            regex: regex,
            paramNames: paramNames,
            handler: callback
        });
    }
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
    delete(routePattern, callback) {
        const { regex, paramNames } = this.#pathToRegex(routePattern);
        this.#deletes.push({
            routePattern: routePattern,
            regex: regex,
            paramNames: paramNames,
            handler: callback
        });
    }
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
    patch(routePattern, callback) {
        const { regex, paramNames } = this.#pathToRegex(routePattern);
        this.#patchs.push({
            routePattern: routePattern,
            regex: regex,
            paramNames: paramNames,
            handler: callback
        });
    }
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
    all(routePattern, callback) {
        this.get(routePattern, callback);
        this.put(routePattern, callback);
        this.post(routePattern, callback);
        this.delete(routePattern, callback);
        this.patch(routePattern, callback);
    }
    /**
     * Enables serving static files from a specified folder.<br>
     * When enabled, if a requested path does not match any defined API routes,<br>
     * the server will attempt to serve a file from the static folder.<br>
     *<br>
     * @param {string} folder The path to the folder containing static files (e.g., './public').
     * @example
     * coreroute.serveStaticFiles('./public'); // Serve static files from the 'public' directory
     */
    serveStaticFiles(folder) {
        this.#staticFolder = folder;
        this.#isStaticServingEnabled = true;
    }
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
    listen(port, optionsOrCallback, callback) {
        let server;
        let options = undefined;
        let listenCallback = undefined;
        console.log('Current working directory (CWD) during server start:', process.cwd()); // ✅ Ajout de ce log
        if (typeof optionsOrCallback === 'function') {
            // Cas 1: listen(port, callback?) - HTTP avec callback optionnel
            listenCallback = optionsOrCallback;
            console.log("Starting HTTP server...");
            server = http.createServer(this.#dispatch.bind(this));
        }
        else if (typeof optionsOrCallback === 'object' && optionsOrCallback !== null) {
            // Cas 2: listen(port, options?, callback?) - HTTPS (ou HTTP avec options ?)
            options = optionsOrCallback; // Cast pour le type HTTPS options
            listenCallback = callback;
            server = https.createServer(options, this.#dispatch.bind(this));
            console.log("Starting HTTPS server...");
        }
        else {
            // Cas 3: listen(port) - HTTP sans callback
            console.log("Starting HTTP server...");
            server = http.createServer(this.#dispatch.bind(this));
        }
        this.#serverInstance = server;
        this.#serverInstance.on('error', (error) => {
            console.error('CoreRoute - Server startup error:', error.message);
        });
        server.listen(port, listenCallback);
    }
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
    close() {
        this.#serverInstance?.close();
    }
    /**
     * Dispatches incoming requests to the appropriate route handler or static file handler.<br>
     * This method is the core request handler for the HTTP server. It first checks for matching API routes.<br>
     * If no API route is found and static file serving is enabled, it attempts to serve a static file.<br>
     *<br>
     * @private
     * @param {http.IncomingMessage} req The incoming HTTP request object.
     * @param {http.ServerResponse} res The HTTP server response object.
     */
    #dispatch(req, res) {
        let routesArray = null;
        switch (req.method) {
            case "GET":
                routesArray = this.#gets;
                break;
            case "PUT":
                routesArray = this.#puts;
                break;
            case "POST":
                routesArray = this.#posts;
                break;
            case "DELETE":
                routesArray = this.#deletes;
                break;
            case "PATCH":
                routesArray = this.#patchs;
                break;
            case "OPTIONS": {
                this.#applyCorsHeaders(res);
                res.writeHead(204);
                res.end();
                return;
            }
        }
        const requestUrl = req.url || '/';
        const url = new URL(requestUrl, `http://${req.headers.host}`);
        if (routesArray) {
            for (const route of routesArray) {
                const routeRegexResult = route.regex.exec(url.pathname);
                if (routeRegexResult) {
                    const params = {};
                    if (route.paramNames && routeRegexResult.groups) {
                        for (const paramName of route.paramNames) {
                            if (routeRegexResult.groups[paramName]) {
                                params[paramName] = routeRegexResult.groups[paramName];
                            }
                        }
                    }
                    req.params = params;
                    const coreRes = new CoreRouteResponse(res);
                    this.#applyCorsHeaders(res);
                    try {
                        route.handler(req, coreRes);
                    }
                    catch (error) {
                        this.#errorHandler(res, 500, "Internal Server Error : " + error);
                    }
                    return;
                }
            }
        }
        if (this.#isStaticServingEnabled) {
            this.#staticHandler(req, res);
        }
        else {
            this.#errorHandler(res, 404, "Route Not Found"); // 404 si pas de route API correspondante et pas de fichiers statiques
        }
    }
    /**
     * Applies the configured CORS headers to the response object.
     * @private
     * @param {http.ServerResponse} res The response object.
     */
    #applyCorsHeaders(res) {
        for (const header in this.#corsOptions) {
            res.setHeader(header, this.#corsOptions[header]);
        }
    }
    /**
     * Handles requests for static files.<br>
     * Attempts to read and serve a file from the configured static folder.<br>
     * If the file is found, it is streamed to the response. If not found, a 404 error is sent.<br>
     *<br>
     * @private
     * @param {http.IncomingMessage} req The incoming HTTP request object.
     * @param {http.ServerResponse} res The HTTP server response object.
     */
    #staticHandler(req, res) {
        const requestUrl = req.url || '';
        let filePath = path.join(this.#staticFolder, requestUrl);
        fs.stat(filePath, (statErr, stats) => {
            if (!statErr && stats.isDirectory()) { // Si c'est un dossier
                const indexPath = path.join(filePath, 'index.html'); // Construisez le chemin vers index.html dans ce dossier
                fs.access(indexPath, fs.constants.R_OK, (indexAccessErr) => {
                    if (!indexAccessErr) { // Si index.html existe
                        filePath = indexPath; // Servez index.html à la place du dossier
                    }
                    else {
                        // Si index.html n'existe pas dans le dossier, vous pouvez décider de faire autre chose,
                        // par exemple afficher une liste du contenu du dossier (ce qui est plus complexe à implémenter),
                        // ou simplement retourner une erreur 404 (comportement simple par défaut).
                        // Pour l'instant, on va retourner 404 si index.html n'est pas trouvé.
                        this.#errorHandler(res, 404, "File Not Found");
                    }
                    // Continuez à servir le fichier (qui est maintenant soit le fichier index.html trouvé, soit toujours le fichier initialement demandé s'il ne s'agissait pas d'un dossier)
                    this.#serveFile(filePath, req, res); // Extraction de la logique de service de fichier dans une fonction séparée (voir étape suivante)
                });
            }
            else { // Si ce n'est pas un dossier, ou si fs.stat a retourné une erreur (fichier non trouvé, etc.), on essaie de servir le chemin tel quel (comportement actuel).
                this.#serveFile(filePath, req, res); // Utilisez la fonction #serveFile pour servir le fichier (nouvelle fonction, voir ci-dessous)
            }
        });
    }
    ;
    /**
     * Serve a file<br>
     * If the file is found, it is streamed to the response. If not found, a 404 error is sent.<br>
     *<br>
     * @private
     * @param {string} filePath The path an file name.
     * @param {http.IncomingMessage} req The incoming HTTP request object.
     * @param {http.ServerResponse} res The HTTP server response object.
     */
    #serveFile(filePath, req, res) {
        const dotfile = /^.*\/\..*$/;
        if (dotfile.test(filePath)) {
            this.#errorHandler(res, 403, "Forbidden");
        }
        else {
            fs.access(filePath, fs.constants.R_OK, (accessErr) => {
                if (!accessErr) {
                    const mimeType = MimeTypes.getType(filePath);
                    res.writeHead(200, { "Content-Type": mimeType });
                    const stream = fs.createReadStream(filePath);
                    stream.on('error', this.#errorHandler.bind(this, res, 500, "Internal Server Error during static file service"));
                    stream.pipe(res);
                }
                else {
                    this.#errorHandler(res, 404, "File Not Found");
                }
            });
        }
    }
    /**
     * Centralized error handler for sending error responses to the client.<br>
     * This method sets the appropriate HTTP status code and sends a plain text error message.<br>
     *<br>
     * @private
     * @param {http.ServerResponse} res The HTTP server response object.
     * @param {number} httpCode The HTTP status code to send in the response (e.g., 404, 500).
     * @param {string} message The error message to send in the response body.
     */
    #errorHandler(res, httpCode, message) {
        res.writeHead(httpCode, { 'Content-Type': 'text/plain' });
        res.end(message);
    }
    /**
     * Utility function to convert a route pattern to a regular expression.
     * It also extracts the parameter names from the route.
     *
     * @private
     * @param {string} routePattern The route pattern (e.g., '/users/:id').
     * @returns {{ regex: RegExp, paramNames: string[] }} An object containing the regex and an array of parameter names.
     */
    #pathToRegex(routePattern) {
        const paramNames = [];
        const escapedRoutePattern = routePattern.replace(/[/\\]/g, '/');
        const regexString = escapedRoutePattern.split('/').map(segment => {
            if (segment.startsWith(':')) {
                const paramName = segment.substring(1);
                paramNames.push(paramName);
                return `(?<${paramName}>[^\\/]+)`;
            }
            else {
                return segment ? segment.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') : '';
            }
        }).filter(segmentRegex => segmentRegex !== '').join('/');
        const regex = new RegExp(`^/${regexString}$`);
        return { regex, paramNames };
    }
}
