[**coreroute**](../README.md)

***

[coreroute](../globals.md) / CoreRouteRequestHandler

# Type Alias: CoreRouteRequestHandler()

> **CoreRouteRequestHandler** = (`req`, `res`) => `void`

Defined in: [core-route.ts:91](https://github.com/cmames/CoreRoute/blob/9d673801b6019a05f35aa28de0804b6091eef2ab/src/core-route.ts#L91)

Type definition for route handler functions in CoreRoute.
A CoreRouteRequestHandler function is responsible for processing incoming HTTP requests
for a specific route and sending back a response.

## Parameters

### req

`http.IncomingMessage`

The incoming HTTP request object.

### res

`CoreRouteResponse`

The CoreRoute response object.

## Returns

`void`

- Route handlers should not return any value; they should manage the response directly using the 'res' object.
