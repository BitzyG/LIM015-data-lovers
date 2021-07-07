import { searchDataFilms, sortData , filterDataByDirectorProducer } from './data.js';
import data from './data/ghibli/ghibli.js';

// Navegation
const menuBurguer = document.getElementById("menuBurguer");
const menuDropdown = document.querySelector(".menu__dropdown");


// Pages
const home = document.getElementById("home");
const movie = document.getElementById("film");
//const characters = document.getElementById("allCharacters");

// Home page
const searchFilms = document.getElementById('searchFilm');
const filterByDirectorProducer = document.getElementById("filterByDirectorProducer");
const sortBy = document.querySelector("#sortBy");
const orderData = document.getElementById("orderData");
const counter = document.querySelector(".menuBar__showing");
const filmsContainer = document.querySelector('.container__films');

// Movie/Film Page
const filmInformation = document.querySelector(".container__generalInformation");

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
            // Add modal
            container.addEventListener("click", () => {
                home.classList.add("disable");
                movie.classList.remove("disable");
                //Add content sections
                filmInformation.innerHTML = `
                <section>${film.title}</section>
                `;
            });
        });
    }
    counter.innerHTML = `Showing ${films.length}`;
}

document.addEventListener('DOMContentLoaded', () => {
    showDataFilms(sortData(dataFilms, sortBy.value, sortOrder));
    addFilterByDirectorProducer();
});

//Menu Toggle navegation
menuBurguer.addEventListener("click", ()=> {
    menuBurguer.classList.toggle("fa-times");
    menuDropdown.classList.toggle("disable");
});

// agregar addEventListener de navegation


// Functions add filter by director or producer
function getNamesDirectorProducer(films){
    const namesDirectorProducer = [];
    /* Add names of Directors and Producers */
    films.forEach(film => {
        namesDirectorProducer.push(film.director);
        namesDirectorProducer.push(film.producer);
    });
    /* Delete Duplicates */
    return namesDirectorProducer.filter((item, index)=>{
        return namesDirectorProducer.indexOf(item) === index;
    });
}

function addFilterByDirectorProducer(){
    const namesDirectorProducer = getNamesDirectorProducer(data.films);
    for (const name of namesDirectorProducer){
        var option = document.createElement("option");
        option.value = name;
        option.text = name;
        filterByDirectorProducer.appendChild(option);
    }
}

// Search By Film
searchFilms.addEventListener('keyup', ()=>{
    dataFilms = searchDataFilms(data.films, searchFilms.value.toLowerCase());
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

