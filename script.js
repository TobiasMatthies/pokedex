let allPokemons = [];
let images = [];
let offset = 1;
let limit = 21;
let start = 0;
let end = 20;
let number = 1;

async function loadPokemons() {
    for (let i = offset; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        console.log(responseAsJson);  //dient der Überprüfung
        let pokemonName = responseAsJson['name'];
        let pokemonImage = responseAsJson['sprites']['other']['home']['front_default'];
        let pokemonClasses = [];

        getClasses(responseAsJson, pokemonClasses);
        allPokemons.push({ 'name': `${pokemonName}`, 'image': `${pokemonImage}`, 'classes': pokemonClasses },);
    }
    renderPokemons();
    raiseVariables();

    console.log(allPokemons);  //dient der Überprüfung
}


function raiseVariables() {
    offset += 20;
    limit += 20;
}


function getClasses(responseAsJson, pokemonClasses) {
    for (let j = 0; j < responseAsJson['types'].length; j++) {
        let className = responseAsJson['types'][j]['type']['name'];

        pokemonClasses.push(className);
    }
}


async function renderPokemons() {
    for (let i = start; i < end; i++) {
        document.getElementById('body').innerHTML += /*html*/`
          <div class="card" id="pokemon${i}">
          <div>
              <span class="number">#${number}</span>
              <h2>${allPokemons[i]['name']}</h2>
              <div class="name_container" id="name_container${i}">
              </div>
         </div>
              <img class="pokemon_image" src="${allPokemons[i]['image']}">
         </div>
        `;
        addClasses(i);
        addBackground(i);
        number++;
    }
}


function addClasses(i) {
    for (let k = 0; k < allPokemons[i]['classes'].length; k++) {
        let className = allPokemons[i]['classes'][k];

        document.getElementById('name_container' + i).innerHTML += /*html*/`<span>${className}</span>`;
    }
}


function addBackground(i) {

}