const app = require("./app")
const prisma = require("./orm")
require('dotenv').config()

async function main() {
    return await prisma.$connect()
}

main()
    .then(async () => {
        app.listen(3000)
        await prisma.$disconnect()
    }).catch((error)=> {
        console.log(error)
    })

