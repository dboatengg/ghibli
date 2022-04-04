const app = document.getElementById("root");
const logo = document.createElement("img");
logo.src = "logo.png";
app.appendChild(logo);
logo.className = "logo";

const container = document.createElement("div");
container.className = "container";

app.appendChild(container);

let request = new XMLHttpRequest();
request.open("GET", "https://ghibliapi.herokuapp.com/films");

request.onload = function () {
  let movies = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "card";
      container.appendChild(card);

      const banner = document.createElement("img");
      banner.className = "banner";
      banner.src = movie.movie_banner;

      const info = document.createElement("div");
      info.className = "info";

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;
      h1.className = "title";
      info.appendChild(h1);

      const p = document.createElement("p");
      movie.description = movie.description.substring(0, 200);
      p.textContent = `${movie.description}...`;
      info.appendChild(p);

      card.appendChild(banner);
      card.appendChild(info);
      info.appendChild(h1);
      info.appendChild(p);
    });
  } else {
    const errorMsg = document.createElement("h3");
    errorMsg.textContent = "Wrong info";
    app.appendChild(errorMsg);
  }
};

request.send();
