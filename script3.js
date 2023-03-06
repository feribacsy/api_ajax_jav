'use strict';

const countriesContainer = document.querySelector('.countries');
const neighborContainer = document.querySelector('.neighbors');
function clearContainer() {
  document.querySelector(".countries").innerHTML = "";
  document.querySelector(".neighbors").innerHTML = "";
}
clearContainer();
const parameterCountry = function (data) {
  const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${
        (data.population / 1000000).toFixed(2) + ' millió'
      } people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
  
  //meg kell várni mielőtt hívod a neighbor függvényt,hogy a szerver válaszoljon és megérkezzen a data objektum
  
  for( var i=0;i<data.borders.length;i++ ) //a data objektum borders tömbje tartalmazza a 3 jegyű ország azonosítókat 
  {	  
	neighbor(data.borders[i]);
  }

};

const neighbor = function (codes) {
	  fetch(`https://restcountries.com/v2/alpha/${codes}`)
		.then(response => response.json())
    .then(data => parameterNeighbor(data));
     // a parameterNeighbor a callback amikor a válasz megjön a szervertől
	};


const parameterNeighbor = function (data) {
  //neighborContainer.innerHTML += data.name + ",";
	 const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(2) + ' millió'
      } people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  console.log(data);
  
  //neighborContainer.innerHTML+=data.name+",";
 
  neighborContainer.insertAdjacentHTML("beforeend", html);
  //neighborContainer.insertAdjacentHTML("afterbegin", html);
    neighborContainer.style.opacity = 1;
  };

 
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    /*.then(function (response) {
      console.log(response);
      return response.json();*/
    .then(response => response.json())
    /*.then(function (data) {
      parameterCountry(data[0]);
    })*/
    .then(data => parameterCountry(data[0]));
};
document.getElementById("btn-country").onclick = function () {
  
  
  countryValaszt();
}

function countryValaszt() {
  clearContainer();
  let orszagNev = document.getElementById("countrySelect");
let valaszt = orszagNev.value;
    getCountryData(valaszt);
}
 

let szomszedbol = document
  .querySelector(".neighbors")
  .addEventListener("click", function () {
    let kattintottNev = document.querySelector(".country__name").innerHTML;
    console.log(kattintottNev);
  });