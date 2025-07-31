  
  import JWT from 'jsonwebtoken'
  
  export  function checkLogin(req,res,next) {
    try {


       

        const token = req.headers["authorization"].split(' ')[1]
        
       
        JWT.verify(token, process.env.JWT_ACCESS,(err,decoded)=>{
            if (err) {
               return res.status(400).send({
                success:false,
                message:'Unauthorized user!'
            }) 
        }
        else{
          
                           req.userId = decoded.id

               
                next()
            }


        })

       

    } catch (error) {
      
        res.status(400).send({
            success:false,
            message: 'Authorization failed'
        })
    }
}