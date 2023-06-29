const games = [
    {
        name: "Pokemon Red",
        price: 20,
        inStock: 5,
        imageURL: "https://m.media-amazon.com/images/I/61mMwMsITAL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
        name: "1999 GBC with Pokemon Yellow",
        price: 200,
        inStock: 3,
        imageURL: "https://i.ebayimg.com/images/g/fK4AAOSw7PRkkRge/s-l1600.jpg",
    },
    {
        name: "Metroid",
        price: 15,
        inStock: 8,
        imageURL: "https://m.media-amazon.com/images/I/31XDAW73RHL.jpg",
    },
    {
        name: "Donkey Kong",
        price: 10,
        inStock: 3,
    },
    {
        name: "Metal Gear Solid",
        price: 50,
        inStock: 3,
        imageURL: "https://images.nintendolife.com/a1f57a394ee94/metal-gear-solid-cover.cover_small.jpg",
    },
    {
        name: "Pokémon Crystal",
        price: 12,
        inStock: 4,
        imageURL: "https://images.nintendolife.com/4287b43b8d0b3/pokemon-crystal1-cover.cover_large.jpg",
    },
    {
        name: "Super Mario Bros. Deluxe",
        price: 15,
        inStock: 5,
        imageURL: "https://static.wikia.nocookie.net/nintendo/images/a/ae/SMBDeluxe_Boxart.png/revision/latest?cb=20140817223130&path-prefix=en",
    },

    {
        name: " The Legend of Zelda: Link's Awakening DX ",
        price: 10,
        inStock: 7,
        imageURL: "https://images.nintendolife.com/225a29540bf44/legend-of-zelda-links-awakening-dx-cover.cover_large.jpg",
    },

];

// ✨ Resizing the image URLs. They're all wonky at first 😮‍💨
const resizedGames = games.map((game) => {
    if (game.imageURL) {
        const resizedURL = game.imageURL.replace(/_.+\./, "._SY100_.");
        return { ...game, imageURL: resizedURL };
    } else {
        return game;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const gameList = document.getElementById("game-list");
    const form = document.getElementById("game-form");
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const stockInput = document.getElementById("in-stock");
    const resetButton = document.getElementById("reset");

    // Display initial game inventory
    function generateGameInventory() {
        gameList.innerHTML = "";

        resizedGames.forEach(function (game) {
            const listItem = document.createElement("li");
            const image = document.createElement("img");
            const gameName = document.createElement("h2");
            const gamePrice = document.createElement("p");
            const gameInStock = document.createElement("p");
            const removeButton = document.createElement("button");

            image.src = game.imageURL;
            image.alt = game.name + " Cover";
            image.width = 100;

            gameName.textContent = game.name;
            gamePrice.textContent = "Price: $" + game.price;
            gameInStock.textContent = "In Stock: " + game.inStock;
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function () {
                listItem.remove();
            });

            gameInStock.addEventListener("click", function () {
                game.inStock = game.inStock === 0 ? 1 : 0;
                gameInStock.textContent = "In Stock: " + game.inStock;
                gameInStock.classList.toggle("out-of-stock");
            });

            listItem.appendChild(image);
            listItem.appendChild(gameName);
            listItem.appendChild(gamePrice);
            listItem.appendChild(gameInStock);
            listItem.appendChild(removeButton);
            gameList.appendChild(listItem);
        });
    }

    generateGameInventory();

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const price = parseFloat(priceInput.value);
        const stock = parseInt(stockInput.value);

        // Clear previous error messages
        const errorMessages = document.getElementsByClassName("error-message");
        while (errorMessages.length > 0) {
            errorMessages[0].parentNode.removeChild(errorMessages[0]);
        }

        // Check form field requirements
        if (!name || !price || isNaN(price) || !stock || isNaN(stock)) {
            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "Please fill in all fields correctly.";
            form.appendChild(errorMessage);
            return;
        }

        const newGame = {
            name: name,
            price: price,
            inStock: stock,
        };

        resizedGames.unshift(newGame);

        form.reset();
        generateGameInventory();
    });

    // Handle form reset
    resetButton.addEventListener("click", function (event) {
        event.preventDefault();
        form.reset();
    });
});