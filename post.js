const Post = require('./models/Posts');
const User = require('./models/Users');

const createPost = async (title, content, userId) => {
  console.log("noe"+userId);
  return await Post.create({
    title,
    content,
   userId,
  });
};

const getPostByUserId = async (userId) => {
  return await Post.findAll({
    where: {
      UserId: userId
    }
  });
};

const getAllPost = async () => {
  return await Post.findAll();
};

const getPostUserWise = async () => {
  return await Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'name', 'email']
    }
  });
};

const editPostById = async (postId, title, content, userId) => {
  const post = await Post.findOne({
    where: {
      id: postId,
      userId: userId
    }
  });

  if (!post) {
    return null; // Post not found or user does not have permission
  }

  post.title = title;
  post.content = content;
  return await post.save();
};

const getPostById = async (id) => {
  return await Post.findByPk(id);
};

const deletePostById = async (postId, userId) => {
  const post = await Post.findOne({
    where: {
      id: postId,
      UserId: userId
    }
  });

  if (!post) {
    return null; // Post not found or user does not have permission
  }

  await post.destroy();
  return post;
};

module.exports = {
  createPost,
  getPostByUserId,
  editPostById,
  deletePostById,
  getAllPost,
  getPostUserWise,
  getPostById
};
