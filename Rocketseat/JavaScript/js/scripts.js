let listElement = document.querySelector('#listaToDo');
let inputElement = document.querySelector('#inputToDo');
let buttonElement = document.querySelector('#botaoToDo');

var toDos = JSON.parse(localStorage.getItem('list_to_do')) || [];

function renderToDo() {
  listElement.innerHTML = '';
  for (toDo of toDos) {
    let toDoElement = document.createElement('li');
    let toDoText = document.createTextNode(toDo);

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', '#');

    var position = toDos.indexOf(toDo);
    linkElement.setAttribute('onClick', `removeToDo(${position})`);

    let linkText = document.createTextNode('Excluir');

    linkElement.appendChild(linkText);

    toDoElement.appendChild(toDoText);
    toDoElement.appendChild(linkElement);

    listElement.appendChild(toDoElement);
  }
}

renderToDo();

function addToDo() {
  let toDoText = inputElement.value;

  toDos.push(toDoText);
  inputElement.value = '';
  renderToDo();
  saveToDoStorage();
}

buttonElement.onclick = addToDo;

function removeToDo(position) {
  toDos.splice(position, 1);
  renderToDo();
  saveToDoStorage();
}

function saveToDoStorage() {
  localStorage.setItem('list_to_do', JSON.stringify(toDos));
}

/**AJAX e PROMISES */

var minhaPromise = function () {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users/guplima1986');
    xhr.send(null);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Erro na requisição');
        }
      }
    };
  });
};

minhaPromise()
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.warn(error);
  });
