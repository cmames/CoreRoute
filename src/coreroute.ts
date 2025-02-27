import * as http from 'http';
import * as https from 'https';
import * as fs from "fs";
import * as path from "path";


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
export class CoreRoute {
    #gets: { [route: string]: RouteHandler };
    #puts: { [route: string]: RouteHandler };
    #posts: { [route: string]: RouteHandler };
    #deletes: { [route: string]: RouteHandler };
    #patchs: { [route: string]: RouteHandler };
    #alls: { [route: string]: RouteHandler };
    #serverInstance: http.Server | https.Server | null;
    #staticFolder: string;
    #isStaticServingEnabled: boolean;

    /**
     * Constructor for the CoreRoute class.<br>
     * Initializes route storage and server settings.<br>
     */
    constructor() {
        this.#gets = {};
        this.#puts = {};
        this.#posts = {};
        this.#deletes = {};
        this.#patchs = {};
        this.#alls = {};
        this.#serverInstance = null;
        this.#staticFolder = '';
        this.#isStaticServingEnabled = false;
    }

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
    get(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void) { this.#gets[route] = callback; }

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
    put(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void) { this.#puts[route] = callback; } 

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
    post(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void) { this.#posts[route] = callback; } 

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
    delete(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void) { this.#deletes[route] = callback; } 

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
    patch(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void) { this.#patchs[route] = callback; } 

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
    all(route: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void) { 
        this.#alls[route] = callback;
        this.#gets[route] = callback;
        this.#puts[route] = callback;
        this.#posts[route] = callback;
        this.#deletes[route] = callback;
        this.#patchs[route] = callback;
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
     serveStaticFiles(folder: string) { 
        this.#staticFolder = folder;
        this.#isStaticServingEnabled = true;
    }

    /**
     * Starts the HTTP or HTTPS server and begins listening for incoming requests on the specified port.<br>
     * If `options` are provided, an HTTPS server will be created. Otherwise, an HTTP server will be created.<br>
     *<br>
     * @param {number} port The port number to listen on (e.g., 80, 443, 3000).
     * @param {object} [options] Optional HTTPS options object. If provided, an HTTPS server will be created.
     *                           This object should contain configuration for HTTPS.
     *                           See {@link https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener} for all available options.
     *                           Example shows minimal required properties.
     *                           @param {string|Buffer} [options.key] - Private key for SSL/TLS. Path to private key file or the key itself as a Buffer.
     *                           @param {string|Buffer} [options.cert] - Public x509 certificate for SSL/TLS. Path to certificate file or the certificate itself as a Buffer.
     * @param {function} [callback] An optional callback function executed once the server starts listening.
     *
     * @example <caption>Start an HTTPS server</caption>
     * const httpsOptions = {
     *   key: fs.readFileSync('./ssl/privateKey.pem'),
     *   cert: fs.readFileSync('./ssl/certificate.pem')
     * };
     * coreroute.listen(443, httpsOptions, () => {
     *   console.log('HTTPS server listening on port 443');
     * });
     */
    listen(port: number, options?: https.ServerOptions, callback?: () => void): void {  
        let server: http.Server | https.Server; // On type server comme pouvant être http.Server OU https.Server
        if (options && options.key && options.cert) { 
            server = https.createServer(options, this.#dispatch.bind(this));
            console.log("Starting HTTPS server..."); 
        } else {
            server = http.createServer(this.#dispatch.bind(this));
            console.log("Starting HTTPS server...");
        }
        this.#serverInstance = server;
		this.#serverInstance.on('error', (error: Error) => {
			console.error('CoreRoute - Server startup error : ', error.message); 
		});

        server.listen(port, callback);
    }


    /**
     * Dispatches incoming requests to the appropriate route handler or static file handler.<br>
     * This method is the core request handler for the HTTP server. It first checks for matching API routes.<br>
     * If no API route is found and static file serving is enabled, it attempts to serve a static file.<br>
     *<br>
     * @private
     * @param {http.IncomingMessage} req The incoming HTTP request object.
     * @param {http.ServerResponse} res The HTTP server response object.
     * @returns {boolean} Returns `true` if a route or static file was served, `false` otherwise.
     */
    #dispatch(req: http.IncomingMessage, res: http.ServerResponse): boolean { 
        let tab: any = null; // On laisse tab en 'any' pour l'instant
        switch (req.method) {
            case "GET": tab = this.#gets; break;
            case "PUT": tab = this.#puts; break;
            case "POST": tab = this.#posts; break;
            case "DELETE": tab = this.#deletes; break;
            case "PATCH": tab = this.#patchs; break;
        }
        const requestUrl = req.url || '/';
        let url = new URL(requestUrl, `http://${req.headers.host}`);
        if (tab && tab[url.pathname]) {
            try {
                tab[url.pathname](req, res);
            }
            catch (error) {
                this.#errorHandler(res, 500, "Internal Server Error");
            }
            return true;
        }
        else if (this.#isStaticServingEnabled) {
            return this.#staticHandler(req, res);
        }
        return false;
    }

    /**
     * Handles requests for static files.<br>
     * Attempts to read and serve a file from the configured static folder.<br>
     * If the file is found, it is streamed to the response. If not found, a 404 error is sent.<br>
     *<br>
     * @private
     * @param {http.IncomingMessage} req The incoming HTTP request object.
     * @param {http.ServerResponse} res The HTTP server response object.
     * @returns {boolean} Returns `true` if the static file was served, `false` if the file was not found.
     */
    #staticHandler(req: http.IncomingMessage, res: http.ServerResponse): boolean { 
        const requestUrl = req.url || '';
        const filePath = path.join(this.#staticFolder, requestUrl);
        fs.access(filePath, fs.constants.R_OK, (err) => {
            if (!err) {
                const mimeType = this.#getMimeType(filePath);
                res.writeHead(200, { "Content-Type": mimeType });
                const stream = fs.createReadStream(filePath);
                stream.on('error', this.#errorHandler.bind(this, res, 500, "Internal Server Error during static file service"));
                stream.pipe(res);
                return true;
            } else {
                this.#errorHandler(res, 404, "File Not Found");
                return false;
            }
        });
        return false;
    };

    /**
     * Determines the MIME type of a file based on its extension.<br>
     * Uses a predefined list of common MIME types. If the extension is not recognized,<br>
     * it defaults to 'application/octet-stream'.<br>
     *<br>
     * @private
     * @param {string} file The path to the file.
     * @returns {string} The MIME type string for the file.
     *                  Defaults to 'application/octet-stream' if the extension is not found.
     * @see {@link https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types} for common MIME types.
     */
    #getMimeType(file: string): string { 
        const extension = path.extname(file).toLowerCase();
        const mimeTypes: { [key: string]: string } = { // On type mimeTypes comme un objet string-string
            aac: "audio/aac", abw: "application/x-abiword", arc: "application/octet-stream", avi: "video/x-msvideo", azw: "application/vnd.amazon.ebook",
            bin: "application/octet-stream", bmp: "image/bmp", bz: "application/x-bzip", bz2: "application/x-bzip2", csh: "application/x-csh",
            css: "text/css", csv: "text/csv", doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", htm: "text/html", ico: "image/x-icon",
            ics: "text/calendar", jar: "application/java-archive", jpg: "image/jpeg", jpeg: "image/jpeg", js: "application/javascript",
            json: "application/json", mid: "audio/midi", mpeg: "video/mpeg", mpkg: "application/vnd.apple.installer+xml", odp: "application/vnd.oasis.opendocument.presentation",
            ods: "application/vnd.oasis.opendocument.spreadsheet", odt: "application/vnd.oasis.opendocument.text", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg",
            otf: "font/otf", png: "image/png", pdf: "application/pdf", ppt: "application/vnd.ms-powerpoint", pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            rar: "application/x-rar-compressed", rtf: "application/rtf", sh: "application/x-sh", svg: "image/svg+xml", swf: "application/x-shockwave-flash",
            tar: "application/x-tar", tif: "image/tiff", ts: "application/typescript", ttf: "font/ttf", vsd: "application/vnd.visio",
            wav: "audio/x-wav", weba: "audio/webm", webm: "video/webm", webp: "image/webp", woff: "font/woff",
            woff2: "font/woff2", xhtml: "application/xhtml+xml", xls: "application/vnd.ms-excel", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            xml: "application/xml", xul: "application/vnd.mozilla.xul+xml", zip: "application/zip", "3gp": "audio/3gpp dans le cas où le conteneur ne comprend pas de vidéo",
            "3g2": "audio/3gpp2 dans le cas où le conteneur ne comprend pas de vidéo", "7z": "application/x-7z-compressed",
        };
        return mimeTypes[extension] || "application/octet-stream";
    };

    /**
     * Centralized error handler for sending error responses to the client.<br>
     * This method sets the appropriate HTTP status code and sends a plain text error message.<br>
     *<br>
     * @private
     * @param {http.ServerResponse} res The HTTP server response object.
     * @param {number} httpCode The HTTP status code to send in the response (e.g., 404, 500).
     * @param {string} message The error message to send in the response body.
     */
    #errorHandler(res: http.ServerResponse, httpCode: number, message: string): void { 
        res.writeHead(httpCode, { 'Content-Type': 'text/plain' });
        res.end(message);
    }
}
