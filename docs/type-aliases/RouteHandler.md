[**coreroute**](../README.md)

***

[coreroute](../globals.md) / RouteHandler

# Type Alias: RouteHandler()

> **RouteHandler**: (`req`, `res`) => `void`

Defined in: [coreroute.ts:78](https://github.com/cmames/CoreRoute/blob/169b5f9f151ebae212862fc44f8b463470115851/src/coreroute.ts#L78)

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
