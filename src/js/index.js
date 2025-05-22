import { baseUrl, repositoriesQuantity } from "./variables.js";




const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");

btnSearch.addEventListener("click", () => {
  const userName = inputSearch.value;
  getUserProfile(userName);
});

inputSearch.addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    getUserProfile(userName);
    
  }
});

async function user(userName) {
  const response = await fetch(`${baseUrl}${userName}`);
  return response.json();
}

async function repos(userName) {
  const response = await fetch(
    `${baseUrl}${userName}/repos?per_page=${repositoriesQuantity}`
  );
  return response.json();
}

function getUserProfile(userName) {
  user(userName).then((userData) => {
    let userInfo = `
    <div class="info">
        <img src="${
        userData.avatar_url
        } alt="Foto do perfil do usuário" />
        <div class="data">
            <h1>${userData.name ?? "Não possui nome cadastrado"}</h1>
            <p>${userData.bio ?? "Não possui bio cadastrada"}</p>
        </div>
    </div>
    `;
    document.querySelector(".profile-data").innerHTML = userInfo;
    getUserRepositories(userName)
  });
}


function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = "";
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        });
        document.querySelector(".profile-data").innerHTML += ` <div class="repositories section">
                                                                <h2>Repositórios</h2>
                                                                <ul>${repositoriesItens} 
                                                               </div> `
    })
}
