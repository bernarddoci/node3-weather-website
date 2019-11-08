const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/d88df6a4c7b1b90418a94b8faf24ec1a/${latitude},${longtitude}?units=si`;
    
    request({url, json: true}, (err, { body }) => {
        if(err) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.error){
            callback('Unable to find location. Try another search', undefined);
        } else {
            const { currently: {temperature, precipProbability}, daily:{data} } = body;
            callback(undefined, 
                `${data[0].summary} \nIt is currently ${temperature} celsius degrees out. There is a ${precipProbability}% chance of rain. High temperature is: ${data[0].temperatureHigh} celsius, Low temperature is: ${data[0].temperatureLow} celsius`)
        }
    })
}

module.exports = forecast;