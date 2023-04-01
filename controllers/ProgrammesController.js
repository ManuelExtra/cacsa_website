const Programmes = require('../models/Programmes');

module.exports = {
    
    async programmes(req, res){

        const programmes = await Programmes.findAll({order: [['updatedAt', 'DESC']] });

        res.json(programmes);
        
    },

    async programme(req, res){

        const programme = await Programmes.findOne({where: {id: req.params.id}});

        if (programme !== null) {
            res.json({
                error: 0,
                programme: programme.toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Programme not found'
            });
        }
    },

    async new_programme(req, res){
        try{

            const {name} = req.body;
            const programme = await Programmes.findOne({where: {name}});

            if (programme !== null) {
                res.json({
                    error: 1,
                    msg: "Programme exists!"
                });
            }
            else{
                const new_programme = await Programmes.create(req.body);
                res.json({
                    error: 0,
                    msg: 'Programme has been created!',
                    programme: new_programme.toJSON()
                });
            }

            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async update_programme(req, res){
        try{

            let {programme_id} = req.params;
            const programme = await Programmes.findOne({where: {id: programme_id}});

            if (programme === null) {
                res.json({
                    error: 1,
                    msg: "Programme not found"
                });
            }

            const response = await Programmes.update(req.body, {where: {id: programme_id}});
            if (response.length > 0) {
                const new_programme_details = await Programmes.findOne({where: {id: programme_id}});
                
                res.json({
                    error: 0,
                    msg: 'Programme updated!',
                    programme: new_programme_details.toJSON()
                });
            
            }

            res.status(400).json({
                error: 1,
                msg: "Unable to update programme!"
            });
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async delete_programme(req, res){
        try{

            let {programme_id} = req.params;
            const programme = await Programmes.findOne({where: {id: programme_id}});

            if (programme === null) {
                res.json({
                    error: 1,
                    msg: "Programme not found"
                });
            }

            const response = await Programmes.destroy({where: {id: programme_id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'Programme deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete programme!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}