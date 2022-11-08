const formDOM = document.querySelector("#task-form"); // form
const inputDOM = document.querySelector("#task"); // form-input
const filterDOM = document.querySelector("#filter"); // filter-input
const clearDOM = document.querySelector("#clear"); // clear-input
const ulDOM = document.querySelector('#task-list'); // ul tag

// General function to add all events
allEventadder();

function allEventadder () {
  // Click event for form to prevent submitting
  formDOM.addEventListener('submit', formFunction)
}

// formFunction of form-event
function formFunction(e) {
  if(inputDOM.value == false){
    alert("Please add a to-do")
  }else {
    const makeLi = document.createElement('li');
    makeLi.appendChild(document.createTextNode(inputDOM.value));
    makeLi.classList.add('list-group-item','d-flex');
    const makeA = document.createElement('a');
    makeA.classList.add('ms-auto')
    makeA.innerHTML = `<i class="bi bi-trash"></i>`;
    makeLi.appendChild(makeA);
    ulDOM.appendChild(makeLi);
    inputDOM.value = '';
    e.preventDefault();

    console.log(ulDOM);
  }
}




