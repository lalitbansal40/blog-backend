import { ObjectId } from 'mongodb';

export interface IBlogList {
    _id: ObjectId;
    title: string;
    description: string;
    imageurl: string;
    category: string;
    blogid: string;
}

export interface IBlog {
    _id: ObjectId;
    title: string;
    description: string;
    imageurl: string;
    category: string;
    content: string;
}