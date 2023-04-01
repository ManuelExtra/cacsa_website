const Events = require('../models/Events');

module.exports = {
    
    async events(req, res){

        const events = await Events.findAll({order: [['updatedAt', 'DESC']] });

        res.json(events);
        
    },

    async event(req, res){

        const event = await Events.findOne({where: {id: req.params.id}});

        if (event !== null) {
            res.json({
                error: 0,
                event: event.toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Event not found'
            });
        }
    },

    async new_event(req, res){
        try{

            // const {name} = req.body;
            // const event = await Events.findOne({where: {name}});

            // if (event !== null) {
            //     res.json({
            //         error: 1,
            //         msg: "Event exists!"
            //     });
            // }
            // else{
                const new_event = await Events.create(req.body);
                res.json({
                    error: 0,
                    msg: 'Event has been created!',
                    event: new_event.toJSON()
                });
            // }

            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async update_event(req, res){
        try{

            let {id} = req.params;
            const event = await Events.findOne({where: {id: id}});

            if (event === null) {
                res.json({
                    error: 1,
                    msg: "Event not found"
                });
            }

            const response = await Events.update(req.body, {where: {id: id}});
            if (response.length > 0) {
                const new_event_details = await Events.findOne({where: {id: id}});
                
                res.json({
                    error: 0,
                    msg: 'Event updated!',
                    event: new_event_details.toJSON()
                });
            
            }

            res.status(400).json({
                error: 1,
                msg: "Unable to update event!"
            });
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async delete_event(req, res){
        try{

            let {id} = req.params;
            const event = await Events.findOne({where: {id: id}});

            if (event === null) {
                res.json({
                    error: 1,
                    msg: "Event not found"
                });
            }

            const response = await Events.destroy({where: {id: id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'Event deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete event!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}