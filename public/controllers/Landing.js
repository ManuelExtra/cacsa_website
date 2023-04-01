const jwt = require("jsonwebtoken");

module.exports = {
    index: (req, res) => {
        res.render("index")
        // console.log(req.cookies.user_token);
    },
    forgotPassword: (req, res) => {
        res.render("forgot");
    },
    resetPassword: (req, res) => {
        const {token} = req.params;
        jwt.verify(token, process.env.SECRET_KEY, (err, authdata) => {
            if(err) {
                res.send(err);
            }
            else{
                let current_date = new Date().getTime();
                let password_expiration = new Date(authdata.user.pass_token_expiry).getTime();

                if (current_date >= password_expiration) {
                    res.send("New password link has expired!");
                }
                else{
                    res.render("reset", {
                        token
                    });
                }

            }
        });
    },

    pageNotFound: (req, res) => {
        res.render("404");
    },
}