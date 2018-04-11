var beers;

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();

};

const requestComplete = function(){
  if (this.status !== 200) return;
  const jsonString = this.responseText;

  beers = JSON.parse(jsonString);

  populateList(beers);
};

const app = function(){
const button = document.getElementById("fetchBeer");
button.addEventListener("click", function(){ 
const url = "https://api.punkapi.com/v2/beers";
makeRequest(url, requestComplete);
// const selected = document.getElementById('beer-list');
// selected.addEventListener('change', handleSelectChange) //change is a key word for a select drop down
});
}




const populateList = function(beers){
  const select = document.getElementById("beer-list");

  for(let beer of beers){
  const option = document.createElement("option");
  option.innerText = beer.name;
  select.appendChild(option);
}

};


window.addEventListener('load', app);
