const Users = require('../models').Users;
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'cacsafpi', 
    api_key: '544786156287114', 
    api_secret: '0ZfAbyh9gibNl1pQOLpb6wXJ2S8' 
})

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    jwt.sign(user, 'secret', {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res){
        try{

            let {email, password} = req.body;

            let salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(password, salt);

            const user = await Users.create(req.body);
            res.json({
                error: 0,
                msg: 'User registered!',
                user: user.toJSON()
            });
        }
        catch(err){
            res.status(400).send({
                error: 'Email in use'
            });
        }
    },

    async login(req, res){
        try{
        
            const {email, password} = req.body;
            
            const user = await Users.findOne({
                where: {
                    email
                }
            });

            if(!user){
                res.json({
                    error: 1,
                    msg: "Invalid credentials"
                });
            }

            let isPasswordValid = bcrypt.compareSync(password, user.password);
            if(!isPasswordValid){
                res.json({
                    error: 1,
                    msg: "Invalid credentials"
                });
            }

            if(user.role !== 'admin'){
                res.json({
                    error: 1,
                    msg: "Access denied!"
                });
            }

            if(user.email_verified !== 1){
                res.json({
                    error: 1,
                    msg: "Email has not been verified!"
                });
            }

            if(user.status !== 1){
                res.json({
                    error: 1,
                    msg: "Your account is not active!"
                });
            }

            res.json({
                error: 0,
                msg: 'User logged in!',
                user: user
            });
            
        }
        catch(err){
            res.status(500).send({
                error: 'Error occured'
            });
        }
    },
    
    async user(req, res){

        const user = await Users.findOne({where: {user_no: req.params.id}});

        if (user !== null) {
            res.json({
                error: 0,
                user: user.toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'User not found'
            });
        }
    },

    async removeImage(req, res){

        let {old_image} = req.body;

        let pic_dir = old_image.split('/')[old_image.split('/').length-2];
        let pic_file = old_image.split('/')[old_image.split('/').length-1];
        let pic_filename = pic_file.split('.')[0];

        let public_id = pic_dir+'/'+pic_filename;

        cloudinary.uploader.destroy(public_id, function(error, result){
            if (error) {
                res.json({error: 1, msg: "Upload error"});
            }
            else{
                res.json({
                    error: 0 
                });
            }
        });
    }

}
