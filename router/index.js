// homepage, single blog, blogs, contact us, about us, subscribe by category
const router = require('express').Router()
const { notLoggedIn } = require('../controllers/adminController')
const { hompage, viewSingleBlogPost, viewPostsByCategory, searchPosts, contactForm, aboutPage, contactUs, } = require('../controllers/indexController')

// GET ROUETES

router.get('/', hompage)

router.get('/blog/:id', viewSingleBlogPost)

router.get('/category/:id', viewPostsByCategory)

router.get('/about-us', aboutPage)

router.get('/contact-us', contactUs)

// POST ROUTES

router.post('/search', searchPosts)

router.post('/contact-form', contactForm)

module.exports = router