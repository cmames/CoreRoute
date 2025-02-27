[**coreroute**](../README.md)

***

[coreroute](../globals.md) / CoreRoute

# Class: CoreRoute

Defined in: coreroute.ts:29

## Constructors

### new CoreRoute()

> **new CoreRoute**(): [`CoreRoute`](CoreRoute.md)

Defined in: coreroute.ts:44

Constructor for the CoreRoute class.<br>
Initializes route storage and server settings.<br>

#### Returns

[`CoreRoute`](CoreRoute.md)

## Methods

### all()

> **all**(`route`, `callback`): `void`

Defined in: coreroute.ts:146

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

Defined in: coreroute.ts:115

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

Defined in: coreroute.ts:70

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

> **listen**(`port`, `options`?, `callback`?): `void`

Defined in: coreroute.ts:196

Starts the HTTP or HTTPS server and begins listening for incoming requests on the specified port.<br>
If `options` are provided, an HTTPS server will be created. Otherwise, an HTTP server will be created.<br>
<br>

#### Parameters

##### port

`number`

The port number to listen on (e.g., 80, 443, 3000).

##### options?

`ServerOptions`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\>

Optional HTTPS options object. If provided, an HTTPS server will be created.
                           This object should contain configuration for HTTPS.
                           See [https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener](https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener) for all available options.
                           Example shows minimal required properties.

##### callback?

() => `void`

An optional callback function executed once the server starts listening.

#### Returns

`void`

#### Examples

```ts
coreroute.listen(3000, () => {
   console.log('HTTP server listening on port 3000');
});
```

```ts
const httpsOptions = {
   key: fs.readFileSync('./ssl/privateKey.pem'),
   cert: fs.readFileSync('./ssl/certificate.pem')
};
coreroute.listen(443, httpsOptions, () => {
   console.log('HTTPS server listening on port 443');
});
```

***

### patch()

> **patch**(`route`, `callback`): `void`

Defined in: coreroute.ts:130

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

Defined in: coreroute.ts:100

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

Defined in: coreroute.ts:85

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

Defined in: coreroute.ts:164

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
