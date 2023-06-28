const games = [
    {
        name: "Pokemon Red",
        price: 20,
        inStock: 5,
        imageURL: "https://m.media-amazon.com/images/I/61mMwMsITAL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
        name: "Pokemon Yellow",
        price: 20,
        inStock: 2,
        imageURL: "https://m.media-amazon.com/images/I/61mjxzsm+FL._SX342_SY445_.jpg",
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
        name: "Ghosts 'N Goblins",
        price: 190,
        inStock: 3,
        imageURL: "https://m.media-amazon.com/images/I/61ZVS3SJ1SL.jpg",
    },
    {
        name: "Kirby's Dream Land",
        price: 12,
        inStock: 4,
        imageURL: "https://upload.wikimedia.org/wikipedia/en/8/83/Kdl1ussmall.jpg",
    },
    {
        name: " The Legend of Zelda: Link's Awakening DX ",
        price: 10,
        inStock: 7,
        imageURL: "https://images.nintendolife.com/225a29540bf44/legend-of-zelda-links-awakening-dx-cover.cover_large.jpg",
    },
    {
        name: "Super Mario Bros. Deluxe",
        price: 15,
        inStock: 5,
        imageURL: "https://static.wikia.nocookie.net/nintendo/images/a/ae/SMBDeluxe_Boxart.png/revision/latest?cb=20140817223130&path-prefix=en",
    },
];

document.addEventListener("DOMContentLoaded", function () {
    const gameList = document.getElementById("game-list");
    const form = document.getElementById("game-form");
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const stockInput = document.getElementById("in-stock");
    const resetButton = document.getElementById("reset-button");

    // Display initial game inventory
    function generateGameInventory() {
        gameList.innerHTML = "";

        games.forEach(function (game) {
            const listItem = document.createElement("li");
            const image = document.createElement("img");
            const nameLabel = document.createElement("h2");
            const priceLabel = document.createElement("p");
            const stockLabel = document.createElement("p");
            const removeButton = document.createElement("button");

            image.src = game.imageURL;
            image.alt = game.name + "Cover";
            nameLabel.textContent = game.name;
            priceLabel.textContent = "Price: $" + game.price;
            stockLabel.textContent = "In Stock: " + game.inStock;
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function () {
                listItem.remove();
            });

            stockLabel.addEventListener("click", function () {
                game.inStock = game.inStock === 0 ? 1 : 0;
                stockLabel.textContent = "In Stock: " + game.inStock;
                stockLabel.classList.toggle("out-of-stock");
            });

            listItem.appendChild(image);
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

        games.unshift(newGame);

        form.reset();
        generateGameInventory();
    });

    // Handle form reset
    resetButton.addEventListener("click", function (event) {
        event.preventDefault();
        form.reset();
    });
});