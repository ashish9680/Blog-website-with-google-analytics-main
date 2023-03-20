const Category = require('../models/category')

exports.createCategoryForm = async(req, res) => {
    const category = await Category.find()
    res.render('category/new-tag', {
        title: 'sachintechtalks | creation of new category',
        user: req.user,
        length: category.length
    })
}

exports.createCategory = async(req, res) => {
    const { title, description } = req.body
    const category = new Category({
        title: title,
        description: description
    })
    category.save((err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.redirect('/admin/view-category')
        }
    })
}

exports.viewAllCategory = async(req, res) => {
    const category = await Category.find().sort({ createdAt: -1 })
    res.render('category/view-tag-to-admin', {
        title: 'sachintachtalks | viewing category',
        length: category.length,
        category,
        user: req.user
    })
}

exports.editCategoryForm = async(req, res) => {
    const categoryId = await Category.findById({ _id: req.params.id })
        //     console.log(categoryId)
    res.render('category/edit-tag-to-admin', {
        title: 'sachintechtalks |' + categoryId.title,
        user: req.user,
        categoryId
    })
}

exports.editCategory = async(req, res) => {
    await Category.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description } }, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            console.log(data)
            res.redirect('/admin/view-category')
        }
    })
}

exports.deleteCategory = async(req, res) => {
    await Category.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            console.log(data)
            res.redirect('/admin/view-category')
        }
    })
}