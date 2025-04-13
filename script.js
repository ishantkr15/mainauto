document.addEventListener('DOMContentLoaded', function() {
    // Remove specific movie if it exists (by title)
    removeMovieByTitle("fghrd");
    
    // Load content from localStorage
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const storedApks = JSON.parse(localStorage.getItem('apps')) || [];

    // Render content
    renderContent('#movies .content-grid', storedMovies);
    renderContent('#apks .content-grid', storedApks);

    // Function to render content
    function renderContent(selector, items) {
        const container = document.querySelector(selector);
        
        if (items.length === 0) {
            container.innerHTML = '<p class="no-content">No content available yet. Check back later!</p>';
            return;
        }
        
        container.innerHTML = items.map(item => `
            <div class="content-card">
                <img src="${item.image}" alt="${item.title}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-info">${item.info}</p>
                    <a href="${item.link}" class="download-btn">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            </div>
        `).join('');
    }
    
    // Function to remove a movie by title
    function removeMovieByTitle(title) {
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        const filteredMovies = movies.filter(movie => 
            !movie.title.toLowerCase().includes(title.toLowerCase())
        );
        
        if (movies.length !== filteredMovies.length) {
            localStorage.setItem('movies', JSON.stringify(filteredMovies));
            console.log(`Removed movie containing "${title}" from storage`);
        }
    }
});