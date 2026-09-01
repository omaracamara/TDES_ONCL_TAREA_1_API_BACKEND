import { Router } from "express";
import { getAllBooks,getOne,create,remove,update } from "../controllers/book.controller.js";
import { validateData } from "../middlewares/ValideteData.middleware.js";
import { validateBook } from "../middlewares/ValideteBook.middlesware.js";

const router = Router();

router.get("/", getAllBooks); 
router.get("/:id", validateBook, getOne);
router.post("/", validateData, create);
router.patch("/:id", validateBook, update );
router.delete("/:id", validateBook, remove);


export default router;
