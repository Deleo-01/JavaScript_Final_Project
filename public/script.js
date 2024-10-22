// NAME : DHRUV JITEN PATEL
// STUDENT NUMBER : 104998232
// COURSE : WEB322
// DATE : 2024 / 10 / 07

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("search-results");

const destinations = {
    "canada": [
        {
            name: "Banff National Park",
            image: "images/banff_image.jpg",
            location: "Alberta, Canada",
            price: "$200"
        },
        {
            name: "Niagara Falls",
            image: "images/niagara_image.jpg",
            location: "Ontario, Canada",
            price: "$150"
        },
        {
            name: "CN Tower",
            image: "images/cn_tower_image.jpg",
            location: "Toronto, Ontario, Canada",
            price: "$50"
        }
    ]
};

function searchLocation() {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ""; // Clear previous results

    if (destinations[query]) {
        const locationList = destinations[query];
        locationList.forEach(location => {
            const card = `
                <div class="result-card">
                    <img src="${location.image}" alt="${location.name}">
                    <h3>${location.name}</h3>
                    <p>${location.location}</p>
                    <p class="price">${location.price}</p>
                </div>
            `;
            searchResults.innerHTML += card;
        });

        searchResults.scrollIntoView({ behavior: "smooth" });
    } else {
        searchResults.innerHTML = "<p>No results found</p>";
    }
}

document.querySelector("button").addEventListener("click", searchLocation);
