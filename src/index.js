
// On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

document.addEventListener('DOMContentLoaded', () => {
    const DOG_API = ("http://localhost:3000/dogs")
    let whichDogId = null
    const table = document.querySelector("#table-body")
    const formName = document.querySelector("input[name='name']")
    const formBreed = document.querySelector("input[name='breed']")
    const formSex = document.querySelector("input[name='sex']")
    const form = document.querySelector("form")

    const renderDogRow = (dog) => {
        const tableRow = document.createElement("tr")
        tableRow.id = `dog-${dog.id}`

        dogName = document.createElement("td")
        dogName.innerText = dog.name 

        dogBreed = document.createElement("td")
        dogBreed.innerText = dog.breed

        dogSex = document.createElement("td")
        dogSex.innerText = dog.sex 

        dogEdit = document.createElement("button")
        dogEdit.innerText = "Edit Dog"

        dogEdit.addEventListener('click', () => {
            formName.value = dog.name
            formBreed.value = dog.breed
            formSex.value = dog.sex
            whichDogId = dog.id
        })
        tableRow.append(dogName, dogBreed, dogSex, dogEdit)
        table.append(tableRow)
    }
    const renderDogs = (dogs) => {
        dogs.forEach (dog => {
            renderDogRow(dog)
        })
    }
    const init = () => {
        fetch(DOG_API)
        .then(res => res.json())
        .then(dogs => renderDogs(dogs))
    }
    init();

    form.addEventListener('submit', (event) => {
            event.preventDefault();
        const config = {
            method: "PATCH",
            headers:  {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                name: event.target.name.value,
                breed: event.target.breed.value,
                sex: event.target.sex.value
            })
        };
        fetch(`${DOG_API}/${whichDogId}`, config)
        .then(res => res.json())
        .then(dog => {const rowId = document.querySelector(`#dog-${dog.id}`)
        rowId.children[0].innerText = dog.name
        rowId.children[1].innerText = dog.breed
        rowId.children[2].innerText = dog.sex
    })
    })
})