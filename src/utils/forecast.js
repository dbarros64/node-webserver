const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
   const url = 'http://api.weatherstack.com/current?access_key=cd5053f78fc16a4557ba0cace21f5ba9&query=' + latitude + ',' + longitude
    
   request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
            
        }
    });
}



module.exports = forecast;