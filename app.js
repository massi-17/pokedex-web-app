//DOM
//search bar
let form = document.getElementById('form')
let input = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
//info
let searchedName = document.getElementById('searched-name')
let pokemonName = document.getElementById('name')
let weight = document.getElementById('weight')
let height = document.getElementById('height')
//picture
const avatar = document.getElementById('avatar')
const defaultBtn = document.getElementById('default')
let shinyBtn = document.getElementById('shiny')
//stats
const hp = document.getElementById('hp')
const attack = document.getElementById('attack')
const defense = document.getElementById('defense')
const specialAttack = document.getElementById('special-attack')
const specialDefense = document.getElementById('special-defense')
const speed = document.getElementById('speed')
//pokedex
const addPokedexBtn = document.getElementById('add-pokedex')
let teamWrapper = document.getElementById('team-wrapper')
//search bar
form.addEventListener('submit', e => {
    e.preventDefault()
    if (input.value === '') {
        alert('Inserisci un Pokemon!')
    } else {
        getPokemonInfo()
    }
})
//global var
let defaultImg = document.getElementById('defaultCA')
let pokemonObj = {}
//fetchAPI
function getPokemonInfo() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}/`)
        .then(response => response.json())
        .then(pokemon => {
            console.log(pokemon)
            //creo oggetto
            pokemonObj.nome = pokemon.name
            pokemonObj.peso = pokemon.weight
            pokemonObj.altezza = pokemon.height
            pokemonObj.avatarDefault = pokemon.sprites.front_default
            pokemonObj.avatarShiny = pokemon.sprites.front_shiny
            pokemonObj.hp = `${pokemon.stats[0].base_stat}%`
            pokemonObj.attack = `${pokemon.stats[1].base_stat}%`
            pokemonObj.defense = `${pokemon.stats[2].base_stat}%`
            pokemonObj.specialAttack = `${pokemon.stats[3].base_stat}%`
            pokemonObj.specialDefense = `${pokemon.stats[4].base_stat}%`
            pokemonObj.speed = `${pokemon.stats[5].base_stat}%`
            //mando dati al dom
            pokemonName.innerHTML = pokemonObj.nome
            weight.innerHTML = pokemonObj.peso
            height.innerHTML = pokemonObj.altezza
            hp.style.width = pokemonObj.hp
            attack.style.width = pokemonObj.attack
            defense.style.width = pokemonObj.defense
            specialAttack.style.width = pokemonObj.specialAttack
            specialDefense.style.width = pokemonObj.specialDefense
            speed.style.width = pokemonObj.speed
            defaultImg.src = pokemonObj.avatarDefault
            let src = document.getElementById("avatar")
            defaultImg.setAttribute('id', 'defaultVer')
            src.appendChild(defaultImg)
            searchedName.innerHTML = pokemon.name
            console.log(pokemonObj)
        })
        .catch(error => {
            searchedName.innerHTML = ''
            alert('Pokemon non trovato!')
        })
}
//shiny version
shinyBtn.addEventListener('click', e => {
    defaultImg.src = pokemonObj.avatarShiny
})
//default version
defaultBtn.addEventListener('click', e => {
    defaultImg.src = pokemonObj.avatarDefault
})
//add pokedex
let buttonsPokedex = document.getElementById('buttons')
addPokedexBtn.addEventListener('click', e => {
    if (input.value === '') {
        alert('Ricerca prima un pokemon!')
    } else {
        teamWrapper.innerHTML += `
    <div id="pokemon-card">
                <h5 id="pokemon-team">${pokemonObj.nome}</h4>
                <img src="${defaultImg.src}" id="pokemon-team-img">
    </div>`
    }
})
