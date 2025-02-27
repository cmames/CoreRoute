**coreroute**

***

<a name="CoreRoute"></a>

## CoreRoute
A simplified HTTP Router class for Node.js applications.<br><br>This class allows you to define routes for different HTTP methods (GET, PUT, POST, DELETE, PATCH, ALL)<br>and to serve static files from a specified folder. It is designed as a lightweight alternative<br>to full-fledged frameworks like ExpressJS for simpler projects.<br><br>

**Kind**: global class  
**Author**: Mames Christophe  
**License**: GPL-3.0-or-later  

* [CoreRoute](#CoreRoute)
    * [new CoreRoute()](#new_CoreRoute_new)
    * [.get(route, callback)](#CoreRoute+get)
    * [.put(route, callback)](#CoreRoute+put)
    * [.post(route, callback)](#CoreRoute+post)
    * [.delete(route, callback)](#CoreRoute+delete)
    * [.patch(route, callback)](#CoreRoute+patch)
    * [.all(route, callback)](#CoreRoute+all)
    * [.serveStaticFiles(folder)](#CoreRoute+serveStaticFiles)
    * [.listen(port, [callback])](#CoreRoute+listen)
    * [.listen(port, [options], [callback])](#CoreRoute+listen)

<a name="new_CoreRoute_new"></a>

### new CoreRoute()
Constructor for the CoreRoute class.<br>Initializes route storage and server settings.<br>

<a name="CoreRoute+get"></a>

### coreRoute.get(route, callback)
Defines a callback function for handling GET requests to a specific route.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>string</code> | The path for the GET request (e.g., '/api/users'). |
| callback | <code>function</code> | The function to handle the GET request.                           This function receives `req` and `res` objects as arguments. |
| callback.req | <code>http.IncomingMessage</code> | An http.IncomingMessage object. |
| callback.res | <code>http.ServerResponse</code> | An http.ServerResponse object. |

**Example**  
```js
coreroute.get('/api/users', (req, res) => {  res.writeHead(200, {'Content-Type': 'application/json'});  res.end(JSON.stringify({ message: 'User data' }));});
```
<a name="CoreRoute+put"></a>

### coreRoute.put(route, callback)
Defines a callback function for handling PUT requests to a specific route.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>string</code> | The path for the PUT request. |
| callback | <code>function</code> | The function to handle the PUT request.                           This function receives `req` and `res` objects as arguments. |
| callback.req | <code>http.IncomingMessage</code> | An http.IncomingMessage object. |
| callback.res | <code>http.ServerResponse</code> | An http.ServerResponse object. |

**Example**  
```js
coreroute.put('/api/items/:id', (req, res) => {  // Handle update item logic});
```
<a name="CoreRoute+post"></a>

### coreRoute.post(route, callback)
Defines a callback function for handling POST requests to a specific route.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>string</code> | The path for the POST request. |
| callback | <code>function</code> | The function to handle the POST request.                           This function receives `req` and `res` objects as arguments |
| callback.req | <code>http.IncomingMessage</code> | An http.IncomingMessage object. |
| callback.res | <code>http.ServerResponse</code> | An http.ServerResponse object.. |

**Example**  
```js
coreroute.post('/api/items', (req, res) => {  // Handle create item logic});
```
<a name="CoreRoute+delete"></a>

### coreRoute.delete(route, callback)
Defines a callback function for handling DELETE requests to a specific route.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>string</code> | The path for the DELETE request. |
| callback | <code>function</code> | The function to handle the DELETE request.                           This function receives `req` and `res` objects as arguments. |
| callback.req | <code>http.IncomingMessage</code> | An http.IncomingMessage object. |
| callback.res | <code>http.ServerResponse</code> | An http.ServerResponse object. |

**Example**  
```js
coreroute.delete('/api/items/:id', (req, res) => {  // Handle delete item logic});
```
<a name="CoreRoute+patch"></a>

### coreRoute.patch(route, callback)
Defines a callback function for handling PATCH requests to a specific route.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>string</code> | The path for the PATCH request. |
| callback | <code>function</code> | The function to handle the PATCH request.                           This function receives `req` and `res` objects as arguments. |
| callback.req | <code>http.IncomingMessage</code> | An http.IncomingMessage object. |
| callback.res | <code>http.ServerResponse</code> | An http.ServerResponse object. |

**Example**  
```js
coreroute.patch('/api/items/:id', (req, res) => {  // Handle partial update item logic});
```
<a name="CoreRoute+all"></a>

### coreRoute.all(route, callback)
Defines a callback function for handling requests for ALL HTTP methods to a specific route.<br>This is useful for implementing route handlers that should respond to any type of HTTP request.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>string</code> | The path for the ALL methods request. |
| callback | <code>function</code> | The function to handle all types of requests to this route.                           This function receives `req` and `res` objects as arguments. |
| callback.req | <code>http.IncomingMessage</code> | An http.IncomingMessage object. |
| callback.res | <code>http.ServerResponse</code> | An http.ServerResponse object. |

**Example**  
```js
coreroute.all('/api/items', (req, res) => {  // Handle request for any HTTP method to /api/items});
```
<a name="CoreRoute+serveStaticFiles"></a>

### coreRoute.serveStaticFiles(folder)
Enables serving static files from a specified folder.<br>When enabled, if a requested path does not match any defined API routes,<br>the server will attempt to serve a file from the static folder.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| folder | <code>string</code> | The path to the folder containing static files (e.g., './public'). |

**Example**  
```js
coreroute.serveStaticFiles('./public'); // Serve static files from the 'public' directory
```
<a name="CoreRoute+listen"></a>

### coreRoute.listen(port, [callback])
Starts the HTTP server and begins listening for incoming requests on the specified port.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | The port number to listen on (e.g., 80, 3000). |
| [callback] | <code>function</code> | An optional callback function that will be executed once the server starts listening.                            This is useful for logging or performing setup tasks after the server is running. |

**Example**  
```js
coreroute.listen(3000, () => {  console.log('Server listening on port 3000');});
```
<a name="CoreRoute+listen"></a>

### coreRoute.listen(port, [options], [callback])
Starts the HTTP or HTTPS server and begins listening for incoming requests on the specified port.<br>If `options` are provided, an HTTPS server will be created. Otherwise, an HTTP server will be created.<br><br>

**Kind**: instance method of [<code>CoreRoute</code>](#CoreRoute)  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | The port number to listen on (e.g., 80, 443, 3000). |
| [options] | <code>object</code> | Optional HTTPS options object. If provided, an HTTPS server will be created.                           This object should contain configuration for HTTPS.                           See [https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener](https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener) for all available options.                           Example shows minimal required properties. |
| [options.key] | <code>string</code> \| <code>Buffer</code> | Private key for SSL/TLS. Path to private key file or the key itself as a Buffer. |
| [options.cert] | <code>string</code> \| <code>Buffer</code> | Public x509 certificate for SSL/TLS. Path to certificate file or the certificate itself as a Buffer. |
| [callback] | <code>function</code> | An optional callback function executed once the server starts listening. |

**Example** *(Start an HTTP server)*  
```js
coreroute.listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});
```
**Example** *(Start an HTTPS server)*  
```js
const httpsOptions = {
  key: fs.readFileSync('./ssl/privateKey.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem')
};
coreroute.listen(443, httpsOptions, () => {
  console.log('HTTPS server listening on port 443');
});
```
