const { PrismaClient } = require("@prisma/client")

const orm = new PrismaClient()

module.exports = orm
