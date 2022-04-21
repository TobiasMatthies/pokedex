let allPokemons = [];
let images = [];
let offset = 1;
let limit = 21;
let start = 0;
let end = 20;
let number = 1;
let activeFullscreen = false;

/**
 * 
 * this function loads twenty pokemon
 */
async function loadPokemons() {
    for (let i = offset; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        console.log(responseAsJson);  //dient der Überprüfung
        let pokemonName = responseAsJson['name'];
        let pokemonImage = responseAsJson['sprites']['other']['home']['front_default'];
        let pokemonId = responseAsJson['id'];
        let pokemonClasses = [];
        let hp = responseAsJson['stats'][0]['base_stat'];
        let attack = responseAsJson['stats'][1]['base_stat'];
        let defense = responseAsJson['stats'][2]['base_stat'];
        let special_attack = responseAsJson['stats'][3]['base_stat'];
        let special_defense = responseAsJson['stats'][4]['base_stat'];
        let speed = responseAsJson['stats'][5]['base_stat'];

        getClasses(responseAsJson, pokemonClasses);
        pushAllPokemons(pokemonName, pokemonImage, pokemonClasses, pokemonId, hp, attack, defense, special_attack, special_defense, speed);
    }
    allPokemons.sort(function (a, b) { return a['id'] - b['id'] });
    renderPokemons();
    raiseVariables();

    console.log(allPokemons);  //dient der Überprüfung
}


function getClasses(responseAsJson, pokemonClasses) {
    for (let j = 0; j < responseAsJson['types'].length; j++) {
        let className = responseAsJson['types'][j]['type']['name'];

        pokemonClasses.push(className);
    }
}


function pushAllPokemons(pokemonName, pokemonImage, pokemonClasses, pokemonId, hp, attack, defense, special_attack, special_defense, speed) {
    allPokemons.push({
        'name': pokemonName,
        'image': pokemonImage,
        'classes': pokemonClasses,
        'id': pokemonId,
        'stats': [{
            'hp': hp,
            'attack': attack,
            'defense': defense,
            'special-attack': special_attack,
            'special-defense': special_defense,
            'speed': speed
        }]
    });
}


async function renderPokemons() {
    for (let i = start; i < end; i++) {
        document.getElementById('body').innerHTML += cardTemplate(i);

        addClasses(i);
        addBackground(i);
        number++;
    }
}


function raiseVariables() {
    offset += 20;
    limit += 20;
}


function cardTemplate(i) {
    return /*html*/`
    <div onclick="quitFullscreen(${i})" class="d-none fullscreen_background" id="fullscreen_background${i}"></div>
          <div onclick="showFullscreen(${i})" class="card pointer" id="pokemon${i}">
            <img onclick="quitFullscreen(${i})" class="close_icon pointer d-none" id="close${i}" src="./img/close.svg">
            <div id="pokemon_info_general${i}">
                <span class="number">#${number}</span>
                <h2>${allPokemons[i]['name']}</h2>
                <div class="name_container" id="name_container${i}">
                </div>
            </div>
            <img class="pokemon_image" id="pokemon_image${i}" src="${allPokemons[i]['image']}">
            <div class="pokemon_stats d-none" id="stats_container${i}">
              <h2>base stats</h2>
              <div class="stat_container">
                <span class="gray">hp</span> <span id="hp${i}"></span> <div class="stat_bar" id="hp_bar${i}"></div>
              </div>
              <div class="stat_container">
                <span class="gray">attack</span> <span id="attack${i}"></span> <div class="stat_bar" id="attack_bar${i}"></div>
              </div>
              <div class="stat_container">
                <span class="gray">defense</span> <span id="defense${i}"></span> <div class="stat_bar defen" id="defense_bar${i}"></div>
              </div>
              <div class="stat_container">
                <span class="gray">sp. atk</span> <span id="sp_atk${i}"></span> <div class="stat_bar" id="sp_atk_bar${i}"></div>
              </div>
              <div class="stat_container">
                <span class="gray">sp. def</span> <span id="sp_def${i}"></span> <div class="stat_bar" id="sp_def_bar${i}"></div>
              </div>
              <div class="stat_container">
                <span class="gray">speed</span> <span id="speed${i}"></span> <div class="stat_bar" id="speed_bar${i}"></div>
              </div>
              <div class="stat_container">
                <span class="gray">total</span> <span id="total${i}"></span> <div class="stat_bar" id="total_bar${i}"></div>
              </div>
            </div>
         </div>
         `;
}


function addClasses(i) {
    let pokemonClass;
    for (let k = 0; k < allPokemons[i]['classes'].length; k++) {
        let className = allPokemons[i]['classes'][k];

        document.getElementById('name_container' + i).innerHTML += /*html*/`<span class="class_name">${className}</span>`;

        if (k == 0) {
            pokemonClass = className;
        }
    }

    addBackground(i, pokemonClass);
}


function addBackground(i, pokemonClass) {
    let pokemonId = document.getElementById('pokemon' + i);

    pokemonId.classList.add(pokemonClass);
}


function showFullscreen(i) {
    if (!activeFullscreen) {
        removeClassesFullscreen(i);
        addFullscreenClasses(i);
        addValues(i);
        renderStatsBars(i);
        activeFullscreen = !activeFullscreen;
    }
}


function removeClassesFullscreen(i) {
    document.getElementById('fullscreen_background' + i).classList.remove('d-none');
    document.getElementById('close' + i).classList.remove('d-none');
    document.getElementById('pokemon' + i).classList.remove('card');
    document.getElementById('pokemon' + i).classList.remove('pointer');
    document.getElementById('pokemon_image' + i).classList.remove('pokemon_image');
    document.getElementById('stats_container' + i).classList.remove('d-none');
}


function addFullscreenClasses(i) {
    document.getElementById('body').classList.add('noscroll');
    document.getElementById('pokemon' + i).classList.add('fullscreen');
    document.getElementById('pokemon_image' + i).classList.add('fullscreen_image');
    document.getElementById('pokemon_info_general' + i).classList.add('fullscreen_info');
    document.getElementById('name_container' + i).classList.add('fullscreen_class_container');
}


function addValues(i) {


    document.getElementById('hp' + i).innerHTML = '';
    document.getElementById('attack' + i).innerHTML = '';
    document.getElementById('defense' + i).innerHTML = '';
    document.getElementById('sp_atk' + i).innerHTML = '';
    document.getElementById('sp_def' + i).innerHTML = '';
    document.getElementById('speed' + i).innerHTML = '';
    document.getElementById('total' + i).innerHTML = '';
}


function renderStatsBars(i) {

}


function quitFullscreen(i) {
    removeClassesQuitFullscreen(i);
    addClassesQuitFullscreen(i);
    activeFullscreen = !activeFullscreen;
}


function addClassesQuitFullscreen(i) {
    document.getElementById('fullscreen_background' + i).classList.add('d-none');
    document.getElementById('close' + i).classList.add('d-none');
    document.getElementById('pokemon' + i).classList.add('card');
    document.getElementById('pokemon' + i).classList.add('pointer');
    document.getElementById('pokemon_image' + i).classList.add('pokemon_image');
    document.getElementById('stats_container' + i).classList.add('d-none');
}


function removeClassesQuitFullscreen(i) {
    document.getElementById('body').classList.remove('noscroll');
    document.getElementById('pokemon' + i).classList.remove('fullscreen');
    document.getElementById('pokemon_image' + i).classList.remove('fullscreen_image');
    document.getElementById('pokemon_info_general' + i).classList.remove('fullscreen_info');
    document.getElementById('name_container' + i).classList.remove('fullscreen_class_container');
}