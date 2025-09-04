async function getPokeData(){
    const limit = '151';
    const pokemons = [];
    const url = `https://pokeapi.co/api/v2/pokemon/ditto`;

    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.sprites);
        document.getElementById('body').innerHTML += `<img src="${result.sprites.front_default}" />`
        for (let i = 0; i < limit; i++ ){
            pokemons.push(result.results[i].name);
        }

        for (let i = 0; i < limit; i++){
            document.getElementById('body').innerHTML += `
            
            <p>${pokemons[i]}</p>
            <img src="https://github.com/PokeAPI/sprites/${pokemons[i]}/other/home" />`
        }
    } catch(error){
        console.error(error.message);
    }
}

getPokeData();