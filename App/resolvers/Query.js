/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */

const AuthorModel = require ('../models/Author');
const PostModel = require('../models/Post');

const listAuthors =  async(root, params,contex, info) => {
    const authors = await AuthorModel.find({});
    return authors;
};

const singleAuthor = async(root, params,contex, info) => {

    const author = await AuthorModel.findById(params.id);
    if(!author) throw new ("Author no existe");

    return author.toObject();
};

const listPosts = async(root, params,contex, info) =>{
    const posts =  await PostModel.find({}).populate('author');
	return posts;
};

const singlePost = async(root, params,contex, info) =>{
    const post = await PostModel.findById(params.id).populate('author');
    if(!post) throw new Error("Post no existe");
    return post.toObject();
};

module.exports = {
    listAuthors,
    singleAuthor,
    listPosts,
    singlePost
};