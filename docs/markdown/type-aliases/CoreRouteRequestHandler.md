[**coreroute**](../README.md)

***

[coreroute](../globals.md) / CoreRouteRequestHandler

# Type Alias: CoreRouteRequestHandler()

> **CoreRouteRequestHandler**: (`req`, `res`) => `void` \| `Promise`\<`void`\>

Defined in: [core-route.ts:91](https://github.com/cmames/CoreRoute/blob/a48a546e615076935aa47f572b1d73a2199b7d8e/src/core-route.ts#L91)

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

`void` \| `Promise`\<`void`\>

- Route handlers should not return any value; they should manage the response directly using the 'res' object.
