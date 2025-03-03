import * as http from 'http';
import * as https from 'https';
import * as fs from "fs";
import * as path from "path";
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
    #alls;
    #serverInstance;
    #staticFolder;
    #isStaticServingEnabled;
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
    get(route, callback) { this.#gets[route] = callback; }
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
    put(route, callback) { this.#puts[route] = callback; }
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
    post(route, callback) { this.#posts[route] = callback; }
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
    delete(route, callback) { this.#deletes[route] = callback; }
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
    patch(route, callback) { this.#patchs[route] = callback; }
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
    all(route, callback) {
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
     * Dispatches incoming requests to the appropriate route handler or static file handler.<br>
     * This method is the core request handler for the HTTP server. It first checks for matching API routes.<br>
     * If no API route is found and static file serving is enabled, it attempts to serve a static file.<br>
     *<br>
     * @private
     * @param {http.IncomingMessage} req The incoming HTTP request object.
     * @param {http.ServerResponse} res The HTTP server response object.
     */
    #dispatch(req, res) {
        let tab = null; // On laisse tab en 'any' pour l'instant
        switch (req.method) {
            case "GET":
                tab = this.#gets;
                break;
            case "PUT":
                tab = this.#puts;
                break;
            case "POST":
                tab = this.#posts;
                break;
            case "DELETE":
                tab = this.#deletes;
                break;
            case "PATCH":
                tab = this.#patchs;
                break;
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
        }
        else if (this.#isStaticServingEnabled) {
            this.#staticHandler(req, res);
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
        fs.access(filePath, fs.constants.R_OK, (accessErr) => {
            if (!accessErr) {
                const mimeType = this.#getMimeType(filePath);
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
    #getMimeType(file) {
        const extension = path.extname(file).toLowerCase();
        const mimeTypes = {
            aac: "audio/aac", // fichier audio AAC
            abw: "application/x-abiword", // document AbiWord
            arc: "application/octet-stream", // archive (contenant plusieurs fichiers)
            avi: "video/x-msvideo", // AVI : Audio Video Interleave
            azw: "application/vnd.amazon.ebook", // format pour eBook Amazon Kindle
            bin: "application/octet-stream", // n'importe quelle donnée binaire
            bmp: "image/bmp", // Images bitmap Windows OS/2
            bz: "application/x-bzip", // archive BZip
            bz2: "application/x-bzip2", // archive BZip2
            csh: "application/x-csh", // script C-Shell
            css: "text/css", // fichier Cascading Style Sheets (CSS)
            csv: "text/csv", // fichier Comma-separated values (CSV)
            doc: "application/msword", // Microsoft Word
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Microsoft Word (OpenXML)
            eot: "application/vnd.ms-fontobject", // police MS Embedded OpenType
            epub: "application/epub+zip", // fichier Electronic publication (EPUB)
            gif: "image/gif", // fichier Graphics Interchange Format (GIF)
            htm: "text/html", // .html fichier HyperText Markup Language (HTML)
            html: "text/html", // .html fichier HyperText Markup Language (HTML)
            ico: "image/x-icon", // icône
            ics: "text/calendar", // élément iCalendar
            jar: "application/java-archive", // archive Java (JAR)
            jpg: "image/jpeg", // .jpg image JPEG
            jpeg: "image/jpeg", // .jpg image JPEG
            js: "application/javascript", // JavaScript (ECMAScript)
            json: "application/json", // donnée au format JSON
            mid: "audio/midi", // .midi fichier audio Musical Instrument Digital Interface (MIDI)
            mpeg: "video/mpeg", // vidéo MPEG
            mpkg: "application/vnd.apple.installer+xml", // paquet Apple Installer
            odp: "application/vnd.oasis.opendocument.presentation", // présentation OpenDocument
            ods: "application/vnd.oasis.opendocument.spreadsheet", // feuille de calcul OpenDocument
            odt: "application/vnd.oasis.opendocument.text", // document texte OpenDocument
            oga: "audio/ogg", // fichier audio OGG
            ogv: "video/ogg", // fichier vidéo OGG
            ogx: "application/ogg", // OGG
            otf: "font/otf", // police OpenType
            png: "image/png", // fichier Portable Network Graphics
            pdf: "application/pdf", // Adobe Portable Document Format (PDF)
            ppt: "application/vnd.ms-powerpoint", // présentation Microsoft PowerPoint
            pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation", // présentation Microsoft PowerPoint (OpenXML)
            rar: "application/x-rar-compressed", // archive RAR
            rtf: "application/rtf", // Rich Text Format (RTF)
            sh: "application/x-sh", // script shell
            svg: "image/svg+xml", // fichier Scalable Vector Graphics (SVG)
            swf: "application/x-shockwave-flash", // fichier Small web format (SWF) ou Adobe Flash
            tar: "application/x-tar", // fichier d'archive Tape Archive (TAR)
            tif: "image/tiff", // .tiff image au format Tagged Image File Format (TIFF)
            ts: "application/typescript", // fichier Typescript
            ttf: "font/ttf", // police TrueType
            vsd: "application/vnd.visio", // Microsoft Visio
            wav: "audio/x-wav", // Waveform Audio Format
            weba: "audio/webm", // fichier audio WEBM
            webm: "video/webm", // fichier vidéo WEBM
            webp: "image/webp", // image WEBP
            woff: "font/woff", // police Web Open Font Format (WOFF)
            woff2: "font/woff2", // police Web Open Font Format (WOFF)
            xhtml: "application/xhtml+xml", // XHTML
            xls: "application/vnd.ms-excel", // Microsoft Excel
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Microsoft Excel (OpenXML)
            xml: "application/xml", // XML
            xul: "application/vnd.mozilla.xul+xml", // XUL
            zip: "application/zip", // archive ZIP
            "3gp": "audio/3gpp dans le cas où le conteneur ne comprend pas de vidéo", // conteneur audio/vidéo 3GPP video/3gpp
            "3g2": "audio/3gpp2 dans le cas où le conteneur ne comprend pas de vidéo", // conteneur audio/vidéo 3GPP2 video/3gpp2
            "7z": "application/x-7z-compressed", // archive 7-zip
        };
        return mimeTypes[extension] || "application/octet-stream";
    }
    ;
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
}
