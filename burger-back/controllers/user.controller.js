const prisma = require("../orm")
const validator = require("validator")
const jwt = require("../services/jwt")

module.exports = {
    register: async (req, res) => {

        const body = req.body

        try {

            if (validator.isEmpty(body.name) || !validator.isEmail(body.email) || !validator.isLength(body.password, { min: 6 })) {
                return res.json({
                    status: 400,
                    message: "Information incomplete"
                })
            }

        } catch (error) {
            return res.json({
                status: 409,
                message: "Error!"
            })
        }



        await prisma.users.findFirst({
            where: {
                email: body.email
            }
        }).then(async data => {
            if (data) {
                return res.json({
                    status: 409,
                    message: "Email repetido"
                })
            } else {
                await prisma.users.create({
                    data: {
                        name: body.name.toLowerCase(),
                        email: body.email.toLowerCase(),
                        password: body.password,
                        role: "user"
                    }
                }).then(data => {
                    return res.json({
                        status: 200,
                        data: data
                    })
                }).catch(error => {
                    return res.json({
                        status: 500,
                        message: "Error!"
                    })
                })
            }
        }).catch(error => {
            return res.json({
                status: 500,
                message: "Error!"
            })
        })



    },
    login: async (req, res) => {

        const body = req.body

        try {

            if (!validator.isEmail(body.email) || !validator.isLength(body.password, { min: 6 })) {
                return res.json({
                    status: 400,
                    message: "Information incomplete"
                })
            }

        } catch (error) {
            return res.json({
                status: 500,
                message: "Error!"
            })
        }

        await prisma.users.findFirst({
            where: {
                email: body.email.toLowerCase(),
                password: body.password
            }
        }).then(async data => {
            if (data) {
                return res.json({
                    status: 200,
                    data: data,
                    token: await jwt.token(data)
                })
            } else {
                return res.json({
                    status: 409,
                    message: "User not found or pass incorrect"
                })
            }
        }).catch(error => {
            return res.json({
                status: 500,
                message: "Error!"
            })
        })

    },
    update: async (req, res) => {

        const body = req.body
        const id = req.user.id ?? ""

        try {

            if (validator.isEmpty(body.name)) {
                return res.json({
                    status: 400,
                    message: "Information incomplete"
                })
            }

        } catch (error) {
            return res.json({
                status: 500,
                message: "Error!"
            })
        }

        await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: body.name
            }
        }).then(async data => {

            return res.json({
                status: 200,
                data: data,
                token: await jwt.token(data)
            })

        }).catch(error => {
            return res.json({
                status: 500,
                message: "Error!"
            })
        })

    },
    delete: async (req, res) => {

        const user = req.user.id

        await prisma.orders.updateMany({
            where: {
                user_id: parseInt(user)
            },
            data:{
                user_id: null
            }
        }).then(data => {
                
        }).catch(error => {
            
        })

        await prisma.users.delete({
            where: {
                id: parseInt(user)
            }
        }).then(async data => {
            
            return res.json({
                status: 200
            })

        }).catch(error => {
            console.log(error);

            return res.json({
                status: 500
            })
        })

    }
}