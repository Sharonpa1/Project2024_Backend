import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import Post from "../models/post_model";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;


const testUser = {
    name: "test",
    email: "post@gmail.com",
    password: "123456",
    accessToken: null
}


beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await Post.deleteMany();
    await User.deleteMany({ email: testUser.email });
    await request(app).post("/auth/register").send(testUser);
    const res = await request(app).post("/auth/login").send(testUser);
    testUser.accessToken = res.body.accessToken;
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});



describe("Post test", () => {
    test("get all posts", async () => {
        const res = await request(app).get("/post/getAllPosts");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    const post = {
        title: "this is post title",
        content: "this is my post message ..... ",
        owner: "Moshe"
    }

    test("add new post", async () => {
        const res = await request(app).post("/post/newPost")
            .set('Authorization', 'Bearer ' + testUser.accessToken)
            .send({user: testUser, subject: post.title, content: post.content});
        expect(res.statusCode).toBe(200);
    });

});