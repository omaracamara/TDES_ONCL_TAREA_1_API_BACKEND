import { findAll, findById, create, remove, update } from "../repositories/book.repository.js";
import type { Book } from "../types/book.js";

export function getBooks(filters: Record<string, any>) {
  return findAll(filters);
}

export function getBook(id: number) {
  return findById(id);
}

export function createBook(book: Book) {
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
  return create(newBook);
}

export function deleteBook(id: number) {
  return remove(id);
}

export function updateBook(id: number, updatedBook: Book) {
  if (updatedBook.title || updatedBook.author || updatedBook.year) {
    return update(id, updatedBook); 
  }
  return null;
}