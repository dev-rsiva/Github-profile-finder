const userNameInput = document.getElementById("userName")
const showDetailsButton = document.getElementById("showDetails")
const profileInfoDiv = document.getElementById("profileInfo")
const myprofileInfoDiv = document.getElementById("myprofileInfo")

const reposInfoDiv = document.getElementById("reposInfo")

const sortmenuSelect = document.getElementById("sortmenu")

const searchBarInput = document.getElementById("searchBar")


window.addEventListener("DOMContentLoaded", async () => {

  
  
  const response = await fetch("https://api.github.com/users/dev-rsiva");
  const data = await response.json();
  myProfile(data);

  profileInfoDiv.style.display = "none";
  reposInfoDiv.style.display = "none";

});


function myProfile(data){
  myprofileInfoDiv.innerHTML = `<div id="myprofileInfo">
  <div class="myprofile-img">
          <img src="${data.avatar_url}" alt="${data.name}">
  </div>
   
  <div class="myprofile-body">
          <div class="myprofile-title">${data.name}</div>
          <div class="myprofile-subHeading">${data.login}</div>
          <div class="myprofile-text">
              <p> ${data.bio} </p>
              <p> ${data.followers} followers ${data.following} following </p>
              <button><a href=${data.repos_url}>Do Checkout Projects</a></button>
          </div>
  </div>
</div>`

  }



showDetailsButton.addEventListener("click", async ()=>{

  myprofileInfoDiv.style.display = "none";
  profileInfoDiv.style.display = "flex";
  reposInfoDiv.style.display = "flex";
  
  
    const userName = userNameInput.value;

    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    console.log(data);

        showProfile(data);
        showReposInfo(userName)

})

        function showProfile(data){
        profileInfoDiv.innerHTML = `<div id="profileInfo">
        <div class="profile">
            <div class="profile-img">
                <img src="${data.avatar_url}" alt="${data.name}">
            </div>
            <div class="profile-body">
                <div class="profile-title">${data.name}</div>
                <div class="profile-subHeading">${data.login}</div>
                <div class="profile-text">
                    <p> ${data.bio} </p>
                    <p> ${data.followers} followers ${data.following} following </p>
                    <button><a href=${data.repos_url}>Do Checkout Projects</a></button>
                </div>
            </div>
        </div>

    </div>`

        }

        
        
          
        


async function showReposInfo(userName){

  reposInfoDiv.innerHTML = '';
   const res = await fetch(`https://api.github.com/users/${userName}/repos`)
       const projects = await res.json()
        
            console.log(projects)

            let sortRepos = [...projects];

         

            const sortValue = sortmenuSelect.value;

            if (sortValue === "forks") {
              sortRepos.sort((a, b) => b.forks - a.forks);
            } else if (sortValue === "stars") {
              sortRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            } else if (sortValue === "size") {
              sortRepos.sort((a, b) => b.size - a.size);
            } else {
              sortRepos.sort((a, b) => a.id - b.id); // Default sort by project ID
            }
           
            
            

            for(let i=0; i<sortRepos.length; i++){

              let languageColor = langColor() ;
                
            function langColor(){
                if (sortRepos[i].language === "JavaScript") {
                  return '<span class="repo-language-color" style="background-color: #f1e05a"></span>';
                } else if (sortRepos[i].language === "C++") {
                  return '<span class="repo-language-color" style="background-color: #f34b7d"></span>';
                } else if (sortRepos[i].language === "CSS") {
                  return '<span class="repo-language-color" style="background-color: #f1e05a"></span>';
                } else if (sortRepos[i].language === "TypeScript") {
                  return '<span class="repo-language-color" style="background-color: #3178c6"></span>';
                } else if (sortRepos[i].language === "Java") {
                  return '<span class="repo-language-color" style="background-color: #b07219"></span>';
                } else if (sortRepos[i].language === "Jupyter Notebook") {
                  return '<span class="repo-language-color" style="background-color: #555555"></span>';
                } else if (sortRepos[i].language === "HTML") {
                  return '<span class="repo-language-color" style="background-color: #e34c26"></span>';
                } else  {
                    return '<span class="repo-language-color" style="background-color: #f1e05a"></span>';
                  }
              }

                reposInfoDiv.innerHTML += `<div class="hidden" id="reposInfo${i}">
                <div class="card">
                    <div class="card-body">
                        
                        <div class="card-title"><i class="fa-duotone fa-file-lines fa-xl"></i> <b>${sortRepos[i].name }</b></div>
                        <div class="card-description">${sortRepos[i].description}</div>

                        <div class="card-otherDetails">

                        <div class="language">
                        <div class="icon" id="languageColor" >${languageColor}</div>
                        <div id="language-Name">${sortRepos[i].language}</div>
                        </div>

                        <div class="stargazers">
                        <div class="icon" id="stargazersIcon">
                        <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path></svg>
                        </div>
                        <div id="numberOfStargazers">${sortRepos[i].stargazers_count}</div>                      
                        </div>

                        <div class="forks">
                        <div class="icon" id="forksIcon">
                        <svg aria-label="fork" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>
                        </div>
                        <div id="numberOfForks">${sortRepos[i].forks}</div>                      
                        </div>
                        
                        <div class="files">
                        <div class="icon" id="card-fileSize">${sortRepos[i].size.toLocaleString("en-US")}KB</div>
                        </div>
                        
                        </div>
                        </div>

                        <div id="card-text">
                            <button><a href=${sortRepos[i].html_url}>Do Checkout this Project</a></button>
                        </div>`

                        
        
                    };
                }

                

