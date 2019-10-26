
// fetch('http://localhost:4000/weather?address=').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const searchv = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 =document.querySelector('#msg2')
const nl = "\r\n"

// msg1.textContent = "from javascript"

weatherform.addEventListener('submit',(event) => {
event.preventDefault()

 const locations = searchv.value
 
//  console.log(locations)
fetch('http://localhost:4000/weather?address='+ locations).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            msg1.textContent = data.error
        } else {

            console.log(data.location)
            console.log(data.forecast)
            msg1.textContent = data.location
            msg2.innerHTML = "summary :" + data.forecast.summary  + 
nl          + " <br> timezone : " + data.forecast.timezone

        }
    })
})
})