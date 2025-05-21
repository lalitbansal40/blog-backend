import { Request, Response } from "express";
import BlogListModel from "../model/blogList.model";
import { BlogModel } from "../model/blog.model";

export const getBlogList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const search = (req.query.search as string)?.trim() || '';
    const categoryParam = req.query.category as string;

    // Build MongoDB filter
    const searchFilter: any = {};

    if (search) {
      const regex = new RegExp(search, 'i'); // case-insensitive
      searchFilter.$or = [
        { title: { $regex: regex } },
        { content: { $regex: regex } },
        { category: { $regex: regex } } // add category to search
      ];
    }

    if (categoryParam) {
      const categories = categoryParam
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => new RegExp(`^${c}$`, 'i')); // exact match, case-insensitive

      if (categories.length > 0) {
        searchFilter.category = { $in: categories };
      }
    }

    const [blogs, total] = await Promise.all([
      BlogListModel.find(searchFilter).skip(skip).limit(limit),
      BlogListModel.countDocuments(searchFilter)
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
