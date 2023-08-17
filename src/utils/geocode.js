const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=sk.eyJ1IjoibnJpc3RpYyIsImEiOiJjbDN5MzE3OHEwYTY0M2Jta3JvN2hjYnBiIn0.14bW1_l_xqUFIGepvmGHDw&limit=1'

    request({url, json:true }, (error, {body}) => {
        if (error){
            callback('Unable to connect!', undefined)
        } else if (body.features.length === 0) {
            callback('No location found', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode