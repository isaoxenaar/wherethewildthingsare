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
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`);
    }

    return responses;
  })
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  .then((depths) => depths.forEach((depth) => console.log(depth)));
