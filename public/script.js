document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("search-results");
    const searchButton = document.getElementById('search-button');

    if (searchButton) {
        searchButton.addEventListener("click", searchLocation);
    }

    // Fetch data from the server
    async function fetchData() {
        try {
            const response = await fetch('/data/data.json');  // Fetching data from the correct path
            if (!response.ok) throw new Error('Failed to load data');
            const data = await response.json();
            return data.top_places_canada;  // Return the correct array from JSON
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to search for a location and display the results
    async function searchLocation() {
        const query = searchInput.value.toLowerCase();
        const locations = await fetchData();

        // Handle the case where data is not available
        if (!locations) {
            searchResults.innerHTML = "<p>Error loading data or no results found</p>";
            return;
        }

        searchResults.innerHTML = "";  // Clear previous results

        // Filter the locations based on the search query
        const filteredLocations = locations.filter(location =>
            // Check if the query matches any part of any field (name, description, id, etc.)
            location.name.toLowerCase().includes(query) ||
            location.province.toLowerCase().includes(query) ||
            location.category.toLowerCase().includes(query) ||
            location.description.toLowerCase().includes(query) ||
            location.id.toString().includes(query)  // Convert id to string to match the query
        );

        // Display the results or show a "No results found" message
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
