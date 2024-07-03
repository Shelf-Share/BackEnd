const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    getAllCategories: async (req, res, next) => {
        try{
            let categories = await prisma.category.findMany();

            res.status(200).json({
                status: true,
                message: 'Show All Categories',
                err: null,
                data: {categories}
            })
        } catch(err){
            next(err);
        }
    }
}