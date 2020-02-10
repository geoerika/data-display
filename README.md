Work Sample for Product Aspect, Node.js Variant
---

[What is this for?](https://github.com/EQWorks/work-samples#what-is-this)

### Setup and Run

#### Local Option Node.js 6.10+

1. Clone this repository: `$ git clone git@github.com:geoerika/ws-product-nodejs.git`
2. Open root directory and install Node.js dependencies: `$ npm install`
3. I used redis for cache to implement a rate limit functionality, therefore, follow instructions (https://redis.io/topics/quickstart) to set up redis locally and start server with : `redis-server`
3. Set environment variables given in the problem set and run `$ npm run dev`
4. Open your browser and point to `localhost:5555` and you should see `Welcome to EQ Works 😎`
5. Open client directory and insatll dependencies for React front end: `$ npm install`
6. Open application at `http://localhost:3000/home`
