import  postMessage from '../models/postMessage.js'
import errorResponse from '../utils/errorresponse.js'
import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import responseMsg from '../utils/responseMessage.js';

export const getPosts = async (req,res)=>{
    try {
        const PostMessage = await postMessage.find();
        res.status(200).json(PostMessage);
    }catch (e) {
        res.status(404).json(errorResponse('Error while parsing post',e));
    }
}
export const createPost =async (req,res)=>{
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    }catch (e) {
        res.status(409).json(errorResponse('Error while creating new post',e));
    }
}
export const updatePost = async (req, res) => {
    try {
        const { id:_id } = req.params;
        const post = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new: true });
        res.json(updatedPost);
    }
    catch (e) {
        res.json(e)
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        await PostMessage.findByIdAndRemove(id);
        res.json(responseMsg("Post Deleted Successfully"));
    }
    catch (e) {
        res.json(e)
    }
}
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

       const post = await PostMessage.findById(id);
       const updatedPost =await PostMessage.findByIdAndUpdate(id, {likeCount:post.likeCount+1},{new:true});
        res.json(updatedPost);
    }
    catch (e) {
        res.json(e)
    }
}