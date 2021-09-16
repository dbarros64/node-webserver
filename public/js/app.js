console.log('client side js file is loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('search', (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location)
});

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

fetch(`/weather?address=${location}`).then((response) => {
    console.log(response.headers.get('Content-Type'));
    console.log(response.status)
    console.log(response.statusText)
    console.log(response.type)
    console.log(response.url)
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(response.body);
        }

    })

});
