const { loginForm, passportLogin, dashboard, logout, isLoggedIn, notLoggedIn, viewBlogsToAdmin, viewAccountDetails, getAllMessages, deleteOneMessage } = require('../controllers/adminController')
const { createCategoryForm, createCategory, viewAllCategory, editCategoryForm, editCategory, deleteCategory } = require('../controllers/categoryController')
const { createPostForm, createNewBlog, deleteOneBlog, editBlog, changeDetails } = require('../controllers/postController')
const router = require('express').Router()

// GET
router.get('/', loginForm)
router.get('/dashboard', isLoggedIn, dashboard)
router.get('/logout', isLoggedIn, logout)

// CATEGORIES
router.get('/create-category', isLoggedIn, createCategoryForm)
router.get('/view-category', isLoggedIn, viewAllCategory)
router.get('/edit-category/:id', isLoggedIn, editCategoryForm)

// BLOGS
router.get('/create-blog', isLoggedIn, createPostForm)
router.get('/view-blog-admin', isLoggedIn, viewBlogsToAdmin)
router.get('/edit-blog-post/:id', isLoggedIn, editBlog)

// MESSAGES
router.get('/new-messages', isLoggedIn, getAllMessages)
router.post('/delete-messages/:id', isLoggedIn, deleteOneMessage)

// ADMIN ACCOUNT
router.get('/account-settings', isLoggedIn, viewAccountDetails)

// POST routes
router.post('/', passportLogin)

// CATEGORIES
router.post('/create-category', isLoggedIn, createCategory)
router.post('/edit-category/:id', isLoggedIn, editCategory)
router.post('/delete-category/:id', isLoggedIn, deleteCategory)

// BLOGS
router.post('/create-new-blog', isLoggedIn, createNewBlog)
router.post('/delete-blog/:blogId', isLoggedIn, deleteOneBlog)
router.post('/edit-blog-admin/:blogId', isLoggedIn, changeDetails)

module.exports = router