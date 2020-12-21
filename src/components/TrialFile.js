const fetch = require("node-fetch");
const alert = require("alert");

let numbers = ["15", "25", "40"];

let requests = numbers.map((nr) =>
  fetch(
    `https://api.npolar.no/indicator/timeseries/?facets=label.en&q=&filter-systems=mosj.no&filter-authors.@id=met.no&filter-keywords.@value=land&filter-locations.placename=Janssonhaugen&filter-label.en=${nr}+m&format=json&variant=array&limit=1b`
  )
);

Promise.all(requests)
  .then((responses) => {
    // all responses are resolved successfully
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then((depths) => depths.forEach((depth) => console.log(depth)));

//.then((depths) => depths.forEach((depth) => alert(depth)));
