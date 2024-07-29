const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    admin: prisma.admin,
    user: prisma.user,
};