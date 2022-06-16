import './style.css';

const submit = document.querySelector('.submit');
const refresh = document.querySelector('.refresh');
const taxlists = document.querySelector('.tax-lists');
const givenUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/uwp6YFEClnAiG6Dze7ds/scores';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
fetch(apiUrl, {
  method: 'Post',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    name: 'Bruk Game',
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

submit.addEventListener('click', () => {
  const nameInput = document.querySelector('.name-input');
  const scoreInput = document.querySelector('.score-input');
  fetch(givenUrl, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      user: `${nameInput.value}`,
      score: `${scoreInput.value}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  nameInput.value = '';
  scoreInput.value = '';
});

async function getUserScoresPromise(url) {
  let user;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    user = data.result;
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  while (taxlists.hasChildNodes()) {
    taxlists.removeChild(taxlists.firstChild);
  }

  for (let i = 0; i < data.result.length; i += 1) {
    const list = document.createElement('li');
    list.classList.add('name-list');
    const texting = document.createTextNode(`${user[i].user}: ${user[i].score}`);
    list.appendChild(texting);
    taxlists.appendChild(list);
  }
}

getUserScoresPromise(givenUrl);

refresh.addEventListener('click', () => {
  getUserScoresPromise(givenUrl);
});