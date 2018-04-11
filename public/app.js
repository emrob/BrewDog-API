const app = function(){
const url = 'https://api.punkapi.com/v2/beers'
makeRequest(url, requestComplete)
let jsonString = localStorage.getItem("currentBeer");
let saveBeer = JSON.parse(jsonString)
beerDetails(saveBeer)
}



const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};


const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateSelect(beers);
  getBeer(beers)
};

const populateSelect = function(beers) {
  const select = document.getElementById('beer-list')
  beers.forEach(function(beer, index) {
    let option = document.createElement('option')
    option.innerText = beer.name
    option.value = index
    select.appendChild(option)
  })
}

const getBeer = function (beers) {
  const selectedBeer = document.querySelector('select')
  selectedBeer.addEventListener('change', function() {
    let beer = beers[this.value]
    saveBeer(beer)
    beerDetails(beer)
  })
}

const beerDetails = function (beer) {
  const div = document.getElementById('beer-details')
  clearContent(div)
  const beerName = document.createElement('p')
  beerName.innerText = `Brand: ${beer.name}`
  const beerIngred = document.createElement('p')
  beerIngred.innerText = `Ingredients: ${beer.ingredients[0]}`
  const beerLogo = document.createElement('img')
  beerLogo.src = beer.image_url
  div.appendChild(beerName)
  div.appendChild(beerIngred)
  div.appendChild(beerLogo)
  return div
}

const saveBeer = function(beer){
  const jsonString = JSON.stringify(beer);
  localStorage.setItem('currentBeer', jsonString);
}



const clearContent = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}


window.addEventListener('load', app);
