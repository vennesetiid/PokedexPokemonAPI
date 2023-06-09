import React, { useEffect, useState } from "react";
import PokeInfo from "./Components/PokeInfo";

function App() {
const [allPokemons, setAllPokemons] = useState([]);
const [loadPoke, setLoadPoke] = useState(
	"https://pokeapi.co/api/v2/pokemon?limit=60"
);
const getAllPokemons = async () => {
	const res = await fetch(loadPoke);
	const data = await res.json();
	setLoadPoke(data.next);

	function createPokemonObject(result) {
	result.forEach(async (pokemon) => {
		const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
		);
		const data = await res.json();
		setAllPokemons((currentList) => [...currentList.sort((a,b) => a.id - b.id), data]);
	});
	}
	createPokemonObject(data.results);
	await console.log(allPokemons);
};
useEffect(() => {
	getAllPokemons();
}, []);

return (
	<div className="app-container">
	<h1 className="header">Pokemon</h1>
  <h2 className="subheader">Gotta know about 'em all</h2>

	<div className="pokemon-container">
		<div className="all-container">
		{allPokemons.map((pokemon, index) => (
			<PokeInfo
			id={pokemon.id}
			name={pokemon.name}
			image={pokemon.sprites.other.dream_world.front_default}
			type={pokemon.types[0].type.name}
			key={index}
			height={pokemon.height}
			weight={pokemon.weight}
			stat1={pokemon.stats[0].stat.name}
			stat2={pokemon.stats[1].stat.name}
			stat3={pokemon.stats[2].stat.name}
			stat4={pokemon.stats[3].stat.name}
			stat5={pokemon.stats[4].stat.name}
			stat6={pokemon.stats[5].stat.name}
			bs1={pokemon.stats[0].base_stat}
			bs2={pokemon.stats[1].base_stat}
			bs3={pokemon.stats[2].base_stat}
			bs4={pokemon.stats[3].base_stat}
			bs5={pokemon.stats[4].base_stat}
			bs6={pokemon.stats[5].base_stat}
			/>
		))}
		</div>
		<button className="load-more"
		onClick={() => getAllPokemons()}>
		More Pokemons
		</button>
	</div>
	</div>
);
}

export default App;
