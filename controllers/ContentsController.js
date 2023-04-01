const Contents = require('../models/Contents');
const Contents_details = require('../models').Contents_details;

module.exports = {
    
    async contents(req, res){

        const contents = await Contents.findAll({order: [['updatedAt', 'DESC']] });

        res.json(contents);
        
    },

    async contents_details(req, res){

        const {content_id} = req.params;
        const contents_details = await Contents_details.findAll({where: {content_id}, order: [['updatedAt', 'DESC']] });

        res.json(contents_details);
        
    },

    async content(req, res){

        const content = await Contents.findOne({where: {id: req.params.id}});

        if (content !== null) {
            res.json({
                error: 0,
                content: content.toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Content not found'
            });
        }
    },

    async content_detail(req, res){

        const content_detail = await Contents_details.findOne({where: {id: req.params.id}});

        if (content_detail !== null) {
            res.json({
                error: 0,
                content_detail: content_detail.toJSON()
            })
        }
        else{
            res.json({
                error: 1,
                msg: 'Content detail not found'
            });
        }
    },

    async new_content(req, res){
        try{

            const {title} = req.body;
            const content = await Contents.findOne({where: {title}});

            if (content !== null) {
                res.json({
                    error: 1,
                    msg: "Content exists!"
                });
            }
            else{
                const new_content = await Contents.create(req.body);
                res.json({
                    error: 0,
                    msg: 'Content has been created!',
                    content: new_content.toJSON()
                });
            }

            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },

    async new_content_detail(req, res){
        try{

            // const {caption_title} = req.body;
            // const content_detail = await Contents_details.findOne({where: {caption_title}});

            // if (content_detail !== null) {
            //     res.json({
            //         error: 1,
            //         msg: "Content detail exists!"
            //     });
            // }
            // else{
                const new_content_detail = await Contents_details.create(req.body);
                res.json({
                    error: 0,
                    msg: 'Content detail has been created!',
                    content_detail: new_content_detail.toJSON()
                });
            // }

            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async update_content(req, res){
        try{

            let {id} = req.params;
            const content = await Contents.findOne({where: {id: id}});

            if (content === null) {
                res.json({
                    error: 1,
                    msg: "Content not found"
                });
            }

            const response = await Contents.update(req.body, {where: {id: id}});
            if (response.length > 0) {
                const new_content_details = await Contents.findOne({where: {id: id}});
                
                res.json({
                    error: 0,
                    msg: 'Content updated!',
                    content: new_content_details.toJSON()
                });
            
            }

            res.status(400).json({
                error: 1,
                msg: "Unable to update content!"
            });
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async update_content_detail(req, res){
        try{

            let {id} = req.params;
            const content_detail = await Contents_details.findOne({where: {id}});

            if (content_detail === null) {
                res.json({
                    error: 1,
                    msg: "Content detail not found"
                });
            }

            const response = await Contents_details.update(req.body, {where: {id}});
            if (response.length > 0) {
                const new_content_details = await Contents_details.findOne({where: {id}});
                
                res.json({
                    error: 0,
                    msg: 'Content detail updated!',
                    content_detail: new_content_details.toJSON()
                });
            
            }

            res.status(400).json({
                error: 1,
                msg: "Unable to update content detail!"
            });
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async delete_content(req, res){
        try{

            let {id} = req.params;
            const content = await Contents.findOne({where: {id: id}});

            if (content === null) {
                res.json({
                    error: 1,
                    msg: "Content not found"
                });
            }

            const response = await Contents.destroy({where: {id: id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'Content deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete content!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    },
    
    async delete_content_detail(req, res){
        try{

            let {id} = req.params;
            const content_detail = await Contents_details.findOne({where: {id}});

            if (content_detail === null) {
                res.json({
                    error: 1,
                    msg: "Content detail not found"
                });
            }

            const response = await Contents_details.destroy({where: {id}});

            if (response === 1) {
                res.json({
                    error: 0,
                    msg: 'Content detail deleted!',
                });
            }
            
            res.status(400).json({
                error: 1,
                msg: "Unable to delete content detail!"
            }); 
            
        }
        catch(err){
            res.status(400).send({
                error: 'Error occured!'
            });
        }
    }

}