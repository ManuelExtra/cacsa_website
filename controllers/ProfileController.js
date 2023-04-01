const Users = require('../models/Users');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

module.exports = {
    async account(req, res){
        try{

            let {user_id} = req.params;
            const user = await Users.findOne({where: {id: user_id}});

            if (user === null) {
                res.json({
                    error: 1,
                    msg: "User not found"
                });
            }
            else{
                const response = await Users.update(req.body, {where: {id: user_id}});
                if (response.length > 0) {
                    const new_user_details = await Users.findOne({where: {id: user_id}});
                    
                    res.json({
                        error: 0,
                        msg: 'Profile Updated!',
                        user: new_user_details.toJSON()
                    });
                
                }
            }
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },

    async password(req, res){
        try{

            let {user_id} = req.params;
            let {old_password, new_password, r_new_password} = req.body;
            const user = await Users.findOne({where: {id: user_id}});

            if (user === null) {
                res.json({
                    error: 1,
                    msg: "User not found"
                });
            }

            // Validate old password
            let isPasswordValid = bcrypt.compareSync(old_password, user.password);
            if(!isPasswordValid){
                res.json({
                    error: 1,
                    msg: "Invalid old password!"
                });
            }

            // Compare new and retyped new password
            if (new_password !== r_new_password) {
                res.json({
                    error: 1,
                    msg: "Password match failure!"
                });
            }

            let salt = bcrypt.genSaltSync(10);
            new_password = bcrypt.hashSync(new_password, salt);

            const response = await Users.update({password: new_password}, {where: {id: user_id}});
            if (response.length > 0) {
                const new_user_details = await Users.findOne({where: {id: user_id}});
                
                res.json({
                    error: 0,
                    msg: 'Profile Updated!',
                    user: new_user_details.toJSON()
                });
            
            }
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}