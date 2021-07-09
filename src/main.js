import { searchData, sortData , filterDataByDirectorProducer, filterDataBy } from './data.js';
import data from './data/ghibli/ghibli.js';

// Navegation
const menuBurguer = document.querySelector("#menuBurguer");
const menuDropdown = document.querySelector(".menu__dropdown");
const urlHome = document.querySelector("#urlHome");
const urlCharacters = document.querySelector("#urlCharacters");
const containerPages = document.querySelectorAll(".container");

// Home page
const searchFilms = document.querySelector('#searchFilm');
const filterByDirectorProducer = document.querySelector("#filterByDirectorProducer");
const sortBy = document.querySelector("#sortBy");
const orderData = document.querySelector("#orderData");
const counter = document.querySelector("#filmsCounter");
const filmsContainer = document.querySelector('.container__films');

// Movie/Film Page
const returnBack = document.querySelector(".container__returnBack");
const filmInformation = document.querySelector(".film__information");

//characters Filter
const containerPeople = document.querySelector(".container__people");

// Default variables
let dataFilms = data.films;
let sortOrder = 'asc';

function showDataFilms(films){
    filmsContainer.innerHTML = "";
    if(films.length === 0){
        filmsContainer.innerHTML = "Film not found";
    }else{
        // Ordered data
        const sortedData = sortData(films, sortBy.value, sortOrder)
        // Show Data
        sortedData.forEach(film => {
            const container = document.createElement('section');
            container.className = 'container__card';
            container.innerHTML = `
                <section class='card__title'>
                    ${film.title}
                </section>
                <img class='card__image' src='${film.poster}' alt='${film.title}' title='${film.title}' loading='lazy'>
            `;
            filmsContainer.appendChild(container);
            container.addEventListener("click", () => {
                //Show page film
                navegation('film');
                addFilmInformation(film);
                //funtion personaje
                addFilmPeople(film);
                if(film.locations.length !== 0){
                    //funcion add location
                }
                if(film.vehicles.length !== 0){
                    //funcion add vehi
                }
            });
        });
    }
    counter.innerHTML = `Showing ${films.length}`;
}

function addFilmInformation(film){
    //Film Information
    filmInformation.innerHTML = "";
    filmInformation.innerHTML = `
        <h1 class='mainTitle'>${film.title}</h1>
            <article class='container__text'>
                <i class="fas fa-star"></i>
                <p class='paragraph'>${film.rt_score}/100</p>
            </article>
            <article class='container__text'>
                <h3 class='subtitle'>Release date: </h3>
                <p class='paragraph'>${film.release_date}</p>
            </article>
            <article class='container__description'>
                <p class='paragraph'>${film.description}</p>
            </article>
            <section class='container__directorProducer'>
                <article class='container__text'>
                    <h3 class='subtitle'>Producer: </h3>
                    <p class='paragraph'> ${film.producer}</p>
                </article>
            <article class='container__text'>
                <h3 class='subtitle'>Director: </h3>
                <p class='paragraph'> ${film.director}</p>
            </article>
            </section>
            <img class="film__image" src='${film.poster}'loading='lazy'>
        `;
}

function addFilmPeople({people}){
    // Default Varibles characters
    let characters = people;
    let sortCharactersOrder = 'asc';
    // Container
    containerPeople.innerHTML = `
        <section class="secondaryTitle">
            <h2>Characters</h2>
        </section>
        `;
    // Menu Characters Bar
    const menuCharactersBar = document.createElement("section");
    menuCharactersBar.className = "menuBar";
    // Add search character by name
    const containerSearchCharacter = document.createElement("section");
    const searchCharacter = document.createElement("input");
    searchCharacter.type = "text";
    searchCharacter.className = "menuBar__search";
    searchCharacter.placeholder = "Search character";
    containerSearchCharacter.appendChild(searchCharacter);
    // Add filter character by gender
    const containerFilterCharacterByGender = document.createElement("section");
    containerFilterCharacterByGender.className = "filter";
    const filterCharacterByGender = document.createElement("select");
    filterCharacterByGender.className = "filter__comboBox";
    filterCharacterByGender.innerHTML = `
        <option value="all" disabled selected>Gender</option>
        <option value="all">All</option>
        `;
    addFilterBy(filterCharacterByGender, people, "gender");
    containerFilterCharacterByGender.appendChild(filterCharacterByGender);
    // Add filter character by species
    const containerFilterCharacterBySpecie = document.createElement("section");
    containerFilterCharacterBySpecie.className = "filter";
    const filterCharacterBySpecie = document.createElement("select");
    filterCharacterBySpecie.className = "filter__comboBox";
    filterCharacterBySpecie.innerHTML = `
    <option value="all" disabled selected>Specie</option>
    <option value="all">All</option>
    `;
    addFilterBy(filterCharacterBySpecie, people, "specie");
    containerFilterCharacterBySpecie.appendChild(filterCharacterBySpecie);
    //Add order characters
    const containerOrderCharacter = document.createElement("section");
    containerOrderCharacter.className = "filter";
    const sortCharacterBy = document.createElement("select");
    sortCharacterBy.className = "filter__comboBox";
    sortCharacterBy.innerHTML = `
        <option value="name" disabled selected>Order by</option>
        <option value="name">Name</option>
    `;
    const orderCharacter = document.createElement("i");
    orderCharacter.className = "fas fa-sort-amount-down-alt";
    containerOrderCharacter.appendChild(sortCharacterBy);
    containerOrderCharacter.appendChild(orderCharacter);
    //Add show counter
    const charactersCounter = document.createElement("section");
    charactersCounter.className = "menuBar__showing";
    charactersCounter.innerHTML = `Showing ${people.length}`;
    // Menu character bar
    const containerCharacters = document.createElement("section");
    menuCharactersBar.appendChild(containerSearchCharacter);
    menuCharactersBar.appendChild(containerFilterCharacterByGender);
    menuCharactersBar.appendChild(containerFilterCharacterBySpecie);
    menuCharactersBar.appendChild(containerOrderCharacter);
    menuCharactersBar.appendChild(charactersCounter);
    // Container People
    containerPeople.appendChild(menuCharactersBar);
    containerPeople.appendChild(containerCharacters);
    //Mostrar Character
    showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    //search
    searchCharacter.addEventListener("keyup",()=>{
        characters = searchData(people, 'name', searchCharacter.value.toLocaleLowerCase());
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    });
    // Filter characters by gender
    filterCharacterByGender.addEventListener("change", ()=>{
        searchCharacter.value = "";
        if(filterCharacterByGender.value === 'all'){
            characters = people;
        }else{
            characters = filterDataBy(people,'gender',filterCharacterByGender.value);
        }
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    })
    // Filter characters by specie
    filterCharacterBySpecie.addEventListener("change", ()=>{
        searchCharacter.value = "";
        if(filterCharacterBySpecie.value === 'all'){
            characters = people;
        }else{
            characters = filterDataBy(people,'specie',filterCharacterBySpecie.value);
        }
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    })
    // Order Films By
    sortCharacterBy.addEventListener("change", () => {
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    });
    // Order Data
    orderCharacter.addEventListener("click", () => {
        sortCharactersOrder = (orderCharacter.classList.length === 3 ? 'asc' : 'desc');
        orderCharacter.classList.toggle("fa-sort-amount-up-alt");
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    });
}

// Show characters
function showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter){
    containerCharacters.innerHTML = "";
    if(characters.length === 0){
        containerCharacters.innerHTML = "Character not found";
    }else{
        // Ordered data
        const sortedCharacterData = sortData(characters, sortCharacterBy.value, sortCharactersOrder);
        // Show Data
        containerCharacters.className = "container__characters";
        sortedCharacterData.forEach(person => {
            const {name, img} = person;
            const container = document.createElement('section');
            container.className = "container__card-film";
            container.innerHTML = `
                <section class='card__title-film'>
                    ${name}
                </section>
                <img class='card__image-film' src='${img}' alt='${name}' title='${name}' loading='lazy'>
            `;
            containerCharacters.appendChild(container);
        });
    }
    charactersCounter.innerHTML = `Showing ${characters.length}`;
}

document.addEventListener('DOMContentLoaded', () => {
    showDataFilms(data.films);
    addFilterBy(filterByDirectorProducer, data.films);
});

//Menu Toggle navegation
menuBurguer.addEventListener("click", ()=> {
    menuBurguer.classList.toggle("fa-times");
    menuDropdown.classList.toggle("disable");
});

// agregar addEventListener de navegation
urlHome.addEventListener("click", ()=>{
    navegation('home');
});

urlCharacters.addEventListener("click",()=>{
    navegation('allCharacters');
});

// Function navegation
function navegation(idPage){
    containerPages.forEach(item=>{
        if(item.id == idPage){
            item.classList.remove('disable');
        }else{
            item.classList.add('disable');
        }
    })
    window.scrollTo(0,0);
}

// Return Back
returnBack.addEventListener("click", ()=>{
    navegation('home');
});

// Functions add filter by
function deleteDataDuplicates(data){
    return data.filter((item, index)=>{
        return data.indexOf(item) === index;
    });
}

function getDataFilterBy(data, condition){
    const dataFilters = [];
    data.forEach(item =>{
        dataFilters.push(item[condition]);
    });
    return deleteDataDuplicates(dataFilters);
}

function addFilterBy(filter, data, condition ='DirectorProducer'){
    let conditionFiltered;
    if(condition == 'DirectorProducer'){
        conditionFiltered = getNamesDirectorProducer(data);
    }else{
        conditionFiltered = getDataFilterBy(data, condition);
    }
    for (const item of conditionFiltered){
        var option = document.createElement("option");
        option.value = item;
        option.text = item;
        filter.appendChild(option);
    }
}

// Functions add filter by director or producer
function getNamesDirectorProducer(films){
    const namesDirectorProducer = [];
    /* Add names of Directors and Producers */
    films.forEach(film => {
        namesDirectorProducer.push(film.director, film.producer);
    });
    /* Delete Duplicates */
    return deleteDataDuplicates(namesDirectorProducer);
}

// Search By Film
searchFilms.addEventListener('keyup', ()=>{
    dataFilms = searchData(data.films, 'title', searchFilms.value.toLowerCase());
    showDataFilms(dataFilms);
});

// Filter Director and Producer
filterByDirectorProducer.addEventListener("change", ()=>{
    searchFilms.value = "";
    if(filterByDirectorProducer.value === 'all'){
        dataFilms = data.films;
    }else{
        dataFilms = filterDataByDirectorProducer(data.films,filterByDirectorProducer.value);
    }
    showDataFilms(dataFilms);
});

// Order Films By
sortBy.addEventListener("change", () => {
    showDataFilms(dataFilms);
});

// Order Data
orderData.addEventListener("click", () => {
    sortOrder = (orderData.classList.length === 3 ? 'asc' : 'desc');
    orderData.classList.toggle("fa-sort-amount-up-alt");
    showDataFilms(dataFilms);
});


/*
//Usaremos esta parte para la segunda historia de usuario
    console.log(film.title);
    console.log(film.poster);
    film.people.map(person => {
        console.log(person.name);
        console.log(person.img);
    })
    if(film.locations.length != 0){
        film.locations.map(location => {
            console.log(location.name);
        })
    }else{
        console.log("No tiene locación");
    }

let prueba = data.films.forEach(film=> {
    film.people.forEach(person=>{
        console.log(person.name)
    })
    }
);
console.log(prueba);
*/
