import { DocumentDefinition, LeanDocument, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import config from 'config';
import { get } from 'lodash';
import Post, {PostDocument} from '../model/post.model';

export const createPost = async (input: DocumentDefinition<PostDocument>) => {
    return Post.create(input);
}

export const getPost = async (query: FilterQuery<PostDocument>, options: QueryOptions = {lean: true}) => {
    return Post.findOne(query, {}, options).lean();
}

export const findAndUpdatePost = async (query: FilterQuery<PostDocument>, update: UpdateQuery<PostDocument>) => {
    return Post.findOneAndUpdate(query, update, { new: true })
}

export const deletePost = async (query: FilterQuery<PostDocument>) => {
    return Post.deleteOne(query);
}

