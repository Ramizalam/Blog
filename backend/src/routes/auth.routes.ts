import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import validCheck from "../middleware/validation";
import authCheck from "../middleware/authenication";

const router = Router();
const secretKey: string = process.env.JWT_KEY || "mysecret";

// POST /api/v1/auth/signup
router.post("/signup", validCheck, async (req, res) => {
    const { email, name, password } = res.locals.userInfo;
    try {
        const response = await prisma.user.create({
            data: {
                email,
                name,
                password,
            },
        });
        const jwtToken = jwt.sign(response.id, secretKey);
        res.status(200).json({ msg: "User successfully created", token: jwtToken });
    } catch (error) {
        console.log(error);
        res.status(411).json({ msg: "Trouble creating the user" });
    }
});

// POST /api/v1/auth/signin
router.post("/signin", authCheck, (req, res) => {
    const { id, name } = res.locals.userInfo;
    const jwtToken = jwt.sign(id, secretKey);
    console.log(jwtToken);
    res.status(200).json({ msg: `Welcome back ${name}`, token: jwtToken });
});

export default router;
