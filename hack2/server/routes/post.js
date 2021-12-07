import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (req, res) => {
    const existing = await Post.findOne({});
    if(existing) {
        const data = await Post.find({});
        data.sort((date1, date2) => date2.timestamp - date1.timestamp);
        res.status(200).json({
            message: "success",
            data: data
        })
    }
    else {
        res.status(403).json({
            message: "error",
            data: null
        })
    }
})
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
    let reqPostId = req.query.pid;
    const existing = await Post.findOne({postId: reqPostId});
    if(existing) {
        let data = await Post.findOne({postId: reqPostId});
        res.status(200).json({
            message: "success",
            post: data
        })
    }
    else {
        res.status(403).json({
            message: "error",
            post: null
        })
    }
})
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    console.log(req.body);
    const newPost = new Post({
        postId: req.body.postId,
        title: req.body.trimTitle,
        content: req.body.trimContent,
        timestamp: req.body.timestamp
    })
    try {
        await newPost.save();
        res.status(200).json({
            message: "success"
        })
    } catch(error) {
        res.status(403).json({
            message: "error"
        })
    }
})
// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async (req, res) => {
    let reqDeleteId = req.query.pid;
    try {
        await Post.deleteOne({postId: reqDeleteId});
        res.status(200).json({
            message: "success"
        })
    }
    catch (error) {
        res.status(403).json({
            message: "error"
        })
    }
})
export default router