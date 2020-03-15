const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const fetchDogs = (url, option = {}) => {
    if (option === {}) {
      return fetch(url).then(res => res.json());
    } else {
      return fetch(url, option).then(res => res.json());
    }
  };
  const editDog = dog => {
    document.querySelector("input[name = name]").value = dog.name;
    document.querySelector("input[name = breed]").value = dog.breed;
    document.querySelector("input[name = sex]").value = dog.sex;

    form.addEventListener("submit", event => {
      event.preventDefault;
      const option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: document.querySelector("input[name = name]").value,
          breed: document.querySelector("input[name = breed]").value,
          sex: document.querySelector("input[name = sex]").value
        })
      };
      fetchDogs(`${baseUrl}/dogs/${dog.id}`, option).then(dog => {
        name.innerText = dog.name;
        breed.innerText = dog.breed;
        sex.innerText = dog.sex;
      });
    });
  };

  const dogTbl = dog => {
    const table = document.querySelector("#table-body");
    const tr = document.createElement("tr");
    tr.className = "padding";
    const name = document.createElement("td");
    name.className = "padding center";
    name.innerText = dog.name;
    const breed = document.createElement("td");
    breed.className = "padding center";
    breed.innerText = dog.breed;
    const sex = document.createElement("td");
    sex.className = "padding center";
    sex.innerText = dog.sex;
    const edit = document.createElement("td");
    edit.className = "padding center";
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit Dog";
    edit.append(editBtn);
    tr.append(name, breed, sex, edit);
    table.append(tr);
    editBtn.addEventListener("click", () => {
      editDog(dog);
    });
  };

  const init = () => {
    fetchDogs(`${baseUrl}/dogs`).then(dogs => dogs.forEach(dog => dogTbl(dog)));
  };
  init();
});
