const USERS_API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

/* 
<div class="id">
  <h2>Name</h2>
  <p>Username</p>
  <p>Email</p>
  <div class="address">
    <h3>City</h3>
    <p>Street</p>
  </div>
</div>
*/

getUsers();

async function getUsers() {
  const users = await fetchUsers();
  const userByName = getUserById(users);

  const wrapper = document.getElementById('wrapper');

  for (const [name, users] of Object.entries(userByName)) {
    const user = createUser(name, users);
    wrapper.append(user);
  }
}

function createUser(name, users) {
  const idDiv = document.createElement('div');
  idDiv.classList.add('id');
  const h2 = document.createElement('h2');
  h2.textContent = name;
  users.forEach((user) => {
    const userName = document.createElement('p');
    userName.textContent = user.username;
    const userEmail = document.createElement('p');
    userEmail.textContent = user.email;
    const addressDiv = document.createElement('div');
    addressDiv.classList.add('address');
    const h3 = document.createElement('h3');
    h3.textContent = user.address.city;
    const streetP = document.createElement('p');
    streetP.textContent = user.address.street;
    addressDiv.append(h3, streetP);
    idDiv.append(h2, userName, userEmail, addressDiv);
  });
  return idDiv;
}

async function fetchUsers() {
  const response = await fetch(USERS_API_BASE_URL);
  const users = await response.json();
  return users;
}

function getUserById(users) {
  const userById = {};
  users.forEach((user) => {
    if (userById.hasOwnProperty(user.name)) {
      userById[user.name].push(user);
    } else {
      userById[user.name] = [user];
    }
  });
  return userById;
}
