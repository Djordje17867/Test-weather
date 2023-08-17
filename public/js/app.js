const forma = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



forma.addEventListener('submit', (e) => {
    e.preventDefault()
    msg1.textContent = 'Loading..'
    msg2.textContent = ''
    const location = search.value
    
    fetch('http://127.0.0.1:3000/weather?adress=' + location).then((response) =>
{
    response.json().then((data) => {
        if(data.error){
            msg1.textContent = data.error
        }else{
            msg1.textContent = data.location
            msg2.textContent = data.data
        }
    })
})

    console.log(location)
})