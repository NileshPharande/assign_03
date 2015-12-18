 # assign_03
 
build an HTTP server using NodeJS that can return static image files to HTTP client.
1. Create a HTTP Web Server in Node.js that accepts only HTTP GET requests from the client.
2. The request URL will contain the filename of the requested image by the client.
3. The HTTP server should read the image file from the disk (from a standard directory) and then return that image.
4. If a bad filename has been provided by the client in the request, your HTTP server should return a proper HTTP 400 error
   message to the client.
5. This lab session should be done without the use of any framework(express etc).