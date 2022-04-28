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
 * the following code is constantly checking, if the page is scolled to the bottom
 */
window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !activeFullscreen) {
        if (screen.width >= 1000) {
            loadPokemons();
        }
    }
};


/**
 * 
 * this function loads twenty pokemon
 */
async function loadPokemons() {
    changeButtonLoading();

    for (let i = offset; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
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
        let total = hp + attack + defense + special_attack + special_defense + speed;

        getClasses(responseAsJson, pokemonClasses);
        pushAllPokemons(pokemonName, pokemonImage, pokemonClasses, pokemonId, hp, attack, defense, special_attack, special_defense, speed, total);
    }
    allPokemons.sort(function (a, b) { return a['id'] - b['id'] });
    renderPokemons();
    raiseVariables();
    changeButtonBack();
}


/**
 * 
 * this function is used to change the inner html of the load-more button to "loading". It is executed when starting the function "loadPokemons"
 */
function changeButtonLoading() {
    document.getElementById('responsive_button').innerHTML = 'Loading...';
}


/**
 * 
 * this function is used to change the inner html back to "Load more". It is executed after the new pokemons are rendered and the variables got raised.
 */
function changeButtonBack() {
    document.getElementById('responsive_button').innerHTML = 'Load more';
}


/**
 * 
 * this function hides the responsive load button
 */
function hide() {
    if (screen.width >= 2050) {
        document.getElementById('responsive_button').classList.add('d-none');
    }
}


/**
 * 
 * @param {object} responseAsJson 
 * @param {object} pokemonClasses 
 */
function getClasses(responseAsJson, pokemonClasses) {
    for (let j = 0; j < responseAsJson['types'].length; j++) {
        let className = responseAsJson['types'][j]['type']['name'];

        pokemonClasses.push(className);
    }
}


/**
 * 
 * this function pushes an object with the values of the parameters to the JSON-Array "allPokemons"
 * @param {string} pokemonName 
 * @param {string} pokemonImage 
 * @param {object} pokemonClasses 
 * @param {number} pokemonId 
 * @param {number} hp 
 * @param {number} attack 
 * @param {number} defense 
 * @param {number} special_attack 
 * @param {number} special_defense 
 * @param {number} speed 
 * @param {number} total 
 */
function pushAllPokemons(pokemonName, pokemonImage, pokemonClasses, pokemonId, hp, attack, defense, special_attack, special_defense, speed, total) {
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
            'speed': speed,
            'total': total
        }]
    });
}


/**
 * 
 * this function renders pokemons, starting at the value of "start", until getting to the value of "end". The difference between those variables is always 20.
 */
async function renderPokemons() {
    for (let i = start; i < end; i++) {
        document.getElementById('body').innerHTML += cardTemplate(i);

        addClasses(i);
        addBackground(i);
        number++;
    }
}


/**
 * 
 * this function raises all variables needed for knowing the amount of pokemons loaded.
 */
function raiseVariables() {
    offset += 20;
    limit += 20;
    start += 20;
    end += 20;
}


/**
 * 
 * this function returns the html card template for one pokemon.
 * @param {number} i 
 * @returns 
 */
function cardTemplate(i) { //Reihe 1: der Back
    return /*html*/`
    <div onclick="quitFullscreen(${i})"id="fullscreen_background${i}"> 
            <div onclick="showFullscreen(${i})" class="card pointer" id="pokemon${i}">
              <img onclick="quitFullscreen(${i})" class="close_icon pointer d-none" id="close${i}" src="./img/close.svg">
              <div class="pokemon_info_general" id="pokemon_info_general${i}">
                  <span class="number">#${number}</span>
                  <h2>${allPokemons[i]['name']}</h2>
                  <div class="name_container" id="name_container${i}">
                  </div>
              </div>
              <img class="pokemon_image" id="pokemon_image${i}" src="${allPokemons[i]['image']}">
              <div class="pokemon_stats d-none" id="stats_container${i}">
                <h2>base stats</h2>
                <div class="stat_container">
                  <span class="gray stat_span">hp</span>
                  <span id="hp${i}"></span>
                  <div class="stat_bar_container"> 
                      <div class="stat_bar" id="hp_bar${i}"></div>
                  </div>
                </div>

                <div class="stat_container">
                  <span class="gray stat_span">attack</span>
                  <span id="attack${i}"></span>
                  <div class="stat_bar_container"> 
                      <div class="stat_bar" id="attack_bar${i}"></div>
                  </div>
                </div>

                <div class="stat_container">
                  <span class="gray stat_span">defense</span>
                  <span id="defense${i}"></span>
                  <div class="stat_bar_container"> 
                      <div class="stat_bar defen" id="defense_bar${i}"></div>
                  </div>
                </div>

                <div class="stat_container">
                  <span class="gray stat_span">sp. atk</span>
                  <span id="sp_atk${i}"></span>
                  <div class="stat_bar_container"> 
                      <div class="stat_bar" id="sp_atk_bar${i}"></div>
                  </div>
                </div>

                <div class="stat_container">
                  <span class="gray stat_span">sp. def</span>
                  <span id="sp_def${i}"></span>
                  <div class="stat_bar_container"> 
                      <div class="stat_bar" id="sp_def_bar${i}"></div>
                  </div>
                </div>

                <div class="stat_container">
                  <span class="gray stat_span">speed</span>
                  <span id="speed${i}"></span>
                  <div class="stat_bar_container"> 
                      <div class="stat_bar" id="speed_bar${i}"></div>
                  </div>
                </div>

                <div class="stat_container">
                  <span class="gray stat_span">total</span>
                  <span id="total${i}"></span>
                  <div class="stat_bar_container"> 
                      <div class="stat_bar" id="total_bar${i}"></div>
                  </div>
                </div>
            </div>
        </div>
    </div>
         `;
}


/**
 * 
 * this function renders the pokemon classes
 * @param {number} i 
 */
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


/**
 * this function adds the css class of the parameter "pokemonClass"
 * @param {number} i 
 * @param {string} pokemonClass 
 */
function addBackground(i, pokemonClass) {
    let pokemonId = document.getElementById('pokemon' + i);

    pokemonId.classList.add(pokemonClass);
}


/**
 * 
 * this function opens a pokemon card
 * @param {number} i 
 */
function showFullscreen(i) {
    if (!activeFullscreen) {
        removeClassesFullscreen(i);
        addFullscreenClasses(i);
        getValues(i);
        activeFullscreen = !activeFullscreen;
        //event.stopPropagation();
    }

    event.stopPropagation();  
}


/**
 * 
 * this function removes all the css classes that are not needed in fullscreen view
 * @param {number} i 
 */
function removeClassesFullscreen(i) {
    document.getElementById('close' + i).classList.remove('d-none');
    document.getElementById('pokemon' + i).classList.remove('card');
    document.getElementById('pokemon' + i).classList.remove('pointer');
    document.getElementById('pokemon_image' + i).classList.remove('pokemon_image');
    document.getElementById('stats_container' + i).classList.remove('d-none');
}


/**
 * 
 * this function add all the needed fullscreen css classes
 * @param {number} i 
 */
function addFullscreenClasses(i) {
    document.getElementsByTagName('body')[0].classList.add('noscroll_body');
    document.getElementById('fullscreen_background' + i).classList.add('fullscreen_background');
    document.getElementById('pokemon' + i).classList.add('fullscreen');
    document.getElementById('pokemon_image' + i).classList.add('fullscreen_image');
    document.getElementById('pokemon_info_general' + i).classList.add('fullscreen_info');
    document.getElementById('name_container' + i).classList.add('fullscreen_class_container');
}


/**
 * 
 * this funciton gets all the stats of a pokemon
 * @param {number} i 
 */
function getValues(i) {
    let hpStat = allPokemons[i]['stats'][0]['hp'];
    let attackStat = allPokemons[i]['stats'][0]['attack'];
    let defenseStat = allPokemons[i]['stats'][0]['defense'];
    let spAtkStat = allPokemons[i]['stats'][0]['special-attack'];
    let spDefStat = allPokemons[i]['stats'][0]['special-defense'];
    let speedStat = allPokemons[i]['stats'][0]['speed'];
    let totalStat = allPokemons[i]['stats'][0]['total'];

    renderStats(i, hpStat, attackStat, defenseStat, spAtkStat, spDefStat, speedStat, totalStat);
}


/**
 * 
 * this function renders the stats of a pokemon
 * @param {number} i 
 * @param {number} hpStat 
 * @param {number} attackStat 
 * @param {number} defenseStat 
 * @param {number} spAtkStat 
 * @param {number} spDefStat 
 * @param {number} speedStat 
 * @param {number} totalStat 
 */
function renderStats(i, hpStat, attackStat, defenseStat, spAtkStat, spDefStat, speedStat, totalStat) {
    document.getElementById('hp' + i).innerHTML = hpStat;
    document.getElementById('attack' + i).innerHTML = attackStat;
    document.getElementById('defense' + i).innerHTML = defenseStat;
    document.getElementById('sp_atk' + i).innerHTML = spAtkStat;
    document.getElementById('sp_def' + i).innerHTML = spDefStat;
    document.getElementById('speed' + i).innerHTML = speedStat;
    document.getElementById('total' + i).innerHTML = totalStat;

    renderStatsBars(i, hpStat, attackStat, defenseStat, spAtkStat, spDefStat, speedStat, totalStat);
}


/**
 * 
 * this function renders all the stas bars for a pokemon
 * @param {number} i 
 * @param {number} hpStat 
 * @param {number} attackStat 
 * @param {number} defenseStat 
 * @param {number} spAtkStat 
 * @param {number} spDefStat 
 * @param {number} speedStat 
 * @param {number} totalStat 
 */
function renderStatsBars(i, hpStat, attackStat, defenseStat, spAtkStat, spDefStat, speedStat, totalStat) {
    document.getElementById('hp_bar' + i).style = `width: ${hpStat / 1.2}%`;
    document.getElementById('attack_bar' + i).style = `width: ${attackStat / 1.2}%`;
    document.getElementById('defense_bar' + i).style = `width: ${defenseStat / 1.2}%`;
    document.getElementById('sp_atk_bar' + i).style = `width: ${spAtkStat / 1.2}%`;
    document.getElementById('sp_def_bar' + i).style = `width: ${spDefStat / 1.2}%`;
    document.getElementById('speed_bar' + i).style = `width: ${speedStat / 1.2}%`;
    document.getElementById('total_bar' + i).style = `width: ${totalStat / 7.2}%`;

    addBarColors(i, hpStat, attackStat, defenseStat, spAtkStat, spDefStat, speedStat, totalStat);
}


/**
 * 
 * this function adds the color to a stat bar, depending on it's value
 * @param {number} i 
 * @param {number} hpStat 
 * @param {number} attackStat 
 * @param {number} defenseStat 
 * @param {number} spAtkStat 
 * @param {number} spDefStat 
 * @param {number} speedStat 
 * @param {number} totalStat 
 */
function addBarColors(i, hpStat, attackStat, defenseStat, spAtkStat, spDefStat, speedStat, totalStat) {
    let parameters = [hpStat, attackStat, defenseStat, spAtkStat, spDefStat, speedStat];
    let ids = ['hp_bar', 'attack_bar', 'defense_bar', 'sp_atk_bar', 'sp_def_bar', 'speed_bar'];

    for (let j = 0; j < parameters.length; j++) {
        let parameter = parameters[j];
        let id = ids[j];

        if (parameter > 59) {
            document.getElementById(id + i).classList.add('green_bar');
        } else {
            document.getElementById(id + i).classList.add('red_bar');
        }
    }

    if (totalStat > 359) {
        document.getElementById('total_bar' + i).classList.add('green_bar');
    } else {
        document.getElementById('total_bar' + i).classList.add('red_bar');
    }
}


/**
 * 
 * this function is used to quit the fullscreen view of a pokemon
 * @param {number} i 
 */
function quitFullscreen(i) {
    if (activeFullscreen) {
        removeClassesQuitFullscreen(i);
        addClassesQuitFullscreen(i);
        activeFullscreen = !activeFullscreen;
        event.stopPropagation();
    }
}


/**
 * 
 * this function adds all the removed classes back to the pokemon
 * @param {number} i 
 */
function addClassesQuitFullscreen(i) {
    document.getElementById('close' + i).classList.add('d-none');
    document.getElementById('pokemon' + i).classList.add('card');
    document.getElementById('pokemon' + i).classList.add('pointer');
    document.getElementById('pokemon_image' + i).classList.add('pokemon_image');
    document.getElementById('stats_container' + i).classList.add('d-none');
}


/**
 * 
 * this function removes all the fullscreen classes of the pokemon
 * @param {number} i 
 */
function removeClassesQuitFullscreen(i) {
    document.getElementsByTagName('body')[0].classList.remove('noscroll_body');
    document.getElementById('fullscreen_background' + i).classList.remove('fullscreen_background');
    document.getElementById('pokemon' + i).classList.remove('fullscreen');
    document.getElementById('pokemon_image' + i).classList.remove('fullscreen_image');
    document.getElementById('pokemon_info_general' + i).classList.remove('fullscreen_info');
    document.getElementById('name_container' + i).classList.remove('fullscreen_class_container');
}