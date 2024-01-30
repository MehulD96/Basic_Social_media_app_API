import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 1*60*1000,    //5 min interval 
    max: 15,     //5 req to each ip
    message: "too many requests from this ip , please try after 5 min."
})

export default limiter;