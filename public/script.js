document.addEventListener('DOMContentLoaded', () => {
    // Get references to the input field where the user types their query,
    // the container where search results will be displayed, and the search button
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("search-results");
    const searchButton = document.getElementById('search-button');

    // If the search button exists in the DOM, attach a click event listener to it
    if (searchButton) {
        searchButton.addEventListener("click", searchLocation);  // This will trigger the searchLocation function when clicked
    }

    /**
     * Asynchronous function to fetch the data from the server
     * It retrieves a JSON file located on the server and returns the top_places_canada array
     */
    async function fetchData() {
        try {
            // Attempt to fetch the JSON file from the specified path
            const response = await fetch('/data/data.json');  // Ensure the path is correct for where the JSON is stored
            if (!response.ok) throw new Error('Failed to load data');  // If the response is not OK, throw an error
            const data = await response.json();  // Parse the response as a JSON object
            return data.top_places_canada;  // Return the specific array from the JSON object
        } catch (error) {
            console.error('Error fetching data:', error);  // Log any errors encountered during fetching
        }
    }

    /**
     * Function to search for locations and display results based on user input
     * It filters through the fetched data to find matches and updates the DOM with results
     */
    async function searchLocation() {
        // Get the search query entered by the user and convert it to lowercase for case-insensitive matching
        const query = searchInput.value.toLowerCase();
        const locations = await fetchData();  // Fetch the location data from the server

        // If the locations data is unavailable, display an error message to the user
        if (!locations) {
            searchResults.innerHTML = "<p>Error loading data or no results found</p>";
            return;  // Exit the function early if no data is available
        }

        searchResults.innerHTML = "";  // Clear any previous search results from the DOM

        // Filter the locations array based on the user's query
        // Match query against different fields like name, province, category, and description
        const filteredLocations = locations.filter(location =>
            location.name.toLowerCase().includes(query) ||  // Match name field
            location.province.toLowerCase().includes(query) ||  // Match province field
            location.category.toLowerCase().includes(query) ||  // Match category field
            location.description.toLowerCase().includes(query) ||  // Match description field
            location.id.toString().includes(query)  // Match ID field by converting it to a string
        );

        // If matches are found, display each location's information in a card format
        if (filteredLocations.length > 0) {
            filteredLocations.forEach(location => {
                // Create a card for each matched location with its image, name, province, category, and description
                const card = `
                    <div class="result-card">
                        <img src="${location.image_1}" alt="${location.name}">
                        <h3>${location.name}</h3>
                        <p>${location.province}</p>
                        <p>${location.category}</p>
                        <p>${location.description}</p>
                    </div>
                `;
                searchResults.innerHTML += card;  // Append each card to the search results container
            });
            searchResults.scrollIntoView({ behavior: "smooth" });  // Scroll to the search results smoothly
        } else {
            // If no matches are found, display a "No results found" message
            searchResults.innerHTML = "<p>No results found</p>";
        }
    }
});
