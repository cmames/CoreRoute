[**coreroute**](../README.md)

***

[coreroute](../globals.md) / CoreRoute

# Class: CoreRoute

Defined in: [core-route.ts:102](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L102)

## Constructors

### new CoreRoute()

> **new CoreRoute**(): [`CoreRoute`](CoreRoute.md)

Defined in: [core-route.ts:116](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L116)

Constructor for the CoreRoute class.<br>
Initializes route storage and server settings.<br>

#### Returns

[`CoreRoute`](CoreRoute.md)

## Methods

### all()

> **all**(`routePattern`, `callback`): `void`

Defined in: [core-route.ts:245](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L245)

Defines a CoreRouteRequestHandler function for handling requests for ALL HTTP methods to a specific route.<br>
This is useful for implementing route handlers that should respond to any type of HTTP request.<br>
<br>

#### Parameters

##### routePattern

`string`

The path for the ALL methods request.

##### callback

[`CoreRouteRequestHandler`](../type-aliases/CoreRouteRequestHandler.md)

The function to handle all types of requests to this route.
                          This function receives `req` and `res` objects as arguments.

#### Returns

`void`

#### Example

```ts
coreroute.all('/api/items', (req, res) => {
  // Handle request for any HTTP method to /api/items
});
```

***

### close()

> **close**(): `void`

Defined in: [core-route.ts:348](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L348)

Closes the server instance gracefully.
This method stops the server from accepting new connections and
closes all active connections. It is useful for shutting down the server programmatically,
for example during testing or when the application needs to exit.

#### Returns

`void`

#### Example

```typescript
coreRoute.close(); // Stop the server
```

***

### delete()

> **delete**(`routePattern`, `callback`): `void`

Defined in: [core-route.ts:202](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L202)

Defines a CoreRouteRequestHandler function for handling DELETE requests to a specific route.<br>
<br>

#### Parameters

##### routePattern

`string`

The path for the DELETE request.

##### callback

[`CoreRouteRequestHandler`](../type-aliases/CoreRouteRequestHandler.md)

The function to handle the DELETE request.
                          This function receives `req` and `res` objects as arguments.

#### Returns

`void`

#### Example

```ts
coreroute.delete('/api/items/:id', (req, res) => {
  // Handle delete item logic
});
```

***

### get()

> **get**(`routePattern`, `callback`): `void`

Defined in: [core-route.ts:140](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L140)

Defines a callback function for handling GET requests to a specific route.<br>
<br>

#### Parameters

##### routePattern

`string`

The path for the GET request (e.g., '/api/users').

##### callback

[`CoreRouteRequestHandler`](../type-aliases/CoreRouteRequestHandler.md)

The function to handle the GET request.
                          This function receives `req` and `res` objects as arguments.

#### Returns

`void`

#### Example

```ts
coreroute.get('/api/users', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ message: 'User data' }));
});
```

***

### listen()

> **listen**(`port`, `optionsOrCallback`?, `callback`?): `void`

Defined in: [core-route.ts:305](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L305)

Starts the server on the specified port, optionally with HTTPS.<br>
This method can start either an HTTP server or an HTTPS server based on the arguments provided.<br>
<br>
**Overloads:**

1.  `listen(port: number, callback?: () => void): void` - Starts an HTTP server.
2.  `listen(port: number, options?: https.ServerOptions, callback?: () => void): void` - Starts an HTTPS server if `options` are provided, otherwise defaults to HTTP.

#### Parameters

##### port

`number`

The port number on which the server should listen.

##### optionsOrCallback?

Either HTTPS server options or a callback function.
                                                   If it's an object, it's treated as HTTPS options.
                                                   If it's a function, it's treated as the callback for HTTP server start.
                                                   If omitted, no callback is executed after server starts.

`ServerOptions`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> | () => `void`

##### callback?

() => `void`

An optional callback function to be executed once the server starts listening.
                                This is used only when the second argument is HTTPS options.

#### Returns

`void`

#### Example

```typescript
// Start HTTP server with a callback
router.listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});

// Start HTTPS server with options and a callback
const httpsOptions = { ... };
router.listen(443, httpsOptions, () => {
  console.log('HTTPS server listening on port 443');
});

// Start HTTP server without a callback
router.listen(8080);

// Start HTTPS server with options but without a callback
const httpsOptionsNoCallback = { ... };
router.listen(8443, httpsOptionsNoCallback);
```

***

### patch()

> **patch**(`routePattern`, `callback`): `void`

Defined in: [core-route.ts:223](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L223)

Defines a CoreRouteRequestHandler function for handling PATCH requests to a specific route.<br>
<br>

#### Parameters

##### routePattern

`string`

The path for the PATCH request.

##### callback

[`CoreRouteRequestHandler`](../type-aliases/CoreRouteRequestHandler.md)

The function to handle the PATCH request.
                          This function receives `req` and `res` objects as arguments.

#### Returns

`void`

#### Example

```ts
coreroute.patch('/api/items/:id', (req, res) => {
  // Handle partial update item logic
});
```

***

### post()

> **post**(`routePattern`, `callback`): `void`

Defined in: [core-route.ts:181](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L181)

Defines a CoreRouteRequestHandler function for handling POST requests to a specific route.<br>
<br>

#### Parameters

##### routePattern

`string`

The path for the POST request.

##### callback

[`CoreRouteRequestHandler`](../type-aliases/CoreRouteRequestHandler.md)

The function to handle the POST request.
                          This function receives `req` and `res` objects as arguments

#### Returns

`void`

#### Example

```ts
coreroute.post('/api/items', (req, res) => {
  // Handle create item logic
});
```

***

### put()

> **put**(`routePattern`, `callback`): `void`

Defined in: [core-route.ts:160](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L160)

Defines a CoreRouteRequestHandler function for handling PUT requests to a specific route.<br>
<br>

#### Parameters

##### routePattern

`string`

The path for the PUT request.

##### callback

[`CoreRouteRequestHandler`](../type-aliases/CoreRouteRequestHandler.md)

The function to handle the PUT request.
                          This function receives `req` and `res` objects as arguments.

#### Returns

`void`

#### Example

```ts
coreroute.put('/api/items/:id', (req, res) => {
  // Handle update item logic
});
```

***

### serveStaticFiles()

> **serveStaticFiles**(`folder`): `void`

Defined in: [core-route.ts:262](https://github.com/cmames/CoreRoute/blob/2116a239468e5fe8ebe82c1ab9ec167faafc5408/src/core-route.ts#L262)

Enables serving static files from a specified folder.<br>
When enabled, if a requested path does not match any defined API routes,<br>
the server will attempt to serve a file from the static folder.<br>
<br>

#### Parameters

##### folder

`string`

The path to the folder containing static files (e.g., './public').

#### Returns

`void`

#### Example

```ts
coreroute.serveStaticFiles('./public'); // Serve static files from the 'public' directory
```
