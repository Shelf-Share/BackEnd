const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require('../../libs/pagination');

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
    }   
};