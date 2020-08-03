// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const grid = document.querySelector(".grid");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const nextEmployeeBtn = document.querySelector("#nextEmployeeBtn");
const prevEmployeeBtn = document.querySelector("#prevEmployeeBtn");

fetch(urlAPI)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        else {
            throw new Error("Oops.");
        }        
    })
    .then(data => {
        employees = data.results;
        displayPeople(data.results);
    })
    .catch(err => {
        console.log("Error: ", err);
    });

function displayPeople(people) {    
    people.forEach((person, index) => {
        let photo = person.picture.large;
        let firstName = person.name.first;
        let lastName = person.name.last;
        let email = person.email;
        let city = person.location.city;

        let personHtml = `
            <div class="person" data-index="${index}">
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
    let {
        name,
        dob,
        phone,
        email,
        location: {
            city,
            street,
            state,
            postcode
        },
        picture
    } = employees[index];

    let date = new Date(dob.date);
    const modalHTML = `
    <img class="photo" src="${picture.large}" />
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    <button id="employeeBackBtn">Back</button>
    <button id="employeeNextBtn">Next</button>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

    const nextEmployeeBtn = document.querySelector("#employeeNextBtn");
    const prevEmployeeBtn = document.querySelector("#employeeBackBtn");

    nextEmployeeBtn.addEventListener('click', () => {
        if(index == employees.length-1) {
            displayModal(0);
        }
        else {
            displayModal(index+1);
        }
    });

    prevEmployeeBtn.addEventListener('click', () => {
        if(index == 0) {
            displayModal(employees.length-1);
        }
        else {
            displayModal(index-1);
        }
    });
}
    
    grid.addEventListener('click', e => {
        // make sure the click is not on the gridContainer itself
        if (e.target !== grid) {
        // select the card element based on its proximity to actual element
        const card = e.target.closest(".person");
        const index =parseInt(card.getAttribute('data-index'));
        displayModal(index);
        }
        });

    modalClose.addEventListener('click', () => {
         overlay.classList.add("hidden");
     });
        