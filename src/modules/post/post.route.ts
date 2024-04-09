import express from 'express';
import { postControllers } from './post.controller';

const router = express.Router();

router.post('/', postControllers.createPost);
router.get('/', postControllers.getAllPosts);
router.get('/user/:id', postControllers.getSingleUserPosts);
router.delete('/delete/:id', postControllers.deletePost);

export const postRouts = router;
