



exports.testReq= async function (req, res) {  
    // console.log(req.body)
    try {

      
       res.status(200).json({status:"success"})
      

    } catch (error) {
        console.log(error)
        //next(error)
      res.status(500).json({
        status: "failure",
        
      });
    }
  
    
  };