const picUrl = 'https://dog.ceo/api/breeds/image/random' 
const dataUrl = 'https://randomuser.me/api/'

const rouletteBtn = document.querySelector('#roulette')
const meetBtn = document.querySelector('#meet')

const loadingSpinner = document.getElementById('loadingSpinner')
const loadingText = document.getElementById('loadingText')

// Aufgabe 7.1
rouletteBtn.addEventListener('click', (e) => {

    console.log("btn clicked")
    loadingSpinner.classList.toggle('d-none')
    rouletteBtn.disabled = true
    meetBtn.disabled = true
    loadingText.innerHTML = "Loading..."
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("promise complete")
            let success = Math.random() > 0.2
            if(success) {
                resolve()
            } else {
                reject("You lose, muahahaha.")
            }
        }, 1000)
    })
    .catch((reason) => alert(reason))
    .then(() => loadingSpinner.classList.toggle('d-none'))
    .then(() => loadingText.innerHTML = "")
    .then(() => rouletteBtn.disabled = false)
    .then(() => meetBtn.disabled = false)
    .finally(() => alert("Thanks for playing!"))
})

// Aufgabe 7.3a
function showCard(e){  
    document.getElementById('card-body').classList.toggle('d-none')
    e.target.removeEventListener('click', showCard)
}

meetBtn.addEventListener('click', showCard)

// Aufgabe 7.3
meetBtn.addEventListener('click', (e)=> {

    // Aufgabe 7.3a
    fetch(picUrl)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            document.getElementById('profilePic').src = data.message
        })
    
        // Aufgabe 7.3b
    fetch(dataUrl)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            document.getElementById('name').innerHTML = data.results[0].name.first
            document.getElementById('age').innerHTML = data.results[0].dob.age
            document.getElementById('city').innerHTML = data.results[0].location.city
            document.getElementById('country').innerHTML = data.results[0].location.country
        })
})