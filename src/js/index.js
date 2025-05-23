import { getUser } from "./services/user.js";
import { repos } from "./services/repositories.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";



const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");

btnSearch.addEventListener("click", () => {
  const userName = inputSearch.value;
  getUserData(userName);
});

inputSearch.addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    getUserData(userName);
    
  }
});





async function getUserData(userName) {

  const useResponse = await getUser(userName);
  const repositoriesReponse = await repos(userName)
  user.setInfo(useResponse)
  user.setRepositories(repositoriesReponse)
  // user.repositories(repositories)


  screen.renderUser(user)
  
}



