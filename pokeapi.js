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
        // document.getElementById('header').innerHTML += `<img src="${result.sprites.front_default}" />`
        for (let i = 0; i < result.results.length; i++ ){
           const pokeResponse = await fetch(result.results[i].url);
           const pokeData = await pokeResponse.json();

           pokemons.push({
                id: pokeData.id,
                name: pokeData.name,
                sprite: pokeData.sprites.front_default,
           })
        }

        console.log(pokemons);
        
        for (let i = 0; i < pokemons.length; i++){
            document.getElementById('gridGallery').innerHTML += `
            <a id="${pokemons[i].id}" class="border flex flex-col items-center rounded-lg hover:scale-125 clickable">
                <img src="${pokemons[i].sprite}" />
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


