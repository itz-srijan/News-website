const API_KEY = "3802ba8ef534d9856493a9d495404600";

const url = "https://gnews.io/api/v4/top-headlines?category=general&apikey=";

// responsive navbar
const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector("header");

const toggleNavbar = () => {
  // alert("Plz Subscribe ");
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());

// news fetching
window.addEventListener("load", () => fetchNews("general"));

function reload() {
    window.location.reload();
}

async function fetchNews(category) {
    const res = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&lang=en`);
    const data = await res.json();
    bindData(data.articles)
    console.log(data)
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
    toggleNavbar()
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
async function fetchSearchNews(query){
    const res = await fetch(`https://gnews.io/api/v4/search?q=${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles)
    console.log(data)
}
function searchNews(){
    const query = searchText.value;
    if (!query) return;
    fetchSearchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}
searchText.addEventListener("keypress", function(event){
    if(event.key === "Enter")
    searchNews()
})
searchButton.addEventListener("click", function(){
    searchNews()
})