import type { Request, Response } from "express";
import { getBooks, getBook,createBook,deleteBook, updateBook } from "../services/book.service.js";

export const getAllBooks = async (req: Request, res: Response) => {
  res.json(await getBooks(req.query));
};

// Todo lo relacionado con http request y response se hace en el controller, mientras que la logica de negocio se hace en el service
export const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = await getBook(id);
  res.json(book);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await deleteBook(id);
  res.status(204).send();
};

export const create = async (req: Request, res: Response) => {
  const book = req.body;
  const newBook = await createBook(book);
  if (!newBook) {
    return res.status(400).json({ message: "Book could not be created" });
  }
  res.status(201).json(newBook);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedBook = req.body;
  const updated = await updateBook(id, updatedBook);
  if (!updated) {
    return res.status(400).json({ message: "Book could not be updated" });
  }
  res.json(updated);
};