// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const grid = document.querySelector(".grid");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


fetch('https://randomuser.me/api/?nat=us,ca,nz&results=12')
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        else {
            throw new Error("Oops.");
        }        
    })
    .then(data => {
        
        console.log(data);
        displayPeople(data.results);
    })
    .catch(err => {
        console.log("Error: ", err);
    });

function displayPeople(people) {    
    people.forEach(person => {
        let photo = person.picture.large;
        let firstName = person.name.first;
        let lastName = person.name.last;
        let email = person.email;
        let city = person.location.city;

        let personHtml = `
            <div class="person">
                <img class='photo' src=${photo}>
                <div class='person-detail'>
                    <p class='name'>${firstName} ${lastName}</p>
                    <p  class='email'>${email}</p>
                    <p class='city'>${city}</p>
                    </div>
            </div>
        `

        grid.innerHTML += personHtml;
    });
}

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    }
    