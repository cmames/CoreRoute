[**coreroute**](../README.md)

***

[coreroute](../globals.md) / MimeTypeMap

# Type Alias: MimeTypeMap

> **MimeTypeMap**: `object`

Defined in: [mime-type.ts:23](https://github.com/cmames/CoreRoute/blob/a48a546e615076935aa47f572b1d73a2199b7d8e/src/mime-type.ts#L23)

Type alias for a MIME type map.

A `MimeTypeMap` is a dictionary-like object (map) where keys are file extensions
(e.g., 'json', 'html', 'png') and values are the corresponding MIME type strings
(e.g., 'application/json', 'text/html', 'image/png').

This type is used to define and customize the mapping between file extensions and
MIME types recognized by CoreRoute for serving static files.

## Index Signature

\[`key`: `string`\]: `string`
