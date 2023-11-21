const API_URL = 'https://api.github.com/';
const USER_LIST = document.querySelector('#user-list');

document.querySelector('#search').addEventListener('submit', function (event) {
  event.preventDefault();
  let username = event.target.elements.username.value;
  if (!username) {
    alert('Username must not be empty!');
    return;
  }

  let url = `${API_URL}search/users?q=${username}`;
  fetch(url)
    .then(function (res) {
      res.json()
        .then(function (data) {
          USER_LIST.innerHTML='';
          data.items.map(function (item) {
            insertUser(item);
          });
        })
        .catch(function (error) {
          console.log('Oops!. There Is A Problem: ' + error);
        });
    })
    .catch(function (error) {
      console.log('Fetch failed: ' + error);
    });
});

function insertUser(item) {
  let list = `
  <a href=${item.html_url} target="blank">
    <div class="card">
      <img width='200' src=${item.avatar_url} alt=${item.login}/>
      <div class="user">
        <h4>Username : ${item.login}</h4>
        <p> Url : ${item.html_url}</p>
        <p> Score : ${item.score}</p>
      </div>
    </div>
  </a>
  `;
  USER_LIST.insertAdjacentHTML('beforeend', list);
}
