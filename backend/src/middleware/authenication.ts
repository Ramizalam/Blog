import z, { email, string } from "zod";
import { prisma } from "../../lib/prisma";

const AuthSchema = z.object({
    email: z.email(),
    password: string().min(8)
})

async function authCheck(req: any, res: any, next: any) {
    const payload = req.body;
    const parsePayload = AuthSchema.safeParse(payload);
    if (!parsePayload) {
        return res.status(400).json("Invalid Input")
    } else {
        const { email, password } = payload;
        try {
            const userExist = await prisma.user.findUnique({
                where: { email: email }
            })
            res.locals.userInfo = userExist;
            if (!userExist) {
                res.status(401).json({ msg: "Invalid Creadentials" })
            }
            else if (userExist.password != password) {
                res.status(411).json({ msg: "Invalid Credentials" })
            }
            next();
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal Server Error" })
        }

    }
}

export default authCheck;

