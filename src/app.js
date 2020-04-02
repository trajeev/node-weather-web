const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../template/views')
const paritalspath = path.join(__dirname, '../template/partials')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))

//setup handlebar engine and view location
app.set('views', viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(paritalspath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'rajeev'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please enter address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })




})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you provide search'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'pencil',
        name: 'rajeev'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpmessage: 'for help contact',
        title: 'title',
        name: 'rajeev'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'rajeev',
        helpmessage: 'help page not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'rajeev',
        helpmessage: '404 page not found'
    })
})

app.listen(port, () => {
    console.log('node is up and running on ' + port)
})