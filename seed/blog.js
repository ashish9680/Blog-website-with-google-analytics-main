const mongoose = require('mongoose')
const Blog = require('../models/post')


require('dotenv').config({ path: '../' })

mongoose.connect('mongodb://root:abc123@ds129053.mlab.com:29053/sachin-blogs')

const blog = new Blog({
    postTitle: 'Apple Airpod 1 VS Apple Airpod 2 in hindi (SPECIFICATION AND COMPARISON) #SACHIN TECHTALKS 🔥🔥',
    shortDescription: 'Spacification and comparison',
    category: '5f79acadb32dba3b18369a13',
    postImage: 'https://img.youtube.com/vi/ZbY9U46iQ3M/maxresdefault.jpg',
    mainDescription: 'CONNECT WITH ME PERSONALLY ON  I N S T A G R A M  ✔️➤ https://www.instagram.com/official_sa...For Business Queries like Sponsorships/Reviews ➤ Contact Me: - Techtalks1992@gmail.com ✔️ (Gmail) Disclaimer- Some contents are used for educational purposes under fair use. Copyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for "fair use" for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favor of fair use. /n Disclaimer- Some contents are used for educational purposes under fair use. Copyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for "fair use" /n for purposes such as criticism, comment, news reporting, teaching, scholarship, and research.'
})

blog.save((err, data) => {
    if (err)
        console.log(err)
    else {
        console.log(data)
    }
})