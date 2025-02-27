[**coreroute**](../README.md)

***

[coreroute](../globals.md) / RouteHandler

# Type Alias: RouteHandler()

> **RouteHandler**: (`req`, `res`) => `void`

Defined in: [coreroute.ts:16](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L16)

Type definition for route handler functions in CoreRoute.
A RouteHandler function is responsible for processing incoming HTTP requests
for a specific route and sending back a response.

## Parameters

### req

`http.IncomingMessage`

The incoming HTTP request object.

### res

`http.ServerResponse`

The HTTP server response object.

## Returns

`void`

- Route handlers should not return any value; they should manage the response directly using the 'res' object.
