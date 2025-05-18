import { Request, Response } from "express";
import BlogListModel from "../model/blogList.model";
import { BlogModel } from "../model/blog.model";

export const getBlogList = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const skip = (page - 1) * limit;

        const [blogs, total] = await Promise.all([
            BlogListModel.find().skip(skip).limit(limit),
            BlogListModel.countDocuments()
        ]);

        res.status(200).json({
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            blogs
        });
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