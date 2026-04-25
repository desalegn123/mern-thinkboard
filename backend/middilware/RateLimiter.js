import ratelimit from '../src/config/upstash.js';
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit('my-limit-key');
    if (!success) {
      res
        .status(429)
        .json({ message: 'the are too many requiest, try again later' });
    }
    next();
  } catch (error) {
    res.status(500).json({message:"rate limit erorrs"})
    next()
  }
};
export default rateLimiter;
