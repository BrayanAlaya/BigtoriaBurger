const prisma = require("../orm")
const validator = require("validator")
const moment = require("moment")

module.exports = {
    create: async (req, res) => {

        let userId = req.user.id
        let method = req.body.method ?? "";
        let address = req.body.address ?? "";

        await prisma.cart.findMany({
            where: {
                user_id: userId
            },
            include: {
                products: true
            }
        }).then(async (data) => {

            if (data.length > 0) {

                await prisma.orders.create({
                    data: {
                        user_id: parseInt(userId),
                        date: moment().toISOString(true),
                        method: method,
                        address: address
                    }
                }).then(async (purchaseData) => {

                    let purchaseDetailsData = []

                    data.forEach(cart => {
                        purchaseDetailsData.push({
                            order_id: parseInt(purchaseData.id),
                            product_id: parseInt(cart.product_id),
                            amount: parseInt(cart.amount)
                        })
                    })

                    await prisma.order_details.createMany({
                        data: purchaseDetailsData
                    }).then(async (data) => {

                        await prisma.cart.deleteMany({
                            where: {
                                user_id: parseInt(userId)
                            }
                        }).then(async (data) => {

                            return res.json({
                                data: data,
                                status: 200
                            })
                        }).catch(error => {
                            console.log(error)
                            return res.json({
                                error: error,
                                status: 500
                            })
                        })


                    }).catch(error => {
                        console.log(error)
                        return res.json({
                            status: 500,
                            message: error
                        })
                    })

                }).catch(error => {
                    console.log(error)
                    return res.json({
                        status: 500,
                        message: error
                    })
                })

            } else {
                return res.json({
                    status: 409,
                    message: "Cart empty"
                })
            }
        }).catch(error => {
            console.log(error)
            return res.json({
                status: 500,
                message: error
            })
        })

    },
    get: async (req, res) => {

        const user_id = req.user.id

        await prisma.order_details.findMany({
            where: {
                orders: {
                    user_id: user_id
                }
            },
            include: {
                orders: {
                    include: {
                        users: true
                    }
                },
                products: true,
            },
            orderBy: {
                id: "desc"
            }
        }).then(data => {
            console.log(data);

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

    },
    getSales: async (req, res) => {

        await prisma.order_details.findMany({
            include: {
                orders: {
                    include: {
                        users: true
                    }
                },
                products: true,
                
            },
            orderBy: {
                id: "desc"
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

    },
    getDash: async (req, res) => {

        const hoy = new Date();
        const inicioDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()); // 2024-11-24 00:00:00
        const finDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1); // 2024-11-25 00:00:00        


        await prisma.order_details.findMany({
            where: {
                orders: {
                    date: {
                        gte: inicioDelDia,
                        lt: finDelDia
                    }
                }
            },
            include: {
                orders: true,
                products: true
            },
            orderBy: {
                orders: {
                    date: "desc"
                }
            }
        }).then(data => {

            return res.json({
                status: 200,
                data: data,
            })

        }).catch(error => {
            console.log(error)

            return res.json({
                status: 500,
                message: error,
            })
        })

    }

}