import type { StdioNull } from "node:child_process";
import type { Book } from "../types/book.js";

let books: Book[] = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008
  },
  {
    id: 2,
    title: "Design Patterns",
    author: "Erich Gamma",
    year: 1994
  },
];

// Repository es sololamente para trabajasr con datos 

export const findAll = (filters: Record<string, any>): Book[] => {
  const activeKeys = Object.keys(filters).filter(
    (key) => filters[key] !== undefined && filters[key] !== ""
  );

  if (activeKeys.length === 0) return books;

  return books.filter((book) => {
    return activeKeys.every((key) => {
      if (!(key in book)) return true;

      const bookValue = book[key as keyof Book];
      const filterValue = filters[key];

      if (typeof bookValue === "string") {
        return bookValue.toLowerCase().includes(String(filterValue).toLowerCase());
      }

      if (typeof bookValue === "number") {
        return bookValue === Number(filterValue);
      }

      return false;
    });
  });
};


export const findById = (id: number) => books.find((book) => book.id === id);

export const create = (book: Book) => {
  books.push(book);
  return book;
}

export const remove = (id: number) => {
  const exists = books.find((book) => book.id === id);
  if(!exists) return false;
  books = books.filter((book) => book.id !== id);
  return true;
}

export const update = (id: number, updatedBook: Book) => { 
  const book = books.find((book) => book.id === id);
  if (!book) return null;

  for (const key in updatedBook) {
    if (updatedBook.hasOwnProperty(key)) {
      (book as any)[key] = (updatedBook as any)[key];
    }
  }

  return book;
}