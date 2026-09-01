import type { Request, Response, NextFunction } from "express";
import { getBook } from "../services/book.service.js";

export const validateBook = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const book = await getBook(id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    next();
}