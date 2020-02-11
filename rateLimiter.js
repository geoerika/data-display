const redis = require('redis')
// const ENV = require('./environment')
// const path = require('path')
// const PATH = path.resolve(__dirname, '.env.' + ENV)
module.exports = (options) => {
  return function (req, res, next) {
    // variable to identify user
    const USER = options.name
    const client = redis.createClient(process.env.REDIS_URL)

    client.on('ready', function () {
      console.log('Redis is ready')
    })

    client.on('error', function () {
      console.log('Error in Redis')
    })

    // start multi transactions for one request so we avoid
    // conflict when two requests arrive in the same time
    client
      .multi()
      // sets request counter value for user to 0 and expires it in 60 sec
      .set([USER, 0, 'EX', 60, 'NX'])
      // we increment counter for user
      .incr(USER)
      .exec((err, response) => {
        if (err) {
          return res.status(500).send(err.message)
        }
        // we read the response value of the nr of requests
        const requestCounter = response[1]
        if (requestCounter > 20) {
          return res.status(429)
            .send('You exceeded your quota of requests per minute! Please try again later!')
        }
        return next()
      })
  }
}
