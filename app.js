require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./src/routes/blogRoutes')
const app = express()

// connect to mongodb
const dbURI = `mongodb+srv://${process.env.MCLI_PRIVATE_API_KEY_USER}:${process.env.MCLI_PRIVATE_API_KEY_PASSWORD}@cluster0.h46sfj2.mongodb.net/test?retryWrites=true&w=majority`

// mongoose connection between MongoDB and the Node.js JavaScript
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
   console.log('Connect MongoDB');
   app.listen(3000)
}).catch((err) => {
   console.log(err);
})

// register view engine
app.set('view engine', 'ejs')
app.set('views', './src/views')



//  middleware & static files 
app.use('/public', express.static('public')) 
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

// routes
app.get('/',(req,res) => {
   res.redirect('/blogs')
})

app.get('/about', (req, res) => {
   res.render('about', {title: 'About'})
})

// blog routes
app.use('/blogs', blogRoutes)

app.use('/404', (req, res) => {
   res.status(404).render('404', {title: '404'})
})

