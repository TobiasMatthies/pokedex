let allPokemons = [];
let offset = 0;
let currentLimit = 20;
let currentUrl = 0;
let url1 = 'https://pokeapi.co/api/v2/pokemon/';
let url2 = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20';
let url3 = 'https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20';
let url4 = 'https://pokeapi.co/api/v2/pokemon/?offset=60&limit=20';
let url5 = 'https://pokeapi.co/api/v2/pokemon/?offset=80&limit=20';
let url6 = 'https://pokeapi.co/api/v2/pokemon/?offset=100&limit=20';
let url7 = 'https://pokeapi.co/api/v2/pokemon/?offset=120&limit=20';
let url8 = 'https://pokeapi.co/api/v2/pokemon/?offset=140&limit=11';
let urls = [url1, url2, url3, url4, url5, url6, url7, url8];


async function loadPokemons() {
    for (let i = 0; i < urls.length; i++) {
        let position = urls[i];


        let response = await fetch(position);  //Die aktuell festgelegten zwanzig Pokemons werden heruntergeladen, der Code wird bis zum Abschluss dieses Vorgangs pausiert
        let responseAsJson = await response.json();  //Die als string erfolgte Antwort wird zu einem JSON-Array umgewandelt. Auch hier wird der Code bis zum Abschluss des Vorgangs pausiert
        allPokemons.push(responseAsJson.results);  //Die variable "allPokemons" wird um das ARRAY aus der Antwort gepusht.
        renderPokemons();  //die neuen Pokemons werden generiert
        offset + 20;

        if (offset < 140) {
            currentLimit + 20;
        } else if (offset >= 140) {
            currentLimit + 11;
        }
        currentUrl++;
    }
    console.log(allPokemons);
}


function renderPokemons() {
    for (let i = offset; i < currentLimit; i++) {
        let currentPokemon = allPokemons[currentUrl][i]['name'];

        document.getElementById('body').innerHTML += /*html*/`
          <div class="card">
              <h2>${currentPokemon}</h2>
          </div>
        `;
    }
} 