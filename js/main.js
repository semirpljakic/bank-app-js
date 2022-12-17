let mainView = document.querySelector('#mainView');
let accBtn = document.querySelector('#accBtn');
let addAccBtn = document.querySelector('#addAccBtn');
let editDelBtn = document.querySelector('#editDelBtn');
let mainBody = document.querySelector('#mainBody');

let formView = document.querySelector('#formView');
let accId = document.querySelector('#accId');
let accName = document.querySelector('#accName');
let accDeposit = document.querySelector('#accDeposit');
let accCard = document.querySelector('#accCard');
let saveBtn = document.querySelector('#saveBtn');

let editFormView = document.querySelector('#editFormView');
let editBody = document.querySelector('#editBody');

let editBtnView = document.querySelector('#editBtnView');
let eaccId = document.querySelector('#eaccId');
let eaccName = document.querySelector('#eaccName');
let eaccDeposit = document.querySelector('#eaccDeposit');
let eaccCard = document.querySelector('#eaccCard');
let editBtn = document.querySelector('#editBtn');
let id;

let db = [
  {
    id: '1',
    name: 'Asmir',
    deposit: 25000,
    cCard: 'Visa',
  },
  {
    id: '2',
    name: 'Semir',
    deposit: 12000,
    cCard: 'Master',
  },
];

createTable();
function createTable() {
  let text = '';
  for (let i = 0; i < db.length; i++) {
    text += '<tr>';
    text += '<td>' + db[i].id + '</td>';
    text += '<td>' + db[i].name + '</td>';
    text += '<td>' + db[i].deposit + '</td>';
    text += '<td>' + db[i].cCard + '</td>';
    text += '</tr>';
  }
  mainBody.innerHTML = text;
}

// 2:
accBtn.addEventListener('click', showMainView);
function showMainView() {
  formView.style.display = 'none';
  mainView.style.display = 'block';
  editFormView.style.display = 'none';
  editBtnView.style.display = 'none';
}
addAccBtn.addEventListener('click', showFormView);
function showFormView() {
  formView.style.display = 'block';
  mainView.style.display = 'none';
  editFormView.style.display = 'none';
  editBtnView.style.display = 'none';
}
saveBtn.addEventListener('click', addAccount);
function addAccount() {
  let newAccount = {
    id: accId.value,
    name: accName.value,
    deposit: accDeposit.value,
    cCard: accCard.value,
  };
  db.push(newAccount);
  createTable();
  showMainView();
}

// 3:

editDelBtn.addEventListener('click', showEditFormView);
function showEditFormView() {
  editFormView.style.display = 'block';
  formView.style.display = 'none';
  mainView.style.display = 'none';
  editBtnView.style.display = 'none';
  createEditTable();
}
function createEditTable() {
  let text = '';
  for (let i = 0; i < db.length; i++) {
    text += '<tr>';
    text += '<td>' + db[i].id + '</td>';
    text += '<td>' + db[i].name + '</td>';
    text += '<td>' + db[i].deposit + '</td>';
    text += '<td>' + db[i].cCard + '</td>';
    text +=
      '<td><button data-id="' +
      i +
      '" class="btn btn-warning edit">Edit</button></td>';
    text +=
      '<td><button data-id="' +
      i +
      '" class="btn btn-danger delete">Delete</button></td>';
    text += '</tr>';
  }
  editBody.innerHTML = text;
  let delBtns = document.querySelectorAll('.delete');
  let editBtns = document.querySelectorAll('.edit');
  for (let i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener('click', deleteAccount);
    editBtns[i].addEventListener('click', editAccount);
  }
}

function deleteAccount() {
  id = this.getAttribute('data-id');
  let question = confirm(
    'Are you sure you want to delete this user?'
  );
  if (question == true) {
    db.splice(id, 1);
    createTable();
    showEditFormView();
  } else {
    //sve okej:
  }
}
function editAccount() {
  editBtnView.style.display = 'block';
  editFormView.style.display = 'none';
  formView.style.display = 'none';
  mainView.style.display = 'none';

  id = this.getAttribute('data-id');
  eaccId.value = db[id].id;
  eaccName.value = db[id].name;
  eaccDeposit.value = db[id].deposit;
  eaccCard.value = db[id].cCard;
}

editBtn.addEventListener('click', changeAccount);
function changeAccount() {
  db[id] = {
    id: eaccId.value,
    name: eaccName.value,
    deposit: eaccDeposit.value,
    cCard: eaccCard.value,
  };
  createTable();
  showMainView();
}
