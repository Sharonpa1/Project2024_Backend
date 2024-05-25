import Post from "../models/post_model";
import { Request, Response } from "express";

const newPost = async (req: Request, res: Response) => {
    console.log(req.body);
    const user = req.body.user;
    const title = req.body.subject;
    const content = req.body.content;

    if (user == null || title == null || content == null) {
        return res.status(400).send("missing details");
    }

    try {
        
        const _newPost = await Post.create({
            owner: user.email,
            title: title,
            content: content
        });

        return res.status(200).send(_newPost);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        console.log("get all posts req");
        const postsList = await Post.find();
        return res.status(200).send(postsList);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

const getPostsByUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log(id);
        console.log("get posts by user req");
        const postsList = await Post.find({owner : id});
        return res.status(200).send(postsList);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

const editPost = async (req: Request, res: Response) => {
    const id = req.body.id;
    const title = req.body.subject;
    const content = req.body.content;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Subject and content are required' });
    }
  
    try {
      const post = await Post.findByIdAndUpdate(
        id,
        { title, content },
        { new: true, runValidators: true }
      );

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error: error.message });
    }
}

const deletePost = async (req: Request, res: Response) => {
    const id = req.body.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: 'Subject and content are required' });
    }
  
    try {
      const post = await Post.findByIdAndDelete(id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
}


export default {
    newPost,
    getAllPosts,
    getPostsByUser,
    editPost,
    deletePost
};