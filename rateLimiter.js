const redis = require('redis')
module.exports = (name) => {
  return function (req, res, next) {
    // variable to identify user
    const USER = name
    const client = redis.createClient(process.env.REDIS_URL)

    client.on('ready', function () {
      console.log('Redis is ready')
    })

    client.on('error', function (err) {
      console.log('Error in Redis: ', err)
    })

    client.multi()
      // sets request counter value for user to 0 and expires it in 60 sec
      .set([USER, 0, 'EX', 60, 'NX'])
      // we increment counter for user
      .incr(USER)
      // console.log kept for now to debug
      .get(USER, (err, response) => console.log(response))
      .exec((err, response) => {
        if (err) {
          return res.status(500).send(err.message)
        }
        // we read the response value of the nr of requests
        const requestCounter = response[1]
        if (requestCounter > 20) {
          return res.status(429)
            .send('You exceeded your quota of requests per minute! Please try again in a minute 😎!')
        }
        return next()
      })
    client.quit(() => console.log('quiting redis'))
  }
}
