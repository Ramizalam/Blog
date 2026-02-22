import { Router } from "express";
import { prisma } from "../../lib/prisma";
import z from "zod";
import jwtAuthCheck from "../middleware/jwt.middleware";

const router = Router();

const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.string(),
});

// POST /api/v1/blogs  — Create a new blog post
router.post("/", jwtAuthCheck, async (req, res) => {
    const payload = req.body;
    const parsePayload = blogSchema.safeParse(payload);
    if (!parsePayload.success) {
        return res.status(401).json({ msg: "Invalid Input" });
    }
    try {
        const authorId = res.locals.id;
        const { title, content } = payload;
        await prisma.post.create({
            data: {
                title,
                content,
                published: true,
                authorId,
            },
        });
        res.status(200).json({ msg: "Post successfully created" });
    } catch (error) {
        res.status(500).json({ msg: "Internal server Error" });
    }
});

// GET /api/v1/blogs  — Get the author's first blog post
router.get("/", jwtAuthCheck, async (req, res) => {
    try {
        const authorId = res.locals.id;
        const response = await prisma.post.findFirst({
            where: { authorId },
        });
        res.status(200).json({ title: response?.title, content: response?.content });
    } catch (error) {
        res.status(500).json({ msg: "Internal server Error" });
    }
});

// GET /api/v1/blogs/bulk  — Get all blog posts
router.get("/bulk", jwtAuthCheck, async (req, res) => {
    try {
        const response = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                author: {
                    select: { name: true },
                },
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

// PUT /api/v1/blogs/update  — Update a blog post
router.put("/update", jwtAuthCheck, async (req, res) => {
    const { id, title, content } = req.body;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ msg: "Post ID is required" });
    }
    try {
        await prisma.post.update({
            where: { id },
            data: { title, content },
        });
        res.status(200).json({ msg: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal server Error" });
    }
});

// DELETE /api/v1/blogs/:id  — Delete a blog post by ID
router.delete("/:id", jwtAuthCheck, async (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ msg: "Post ID is required" });
    }
    try {
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        await prisma.post.delete({ where: { id } });
        res.status(200).json({ msg: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

export default router;
