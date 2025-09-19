async function getPokeData(){
    const pokemons = [];
    const url = `https://pokeapi.co/api/v2/pokemon/`;

    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        for (let i = 0; i < result.results.length; i++ ){
           const pokeResponse = await fetch(result.results[i].url);
        
           const pokeData = await pokeResponse.json();

           const pokeTypes = pokeData.types;
           console.log(pokeTypes);
           
           const typeNames = pokeTypes.map(item => item.type.name);
           console.log(typeNames);

           
           pokemons.push({
                id: pokeData.id,
                name: pokeData.name,
                types: typeNames,
                sprite: pokeData.sprites.front_default,
           })
           
           console.log(pokemons);
        }

        console.log(pokemons);
        
        for (let i = 0; i < pokemons.length; i++){
            const pokemonTypes = pokemons[i].types;

            let typeHTML = '';

            if (pokemonTypes.length == 1) {
                typeHTML = `<div>${pokemonTypes[0]}</div>`
            } else {
                typeHTML = `
                <div>${pokemonTypes[0]}</div>
                <div>${pokemonTypes[1]}</div>
                `
            }

            document.getElementById('gridGallery').innerHTML += `
            <a id="${pokemons[i].id}" class="border flex flex-col items-center rounded-lg hover:scale-125 clickable">
                <img src="${pokemons[i].sprite}" />
                <div class="flex gap-2">
                    ${typeHTML}
                </div>
                <p class="capitalize">${pokemons[i].name}</p>
            </a>
            `;
        };

        // Add event listeners for dynamically created clickable elements
        document.querySelectorAll('.clickable').forEach(a => {
            a.addEventListener('click', function () {
                const linkId = this.id;
                window.location.href = `pokeDetails.html?id=${linkId}`; // Redirect to details page
            });
        });

    } catch(error){
        console.error(error.message);
    }
}

getPokeData();


