const request = require('request')

const forecast = (a, b, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1d11f0f6ff8f2c3ff6f3593e2ffae715&query=' + a + ',' + b + '&units=f'
    request({ url, json: true }, (error, { body } = response) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out there')
        }
    })
}




module.exports = forecast