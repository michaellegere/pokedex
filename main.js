const pokeContainer = document.getElementById('poke-container');
const pokemonNumber = 151;

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemon = async() => {
    for(let i = 1; i <= pokemonNumber; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
    return { name : pokemon.name, number: pokemon.id, type: pokemon.type, element: pokemon }
}

fetchPokemon();

function getNumber(pokemon) {
    if(pokemon.id < 10) {
        return `#00${pokemon.id}`;
    } else if(pokemon.id < 100) {
        return `#0${pokemon.id}`;
    } else {
        return `#${pokemon.id}`;
    }
}

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const number = getNumber(pokemon);
    const type = pokemon.types.map(el => el.type.name);
    const color = colors[type[0]];

	pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="img-container">
            <img src="https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg" />
        </div>
        <div class="info">
            <span class="number">${number}</span>
            <h3 class="name">${name}</h3>
            <small class="type">
                <span >${type[0]}</span>
                <span>${(type[1] ? type[1] : '...' )}</span>
            </small>
        </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;
    pokeContainer.appendChild(pokemonEl);
}
