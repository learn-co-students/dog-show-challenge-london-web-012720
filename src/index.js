const dogsAPI = "http://localhost:3000/dogs"

const table = document.querySelector(".margin")
const tableBody = document.querySelector("#table-body")
const form = document.querySelector("#dog-form")
const formName = document.querySelector("input[name = 'name']")
const formBreed = document.querySelector("input[name = 'breed']")
const formSex = document.querySelector("input[name = 'sex']")
const dogForm = document.querySelector("#dog-form")
let selectedDog;
let selectedRow;

const fetchDogs = () => {
  fetch(dogsAPI)
  .then(resp => resp.json())
  .then(dogs => renderDogs(dogs))

}


const renderDogs = (dogs) => {
  dogs.forEach(renderDog)
}

const renderTableRow = dog => {
  const dogName = document.createElement("th")
  dogName.className = "padding center"
  dogName.innerText = dog.name
  const dogBreed = document.createElement("th")
  dogBreed.className = "padding center"
  dogBreed.innerText = dog.breed
  const dogSex = document.createElement("th")
  dogSex.className = "padding center"
  dogSex.innerText = dog.sex

  const dogEdit = document.createElement("button")
  dogEdit.innerText = "Edit"

  return [dogName, dogBreed, dogSex, dogEdit]
}

const renderDog = (dog) => {
 const dogRow = document.createElement("tr")
  
 const [dogName, dogBreed, dogSex, dogEdit] = renderTableRow(dog)
  
  
  dogEdit.className = "padding center"
  dogEdit.innerText = "Edit"
  dogEdit.style.background = "pink"
  
  dogEdit.addEventListener("click", () => {
    formName.value = dog.name 
    formBreed.value = dog.breed
    formSex.value = dog.sex
    selectedDog = dog
    selectedRow = dogRow
  }
  )
 
  dogRow.append(dogName, dogBreed, dogSex, dogEdit)
  tableBody.append(dogRow)
  
  
}

dogForm.addEventListener("submit",e => handleFormSubmit(e))

  
const handleFormSubmit = (event, dogName, dogBreed, dogSex, dogEdit) => {
      event.preventDefault();
    
     const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: event.target.name.value,
        breed: event.target.breed.value,
        sex: event.target.sex.value
      })
      
    };
    
    fetch(`http://localhost:3000/dogs/${selectedDog.id}`, configObject)
    .then(resp => resp.json())
    .then((updatedDog) => {

      const [dogName, dogBreed, dogSex, dogEdit] = renderTableRow(updatedDog)
      selectedRow.innerText = ''
      selectedRow.append(dogName,dogBreed, dogSex, dogEdit)

    })
}


fetchDogs();