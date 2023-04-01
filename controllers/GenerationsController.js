const Generations = require('../models/Generations');
const Users = require('../models/Users');

module.exports = {
    
    async generations(req, res){

        let generations = await Generations.findAll({include: [Users]}, {order: [['updatedAt', 'DESC']] });
        generations = await generations.filter(generation => generation.deletedAt === null);
        res.json(generations);
        
    },

    async generation(req, res){

        const generations = await Generations.findAll({include: [Users]});
        const generation = await generations.filter(generation => generation.deletedAt !== null && generation.id === parseInt(req.params.id));
        
        if (generation.length > 0) {
            res.json({
                error: 0,
                generation: generation[0].toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Generation not found'
            });
        }
    },

    async new_generation(req, res){
        try{

            const {name} = req.body;
            const generation = await Generations.findOne({where: {name}});

            if (generation !== null) {
                res.json({
                    error: 1,
                    msg: "Generation exists!"
                });
            }
            else{
                
                const new_generation = await Generations.create(req.body);
                const generations = await Generations.findAll({include: [Users]});
                const generation = await generations.filter(generation => generation.id === parseInt(new_generation.toJSON().id));
                if (generation.length > 0) {
                    res.json({
                        error: 0,
                        msg: 'Generation has been created!',
                        generation: generation[0].toJSON()
                    });
                }
                else{
                    res.json({
                        error: 1,
                        msg: 'Generation not found'
                    })
                }
            }

            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },

    async update_generation(req, res){
        try{
            const generation = await Generations.findOne({where: {id: req.params.id}});
            if (generation === null) {
                res.json({
                    error: 1,
                    msg: "Generation not found"
                });
            }
            else{
                const response = await Generations.update(req.body, {where: {id: req.params.id}});
                
                if (response.length > 0) {
                    // const new_generation = await Generations.findOne({where: {id: req.params.id}});
                    const generations = await Generations.findAll({include: [Users]});
                    const generation = await generations.filter(g => g.id === parseInt(req.params.id));
                    if (generation.length > 0) {
                        res.json({
                            error: 0,
                            msg: 'Generation Updated!',
                            generation: generation[0].toJSON()
                        });
                    }
                    else{
                        res.json({
                            error: 1,
                            msg: "Generation exists!"
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
    
    async delete_generation(req, res){
        try{

            const generation = await Generations.findOne({where: {id: req.params.id}});

            if (generation === null) {
                res.json({
                    error: 1,
                    msg: "Generation not found"
                });
            }

            const response = await Generations.update({deletedAt: new Date().getTime()}, {where: {id: req.params.id}});

            if (response.length > 0) {
                res.json({
                    error: 0,
                    msg: 'Generation deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete generation!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}