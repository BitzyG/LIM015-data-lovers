import { searchDataFilms, sortData , filterDataByDirectorProducer } from './data.js';
import data from './data/ghibli/ghibli.js';

// Navegation
const menuBurguer = document.getElementById("menuBurguer");
const menuDropdown = document.querySelector(".menu__dropdown");
const urlHome = document.getElementById("urlHome");
const urlCharacters = document.getElementById("urlCharacters");

// Pages
const home = document.getElementById("home");
const movie = document.getElementById("film");
const characters = document.getElementById("allCharacters");

// Home page
const searchFilms = document.getElementById('searchFilm');
const filterByDirectorProducer = document.getElementById("filterByDirectorProducer");
const sortBy = document.querySelector("#sortBy");
const orderData = document.getElementById("orderData");
const counter = document.querySelector(".menuBar__showing");
const filmsContainer = document.querySelector('.container__films');

// Movie/Film Page
const filmInformation = document.querySelector(".film__information");

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
urlHome.addEventListener("click", ()=>{
    characters.classList.add("disable");
    movie.classList.add("disable");
    home.classList.remove("disable");
});

urlCharacters.addEventListener("click",()=>{
    movie.classList.add("disable");
    home.classList.add("disable");
    characters.classList.remove("disable");
});

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

/*
console.log(document.querySelectorAll(".container").forEach(item=>{
    if(item.className == 'container disable'){
        console.log(item.className);
    }else{
        console.log(item.className);
    }
}));
*/