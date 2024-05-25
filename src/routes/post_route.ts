import express from "express";
const router = express.Router();
import postController from "../controllers/post_controller";

/**
* @swagger
* tags:
*   name: Posts
*   description: Post management API
*/

/**
 * @swagger
 * /newPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               user:
 *                 type: User
 *     responses:
 *       200:
 *         description: The created post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing details.
 *       500:
 *         description: Exception thrown.
 */
router.post('/newPost', postController.newPost);

/**
 * @swagger
 * /getAllPosts:
 *   get:
 *     summary: Retrieve a list of all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Exception thrown. 
 */
router.get('/getAllPosts', postController.getAllPosts);

/**
 * @swagger
 * /getPostsByUserId/{id}:
 *   get:
 *     summary: Retrieve posts by user ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Exception thrown.  
 */
router.get('/getPostsByUserId/:id', postController.getPostsByUser);

/**
 * @swagger
 * /editPost:
 *   put:
 *     summary: Edit an existing post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing details. 
 *       404:
 *         description: Post not found. 
 *       500:
 *         description: Exception thrown. 
 */
router.put('/editPost', postController.editPost);

/**
 * @swagger
 * /deletePost:
 *   put:
 *     summary: Delete a post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The deleted post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing details. 
 *       404:
 *         description: Post not found. 
 *       500:
 *         description: Exception thrown. 
 */
router.put('/deletePost', postController.deletePost);

// router.get("/");

// router.get("/:id");

// router.post("/");

// router.put("/:id");

// router.delete("/:id");

export default router;