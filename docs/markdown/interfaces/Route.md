[**coreroute**](../README.md)

***

[coreroute](../globals.md) / Route

# Interface: Route

Defined in: core-route.ts:52

Interface defining the structure of a route.
Each route associates a URL pattern with a handler function.

## Properties

### handler()

> **handler**: (`req`, `res`) => `void`

Defined in: core-route.ts:77

The handler function to be executed when the route is matched.
It receives the request and response objects as arguments.

#### Parameters

##### req

`IncomingMessage`

The incoming HTTP request object.

##### res

`ServerResponse`

The HTTP server response object.

#### Returns

`void`

***

### paramNames

> **paramNames**: `string`[]

Defined in: core-route.ts:70

**`Internal`**

An array of parameter names extracted from the `routePattern`.
Example: ['userId'] for the pattern '/api/users/:userId'.
 // Mark as internal as it's not meant for direct external use.

***

### regex

> **regex**: `RegExp`

Defined in: core-route.ts:64

**`Internal`**

The regular expression generated from the `routePattern`.
Used internally for efficient URL matching.
 // Mark as internal as it's not meant for direct external use.

***

### routePattern

> **routePattern**: `string`

Defined in: core-route.ts:58

The URL pattern to match for this route.
Can include parameters in the format `:paramName`.
Example: '/api/users/:userId'
