function searchDestination() {
    const query = document.getElementById('searchInput').value;
    const results = document.getElementById('results');

    // Sample logic to handle search
    if (query.toLowerCase() === 'beach') {
        results.innerHTML = `
            <h2>Top Beach Destinations</h2>
            <p>1. Maldives</p>
            <p>2. Bora Bora</p>
            <p>3. Maui, Hawaii</p>
        `;
    } else if (query.toLowerCase() === 'temple') {
        results.innerHTML = `
            <h2>Famous Temples</h2>
            <p>1. Angkor Wat, Cambodia</p>
            <p>2. Shwedagon Pagoda, Myanmar</p>
            <p>3. Meenakshi Temple, India</p>
        `;
    } else {
        results.innerHTML = `<p>No results found for "${query}". Try different keywords.</p>`;
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    // Here you could add actual form submission logic
});
