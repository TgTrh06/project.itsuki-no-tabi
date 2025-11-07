import Post from '../models/Post.js';

const increaseView = async (req, res, next) => {
    const slug = req.params.slug;
    
    await Post.findOneAndUpdate(
        { slug },
        { $inc: { 'meta.views': 1 } }
    );

    next();
};

export default increaseView;