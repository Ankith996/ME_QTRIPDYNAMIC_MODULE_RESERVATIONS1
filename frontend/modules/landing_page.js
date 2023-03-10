import config from "../conf/index.js";

async function init() {
  
  //Fetches list of all cities along with their images and description
  console.log("init");
  let cities = await fetchCities();
  console.log("init", cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
}


//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
 try{ 
  const response = await fetch(config.backendEndpoint + "/cities");
  const data = await response.json();
  return data;
  
  
  // 1. Fetch cities using the Backend API and return the data
}
catch (error){
  console.log(error);
  return null;
}
}



//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let res =document.getElementById("data");
  let element = document.createElement("div");
  element.className = "col-6 col-lg-3 mb-4";
  element.innerHTML =`<a href = "pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
        <img class="img-responsive" src="${image}" />
    </div>
    </a>`;

 res.append(element);


  }
  


export { init, fetchCities, addCityToDOM };

