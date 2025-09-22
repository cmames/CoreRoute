[**coreroute**](../README.md)

***

[coreroute](../globals.md) / MimeTypeMap

# Type Alias: MimeTypeMap

> **MimeTypeMap** = `object`

Defined in: [mime-type.ts:23](https://github.com/cmames/CoreRoute/blob/3933299f4158d8120f5798b478e080f7de143ff3/src/mime-type.ts#L23)

Type alias for a MIME type map.

A `MimeTypeMap` is a dictionary-like object (map) where keys are file extensions
(e.g., 'json', 'html', 'png') and values are the corresponding MIME type strings
(e.g., 'application/json', 'text/html', 'image/png').

This type is used to define and customize the mapping between file extensions and
MIME types recognized by CoreRoute for serving static files.

## Index Signature

\[`key`: `string`\]: `string`
