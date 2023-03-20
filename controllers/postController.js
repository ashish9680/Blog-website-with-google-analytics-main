const Category = require('../models/category')
const Blog = require('../models/post')

exports.createPostForm = async(req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 })
    res.render('blog/create-blog', {
        title: 'sachintechtalks | create new blog',
        categoriesLength: categories.length,
        categories,
        user: req.user
    })
}

exports.editBlog = async(req,res)=>{
    const messages = req.flash('success')
     const blog = await Blog.findOne({_id: req.params.id}).populate('category')
     const category = await Category.find({})
     res.render('blog/edit-blog', {
          title: 'sachintechtalks | ' + blog.postTitle,
          blog,
          categoryLength: category.length,
          category,
          messages: messages
     })
}

// backend of blogs
exports.createNewBlog = async(req, res) => {
    const formData = new Blog({
        postTitle: req.body.title,
        shortDescription: req.body.short_title,
        category: req.body.category,
        postImage: req.body.photo,
        mainDescription: req.body.description
    })
    formData.save((err, data) => {
        if (err) {
            res.json(err)
        } else {
            console.log(data)
            res.redirect('/admin/view-blog-admin')
        }
    })
}


exports.deleteOneBlog = async(req, res) => {
    await Blog.findOneAndDelete({ _id: req.params.blogId })
    res.redirect('/admin/view-blog-admin')
}

exports.changeDetails = async (req,res)=>{
     await Blog.findOneAndUpdate({_id: req.params.blogId}, {$set:{postTitle: req.body.title, shortDescription: req.body.sDescription, category: req.body.category, mainDescription: req.body.mDescription}}, (err, data) => {
          if(err){
               console.log(err)
          }else{
               req.flash("success", "Details has been changed!!!")
               res.redirect('/admin/view-blog-admin')
          }
     })
}