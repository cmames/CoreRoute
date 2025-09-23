import * as http from 'http';
/**
 * A wrapper class for http.ServerResponse to provide a more convenient and chainable API.
 * This class encapsulates the standard Node.js response object, exposing a simplified
 * set of methods similar to Express.
 */
export declare class CoreRouteResponse {
    #private;
    /**
     * Indicates whether the response headers have been sent.
     * This property is read-only.
     * @returns {boolean} True if headers have been sent, otherwise false.
     */
    get headersSent(): boolean;
    constructor(res: http.ServerResponse);
    /**
     * Sets the HTTP status code for the response.
     * @param {number} code The HTTP status code.
     * @returns {this} The instance of the response object for method chaining.
     */
    status(code: number): this;
    /**
     * Sets a single response header or multiple headers.
     * @param {string | object} field The header field name or an object of header fields.
     * @param {string | string[]} [value] The header field value.
     * @returns {this} The instance of the response object for method chaining.
     */
    set(field: string | http.OutgoingHttpHeaders, value?: string | string[]): this;
    /**
     * Sets the Content-Type HTTP header using a file extension.
     * @param {string} type The file extension (e.g., 'json', 'html').
     * @returns {this} The instance of the response object for method chaining.
     */
    type(type: string): this;
    /**
     * Sends a JSON response. Automatically sets the Content-Type header to 'application/json'.
     * @param {T} data The data object to be sent as a JSON response.
     * @returns {void}
     */
    json<T>(data: T): void;
    /**
     * Sends a generic response with a flexible data type.
     * The method determines the appropriate 'Content-Type' header based on the
     * data type and, for file buffers, its magic number.
     * @param {object | Buffer | string} data The data to be sent. Can be a string, Buffer, or an object.
     * @returns {void}
     */
    send(data: object | Buffer | string): void;
    /**
     * Ends the response process without sending any data.
     * @returns {void}
     */
    end(): void;
}
