const prisma = require("../orm")
const validator = require("validator")
const s3 = require("../services/s3")
const crypto = require("crypto")
const sharp = require("sharp")

module.exports = {
    create: async (req, res) => {

        const body = req.body
        const file = req.file
        let imageUrl = null

        try {

            if (validator.isEmpty(body.name) || validator.isEmpty(body.description) || !validator.isNumeric(body.price)) {
                return res.json({
                    status: 400,
                    message: "Information incomplete"
                })
            }

        } catch (error) {
            console.log(error);

            return res.json({
                status: 409,
                message: "Error!"
            })
        }

        if (file) {
            const generatedName = crypto.randomBytes(10).toString('hex') + Date.now().toString()
            imageUrl = generatedName
            const fileBuffer = await sharp(file.buffer)
                .resize({
                    height: 720,
                    width: 1280,
                    fit: 'cover',
                    withoutEnlargement: true
                })
                .toFormat("jpeg", { quality: 80 })
                .toBuffer();
            try {
                await s3.uploadFile(fileBuffer, generatedName, file.mimetype)
            } catch (error) {
                console.log(error)
                return res.json({
                    status: 500,
                    message: "An error has acurred dasdads"
                });
            }
        } else {
            return res.json({
                status: 400,
                message: "Without image"
            });
        }

        await prisma.products.create({
            data: {
                name: body.name.toLowerCase(),
                description: body.description,
                price: parseFloat(body.price),
                eliminado: false,
                image: imageUrl
            }
        }).then(async data => {
            return res.json({
                status: 200,
                data: data
            })
        }).catch(error => {
            console.log(error)
            return res.json({
                status: 500,
                message: "Error!"
            })
        })
    },
    get: async (req, res) => {

        // let offset = 1;

        let id = req.query.id ?? "";
        let search = {
            eliminado: {
                not: true,
            },
        }

        if (validator.isNumeric(id)) {
            search['id'] = parseInt(id)
        }


        prisma.products.findMany({
            where: search,
            // skip: parseInt(offset) * parseInt(page),
            // take: parseInt(offset),
            orderBy: {
                id: "desc"
            }
        }).then(async data => {
            return res.json({
                data: data,
                status: 200
            })
        }).catch(error => {
            console.log(error)
            return res.json({
                message: "Error!",
                status: 500
            })
        })


    },
    update: async (req, res) => {


        const post = req.body;
        const user_id = req.user.id;
        const id = req.query.id;
        const file = req.file;

        try {

            const nameValid = validator.isEmpty(post.name ?? "")
            const descriptionValid = validator.isEmpty(post.description ?? "")
            const priceValid = validator.isEmpty(post.price ?? "")

            if (nameValid || descriptionValid || priceValid  ) {
                return res.json({
                    status: 409,
                    message: "didn't pass validation"
                })
            }

        } catch (error) {
            console.log(error);
            
            return res.json({
                status: 500,
            })

        }

        let dataUpdate = {
            name: post.name.trim().toLowerCase(),
            description: post.description,
            price: parseFloat(post.price),
            discount: parseInt(post.stock),
        }

        console.log(file);
        

        if (file) {
            await prisma.products.findFirst({
                where: {
                    id: parseInt(id)
                }
            }).then(async (data) => {
                const image = data.image
                await s3.deleteFile(image)


                const generatedName = crypto.randomBytes(10).toString('hex') + Date.now().toString()
                const fileBuffer = await sharp(file.buffer)
                    .resize({
                        height: 720,
                        width: 1280,
                        fit: 'cover',
                        withoutEnlargement: true
                    })
                    .toFormat("jpeg", { quality: 80 })
                    .toBuffer();

                await s3.uploadFile(fileBuffer, generatedName, file.mimetype)

                dataUpdate["image"] = generatedName

            }).catch(error => {
                console.log(error)
            })
        }

        await prisma.products.update({
            where: {
                id: parseInt(id)
            },
            data: dataUpdate
        }).then(async (data) => {
            return res.json({
                status: 200,
                data: data
            })
        }).catch(error => {
            console.log(error);
            
            return res.json({
                
                status: 500,
                message: "Error!"
            })
        })

    },
    delete: async (req, res) => {

        const id = req.query.id;

        await prisma.products.findFirst({
            where: {
                id: parseInt(id)
            },
        }).then(async data => {
            const image = data.image
            await s3.deleteFile(image)
        })

        await prisma.products.update({
            where: {
                id: parseInt(id),
            },
            data: {
                eliminado: true,
                image: null
            }
        }).then(async data => {

            return res.json({
                status: 200,
                data: data
            })
        }).catch(error => {
            console.log(error)
            return res.json({
                status: 500
            })
        })
    }
}