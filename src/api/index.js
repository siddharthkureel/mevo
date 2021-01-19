import axios from "axios";
import rateLimit from 'axios-rate-limit';

export default rateLimit(axios.create({
        baseURL:'https://api.conceptnet.io/c/en'
    }), 
    { maxRequests: 10, perMilliseconds: 60000, maxRPS: 10 }
)