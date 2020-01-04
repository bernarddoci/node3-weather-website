const log = console.log;

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const myWeather = document.querySelector('#my-weather');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})

myWeather.addEventListener('click', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords
        fetch(`/weather/location?latitude=${latitude}&longitude=${longitude}`).then((res) => {
            res.json().then(data => {
                if(data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.forecast;
                }
            })
        })
    })
})
