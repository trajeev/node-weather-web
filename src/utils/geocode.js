const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFqZWV2dGlra2EiLCJhIjoiY2s3cnJhZzFvMDJmMDNtbDhqbWUzbHY0aSJ9.VPTiK_ymlaiP186RrWzzNA&limit=1'
    request({ url, json: true }, (error, { body } = response) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode