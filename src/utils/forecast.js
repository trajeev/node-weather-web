const request = require('request')

const forecast = (a, b, callback) => {
    const url = 'https://api.darksky.net/forecast/4b5b437032ed5152fd04eddc054a5ee1/' + a + ',' + b
    request({ url, json: true }, (error, { body } = response) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}




module.exports = forecast