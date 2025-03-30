import { Schema, model } from "mongoose";
import { IBlog } from "../interface/blog.interface";

const BlogSchema = new Schema<IBlog>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageurl: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
});

export const BlogModel = model<IBlog>("Blog", BlogSchema);