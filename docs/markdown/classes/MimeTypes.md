[**coreroute**](../README.md)

***

[coreroute](../globals.md) / MimeTypes

# Class: MimeTypes

Defined in: [mime-type.ts:25](https://github.com/cmames/CoreRoute/blob/34fca531a4b922d9286707719d461be29f19fea2/src/mime-type.ts#L25)

## Constructors

### Constructor

> **new MimeTypes**(): `MimeTypes`

Defined in: [mime-type.ts:100](https://github.com/cmames/CoreRoute/blob/34fca531a4b922d9286707719d461be29f19fea2/src/mime-type.ts#L100)

Constructor for the MimeTypes class.<br>
Initializes a custom MIME types list.<br>

#### Returns

`MimeTypes`

## Methods

### addType()

> **addType**(`extension`, `mimeType`): `void`

Defined in: [mime-type.ts:149](https://github.com/cmames/CoreRoute/blob/34fca531a4b922d9286707719d461be29f19fea2/src/mime-type.ts#L149)

Adds or updates a MIME type for a specific file extension.
This change is global and affects all uses of MimeTypes.getType().

#### Parameters

##### extension

`string`

The file extension (e.g., 'custom').

##### mimeType

`string`

The MIME type string (e.g., 'application/x-custom').

#### Returns

`void`

***

### getMimeList()

> **getMimeList**(): [`MimeTypeMap`](../type-aliases/MimeTypeMap.md)

Defined in: [mime-type.ts:125](https://github.com/cmames/CoreRoute/blob/34fca531a4b922d9286707719d461be29f19fea2/src/mime-type.ts#L125)

Get the custom MIME type list.

#### Returns

[`MimeTypeMap`](../type-aliases/MimeTypeMap.md)

A dictionary (object) where keys are file extensions ...

***

### getMimeType()

> **getMimeType**(`file`): `string`

Defined in: [mime-type.ts:138](https://github.com/cmames/CoreRoute/blob/34fca531a4b922d9286707719d461be29f19fea2/src/mime-type.ts#L138)

Determines the MIME type of a file based on its extension.<br>
Uses a custom list of MIME types based on predefined list of common MIME types. If the extension is not recognized,<br>
it defaults to 'application/octet-stream'.<br>
<br>

#### Parameters

##### file

`string`

The path to the file.

#### Returns

`string`

The MIME type string for the file.
                 Defaults to 'application/octet-stream' if the extension is not found.

***

### getType()

> `static` **getType**(`file`): `string`

Defined in: [mime-type.ts:114](https://github.com/cmames/CoreRoute/blob/34fca531a4b922d9286707719d461be29f19fea2/src/mime-type.ts#L114)

Determines the MIME type of a file based on its extension.<br>
Uses a predefined list of common MIME types. If the extension is not recognized,<br>
it defaults to 'application/octet-stream'.<br>
<br>

#### Parameters

##### file

`string`

The path to the file.

#### Returns

`string`

The MIME type string for the file.
                 Defaults to 'application/octet-stream' if the extension is not found.

#### See

[https://developer.mozilla.org/fr/docs/Web/HTTP/Basics\_of\_HTTP/MIME\_types/Common\_types](https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for common MIME types.
