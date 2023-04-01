const Users = require('../models').Users;
// const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

module.exports = {
    
    async users(req, res){

        const users = await Users.findAll({order: [['updatedAt', 'DESC']] });

        res.json(users);
        
    },

    async new_user(req, res){
        try{

            const {tel, password} = req.body;
            const user = await Users.findOne({where: {tel}});

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            if (user !== null) {
                res.json({
                    error: 1,
                    msg: "User exists!"
                });
            }
            else{
                req.body.password = hash;
                const new_user = await Users.create(req.body);
                res.json({
                    error: 0,
                    msg: 'User has been created!',
                    user: new_user.toJSON()
                });
            }

            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async delete_user(req, res){
        try{

            const user = await Users.findOne({where: {id: req.params.id}});

            if (user === null) {
                res.json({
                    error: 1,
                    msg: "User not found"
                });
            }

            const response = await Users.destroy({where: {id: req.params.id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'User deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete user!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}