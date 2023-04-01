const Users = require('../models/Users');
const Generations = require('../models/Generations');
const Units = require('../models/Units');
const Units_details = require('../models/Units_details');

module.exports = {
    
    async units(req, res){

        const units = await Units.findAll({order: [['updatedAt', 'DESC']] });

        res.json(units);
        
    },
    
    async units_details(req, res){

        const {unit_id, gen_id} = req.params;
        let units_details = await Units_details.findAll({include: [
            {model: Generations},
            {model: Units},
            {model: Users, as: 'exco'},
            {model: Users, as: 'sub_exco'},
            {model: Users, as: 'member'}
        ]});

        units_details = units_details.filter(unit_detail => unit_detail.unit_id === parseInt(unit_id) && unit_detail.gen_id === parseInt(gen_id) );

        res.json(units_details);
        
    },

    async units_details_by_unit_id(req, res){
        const {unit_id} = req.params;
        let units_details = await Units_details.findAll({include: [
            {model: Generations},
            {model: Units},
            {model: Users, as: 'exco'},
            {model: Users, as: 'sub_exco'},
            {model: Users, as: 'member'}
        ]});

        units_details = units_details.filter(unit_detail => unit_detail.unit_id === parseInt(unit_id));

        res.json(units_details);
    },

    async units_details_by_gen_id(req, res){
        const {gen_id} = req.params;
        let units_details = await Units_details.findAll({include: [
            {model: Generations},
            {model: Units},
            {model: Users, as: 'exco'},
            {model: Users, as: 'sub_exco'},
            {model: Users, as: 'member'}
        ]});

        units_details = units_details.filter(unit_detail => unit_detail.gen_id === parseInt(gen_id));

        res.json(units_details);
    },

    async unit(req, res){

        const unit = await Units.findOne({where: {id: req.params.id}});

        if (unit !== null) {
            res.json({
                error: 0,
                unit: unit.toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Unit not found'
            });
        }
    },

    async unit_detail(req, res){

        let units_details = await Units_details.findAll({include: [
            {model: Generations},
            {model: Units},
            {model: Users, as: 'exco'},
            {model: Users, as: 'sub_exco'},
            {model: Users, as: 'member'}
        ]});

        const unit_detail = units_details.filter(unit_detail => unit_detail.id === parseInt(req.params.id));
    
        if (unit_detail.length) {
            res.json({
                error: 0,
                unit_detail: unit_detail[0].toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Unit detail not found'
            });
        }

    },

    async new_unit(req, res){
        try{

            const {name} = req.body;
            const unit = await Units.findOne({where: {name}});

            if (unit !== null) {
                res.json({
                    error: 1,
                    msg: "Unit exists!"
                });
            }
            else{
                const new_unit = await Units.create(req.body);
                res.json({
                    error: 0,
                    msg: 'Unit has been created!',
                    unit: new_unit.toJSON()
                });
            }

            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },

    async new_unit_detail(req, res){
        try{

            let unit_detail = await Units_details.findOne({where: req.body});

            if (unit_detail !== null) {
                res.json({
                    error: 1,
                    msg: "Unit detail exists!"
                });
            }
            else{
                const new_unit_detail = await Units_details.create(req.body);

                let unit_details = await Units_details.findAll({include: [
                    {model: Generations},
                    {model: Units},
                    {model: Users, as: 'exco'},
                    {model: Users, as: 'sub_exco'},
                    {model: Users, as: 'member'}
                ]});

                let u_details = unit_details.filter(unit_detail => unit_detail.id === parseInt(new_unit_detail.toJSON().id));
                if (u_details.length > 0) {
                    res.json({
                        error: 0,
                        msg: 'Unit detail has been created!',
                        unit_detail: u_details[0].toJSON()
                    });
                } else {
                    res.json({
                        error: 1,
                        msg: 'Unit detail not found'
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

    async update_unit(req, res){
        try{
            const unit = await Units.findOne({where: {id: req.params.id}});
            if (unit === null) {
                res.json({
                    error: 1,
                    msg: "Unit not found"
                });
            }
            else{
                const response = await Units.update(req.body, {where: {id: req.params.id}});
                if (response.length > 0) {
                    const new_unit = await Units.findOne({where: {id: req.params.id}});
                    
                    res.json({
                        error: 0,
                        msg: 'Unit Updated!',
                        unit: new_unit.toJSON()
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

    async update_unit_detail(req, res){
        try{
            const unit_detail = await Units_details.findOne({where: {id: req.params.id}});
            if (unit_detail === null) {
                res.json({
                    error: 1,
                    msg: "Unit detail not found"
                });
            }
            else{
                const response = await Units_details.update(req.body, {where: {id: req.params.id}});
                if (response.length > 0) {
                    
                    let unit_details = await Units_details.findAll({include: [
                        {model: Generations},
                        {model: Units},
                        {model: Users, as: 'exco'},
                        {model: Users, as: 'sub_exco'},
                        {model: Users, as: 'member'}
                    ]});

                    let u_details = unit_details.filter(unit_detail => unit_detail.id === parseInt(req.params.id));
                    if (u_details.length > 0) {
                        res.json({
                            error: 0,
                            msg: 'Unit detail Updated!',
                            unit_detail: u_details[0].toJSON()
                        });
                    }
                    else{
                        res.json({
                            error: 1,
                            msg: "Unit details not found!"
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
    
    async delete_unit(req, res){
        try{

            const unit = await Units.findOne({where: {id: req.params.id}});

            if (unit === null) {
                res.json({
                    error: 1,
                    msg: "Unit not found"
                });
            }

            const response = await Units.destroy({where: {id: req.params.id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'Unit deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete unit!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async delete_unit_detail(req, res){
        try{

            const unit_detail = await Units_details.findOne({where: {id: req.params.id}});

            if (unit_detail === null) {
                res.json({
                    error: 1,
                    msg: "Unit detail not found"
                });
            }

            const response = await Units_details.destroy({where: {id: req.params.id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'Unit detail deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete unit detail!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}