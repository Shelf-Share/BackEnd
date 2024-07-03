const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require('../../libs/pagination');
const {imagekit} = require('../../libs/imagekit');
const path = require('path');
const { image } = require('../../libs/multer');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');


module.exports = {
    getAllNews: async(req, res, next) => {
        try{
            let {limit = 10, page = 1} = req.query;
            limit = Number(limit);
            page = Number(page);
            
            let news = await prisma.news.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });
            const {_count} = await prisma.news.aggregate({
                _count: {id: true}
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'Show All News',
                err: null,
                data: {pagination, news}
            })
        } catch(err) {
            next(err);
        }
    },
    
    getNewsDetails: async(req, res, next) => {
        let {id} = req.params;
        try{
            let news = await prisma.news.findUnique({where: {id: Number(id)}});
            if(!news) {
                res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: `News with id ${id} doesn\'t exist!`,
                    data: null
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: {news}
            })
        } catch(err){
            next(err);
        }
    },

    addNews: async(req, res, next) => {
        try{
            let {title, content, authorId, imageUrl}= req.body;
            
            if(!title || !content || !authorId){
                res.status(400).json({
                    status:false,
                    message: 'Bad Request',
                    err: 'Please fill all column',
                    data: null
                });
            }

            if(!req.file) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Please upload an image',
                    data: null
                });
            }

            let strFile = req.file.buffer.toString('base64');

            let {url} = await imagekit.upload({
                file: strFile,
                fileName: Date.now() + path.extname(req.file.originalname),
            });

            let newNews = await prisma.news.create({
                data: {
                    title,
                    content,
                    authorId: parseInt(authorId),
                    imageUrl: url
                }
            });

            return res.status(201).json({
                status: true,
                message: 'Created',
                err: null,
                data: {newNews}
            });
        } catch(err){
            next(err);
        }
    },

    updateNews: async(req, res, next) => {
        try{

            let {id} = req.params;
            let {title, content, authorId} = req.body;
    
            const newsExist = await prisma.news.findUnique({where: {id: Number(id)}});
            if(!newsExist){
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: `News with id ${id} doesn\'t exist`,
                    data: null
                });
            }

            let updateData = {};

            if(title)updateData.title = title;
            if(content)updateData.content = content;
            if(authorId)updateData.authorId = parseInt(authorId);

            if(req.file) {
            let strFile = req.file.buffer.toString('base64');
            let {url} = await imagekit.upload({
                file: strFile,
                fileName: Date.now() + path.extname(req.file.originalname),
            });

            updateData.imageUrl = url;
        }
    
    
            let updateNews = await prisma.news.update({
                where: {id: Number(id)},
                data: updateData
            });
    
            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: {updateNews}
            });

        } catch(err) {
            next(err);
        };
    },

    deleteNews: async(req, res, next) => {
        try {
            let {id} = req.params;

            let newsExist = await prisma.news.findUnique({where: {id: Number(id)}});
            if(!newsExist) {
                return res.status(404).json({
                    status: 'false',
                    message: 'Not Found',
                    err: `News with id ${id} doesn\'t exist`,
                    data: null
                });
            }

            let deleteNews = await prisma.news.delete({where: {id: Number(id)}});

            return res.status(200).json({
                status: 'true',
                message: 'OK',
                err: `News with id ${id} has been delete`,
                data: {deleteNews}
            });

        }catch(err) {
            next(err);
        }
    }
};