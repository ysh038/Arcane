import express from "express";
// import { User } from "../model/schema.js";
import * as postController from "../controller/post.js";

const router = express.Router();

router.post("/", postController.Posting);

router.post("/comment", postController.PostingComment);

router.get("/", postController.getPost);

router.get("/all", postController.getAllPost);

router.get("/all/viewsort", postController.getPostSortedByView);

router.get("/all/likesort", postController.getPostSortedByLike);

router.put("/read", postController.postRead);

router.put("/like", postController.postLike);

router.put("/correct", postController.CorrectingPost);

router.delete("/delete", postController.Deleting);

router.delete("/delete/all", postController.DeleteAll);

router.delete("/comment/delete", postController.DeletingComment);

export default router;
