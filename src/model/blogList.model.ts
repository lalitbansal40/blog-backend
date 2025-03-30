import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IBlogList } from '../interface/blog.interface';

const BlogSchema = new Schema<IBlogList>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageurl: { type: String, required: true },
    category: { type: String, required: true },
    blogid: { type: Schema.Types.ObjectId, required: true, ref: 'Blog' }
});

const BlogListModel = mongoose.model<IBlogList>('Bloglist', BlogSchema);
export default BlogListModel;
