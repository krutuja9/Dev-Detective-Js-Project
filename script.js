 //Variables
 const searchbar = document.querySelector(".searchbar-container");
 const profilecontainer = document.querySelector(".profile-container");
 const root = document.documentElement.style;
 const get = (param) => document.getElementById(`${param}`);
 const url = "https://api.github.com/users/";
 const noresults = get("no-results");
 const btnmode = get("btn-mode");
 const modetext = get("mode-text");
 const modeicon = get("mode-icon");
 const btnsubmit = get("submit");
 const input = get("input");
 const avatar = get("avatar");
 const userName = get("name");
 const user = get("user");
 const date = get("date");
 const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 const bio = get("bio");
 const repos = get("repos");
 const followers = get("followers");
 const following = get("following");
 const user_location = get("location");
 const page = get("page");
 const twitter = get("twitter");
 const company = get("company");
 let darkMode = true;
 
 // Event Listeners
 btnsubmit.addEventListener("click", function () {
   if (input.value !== "") {
     getUserData(url + input.value);
   }
 });  
 
 input.addEventListener(
   "keydown",
   function (e) {
     if (e.key == "Enter") {
       if (input.value !== "") {
         getUserData(url + input.value);
       }
     }
   },
   false
 );
 
 input.addEventListener("input", function () {
   noresults.style.display = "none";
 });
 
 btnmode.addEventListener("click", function () {
   if (darkMode == false) {
     darkModeProperties();
   } else {
     lightModeProperties();
   }
 });
 
 // Functions
 
 //API CALL
 function getUserData(gitUrl) {
   fetch(gitUrl)
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
       updateProfile(data);
     })
     .catch((error) => {
       throw error;
     });
 }
 function getTrendingRepos() {
   const trendingReposUrl = "https://api.github.com/search/repositories?q=created:>2023-01-01&sort=stars&order=desc";
   fetch(trendingReposUrl)
     .then((response) => response.json())
     .then((data) => {
       const trendingReposGrid = document.getElementById("trending-repos-grid");
       trendingReposGrid.innerHTML = ""; // Clear the existing content
 
       data.items.slice(0, 6).forEach((repo) => {
         const repoCard = document.createElement("div");
         repoCard.classList.add("repo-card");
 
         const repoTitle = document.createElement("a");
         repoTitle.href = repo.html_url;
         repoTitle.textContent = repo.name;
 
         const repoDescription = document.createElement("p");
         repoDescription.textContent = repo.description || "No description available.";
 
         repoCard.appendChild(repoTitle);
         repoCard.appendChild(repoDescription);
         trendingReposGrid.appendChild(repoCard);
       });
     })
     .catch((error) => {
       console.error("Error fetching trending repositories:", error);
     });
 }
 
 // Fetch and display popular developers
 function getPopularDevelopers() {
   const popularDevsUrl = "https://api.github.com/search/users?q=followers:>1000&sort=followers&order=desc";
   fetch(popularDevsUrl)
     .then((response) => response.json())
     .then((data) => {
       const popularDevsGrid = document.getElementById("popular-developers-grid");
       popularDevsGrid.innerHTML = ""; // Clear the existing content
 
       data.items.slice(0, 14).forEach((developer) => {
         const devCard = document.createElement("div");
         devCard.classList.add("dev-card");
 
         const devName = document.createElement("a");
         devName.href = developer.html_url;
         devName.textContent = developer.login;
 
         devCard.appendChild(devName);
         popularDevsGrid.appendChild(devCard);
       });
     })
     .catch((error) => {
       console.error("Error fetching popular developers:", error);
     });
 }
 getTrendingRepos();
 getPopularDevelopers();
 
 
 
 
 //RENDER
 function updateProfile(data) {
   if (data.message !== "Not Found") {
     noresults.style.display = "none";
     function checkNull(param1, param2) {
       if (param1 === "" || param1 === null) {
         param2.style.opacity = 0.5;
         param2.previousElementSibling.style.opacity = 0.5;
         return false;
       } else {
         return true;
       }
     }
     avatar.src = `${data.avatar_url}`;
     userName.innerText = data.name === null ? data.login : data.name;
     user.innerText = `@${data.login}`;
     user.href = `${data.html_url}`;
     datesegments = data.created_at.split("T").shift().split("-");
     date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
     bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
     repos.innerText = `${data.public_repos}`;
     followers.innerText = `${data.followers}`;
     following.innerText = `${data.following}`;
     user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
     page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
     page.href = checkNull(data.blog, page) ? data.blog : "#";
     twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
     twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
     company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
     searchbar.classList.toggle("active");
     profilecontainer.classList.toggle("active");
   } else {
     noresults.style.display = "block";
   }
 }
 
 
 
 //SWITCH TO DARK MODE - activateDarkMode()
 function darkModeProperties() {
   root.setProperty("--lm-bg", "#141D2F");
   root.setProperty("--lm-bg-content", "#1E2A47");
   root.setProperty("--lm-text", "white");
   root.setProperty("--lm-text-alt", "white");
   root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
 
   
   modeicon.src = "./assets/images/sun-icon.svg";
   root.setProperty("--lm-icon-bg", "brightness(1000%)");
   darkMode = true;
   console.log("darkmode changed to " + darkMode);
   localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");
 
   console.log("setting dark mode to true");
 
 }
 
 //SWITCH TO LIGHT MODE - activateLightMode()
 function lightModeProperties() {
   root.setProperty("--lm-bg", "#F6F8FF");
   root.setProperty("--lm-bg-content", "#FEFEFE");
   root.setProperty("--lm-text", "#4B6A9B");
   root.setProperty("--lm-text-alt", "#2B3442");
   root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
   // modetext.innerText = "DARK";
   modeicon.src = "./assets/images/moon-icon.svg";
   root.setProperty("--lm-icon-bg", "brightness(100%)");
   darkMode = false;
   console.log("darkmode changed to " + darkMode);
 
   localStorage.setItem("dark-mode", false);
   console.log("setting dark mode to false");
 }
 
 
 //INITIALISE UI
 function init() {
   //initialise dark-mode variable to false;
   //darkMode = true -> dark mode enable karna h 
   //darMode = false -> light mode enable karna h 
   darkMode = false;
 
   //HW
 // const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
 
   const value = localStorage.getItem("dark-mode");
 
   if(value === null) {
     console.log("null k andar");
     localStorage.setItem("dark-mode", darkMode);
     lightModeProperties();
   }
   else if(value == "true") {
     console.log("truer k andar");
     darkModeProperties();
   }
   else if(value == "false") {
     console.log("false k andar");
     lightModeProperties();
   }
 
 
   //by default, pranaygupta ki info show krre h UI pr
   getUserData(url + "krutuja9");
 }
 
 init();