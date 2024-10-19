import express from 'express';
import { blogControllers } from './blog.controller';

const router = express.Router();

router.post('/', blogControllers.createBlog);
router.get('/', blogControllers.getBlogs);
router.get('/:id', blogControllers.getBlogByID);
router.get('/user/:id', blogControllers.getUserBlogs);
router.put('/update-blog-views/:id', blogControllers.updateBlogViews);

export const blogRoutes = router;
