document.addEventListener("DOMContentLoaded", () => {
    const pokemonListElement = document.getElementById('pokemonList');
    const pokemonDetailsElement = document.getElementById('pokemon-details');
    const loadMoreButton = document.getElementById('loadMore');

    let offset = 0;
    const limit = 10;

    // Convertir un Pokémon en un elemento de lista
    function convertPokemonToLi(pokemon) {
        const li = document.createElement('li');
        li.className = `pokemon ${pokemon.type}`;
        li.innerHTML = `
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        `;

        li.addEventListener('click', () => {
            showPokemonDetails(pokemon);
        });

        return li;
    }

    // Mostrar detalles del Pokémon seleccionado
    function showPokemonDetails(pokemon) {
        pokemonDetailsElement.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            <p>Número: #${pokemon.number}</p>
            <p>Altura: ${pokemon.height} dm</p>
            <p>Peso: ${pokemon.weight} hg</p>
            <p>Tipo: ${pokemon.types.join(', ')}</p>
        `;
    }

    // Cargar una lista de Pokémon
    async function loadPokemonItems() {
        console.log(`Cargando Pokémon con offset ${offset}`);
        try {
            const pokemons = await pokeApi.getPokemons(offset, limit);
            pokemons.forEach(pokemon => {
                const pokemonItem = convertPokemonToLi(pokemon);
                pokemonListElement.appendChild(pokemonItem);
            });
            offset += limit; // Actualizar el offset para la siguiente carga
        } catch (error) {
            console.error('Error cargando Pokémon:', error);
        }
    }

    // Cargar Pokémon inicial
    loadPokemonItems();

    // Evento para el botón de "Cargar más"
    loadMoreButton.addEventListener('click', () => {
        loadPokemonItems();
    });
});



