// import BaseController from "./base_controller";
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

// class PostController extends BaseController<IPost> {
//     constructor() {
//         super(Post);
//     }

//     async post(req: Request, res: Response) {
//         req.body.owner = req.body.user._id;
//         super.post(req, res);
//     }


// }

export default {
    newPost,
    getAllPosts
};