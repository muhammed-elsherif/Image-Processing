Scripts
Install: npm install
Build: npm run build
Lint: npm run lint
Prettify: npm run prettify
Run unit tests: npm run test
Start server: npm run start
Usage
The server will listen on port 3000:

Brief instructions
http://localhost:3000/

Endpoint to resize images
http://localhost:3000/api/process/images?filename='filename'&width='number > 0'&height='number > 0'

Example 1
http://localhost:3000/api/process/images Will display a hint 'filename not exist'.

Example 2
http://localhost:3000/api/process/images?filename=fjord Will display a hint 'height not exist'.

Example 3
http://localhost:3000/api/process/images?filename=fjord&width=200&height=200 Will scale the fjord image to 200 by 200 pixels and store the resulting image. On subsequent calls will serve the resized image instead of resizing the original again.

Example 4
http://localhost:3000/api/process/images?filename=fjord&width=-200&height=200 Error occured processing the image that will be hinted to.

Example 5
http://localhost:3000/api/process/images?filename=fjord&width=200 Missing height parameter that will be hinted to.

Notes
Images are served from assets/images/full. Further images with the extension can be put into that directory, but the filetype is not checked (not required in exercise).
Image thumbs will be stored in assets/images/thumb and can be deleted from there to verify that in that case they will be re-created on subsequent calls to the same endpoint.