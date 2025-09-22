[**coreroute**](../README.md)

***

[coreroute](../globals.md) / CoreRouteRequestHandler

# Type Alias: CoreRouteRequestHandler()

> **CoreRouteRequestHandler** = (`req`, `res`) => `void`

Defined in: [core-route.ts:89](https://github.com/cmames/CoreRoute/blob/78f527ac17a4c9f2834c39f131b6b8636c702414/src/core-route.ts#L89)

Type definition for route handler functions in CoreRoute.
A CoreRouteRequestHandler function is responsible for processing incoming HTTP requests
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
