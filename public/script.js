document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("search-results");

    const searchButton = document.getElementById('search-button');
    
    if (searchButton) {  // Ensure search-button exists before adding event listener
        searchButton.addEventListener("click", searchLocation);
    }

    async function fetchData() {
        try {
            const response = await fetch('/data/data.json');
            if (!response.ok) throw new Error('Failed to load data');
            const data = await response.json();
            return data.top_places_canada;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function searchLocation() {
        const query = searchInput.value.toLowerCase();
        const locations = await fetchData();
        searchResults.innerHTML = "";  // Clear previous results

        const filteredLocations = locations.filter(location =>
            location.name.toLowerCase().includes(query) ||
            location.province.toLowerCase().includes(query) ||
            location.category.toLowerCase().includes(query)
        );

        if (filteredLocations.length > 0) {
            filteredLocations.forEach(location => {
                const card = `
                    <div class="result-card">
                        <img src="${location.image_1}" alt="${location.name}">
                        <h3>${location.name}</h3>
                        <p>${location.province}</p>
                        <p>${location.category}</p>
                        <p>${location.description}</p>
                    </div>
                `;
                searchResults.innerHTML += card;
            });
            searchResults.scrollIntoView({ behavior: "smooth" });
        } else {
            searchResults.innerHTML = "<p>No results found</p>";
        }
    }
});
