import { MimeTypes } from './mime-type.js';
/**
 * A wrapper class for http.ServerResponse to provide a more convenient and chainable API.
 * This class encapsulates the standard Node.js response object, exposing a simplified
 * set of methods similar to Express.
 */
export class CoreRouteResponse {
    #res;
    #statusCode = null;
    /**
     * Indicates whether the response headers have been sent.
     * This property is read-only.
     * @returns {boolean} True if headers have been sent, otherwise false.
     */
    get headersSent() {
        return this.#res.headersSent;
    }
    constructor(res) {
        this.#res = res;
    }
    /**
     * Sets the HTTP status code for the response.
     * @param {number} code The HTTP status code.
     * @returns {this} The instance of the response object for method chaining.
     */
    status(code) {
        if (!this.#res.headersSent) {
            this.#statusCode = code;
        }
        return this;
    }
    /**
     * Sets a single response header or multiple headers.
     * @param {string | object} field The header field name or an object of header fields.
     * @param {string | string[]} [value] The header field value.
     * @returns {this} The instance of the response object for method chaining.
     */
    set(field, value) {
        if (typeof field === 'object') {
            for (const key in field) {
                this.#res.setHeader(key, field[key]);
            }
        }
        else {
            this.#res.setHeader(field, value);
        }
        return this;
    }
    /**
     * Sets the Content-Type HTTP header using a file extension.
     * @param {string} type The file extension (e.g., 'json', 'html').
     * @returns {this} The instance of the response object for method chaining.
     */
    type(type) {
        const mimeType = MimeTypes.getTypeFromExtension(type);
        if (mimeType) {
            this.set('Content-Type', mimeType);
        }
        return this;
    }
    /**
     * Sends a JSON response. Automatically sets the Content-Type header to 'application/json'.
     * @param {T} data The data object to be sent as a JSON response.
     * @returns {void}
     */
    json(data) {
        const finalStatusCode = this.#statusCode || 200;
        if (!this.#res.headersSent) {
            this.set('Content-Type', 'application/json');
            this.#res.writeHead(finalStatusCode);
        }
        this.#res.end(JSON.stringify(data));
    }
    /**
     * Sends a generic response with a flexible data type.
     * The method determines the appropriate 'Content-Type' header based on the
     * data type and, for file buffers, its magic number.
     * @param {object | Buffer | string} data The data to be sent. Can be a string, Buffer, or an object.
     * @returns {void}
     */
    send(data) {
        const finalStatusCode = this.#statusCode || 200;
        let contentType = 'application/octet-stream';
        let responseData;
        if (typeof data === 'string') {
            contentType = 'text/plain';
            responseData = data;
        }
        else if (Buffer.isBuffer(data)) {
            const mimeFromBuffer = MimeTypes.getTypeFromBuffer(data);
            if (mimeFromBuffer) {
                contentType = mimeFromBuffer;
            }
            responseData = data;
        }
        else if (typeof data === 'object' && data !== null) {
            contentType = 'application/json';
            responseData = JSON.stringify(data);
        }
        else {
            contentType = 'text/plain';
            responseData = String(data);
        }
        if (!this.#res.headersSent) {
            this.set('Content-Type', contentType);
            this.#res.writeHead(finalStatusCode);
        }
        this.#res.end(responseData);
    }
    /**
     * Ends the response process without sending any data.
     * @returns {void}
     */
    end() {
        const finalStatusCode = this.#statusCode || 200;
        if (!this.#res.headersSent) {
            this.#res.writeHead(finalStatusCode);
        }
        this.#res.end();
    }
}
