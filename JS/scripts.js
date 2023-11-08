const urlApi = 'https://pokeapi.co/api/v2/pokemon';
const pokemonElement = document.querySelector('div.pokemon');


const randomId = () => Math.floor(Math.random() * 905);

const getAbilities = (abilities) => 
    abilities.map(item => item.ability.name);

const createAbilities = (abilities) => abilities.reduce(( acc,item) => acc += `<li>${item}</li>`, '')

const createPokemon = ({image, name, abilities}) => {
    pokemonElement.innerHTML = `
    <div class="poke__insideImage">
        <img src="${image}"
        class="poke__image" 
        alt="pokemon ${name}"
        />
    </div>
    <div class="poke__info">
        <h2 class="poke__name">${name}</h2>
        <ul class="poke__skills">
            ${createAbilities(abilities)}
        </ul>
    </div>`;
}



const getPokemon = () => 
    fetch(`${urlApi}/${randomId()}`)
        .then(response => response.json())
        .then(({name, abilities, ...pokemon}) => {
            const pokemonImage = pokemon.sprites.other.dream_world.front_default
            const pokemonSelected = {
                name: name,
                image: pokemonImage ? pokemonImage : '/IMG/pokemon_logo.png' ,
                abilities: getAbilities(abilities)
            }
            createPokemon(pokemonSelected);
           
        })

getPokemon();