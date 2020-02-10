const moment = require('moment');
const redis = require('redis');

module.exports = (options) => {

    return function (req, res, next) {

        //variable to identify user
        let user = options.name;
        client = redis.createClient({
            port: 6379,
            host: '127.0.0.1'
        });

        client.on('ready',function() {
         console.log("Redis is ready");
        });

        client.on('error',function() {
         console.log("Error in Redis");
        });

        //start multi transactions for one request so we avoid
        //conflict when two requests arrive in the same time
        client
            .multi()
            //sets counter value for user to 0 and expires it in 60 sec
            .set([user, 0, 'EX', 60, 'NX'])
            // we increment counter
            .incr(user) // INCR UUID
            .exec((err, response) => {
                if (err) {
                    return res.status(500).send(err.message)
                }
                const reqestCounter = response[1];
                console.log('user: ', user);
                console.log('reqCount:', reqestCounter);
                if (reqestCounter > 20) {
                    return res.status(429)
                    .send(`You exceeded your quota of requests per minute! Please try again later!`)
                }
                return next();
            })
    }
}
