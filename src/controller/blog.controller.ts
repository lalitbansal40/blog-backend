import { Request, Response } from "express";
import BlogListModel from "../model/blogList.model";
import { BlogModel } from "../model/blog.model";

export const getBlogList = async (req: Request, res: Response) => {
    try {
        const blogs = await BlogListModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};

export const getBlog = async (req: Request, res: Response) => {
    try {
        const blogId: string = req.params.blogId;
        const blog = await BlogModel.findById(blogId);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};