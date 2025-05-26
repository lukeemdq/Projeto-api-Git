const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `
    <div class="info">
        <img src="${user.avatarUrl} alt="Foto do perfil do usuário" />
        <div class="data">
            <h1>${user.name ?? "Não possui nome cadastrado"}</h1>
            <p>${user.bio ?? "Não possui bio cadastrada"}</p>
            <p style="margin-top: 15px">👥 Seguindo ${user.following}</p> <p>👥 Seguidores ${user.followers} </p>
        </div>
    </div>
    `;
    let repositoriesItens = "";
    user.repositories.forEach((repo) => {
      repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name} <br> <span class="icones-repo">🍴${repo.forks} </span>
                                                                                        <span class="icones-repo">⭐${repo.stargazers_count} </span>
                                                                                        <span class="icones-repo">👀${repo.watchers} </span>
                                                                                        <span class="icones-repo">💻${repo.language} </span>   </a> </li>
                                                                                              `;
        
      
    });
    if(user.repositories.length > 0) {
        this.userProfile.innerHTML += `<div class="repositories section"
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                       </div>       `
      }
    let eventsItens = "";
    user.events.forEach((event) => {
        if(event.type === "CreateEvent") {
            eventsItens += `<p class"bold" style="font-weight: 800">${event.repo.name} - <span class="inline" style="display: inline"> Sem mensagem de commit </span> </p>  `
        }else {
            
            eventsItens += `<p class"bold" style="font-weight: 800">${event.repo.name} - <span class="inline" style="display: inline"> ${event.payload.commits[0].message} </span> </p> `
            
        }
        // eventsItens += `<p>${event.type}</p>`
    })
    this.userProfile.innerHTML += `<div class="events section"
                                        <p>${eventsItens}</p>
                                   </div>    `
                                   
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrato</h3>"
  },

};

export { screen };
