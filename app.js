const formDOM = document.querySelector("#task-form"); // form
const inputDOM = document.querySelector("#task"); // form-input
const filterDOM = document.querySelector("#filter"); // filter-input
const clearDOM = document.querySelector("#clear"); // clear-button
const ulDOM = document.querySelector('#task-list'); // ul tag

// General function to add all events
allEventadder();

function allEventadder () {
  // 5-DOMContentLoaded
  document.addEventListener('DOMContentLoaded', getTasks);
  // 1-submit event for form to prevent submitting
  formDOM.addEventListener('submit', formFunction);
  // 2-click event for deleting list item
  ulDOM.addEventListener('click', ulFunction);
  // 3-click event for clear all list items
  clearDOM.addEventListener('click', clearFunction);
  // 4-keyup event for filter input
  filterDOM.addEventListener('keyup', filterFunction);

}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(!localStorage.getItem('tasks')){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const makeLi = document.createElement('li');
    // Add class
    makeLi.className = 'list-group-item d-flex';
    // Create text node and append to li
    makeLi.appendChild(document.createTextNode(task));
    // Create new link element
    const makeA =document.createElement('a');
    // Add class to link
    makeA.className = 'delete-list ms-auto';
    // Add icon html
    makeA.innerHTML = '<i class="bi bi-trash"></i>';
    // Append the link to li
    makeLi.appendChild(makeA);
    // Append li to ul
    ulDOM.appendChild(makeLi);
  })
}

// 1-formFunction of form-event
function formFunction(e) {
  if(inputDOM.value == ""){
    alert("Please add a to-do")
  }else{
    const makeLi = document.createElement('li');
    makeLi.innerHTML = inputDOM.value;
    makeLi.classList.add('list-group-item','d-flex');
    const makeA = document.createElement('a');
    makeA.classList.add('ms-auto', 'delete-list');
    makeA.innerHTML = `<i class="bi bi-trash"></i>`;
    makeLi.appendChild(makeA);
    ulDOM.appendChild(makeLi);
    inputDOM.value = '';
    e.preventDefault();
    loadLocalStorage();
  }
}

// 2-ulFUnction of ul-event (event delegation)
function ulFunction(e){
  if(e.target.parentElement.classList.contains('delete-list')) {
    console.log(e.target.parentElement.previousSibling.textContent)
    const delI = e.target.parentElement.previousSibling.textContent;
    e.target.parentElement.parentElement.remove();
    const list = JSON.parse(localStorage.getItem('tasks'));
    console.log(list)
    if(list.includes(delI)){
      list.splice(list.indexOf(delI),1);
      localStorage.setItem('tasks', JSON.stringify(list));
      console.log(list)
    }
  }
}

// 3-clearFunction of clear button-event
function clearFunction(){
  if(confirm('Are you sure?')){
    while(ulDOM.firstChild){
      ulDOM.firstChild.remove();
    }
    localStorage.clear();
  }  
}

// 4-filterFunction of filter input
function filterFunction(e){
  let filterText = e.target.value.toLowerCase();
  let liGroup = document.querySelectorAll('li');
  liGroup.forEach(li => {
    let liText = li.firstChild.textContent.toLowerCase();
    if(e.target.value){
      li.classList.toggle('d-flex');
      if (liText.includes(filterText)){
        li.style.display = 'block';
      }else {
        li.style.display = 'none';
      }
    }else {
      li.classList.toggle('d-flex');
    } 
  })
}

// 5- Loading local storage


function loadLocalStorage(){
  let lists;
  lists = [];
  if(!localStorage.getItem("tasks")){
    let liGroup = document.querySelectorAll('li');
    liGroup.forEach(li => {
      let liText =li.firstChild.textContent;
      if(!lists.includes(liText)){
        lists.push(liText);
      }
    })   
  } 
  else {
    lists = JSON.parse(localStorage.getItem('tasks'));
    let liGroup = document.querySelectorAll('li');
    liGroup.forEach(li => {
      let liText =li.firstChild.textContent;
      if(!lists.includes(liText)){
        lists.push(liText);
      }
    })
  }
  localStorage.setItem('tasks', JSON.stringify(lists));
}


  











