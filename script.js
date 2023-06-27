const games = [
    {
        name: "Pokemon Red",
        price: 20,
        inStock: 5,
    },
    {
        name: "Pokemon Yellow",
        price: 20,
        inStock: 2,
    },
    {
        name: "Metroid",
        price: 15,
        inStock: 8,
    },
    {
        name: "Donkey Kong",
        price: 10,
        inStock: 3,
    },
    {
        name: "Mega Man V",
        price: 18,
        inStock: 6,
    },
    {
        name: "Kirby's Dream Land",
        price: 12,
        inStock: 4,
    },
    {
        name: "Tetris",
        price: 10,
        inStock: 7,
    },
    {
        name: "Super Mario Land",
        price: 15,
        inStock: 5,
    },
];

document.addEventListener("DOMContentLoaded", function () {
    const gameList = document.getElementById("game-list");
    const form = document.getElementById("game-form");
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const stockInput = document.getElementById("in-stock");

    // Display initial game inventory
    function generateGameInventory() {
        gameList.innerHTML = "";

        games.forEach(function (game) {
            const listItem = document.createElement("li");
            const nameLabel = document.createElement("h2");
            const priceLabel = document.createElement("p");
            const stockLabel = document.createElement("p");
            const removeButton = document.createElement("button");

            nameLabel.textContent = game.name;
            priceLabel.textContent = "Price: $" + game.price;
            stockLabel.textContent = "In Stock: " + game.inStock;
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function () {
                listItem.remove();
            });

            stockLabel.addEventListener("click", function () {
                game.inStock = game.inStock === 0 ? 1 : 0;
                stockLabel.textContent = "In Stock:" + game.inStock;
                stockLabel.classList.toggle("out-of-stock");
            });

            listItem.appendChild(nameLabel);
            listItem.appendChild(priceLabel);
            listItem.appendChild(stockLabel);
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

        if (!name || !price || isNaN(price) || !stock || isNaN(stock)) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const newGame = {
            name: name,
            price: price,
            inStock: stock,
        };

        games.unshift(newGame);

        form.reset();
        generateGameInventory();
    });

    // Handle for reset
    resetButton.addEventListener("click", function (event) {
        event.preventDefault();
        form.reset();
    });
});
