const { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, } = require('graphql');
const { createUser, login, getUserById } = require('./user');
// const { createPost, editPostById, getPostByUserId, getAllPost, getPostUserWise, getPostById } = require('./post');
const jwt = require('jsonwebtoken');
// const { imageUpload } = require('./image');

const getUserIdFromToken = (token) => {
    // console.log("tsrt");

    try {

        //console.log("hii");
        //console.log(token);

        const decoded = jwt.verify(token, 'TIME');
        //console.log(decoded.id + "hii");
        if (!decoded.id) {
            throw new Error('Invalid token');
        }

        return decoded.id;
    } catch (error) {
        throw new Error('Invalid token 2');
    }
};


// let PostType;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        // posts: {
        //     type: new GraphQLList(PostType),
        //     resolve: async (parent) => {
        //         const userPosts = await getUserPosts(parent.id);
        //         return userPosts;
        //     },
        // },
        created_at: { type: GraphQLString },
    }),
});

// PostType = new GraphQLObjectType({
//     name: 'Post',
//     fields: () => ({
//         id: { type: GraphQLID },
//         title: { type: GraphQLString },
//         content: { type: GraphQLString },
//         user_id: { type: GraphQLID },
//         user: {
//             type: UserType,
//             resolve: async (parent) => {
//                 const postUser = await getUserById(parent.user_id);
//                 return postUser;
//             },
//         },
//         created_at: { type: GraphQLString },
//     }),
// });
// const UserPostType = new GraphQLObjectType({
//     name: 'UserPost',
//     fields: () => ({
//         user_id: { type: GraphQLID },
//         user_name: { type: GraphQLString },
//         user_email: { type: GraphQLString },
//         posts: { type: new GraphQLList(PostType) },
//     }),
// });





// const RootQuery = new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//         getPostByUserID: {
//             type: new GraphQLList(PostType),
//             args: { token: { type: GraphQLString } },

//             resolve: async (_, args) => {
//                 const userId = getUserIdFromToken(args.token);
//                 const post = await getPostByUserId(userId);
//                 return post;
//             },
//         },
//         getAllPost: {
//             type: new GraphQLList(PostType),
//             resolve: async () => {
//                 const post = await getAllPost();
//                 //console.log(post);
//                 return post;
//             },
//         },
//         getPostUserWise: {
//             type: new GraphQLList(UserPostType),
//             resolve: async () => {
//                 const userPosts = await getPostUserWise();
//                 console.log('User Posts:', userPosts);
//                 return userPosts;
//             },
//         },



//     },

// });
const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        // Define an empty field
        dummyField: {
            type: UserType, // You can set the type to any type you want, or even GraphQLString
            resolve: () => null, // Resolve function can return null since it's an empty field
        },
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                console.log("tesffv");
                const user = await createUser(args.name, args.email, args.password);
                return user;
            },
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                const user = await login(args.email, args.password);
                console.log(user.token);
                return user;
            },
        },
    //     createPost: {

    //         type: PostType,
    //         args: {
    //             title: { type: GraphQLString },
    //             content: { type: GraphQLString },
    //             token: { type: GraphQLString },
    //         },

    //         resolve: async (_, args) => {
    //             //console.log('Context:', context);
    //             //   const userId = getUserIdFromContext(context);
    //             const userId = getUserIdFromToken(args.token);
    //             // console.log("test"+ userId);
    //             const post = await createPost(args.title, args.content, userId);
    //             return post;
    //         },
    //     },
    //     editPost: {
    //         type: PostType,
    //         args: {
    //             id: { type: new GraphQLNonNull(GraphQLID) },
    //             title: { type: GraphQLString },
    //             content: { type: GraphQLString },
    //             token: { type: GraphQLString },
    //         },
    //         resolve: async (_, args) => {
    //             const userId = getUserIdFromToken(args.token);
    //             console.log("test 6 " + userId);
    //             const post = await getPostById(args.id);

    //             if (!post || post.user_id !== userId) {

    //                 throw new Error('Post not found or you do not have permission to edit.');
    //             }

    //             const editedPost = await editPostById(args.id, args.title, args.content, userId);
    //             return editedPost;
    //         },
    //     },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    types: [UserType],
    
});


module.exports = schema;
