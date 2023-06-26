const showDetailsButton = document.getElementById("showDetails")
const inputYourProfileInput = document.getElementById("inputYourProfile")
const SelectsortDiv = document.getElementById("Selectsort")

let allreposDiv = document.querySelector(".allrepos")
let showReposDiv = document.getElementById("showRepos")
let repositoryDiv = document.querySelector(".repository")

document.addEventListener("DOMContentLoaded", function(event) {
    showReposDiv.style.display ="none";
    document.getElementById("profileInfo").style.display ="none";
  });



showDetailsButton.addEventListener("click", () =>{
    showReposDiv.style.display ="flex";
    document.getElementById("profileInfo").style.display ="block";

    let userName = inputYourProfileInput.value;

    fetch(`https://api.github.com/users/${userName}`)
            
    .then((res)=> res.json())
    .then((data)=> {
        console.log(data)
        const profileInfoDiv = document.getElementById("profileInfo")

        profileInfoDiv.innerHTML = `<div id="profileInfo">
                                    <div id="myProfile">
                                        <div id="myImg">
                                            <img id="image" src="${data.avatar_url }">
                                        </div>
                                        <div id="nameanddetails">
                                            <h2 id="name">${data.name}</h2>
                                            <p id="githubid">${data.login}</p>
                                            <p id="headline">${data.bio}</p>
                                            <p id="followersandfollowing">follower:${data.followers} || following:${data.following}</p>
                                        </div>    
                                    </div>
                                </div>`
                     }   
        );  
        showRepos(userName)
        
}
)




function showRepos(name) {
    fetch(`https://api.github.com/users/${name}/repos`)
        .then((res) => res.json())
        .then((repos) => {
            console.log(repos);
            sortAndDisplayRepos(repos); // Sort and display repositories

        });
}

SelectsortDiv.addEventListener("change", () => {
    let userName = inputYourProfileInput.value;
    showRepos(userName); 
    
});







function sortAndDisplayRepos(repos) {
let selection = SelectsortDiv.value;
if (selection === "stars") {
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
} else if (selection === "forks") {
    repos.sort((a, b) => b.forks - a.forks);
} else if (selection === "size") {
    repos.sort((a, b) => b.size - a.size);
} else {
    return;
}

allreposDiv.innerHTML = ""; 

for (let i = 0; i < repos.length; i++) {
    allreposDiv.innerHTML += `
        <div class="repository" id="repository${i}">
            <img id="proimage" src="project-management_001.png">
            <p id="prodescription">${repos[i].description}</p>
            <p> stars: ${repos[i].stargazers_count} || forks: ${repos[i].forks} || size: ${repos[i].size}</p>
            <button id="checkoutproject"><a href="${repos[i].html_url}">Do Checkout This Project</a></button>
        </div>`;
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const searchbarInput = document.getElementById("searchbar")
const searchButton = document.getElementById("search")


searchbarInput.addEventListener("keyup", ()=>{

    let userName = inputYourProfileInput.value;
    let searchQuery = searchbarInput.value;
    
        fetch(`https://api.github.com/users/${userName}/repos`)
            .then((res) => res.json())
            .then((repos) => {
                console.log(repos)

                

                console.log(searchQuery)

                var filteredRepos = repos.filter((element) => {
                  return element.name.toLowerCase().includes(searchQuery.toLowerCase())
                })
          
                console.log(filteredRepos);

                allreposDiv.innerHTML = ""; 

                for (let i = 0; i < filteredRepos.length; i++) {
                    allreposDiv.innerHTML += `
                        <div class="repository" id="repository${i}">
                            <img id="proimage" src="project-management_001">
                            <p id="prodescription">${filteredRepos[i].description}</p>
                            <p> stars: ${filteredRepos[i].stargazers_count} || forks: ${filteredRepos[i].forks} || size: ${repos[i].size}</p>
                            <button id="checkoutproject"><a href="${repos[i].html_url}">Do Checkout This Project</a></button>
                        </div>`;
                }
                            });

                } )



