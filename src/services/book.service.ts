import { bookRepository, type BookRepository } from "../repositories/book.repository.js";
import type { Book } from "../types/book.js";

export const getBooks = async (filters: Record<string, any>, repo: BookRepository = bookRepository) => {
  return await repo.findAll(filters);
};

export const getBook = async (id: number, repo: BookRepository = bookRepository) => {
  return await repo.findById(id);
};

export const createBook = async (book: Book, repo: BookRepository = bookRepository) => {
  if (typeof book.year !== "number" || book.year < 0) {
    return null; 
  }
  if (typeof book.title !== "string" || typeof book.author !== "string") {
    return null; 
  }
  if (book.title.trim() === "" || book.author.trim() === "") {
    return null; 
  }
  const newBook = {
    ...book,
    id: Date.now(),
  };
  return await repo.create(newBook);
}

export const deleteBook = async (id: number, repo: BookRepository = bookRepository) => {
  return await repo.remove(id);
};

export const updateBook = async (id: number, updatedBook: Book, repo: BookRepository = bookRepository) => {
  if (updatedBook.title || updatedBook.author || updatedBook.year) {
    return await repo.update(id, updatedBook); 
  }
  return null;
}