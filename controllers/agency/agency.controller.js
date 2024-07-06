const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {imagekit} = require('../../libs/imagekit');

module.exports = {
    addAgency: async(req, res, next) => {
        try {
            let {name, address, phoneNumber, email, contactPerson, description} = req.body;

            if(!name || !address || !email || !contactPerson || !description){
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Please fill all column',
                    data: null,
                });
            }

            if(!req.file) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Please Upload An Image',
                    data: null
                });
            }

            let strFile = req.file.buffer.toString('base64');

            let {url} = await imagekit.upload({
                file: strFile,
                fileName: Date.now() + path.extname(req.file.originalname),
            });

            let newAgency = await prisma.agency.create({
                
            })
        } catch(err) {
            next(err);
        }
    }
}