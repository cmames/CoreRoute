/**
 * @module mime-type
 *
 * Contains the main {@link MimeTypes} class, which is mime type implementation for CoreRoute.
 *
 * This module exports the {@link MimeTypes} class and related interfaces and types necessary for
 * defining and using the mime types.
 */
/**
 * Type alias for a MIME type map.
 *
 * A `MimeTypeMap` is a dictionary-like object (map) where keys are file extensions
 * (e.g., 'json', 'html', 'png') and values are the corresponding MIME type strings
 * (e.g., 'application/json', 'text/html', 'image/png').
 *
 * This type is used to define and customize the mapping between file extensions and
 * MIME types recognized by CoreRoute for serving static files.
 *
 */
export type MimeTypeMap = {
    [key: string]: string;
};
export declare class MimeTypes {
    #private;
    /**
     * Constructor for the MimeTypes class.<br>
     * Initializes a custom MIME types list.<br>
     */
    constructor();
    /**
     * Determines the MIME type of a file based on its extension.<br>
     * Uses a predefined list of common MIME types. If the extension is not recognized,<br>
     * it defaults to 'application/octet-stream'.<br>
     *<br>
     * @param {string} file The path to the file.
     * @returns {string} The MIME type string for the file.
     *                  Defaults to 'application/octet-stream' if the extension is not found.
     * @see {@link https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types} for common MIME types.
     */
    static getType(file: string): string;
    /**
     * Get the custom MIME type list.
     *
     * @returns {MimeTypeMap} A dictionary (object) where keys are file extensions ...
     */
    getMimeList(): MimeTypeMap;
    /**
     * Determines the MIME type of a file based on its extension.<br>
     * Uses a custom list of MIME types based on predefined list of common MIME types. If the extension is not recognized,<br>
     * it defaults to 'application/octet-stream'.<br>
     *<br>
     * @param {string} file The path to the file.
     * @returns {string} The MIME type string for the file.
     *                  Defaults to 'application/octet-stream' if the extension is not found.
     */
    getMimeType(file: string): string;
    /**
     * Adds or updates a MIME type for a specific file extension.
     * This change is global and affects all uses of MimeTypes.getType().
     * @param extension The file extension (e.g., 'custom').
     * @param mimeType The MIME type string (e.g., 'application/x-custom').
     */
    addType(extension: string, mimeType: string): void;
}
