const Category = require('../models/category')
const Blog = require('../models/post')
const Contact = require('../models/contact')

exports.hompage = async(req, res) => {
    const messages = req.flash('success')
    const category = await Category.find().sort({ createdAt: -1 })
    const latestBlog = await Blog.find().sort({ createdAt: -1 }).limit(1).populate('category', 'title')
    const allPost = await Blog.find().sort({ createdAt: -1 }).limit(10).populate('category', 'title')
    res.render('index', {
        title: 'sachintechtaks | homepage',
        categoryLength: category.length,
        category,
        latestBlog,
        PostLength: allPost.length,
        allPost,
        messages: messages
    })
}

exports.viewSingleBlogPost = async(req, res) => {
    const category = await Category.find().sort({ createdAt: -1 })
    const post = await Blog.findById({ _id: req.params.id })
    res.render('blog/single', {
        title: 'sachintechtalks | ' + post.postTitle,
        post,
        categoryLength: category.length,
        category,
    })
}

exports.viewPostsByCategory = async(req, res) => {
    const category = await Category.find().sort({ createdAt: -1 })
    const selectedCategory = await Category.findOne({ _id: req.params.id })
    const posts = await Blog.find({ category: req.params.id }).sort({ _createAt: -1 }).populate('category')
    res.render('category/posts', {
        title: 'sachintechtalks | '+ selectedCategory.title,
        selectedCategory,
        postLength: posts.length,
        posts,
        categoryLength: category.length,
        category,
    })
}

exports.searchPosts = async(req, res) => {
    var search = req.body.search
    console.log(search)
    const category = await Category.find().sort({ createdAt: -1 })
    await Blog.find({ $or: [{ postTitle: new RegExp(search.toLowerCase()) }] }, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.render('blog/result', {
                categoryLength: category.length,
                category,
                dataLength: data.length,
                data
            })
        }
    }).populate("category", "title")
}

exports.contactForm = async(req, res) => {
    const details = new Contact({
        email: req.body.email,
        contact: req.body.number,
        message: req.body.message
    })
    details.save((err, data) => {
        if (err) {
            res.json(err)
        } else {
            req.flash('success', 'Got your message!!!')
            res.redirect('/')
        }
    })
}

exports.aboutPage = async(req,res)=>{
     const category = await Category.find().sort({ createdAt: -1 })
     res.render('other/about.hbs', {
          title: 'sachintechtalks | about us',
          categoryLength: category.length,
          category
     })
}

exports.contactUs = async(req,res)=>{
     const category = await Category.find().sort({ createdAt: -1 })
     res.render('other/contact.hbs', {
          title: 'sachintechtalks | about us',
          categoryLength: category.length,
          category
     })
}