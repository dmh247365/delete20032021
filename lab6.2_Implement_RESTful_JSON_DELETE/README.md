A. Create a webserver that:-

Use Express to implement a RESTful HTTP server so that when the command **npm start** is executed its starts a server that listens on **process.env.PORT**.  

The server should support a **DELETE** request to **/boat/{id}** where **{id}** is a placeholder for any given ID - for instance **/boat/2**.

A successful request should result in an empty response body with a 204 No Content status code. If the specific ID does not exist, the response should have a 404 status code. Any unexpected errors should result in a 500 Server Error response.

The server must support the same **GET /boat/{id}** route as implemented previously (6.1).


Thoughts:-
So we are just adding in a DELETE request to what we did previously.

