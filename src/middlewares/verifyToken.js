const jwt = require("jsonwebtoken")

// Verify Token
exports.verifyToken = (req, res, next) =>{
    try{
        const bearerHeader = req.headers.authorization;
        const bearerToken = bearerHeader && bearerHeader.split(' ')[1];
        if (bearerHeader == null) return res.sendStatus(401);

        jwt.verify(bearerToken, process.env.SECRET, (err,user) =>{
        // console.log(err)
            if (err) {
             return   err["name"] == "TokenExpiredError"?res.status(400).send("JWT token has expired") : res.sendStatus(403);
                }
            req.user = user;
            next();
        })
    }
    catch(err){
        res.status(500).send("Problem verifying user token");
    }
  }

