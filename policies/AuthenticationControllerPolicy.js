const Joi = require('joi');

module.exports = {
    register (req, res, next){
    
        const {email, password} = req.body;

        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            
        });

        const {error, value} = schema.validate(req.body);

        console.log(error, value);
        if (typeof error !== 'undefined') {
            res.json({
                error: 1,
                msg: error.details[0].message
            });
        }
        else{
            next();
        }
        
    }
}