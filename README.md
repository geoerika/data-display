Work Sample for Product Aspect, Node.js Variant
---

Live at : https://datadisplayreact.herokuapp.com/geodata

### Setup and Run

#### Local Option Node.js 6.10+

1. Clone this repository: `$ git clone git@github.com:geoerika/ws-product-nodejs.git`
2. Open root directory and install Node.js dependencies: `$ npm install`
3. I used redis for cache to implement a rate limiting functionality, therefore, follow instructions (https://redis.io/topics/quickstart) to set up redis locally and start server with : `redis-server`
3. Set environment variables given in the problem and run `$ npm run dev`
4. Open your browser and point to `localhost:5555`
5. Open client directory and install dependencies for React front end: `$ npm install`
6. Obtain a Google Maps Api key and place it in the .env files
7. Open a second terminal and run `$ npm start`
8. The application should launch at `http://localhost:3000/`
