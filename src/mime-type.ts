/**
 * @module mime-type
 *
 * Contains the main {@link MimeTypes} class, which is mime type implementation for CoreRoute.
 *
 * This module exports the {@link MimeTypes} class and related interfaces and types necessary for
 * defining and using the mime types.
 */

import * as path from "path";

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
export type MimeTypeMap = { [key: string]: string }; 

export class MimeTypes {
    #localTypes: MimeTypeMap;

    static #mimeTypeMap: MimeTypeMap = { 
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
        "7z": "application/x-7z-compressed" // archive 7-zip
    };

    /**
     * Constructor for the MimeTypes class.<br>
     * Initializes a custom MIME types list.<br>
     */
    constructor() {
        this.#localTypes = { ...MimeTypes.#mimeTypeMap };
    }

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
    static getType(file: string): string { 
        const extension = path.extname(file).toLowerCase().substring(1);
        return MimeTypes.#mimeTypeMap[extension] || 'application/octet-stream';
    }


    /**
     * Get the custom MIME type list.
     *
     * @returns {MimeTypeMap} A dictionary (object) where keys are file extensions ...
     */
    getMimeList(): MimeTypeMap {
        return {...this.#localTypes};
    }

    /**
     * Determines the MIME type of a file based on its extension.<br>
     * Uses a custom list of MIME types based on predefined list of common MIME types. If the extension is not recognized,<br>
     * it defaults to 'application/octet-stream'.<br>
     *<br>
     * @param {string} file The path to the file.
     * @returns {string} The MIME type string for the file.
     *                  Defaults to 'application/octet-stream' if the extension is not found.
     */
     getMimeType(file: string): string {
        const extension = path.extname(file).toLowerCase().substring(1);
        return this.#localTypes[extension] || 'application/octet-stream';
    }

    /**
     * Adds or updates a MIME type for a specific file extension.
     * This change is global and affects all uses of MimeTypes.getType().
     * @param extension The file extension (e.g., 'custom').
     * @param mimeType The MIME type string (e.g., 'application/x-custom').
     */
    addType(extension: string, mimeType: string): void {
        if (!extension) {
            throw new Error('MimeTypes.addType - extension cannot be empty');
        }
        if (!mimeType) {
            throw new Error('MimeTypes.addType - mimeType cannot be empty');
        }
        this.#localTypes[extension.toLowerCase()] = mimeType;
    }
}