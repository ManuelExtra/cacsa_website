const jwt = require("jsonwebtoken");
const Users = require("../auth/models/Users");

module.exports = {

    verifyUser: (req, res, next) => {
        if(!req.cookies.user_token){
           
            res.redirect("/");
        }
        else{
            jwt.verify(req.cookies.user_token, process.env.SECRET_KEY, (err, authdata) => {
                if(err){
                    
                    res.redirect("/");

                }
                else{
                    
                    Users.findOne({where: {user_no: authdata.user_no}})
                        .then(user => {

                            // req.body.userData = user;
                            // req.session("user", user)
                            // console.log();
                            // console.log(req.session.user);
                            // req.session.user = user;
                            res.locals.user = user.dataValues;
                            next();
                            // next();
                        })
                        .then(err => {
                            res.send(err);
                        })
                }
            });
        }
    },

    unVerifiedUser: (req, res, next) => {
        if(req.cookies.user_token){
            
            res.redirect("/dashboard");
        }
        else{
            next();
        }
    },
    
}