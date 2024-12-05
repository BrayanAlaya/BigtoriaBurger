const jwt = require("../services/jwt")

module.exports = (req, res, next) => {
    let token = req.headers.authorization;

    let user = jwt.data(token)

    if (user.id) {

        req.user = user
        next()

    } else{
        return res.send({
            status: 401,
            message: "Didn't pass authentication"
        })
    }
}