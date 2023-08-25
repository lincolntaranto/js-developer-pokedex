const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const toggleShinyButton = document.getElementById('toggleShinyButton');
let showShiny = false;

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {

    const pokemonImage = showShiny ? pokemon.photo_shiny : pokemon.photo;

    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <p class="weight">${pokemon.weight}KGs<p>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}"
                     data-pokemon='${JSON.stringify(pokemon)}'>

            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

toggleShinyButton.addEventListener('click', () => {
    showShiny = !showShiny;

    const pokemonItems = pokemonList.querySelectorAll('.pokemon');
    pokemonItems.forEach(pokemonItem => {
        const imgElement = pokemonItem.querySelector('img');
        const pokemonData = imgElement.getAttribute('data-pokemon');

        const pokemon = JSON.parse(pokemonData);

        const newImage = showShiny ? pokemon.photo_shiny : pokemon.photo;
        imgElement.src = newImage;
    });
});
