const Executives = require('../models/Executives');
const Generations = require('../models/Generations');
const Users = require('../models/Users');
const Offices = require('../models/Offices');

module.exports = {
    
    async executives(req, res){

        const executives = await Executives.findAll(
            {include: [Generations, Users, Offices]},
            {order: [['updatedAt', 'DESC']] }
        );

        res.json(executives);
        
    },
    
    async generation_executives(req, res){
        
        let executives = await Executives.findAll(
            {include: [Generations, Users, Offices]},
            {order: [['updatedAt', 'DESC']] }
        );
        
        executives = executives.filter(executive => executive.generation_id === parseInt(req.params.gen_id));

        res.json(executives);
        
    },

    async executive(req, res){

        const executive = await Executives.findOne({where: {id: req.params.id}});

        if (executive !== null) {
            res.json({
                error: 0,
                executive: executive.toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Executive not found'
            });
        }
    },

    async new_executive(req, res){
        try{

            const {office_id, generation_id} = req.body;
            let executive = await Executives.findOne({where: {office_id, generation_id}});

            if (executive !== null) {
                res.json({
                    error: 1,
                    msg: "Executive exists!"
                });
            }
            else{
                const new_executive = await Executives.create(req.body);
                const executives = await Executives.findAll({include: [Generations, Users, Offices]});
                executive = await executives.filter(executive => executive.id === parseInt(new_executive.toJSON().id));
                if (executive.length > 0) {
                    res.json({
                        error: 0,
                        msg: 'Executive has been created!',
                        executive: executive[0].toJSON()
                    });
                }
                else{
                    res.json({
                        error: 1,
                        msg: "Executive not found!"
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

    async update_executive(req, res){
        try{

            let executive = await Executives.findOne({where: {id: req.params.id}});
            if (executive === null) {
                res.json({
                    error: 1,
                    msg: "Executive not found"
                });
            }
            else{
                const response = await Executives.update(req.body, {where: {id: req.params.id}});
                if (response.length > 0) {
                    const executives = await Executives.findAll({include: [Generations, Users, Offices]});
                    executive = await executives.filter(executive => executive.id === parseInt(req.params.id));
                    if (executive.length > 0) {
                        res.json({
                            error: 0,
                            msg: 'Executive Updated!',
                            executive: executive[0].toJSON()
                        });
                    }
                    else{
                        res.json({
                            error: 1,
                            msg: "Executive not found!"
                        });
                    }
                    
                }
            }
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async delete_executive(req, res){
        try{

            const executive = await Executives.findOne({where: {id: req.params.id}});

            if (executive === null) {
                res.json({
                    error: 1,
                    msg: "Executive not found"
                });
            }

            const response = await Executives.destroy({where: {id: req.params.id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'Executive deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete executive!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}