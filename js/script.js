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
        let firstName = person.name.first;
        let lastName = person.name.last;
        let email = person.email;
        let city = person.location.city;

        const grid = document.getElementById("grid");

        let personHtml = `
            <div class="person">
                <p>${firstName} ${lastName}</p>
                <p>${email}</p>
                <p>${city}</p>
            </div>
        `

        grid.innerHTML += personHtml;
    });
}