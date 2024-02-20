const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;
//const adminverify=require("../controllers/auth")
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const ObjectId=mongodb.ObjectId
const URL = process.env.DB3;
const DBNAME=process.env.DBNAME

exports.authenticate = function (req, res, next) {
    //console.log(req.headers.authorization)
    
   if(req.headers.authorization) {
     try {
      let verify = jwt.verify(req.headers.authorization, SECRET);
      //console.log(verify)
      if(verify) {
        req.userid = verify._id;
        next();
      
      } else {
        res.status(401).json({ message: "Unauthorized1" });
      

      }
     } catch (error) {
      res.json({ message: "🔒Please Login to Continue" });
      //createError(401,"🔒Please Login to Continue")
     }
    } else {
      res.status(401).json({ message: "Unauthorized3" });
    // createError(401,"unauthrized2")
    }
  };