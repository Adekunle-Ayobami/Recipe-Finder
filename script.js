document.getElementById('searchButton').addEventListener('click', function() {
    var searchInput = document.getElementById('searchInput').value;
    getRecipes(searchInput);
});

function getRecipes(query) {
    var url = 'https://api.edamam.com/search?q=' + query + '&app_id=409e6eaf&app_key=3328a149544fbca1917c9dd9139933af';

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayRecipes(data.hits);
        })
        .catch(function(error) {
            console.log('Error fetching recipes:', error);
        });
}

function displayRecipes(recipes) {
    var recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    recipes.forEach(function(recipe) {
        var recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');

        var recipeTitle = document.createElement('h2');
        recipeTitle.textContent = recipe.recipe.label;

        var recipeImage = document.createElement('img');
        recipeImage.src = recipe.recipe.image;

        var recipeLink = document.createElement('a');
        recipeLink.href = recipe.recipe.url;
        recipeLink.target = '_blank';
        recipeLink.textContent = 'View Recipe';

        recipeItem.appendChild(recipeTitle);
        recipeItem.appendChild(recipeImage);
        recipeItem.appendChild(recipeLink);

        recipeList.appendChild(recipeItem);
    });
}
