import { Request, Response } from "express";
import BlogListModel from "../model/blogList.model";
import { BlogModel } from "../model/blog.model";

export const getBlogList = async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req.query.page as string) || 1; // Current page, default to 1
        const limit = parseInt(req.query.limit as string) || 10; // Items per page, default to 10
        const skip = (page - 1) * limit;
        const blogs = await BlogListModel.find().skip(skip).limit(limit);
        const total: number = await BlogListModel.countDocuments();
        res.status(200).json({ blogs: blogs, totalPages: Math.ceil(total / limit) });
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