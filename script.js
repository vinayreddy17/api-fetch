const apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50';

async function fetchPokemons() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const allPokemons = data.results;
    return allPokemons;
  } catch (error) {
    console.log('Error fetching pokemons:', error);
    throw error;
  }
}

function displayAbilities(details) {
  const abilitiesList = document.getElementById('abilities-list');
  abilitiesList.innerHTML = '';

  details.abilities.forEach(ability => {
    const listItem = document.createElement('li');
    listItem.textContent = ability.ability.name;
    abilitiesList.appendChild(listItem);
  });
}

function displayMoves(details) {
  const movesList = document.getElementById('moves-list');
  movesList.innerHTML = '';

  details.moves.forEach(move => {
    const listItem = document.createElement('li');
    listItem.textContent = move.move.name;
    movesList.appendChild(listItem);
  });
}

function displayWeight(details) {
  const weight = document.getElementById('weight');
  weight.textContent = `Weight: ${details.weight}`;
}

async function getDetails(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const details = await response.json();
    return details;
  } catch (error) {
    console.log('Error fetching Pokemon details:', error);
    throw error;
  }
}

async function createButton(pokemon) {
  const button = document.createElement('button');
  button.textContent = pokemon.name;

  const details = await getDetails(pokemon.name);
  console.log(details);

  button.addEventListener('click', () => {
    displayAbilities(details);
    displayMoves(details);
    displayWeight(details);
  });
  return button;
}

async function loadPokemons() {
  try {
    const pokemons = await fetchPokemons();
    const pokemonButtons = document.getElementById('pokemon-buttons');
    pokemonButtons.innerHTML = '';

    for (const pokemon of pokemons) {
      const button = await createButton(pokemon);
      pokemonButtons.appendChild(button);
    }
  } catch (error) {
    console.log('Error loading pokemons:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadPokemons);