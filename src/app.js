const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
console.log(__dirname)

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Za handlebars engine i views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static directory
app.use(express.static(publicDir))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App123',
        name: 'Djordje P'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About page',
        name: 'Djokica'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        help_msg: 'Ovo je greska, i pomoc oko greske, pomoc oko greske, pomoc oko greske',
        title: 'Help',
        name: 'Djordje'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.adress){
        return res.send({
            error: 'Morate postaviti adresu'
        })
    }
    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error:error
        })}
    
        forecast(latitude, longitude, (error, data1) => {
            if (error)
            {
                return res.send({error: error})
            }
            res.send({
                location: location,
                data: data1
            })
          })
        
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    //console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        error_msg: 'Help article not found',
        pathBack: '/help',
        name: 'Djordje'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404',
        error_msg: 'Page not found',
        pathBack: '/',
        name: 'Djordje'
    })
})


app.listen(3000, () => {
    console.log('Server started, port 3000')
})