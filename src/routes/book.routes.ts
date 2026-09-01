import { Router } from "express";
import { getAllBooks,getOne,create,remove,update } from "../controllers/book.controller.js";

const router = Router();

router.get("/", getAllBooks); 
router.get("/:id", getOne);
router.post("/", create);
router.patch("/:id",update );
router.delete("/:id", remove);


export default router;
