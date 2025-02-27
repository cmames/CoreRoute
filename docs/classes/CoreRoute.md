[**coreroute**](../README.md)

***

[coreroute](../globals.md) / CoreRoute

# Class: CoreRoute

Defined in: [coreroute.ts:29](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L29)

## Constructors

### new CoreRoute()

> **new CoreRoute**(): [`CoreRoute`](CoreRoute.md)

Defined in: [coreroute.ts:44](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L44)

Constructor for the CoreRoute class.<br>
Initializes route storage and server settings.<br>

#### Returns

[`CoreRoute`](CoreRoute.md)

## Methods

### all()

> **all**(`route`, `callback`): `void`

Defined in: [coreroute.ts:146](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L146)

Defines a callback function for handling requests for ALL HTTP methods to a specific route.<br>
This is useful for implementing route handlers that should respond to any type of HTTP request.<br>
<br>

#### Parameters

##### route

`string`

The path for the ALL methods request.

##### callback

(`req`, `res`) => `void`

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

### delete()

> **delete**(`route`, `callback`): `void`

Defined in: [coreroute.ts:115](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L115)

Defines a callback function for handling DELETE requests to a specific route.<br>
<br>

#### Parameters

##### route

`string`

The path for the DELETE request.

##### callback

(`req`, `res`) => `void`

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

> **get**(`route`, `callback`): `void`

Defined in: [coreroute.ts:70](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L70)

Defines a callback function for handling GET requests to a specific route.<br>
<br>

#### Parameters

##### route

`string`

The path for the GET request (e.g., '/api/users').

##### callback

(`req`, `res`) => `void`

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

Defined in: [coreroute.ts:207](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L207)

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

> **patch**(`route`, `callback`): `void`

Defined in: [coreroute.ts:130](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L130)

Defines a callback function for handling PATCH requests to a specific route.<br>
<br>

#### Parameters

##### route

`string`

The path for the PATCH request.

##### callback

(`req`, `res`) => `void`

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

> **post**(`route`, `callback`): `void`

Defined in: [coreroute.ts:100](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L100)

Defines a callback function for handling POST requests to a specific route.<br>
<br>

#### Parameters

##### route

`string`

The path for the POST request.

##### callback

(`req`, `res`) => `void`

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

> **put**(`route`, `callback`): `void`

Defined in: [coreroute.ts:85](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L85)

Defines a callback function for handling PUT requests to a specific route.<br>
<br>

#### Parameters

##### route

`string`

The path for the PUT request.

##### callback

(`req`, `res`) => `void`

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

Defined in: [coreroute.ts:164](https://github.com/cmames/CoreRoute/blob/0755d3477cacf0b1e23897620df69c2db6eaea6d/src/coreroute.ts#L164)

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
