const path = require('path');
const express = require('express');
// const cors = require('cors');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');



const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
// app.use(cors());

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Weather app',
        name: 'Debbie Barros'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Debbie Barros'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page',
        helpMessage: 'Here is the help message you are viewing on the help.hbs page',
        name: 'Debbie Barros'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ errorMessage: 'You must provide a valid address' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Debbie Barros',
        errorMessage: 'Sorry this article is not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Debbie Barros',
        errorMessage: 'Sorry page not found, please try again.'
    })
})


app.listen(port, () => {
    console.log('Server is running on port ' + port)
});