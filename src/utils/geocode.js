const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmVybi1hcmRvIiwiYSI6ImNrMmczeHV6azA3ODczbnBmNm1mdWF6bGEifQ.ItrYHaRgfrpO0-LLHYlPCw`;
    request({url, json: true}, (err, { body }) => {
        if(err) {
            callback('Unable to connect to location services!', undefined);
        } else if(!body.features.length) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
};

module.exports = geocode;