import type { Book } from "../types/book.js";

export interface BookRepository {
  findAll(filters: Record<string, any>): Promise<Book[]>;
  findById(id: number): Promise<Book | null>;
  create(book: Book): Promise<Book>;
  remove(id: number): Promise<boolean>;
  update(id: number, updatedBook: Book): Promise<Book | null>;
}

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

export const findAll = async (filters: Record<string, any>): Promise<Book[]> => {
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

export const findById = async (id: number): Promise<Book | null> => 
  books.find((book) => book.id === id) || null;

export const create = async (book: Book): Promise<Book> => {
  books.push(book);
  return book;
};

export const remove = async (id: number): Promise<boolean> => {
  const exists = books.find((book) => book.id === id);
  if (!exists) return false;
  books = books.filter((book) => book.id !== id);
  return true;
};

export const update = async (id: number, updatedBook: Book): Promise<Book | null> => { 
  const book = books.find((book) => book.id === id);
  if (!book) return null;

  for (const key in updatedBook) {
    if (updatedBook.hasOwnProperty(key)) {
      (book as any)[key] = (updatedBook as any)[key];
    }
  }

  return book;
};

export const bookRepository: BookRepository = {
  findAll,
  findById,
  create,
  remove,
  update,
};