const express = require("express");

const router = express.Router();

const test=require("../Controllers/Test")


router.get("/led",test.testReq)

module.exports=router