const PostModel = require('../models/post');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });

  
const getAllPosts = async (request, response) => {
    const token = request.headers?.authorization?.split(" ")[1];
    let decodeToken;

    
    if (token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {

            const ifUserExists = await UserModel.findOne({ email: decodeToken.email});
    
            if (ifUserExists) {
                const data = await PostModel.find();
                return response.status(200).json({
                    message: "Succesfully Fetched the Posts",
                    data
                })
            } else {
                return response.status(401).json({
                    message: "You are not authorized",
                    error
                })
            }
    
    
        } catch (error) {
            return response.status(500).json({
                message: "There was an error",
                error
            })
        }
    } else {
        return response.status(401).json({
            message: "You need to provide access token"
        })
    }




   
}


const createPost = async (request, response) => {
    try {
        const body = request.body;
        console.log(body, "body data");
        const res = await  cloudinary.uploader.upload(body.image, {public_id: Math.random()});

        console.log(res, "cloudinary respoinse");

        const newPost = new PostModel(body);
        const data = await newPost.save();
        return response.status(201).json({
            message: "Post sucesfully created",
            data
        })
    } catch (error) {
        return response.status(500).json({
            message: "There was an error",
            error
        })
    }
}


const deletePost = () => {

}


module.exports = {
    getAllPosts,
    createPost,
    deletePost
}