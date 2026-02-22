import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey: string = process.env.JWT_KEY || "mysecret";

const jwtAuthCheck = (req: Request, res: Response, next: NextFunction) => {
    const author = req.headers.authorization || " ";
    const token: string = author.split(" ")[1] || " ";

    if (!token || token.trim() === "") {
        return res.status(401).json({ msg: "Access Denied" });
    }

    try {
        const response = jwt.verify(token, secretKey) as string;
        res.locals.id = response;
        next();
    } catch (error) {
        res.status(403).json({ msg: "Invalid token" });
    }
};

export default jwtAuthCheck;
