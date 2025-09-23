[**coreroute**](../README.md)

***

[coreroute](../globals.md) / CoreRouteRequestHandler

# Type Alias: CoreRouteRequestHandler()

> **CoreRouteRequestHandler** = (`req`, `res`) => `void`

Defined in: [core-route.ts:91](https://github.com/cmames/CoreRoute/blob/99726757497a135c267a146c12f920e95d5d4585/src/core-route.ts#L91)

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
