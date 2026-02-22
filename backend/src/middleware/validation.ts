import z from "zod";


const schema = z.object({
    email: z.email(),
    name : z.string(),
    password : z.string().min(8)
})

function validCheck(req:any,res:any,next:any){
    const payload = req.body;
    const {success}= schema.safeParse(payload);
    if(!success){
   return res.status(411).json({msg:"Invalid Input"})
    }
    res.locals.userInfo = payload;
    next();
}

export default  validCheck;