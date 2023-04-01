const Offices = require('../models/Offices');

module.exports = {
    
    async offices(req, res){

        const offices = await Offices.findAll({order: [['updatedAt', 'DESC']] });

        res.json(offices);
        
    },

    async office(req, res){

        const office = await Offices.findOne({where: {id: req.params.id}});

        if (office !== null) {
            res.json({
                error: 0,
                office: office.toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Office not found'
            });
        }
    },

    async new_office(req, res){
        try{

            const {post} = req.body;
            const offices = await Offices.findOne({where: {post}});

            if (offices !== null) {
                res.json({
                    error: 1,
                    msg: "Office exists!"
                });
            }
            else{
                const new_office = await Offices.create(req.body);
                res.json({
                    error: 0,
                    msg: 'Office has been created!',
                    user: new_office.toJSON()
                });
            }

            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },

    async update_office(req, res){
        try{
            const office = await Offices.findOne({where: {id: req.params.id}});
            if (office === null) {
                res.json({
                    error: 1,
                    msg: "Office not found"
                });
            }
            else{
                const response = await Offices.update(req.body, {where: {id: req.params.id}});
                if (response.length > 0) {
                    const new_office_details = await Offices.findOne({where: {id: req.params.id}});
                    
                    res.json({
                        error: 0,
                        msg: 'Office Updated!',
                        user: new_office_details.toJSON()
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
    
    async delete_office(req, res){
        try{

            const office = await Offices.findOne({where: {id: req.params.id}});

            if (office === null) {
                res.json({
                    error: 1,
                    msg: "Office not found"
                });
            }

            const response = await Offices.destroy({where: {id: req.params.id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'Office deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete office!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}