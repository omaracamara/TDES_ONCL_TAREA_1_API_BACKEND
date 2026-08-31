import type { Request, Response } from "express";
import { getBooks, getBook,createBook,deleteBook } from "../services/book.service.js";

export function getAllBooks(req: Request, res: Response) {
  res.json(getBooks());
}

// Todo lo relacionado con http request y response se hace en el controller, mientras que la logica de negocio se hace en el service
export const getOne = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = getBook(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};

export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = deleteBook(id); 
  if (!deleted) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(204).send();     
};

export const create = (req: Request, res: Response) => {
  const book = req.body;
  const newBook = createBook(book);
  if (!newBook) {
    return res.status(400).json({ message: "Book could not be created" });
  }
  res.status(201).json(newBook);
};