
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const queryString = window.location.search;
  const params = new URLSearchParams(search);
  console.log(params);
  const city = params.get("city");
  console.log(city)
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  console.log(city);
  try{
    const response = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    const data = await response.json();
    console.log(data);
    return data;
  }catch(error){
    console.log(error);
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  document.getElementById('data').textContent = "";
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let container = document.getElementById("data");
  adventures.forEach(key =>{
    let div = document.createElement("div");
    div.className = "col-6 col-lg-3 mb-3";
    div.innerHTML = `<a href="detail/?adventure=${key.id}"
    id="${key.id}">
    <div class="activity-card">
   
    <img src="${key.image}
    class="activity-card-image" alt="${key.name}"/>
   
    <div class="category-banner">${key.category}</div>
    <div class="w-100">
    <div class ="d-md-flex justify-content-between px-3">
    <h6>${key.name}</h6>
    <p>${key.costPerHead}</p>
    </div>
    <div class="d-md-flex justify-content-between px-3">
    <h6>Duration</h6>
    <p>${(key.duration)}hours</p>
    </div>
    </div>
    </div>
    
    </a>`

    container.append(div);
  });
  console.log(adventures)

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 
 return list.filter((adv)=> adv.duration >= low && adv.duration <= high)

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  console.log(categoryList)
  return list.filter((adv) => categoryList.indexOf(adv.category) > -1)

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.duration && filters.category.length){
    let filteredList = filterByDuration(list, parseInt(filters.duration.split('-')[0]), parseInt(filters.duration.split('-')[1]))
    return filterByCategory(filteredList, filters.category)
  }
  if (filters.duration){
    
    return filterByDuration(list, parseInt(filters.duration.split('-')[0]), parseInt(filters.duration.split('-')[1]))
  }
  if (filters.category.length){
    
    return filterByCategory(list, filters.category)
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
 localStorage.setItem('filters' , JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = JSON.parse(localStorage.getItem('filters'));
  return filters;
  


  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters["duration"];
  const categoryFilter = filters["category"];
  categoryFilter.forEach(Element =>{
    let div = document.createElement("div");
    div.className ="category-filter"
    div.innerHTML =`<div>${Element}</div>`
    document.getElementById("category-list").append(div);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
