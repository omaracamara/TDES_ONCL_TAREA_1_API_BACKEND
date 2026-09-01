import type { Request, Response, NextFunction } from "express";

export const validateData = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, year} = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};