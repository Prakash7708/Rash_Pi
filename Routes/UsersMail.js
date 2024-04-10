const express = require("express");

const router = express.Router();

const test=require("../Controllers/Test")
const livecam=require("../Controllers/Camera")

router.get("/led",test.testReq)

router.get("/livecam",livecam.liveCam)

module.exports=router