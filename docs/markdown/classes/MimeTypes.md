[**coreroute**](../README.md)

***

[coreroute](../globals.md) / MimeTypes

# Class: MimeTypes

Defined in: [mime-type.ts:25](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/mime-type.ts#L25)

## Constructors

### Constructor

> **new MimeTypes**(): `MimeTypes`

Defined in: [mime-type.ts:109](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/mime-type.ts#L109)

Constructor for the MimeTypes class.<br>
Initializes a custom MIME types list.<br>

#### Returns

`MimeTypes`

## Methods

### addType()

> **addType**(`extension`, `mimeType`): `void`

Defined in: [mime-type.ts:186](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/mime-type.ts#L186)

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

Defined in: [mime-type.ts:162](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/mime-type.ts#L162)

Get the custom MIME type list.

#### Returns

[`MimeTypeMap`](../type-aliases/MimeTypeMap.md)

A dictionary (object) where keys are file extensions ...

***

### getMimeType()

> **getMimeType**(`file`): `string`

Defined in: [mime-type.ts:175](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/mime-type.ts#L175)

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

Defined in: [mime-type.ts:123](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/mime-type.ts#L123)

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

***

### getTypeFromBuffer()

> `static` **getTypeFromBuffer**(`buffer`): `null` \| `string`

Defined in: [mime-type.ts:135](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/mime-type.ts#L135)

Determines the MIME type of a file based on its extension.<br>
Uses a predefined list of common MIME types.<br>
<br>

#### Parameters

##### buffer

`Buffer`

The buffer containing first bytes as magic number.

#### Returns

`null` \| `string`

The MIME type string for the buffer.

***

### getTypeFromExtension()

> `static` **getTypeFromExtension**(`extension`): `null` \| `string`

Defined in: [mime-type.ts:153](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/mime-type.ts#L153)

Determines the MIME type based on a file extension.

#### Parameters

##### extension

`string`

The file extension (without the leading dot).

#### Returns

`null` \| `string`

The MIME type string, or `null` if the extension is not found.
