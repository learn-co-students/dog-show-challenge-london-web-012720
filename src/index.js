document.addEventListener("DOMContentLoaded", () => {
  const dogsAPI = " http://localhost:3000/dogs";
  const table = document.querySelector("#table-body");
  const formName = document.querySelector("input[name='name']");
  const formBreed = document.querySelector("input[name='breed']");
  const formSex = document.querySelector("input[name='sex']");
  let selectedDog;

  const init = () => {
    fetch(dogsAPI)
      .then(resp => resp.json())
      .then(dogs => renderDogs(dogs));
  };

  const renderDogs = dogs => {
    dogs.forEach(dog => renderDog(dog));
  };

  const renderDog = dog => {
    const dogRow = document.createElement("tr");
    const dogName = document.createElement("th");
    const dogBreed = document.createElement("th");
    const dogSex = document.createElement("th");
    const dogEdit = document.createElement("button");

    dogName.className = "padding center";
    dogName.innerText = dog.name;
    dogBreed.className = "padding center";
    dogBreed.innerText = dog.breed;
    dogSex.className = "padding center";
    dogSex.innerText = dog.sex;
    dogEdit.className = "padding center";
    dogEdit.innerText = "Edit";

    dogEdit.addEventListener("click", () => {
      formName.value = dog.name;
      formBreed.value = dog.breed;
      formSex.value = dog.sex;
      selectedDog = dog;
    });

    dogRow.append(dogName, dogBreed, dogSex, dogEdit);
    table.append(dogRow);
  };

  const dogForm = document.querySelector("#dog-form");

  const handleFormSubmit = event => {
    event.preventDefault();

    if (!selectedDog) return console.error("no dog selected");

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
    console.log("fetching...");
    fetch(`${dogsAPI}/${selectedDog.id}`, configObject)
      .then(res => res.json())
      .then(dog => {
        renderDog(dog);
        selectedDog = null;
      });
  };
  dogForm.addEventListener("submit", handleFormSubmit);

  init();
});
