const passport = require('passport')
const Category = require('../models/category')
const Blog = require('../models/post')
const Contact = require('../models/contact')

exports.loginForm = async(req, res) => {
    const messages = req.flash('error')
    const category = await Category.find().sort({ createdAt: -1 })
    res.render('admin/login', {
        title: 'sachintechtalks | login to your account',
        categoryLength: category.length,
        category,
        messages: messages
    })
}

exports.dashboard = async(req, res) => {
    const category = await Category.find()
    const blog = await Blog.find()
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(5)
    res.render('admin/dashboard/dashboard', {
        title: 'sachinetechtalks | dashboard',
        user: req.user,
        categoryLength: category.length,
        blogLength: blog.length,
        messagesLength: messages.length,
        messages
    })
}

exports.logout = (req, res) => {
    req.logout()
    console.log('user logged out successfully')
    res.redirect('/')
}

exports.viewBlogsToAdmin = async(req, res) => {
    const messages = req.flash('success')
    const posts = await Blog.find().sort({ createdAt: -1 }).populate("category title")
    res.render('blog/view-blog-to-admin', {
        title: 'sachintechtalks | you have uplaoded this blog',
        postLength: posts.length,
        posts,
        user: req.user,
        messages: messages
    })
}

exports.passportLogin = passport.authenticate('admin-login', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin',
    failureFlash: true
})

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/')
    }
}

exports.notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

exports.viewAccountDetails = (req, res) => {
    if (req.user) {
        res.render('admin/dashboard/account', {
            title: 'sachintechtalks | ' + req.user.name,
            user: req.user
        })
    } else {
        res.redirect('/')
    }
}

exports.getAllMessages = async(req, res) => {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.render('admin/dashboard/contact', {
        title: 'sachintechtalks | new messages',
        messagesLength: messages.length,
        messages: messages,
        user: req.user
    })
}

exports.deleteOneMessage = async(req, res) => {
    await Contact.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            console.log(data)
            res.redirect('/admin/new-messages')
        }
    })
}