const BASE_URL = "http://localhost:3000/articles";
const list = document.getElementById("article-list");
const form = document.getElementById("article-form");
const detail = document.getElementById("article-detail");

// Fetch and render all articles
function fetchArticles() {
  fetch(BASE_URL)
    .then(resp => resp.json())
    .then(articles => {
      list.innerHTML = "";
      articles.forEach(renderArticleTitle);
    });
}

// Render an article title to the list
function renderArticleTitle(article) {
  const li = document.createElement("li");
  li.textContent = article.title;
  li.style.cursor = "pointer";
  li.addEventListener("click", () => fetchArticleDetail(article.id));
  list.appendChild(li);
}

// Fetch and show single article
function fetchArticleDetail(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(resp => resp.json())
    .then(article => {
      detail.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.content}</p>
      `;
    });
}

// Handle form submit to add a new article
form.addEventListener("submit", e => {
  e.preventDefault();
  const newArticle = {
    title: form.title.value,
    content: form.content.value
  };

  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newArticle)
  })
    .then(resp => resp.json())
    .then(article => {
      renderArticleTitle(article);
      form.reset();
    });
});

// Initial load
fetchArticles();

