import {
    searchData,
    sortData,
    filterDataByDirectorProducer,
    //filterDataBy,
    getDataFilterBy,
    getNamesDirectorProducer
} from './data.js';
import data from './data/ghibli/ghibli.js';

// Navegation
const menuBurguer = document.querySelector("#menuBurguer");
const menuDropdown = document.querySelector(".menu__dropdown");

// Home page
const searchFilms = document.querySelector('#searchFilm');
const filterByDirectorProducer = document.querySelector("#filterByDirectorProducer");
const sortBy = document.querySelector("#sortBy");
const orderData = document.querySelector("#orderData");
const filmsCounter = document.querySelector("#filmsCounter");
const filmsContainer = document.querySelector('.container__films');

// Film Page
const returnBack = document.querySelector(".container__returnBack");
const filmInformation = document.querySelector(".film__information");
const containerPeople = document.querySelector(".container__people");
const containerLocations = document.querySelector(".container__locations");
const containerVehicles = document.querySelector(".container__vehicle");

// Default variables
const allDataFilms = data.films;
let dataFilms = data.films;
let sortOrder = 'asc';

const deleteChilds = (container) => {
    while(container.lastChild){
        container.removeChild(container.lastChild);
    }
}

const showDataFilms = (films) => {
    deleteChilds(filmsContainer);
    if(films.length === 0){
        const text = document.createTextNode("Film not found");
        filmsContainer.appendChild(text);
    }else{
        const sortedData = sortData(films, sortBy.value, sortOrder)
        sortedData.forEach(film => {
            const {people, locations, vehicles, ...information} = film;
            // Show Films
            const container = document.createElement('section');
            container.classList.add('container__card');
            container.appendChild(cardTemplate(information));
            filmsContainer.appendChild(container);
            //Show page film
            container.addEventListener("click", () => {
                deleteChilds(containerPeople);
                deleteChilds(containerLocations);
                deleteChilds(containerVehicles);
                navigateTo('film');
                addFilmInformation(information);
                //addFilmPeople(people);
                addFilmOthers(people, containerPeople, 'Characters');
                if(locations.length !== 0){
                    containerLocations.classList.remove("disable");
                    addFilmOthers(locations, containerLocations, 'Locations');
                }else{
                    containerLocations.classList.add("disable");
                }
                if(vehicles.length !== 0){
                    containerVehicles.classList.remove("disable");
                    addFilmOthers(vehicles, containerVehicles, 'Vehicles');
                }else{
                    containerVehicles.classList.add("disable");
                }
            });
        });
    }
    filmsCounter.innerHTML = `Showing ${films.length}`;
}

const cardTemplate = ({title, poster, name, img}) => {
    const template = document.getElementById("card").content,
    fragment = document.createDocumentFragment();
    template.querySelector("figcaption").textContent = (title||name);
    template.querySelector("img").setAttribute("src", (poster||img));
    template.querySelector("img").setAttribute("alt", (title||name));
    const clone = document.importNode(template, true);
    fragment.appendChild(clone);
    return fragment;
}

const addFilmInformation = (film) => {
    filmInformation.innerHTML = "";
    filmInformation.innerHTML = `
        <section class='divison'>
            <h1 class='mainTitle'>${film.title}</h1>
            <section class='container__row'>
                <article class='container__text'>
                    <div class="starEmpty">
                        <div class="starFull" style='width:${film.rt_score}%'></div>
                    </div>
                    <p class='paragraph'>${film.rt_score}/100</p>
                </article>
                <article class='container__text'>
                    <h3 class='subtitle'>Release date: </h3>
                    <p class='paragraph'>${film.release_date}</p>
                </article>
            </section>
                <article class='container__description'>
                    <p class='paragraph'>${film.description}</p>
                </article>
                <section class='container__row'>
                    <article class='container__text'>
                        <h3 class='subtitle'>Producer: </h3>
                        <p class='paragraph'> ${film.producer}</p>
                    </article>
                <article class='container__text'>
                    <h3 class='subtitle'>Director: </h3>
                    <p class='paragraph'> ${film.director}</p>
                </article>
                </section>
        </section>
        <section class='film__poster'>
            <img class="film__image" src='${film.poster}'loading='lazy'>
        </section>
        `;
        /*const rating = data.films.forEach(film=>{
            film.rt_score;
            //console.log(film.rt_score)
            const percentageRounded = `${Math.round(film.rt_score/10)*10}%`;
            console.log(percentageRounded);
            document.querySelector("#starFull").style.width = percentageRounded;
        });*/
}
/*
const addFilmPeople = (people) => {
    // Default Varibles characters
    let characters = people;
    let sortCharactersOrder = 'asc';
    // Container
    containerPeople.innerHTML = `
        <section class="secondaryTitle">
            <h2 class="subtitle">Characters</h2>
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

    searchCharacter.addEventListener("keyup",()=>{
        characters = searchData(people, 'name', searchCharacter.value.toLocaleLowerCase());
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    });

    filterCharacterByGender.addEventListener("change", ()=>{
        searchCharacter.value = "";
        if(filterCharacterByGender.value === 'all'){
            characters = people;
        }else{
            characters = filterDataBy(people,'gender',filterCharacterByGender.value);
        }
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    })

    filterCharacterBySpecie.addEventListener("change", ()=>{
        searchCharacter.value = "";
        if(filterCharacterBySpecie.value === 'all'){
            characters = people;
        }else{
            characters = filterDataBy(people,'specie',filterCharacterBySpecie.value);
        }
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    })

    sortCharacterBy.addEventListener("change", () => {
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    });

    orderCharacter.addEventListener("click", () => {
        sortCharactersOrder = (orderCharacter.classList.length === 3 ? 'asc' : 'desc');
        orderCharacter.classList.toggle("fa-sort-amount-up-alt");
        showCharacters(containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter);
    });
}*/

const addFilmOthers = (data, containerFilmInformation, title) => {
    containerFilmInformation.innerHTML = `
        <section class="container__subtitle">
            <h2 class="subtitle">${title}</h2>
            <p class="showing">Showing ${data.length}</p>
        </section>
    `;
    const containerCards = document.createElement("section");
    containerFilmInformation.appendChild(containerCards);
    const sortedData = sortData(data, 'name', 'asc');
    // Show Data
    containerCards.classList.add('container__cards');
    sortedData.forEach(item => {
        const card = document.createElement('figure');
        card.setAttribute('class', 'container__card container__card-film');
        card.appendChild(cardTemplate(item));
        containerCards.appendChild(card);
        //Add new page
        card.addEventListener("click", ()=>{
            alert(`hola ${title}`);
        });
    });
}

// Show characters
/*
const showCharacters = (containerCharacters, characters, sortCharacterBy, sortCharactersOrder, charactersCounter) => {
    deleteChilds(containerCharacters);
    if(characters.length === 0){
        containerCharacters.innerHTML = "Character not found";
    }else{
        const sortedCharacterData = sortData(characters, sortCharacterBy.value, sortCharactersOrder);
        // Show Data
        containerCharacters.classList.add('container__cards');
        sortedCharacterData.forEach(person => {
            const container = document.createElement('figure');
            container.setAttribute('class', 'container__card container__card-film');
            container.appendChild(cardTemplate(person));
            containerCharacters.appendChild(container);
            container.addEventListener('click', ()=>{
                alert(`${person.name}`);
            });
        });
    }
    charactersCounter.innerHTML = `Showing ${characters.length}`;
}*/

const navigateTo = (idPage) => {
    document.querySelectorAll(".container").forEach(page => {
        (page.id == idPage)? page.classList.remove('disable') : page.classList.add('disable');
        window.scrollTo(0,0);
    })
};

const addFilterBy = (filter, data, condition = 'DirectorProducer') => {
    const conditionFiltered = (condition == 'DirectorProducer')? getNamesDirectorProducer(data): getDataFilterBy(data, condition);
    for (const item of conditionFiltered){
        const option = document.createElement("option");
        option.value = item;
        option.text = item;
        filter.appendChild(option);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    showDataFilms(allDataFilms);
    addFilterBy(filterByDirectorProducer, allDataFilms);
});

//Menu Toggle navegation
menuBurguer.addEventListener("click", () => {
    menuBurguer.classList.toggle("fa-times");
    menuDropdown.classList.toggle("disable");
});

document.querySelectorAll(".menu__item").forEach((link) => {
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        navigateTo(link.getAttribute("href").slice(1));
        menuBurguer.classList.toggle("fa-times");
        menuDropdown.classList.toggle("disable");
    });
});

returnBack.addEventListener("click", () => {
    navigateTo('home');
});

searchFilms.addEventListener('keyup', () => {
    dataFilms = searchData(allDataFilms, 'title', searchFilms.value);
    showDataFilms(dataFilms);
});

filterByDirectorProducer.addEventListener("change", () => {
    searchFilms.value = "";
    dataFilms = (filterByDirectorProducer.value === 'all')? allDataFilms : filterDataByDirectorProducer(allDataFilms,filterByDirectorProducer.value);
    showDataFilms(dataFilms);
});

sortBy.addEventListener("change", () => {
    showDataFilms(dataFilms);
});

orderData.addEventListener("click", () => {
    sortOrder = (orderData.classList.length === 3 ? 'asc' : 'desc');
    orderData.classList.toggle("fa-sort-amount-up-alt");
    showDataFilms(dataFilms);
});