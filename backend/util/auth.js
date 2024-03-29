const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');

//Token auth middleware
function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(403).send(err);

        req.tokenPayload = payload;
        next();
    });
}

function generateToken(payload, tokenSecret, expiresIn) {
    return expiresIn === undefined ? jwt.sign(payload, tokenSecret) : jwt.sign(payload, tokenSecret, {expiresIn: expiresIn});
}

async function insertRefreshToken(token) {
    let result;
    //console.log("trying to insert rfshTkn: " + token.refreshToken);

    try {
        result = await authModel.create(token);
    } catch(err) {
        console.log("Couldn't insert new token: " + token.refreshToken);
        return false;
    }

    return true;
}

async function removeRefreshToken(token) {
    let result;

    try {
        result = await authModel.deleteOne({refreshToken: token.refreshToken});
        if (result.deletedCount === 0) {
            return { success: "false", message: "There was no token to delete" };
        }
    } catch(err) {
        console.log("Couldn't delete " + err + " token: " + token.refreshToken);
        return { success: "false", message: err};
    }

    return { success: "true" };

}

async function findRefreshToken(token) {
    let result;

    try {
        result = await authModel.findOne({refreshToken: token.refreshToken});
        return !!result;
    } catch(err) {
        console.log("Error occurred " + err + " while trying to find token: " + token.refreshToken);
        return false;
    }
}

module.exports = {
    generateToken: generateToken, authToken, 
    insertRefreshToken, removeRefreshToken, findRefreshToken
}
