const block = document.getElementById("block");

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((country) => {
      console.log(country);
      const li = document.createElement("li");
      const img = document.createElement("img");
      const h1 = document.createElement("h1");
      const h3 = document.createElement("h3");
      h1.textContent = country.name.common;
      h3.textContent = country.capital;
      img.setAttribute("src", `${country.flags.png}`);

      li.appendChild(img);
      li.appendChild(h1);
      li.appendChild(h3);
      block.appendChild(li);
    });
  })
  .catch((err) => {
    console.log(err);
  });
