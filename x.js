// Function to fetch artworks from the API
async function fetchArtworks(query = '') {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}`);
        const data = await response.json();
        displayArtworks(data.data);
    } catch (error) {
        console.error('Error fetching artworks:', error);
    }
}

// Function to display artworks in the UI
function displayArtworks(artworks) {
    const artworkList = document.getElementById('artworkList');
    artworkList.innerHTML = ''; // Clear existing artworks

    artworks.forEach(artwork => {
        const li = document.createElement('li');
        li.textContent = artwork.title || 'Untitled';
        const img = document.createElement('img');

        if (artwork.image_id) {
            img.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`;
            li.appendChild(img);
        }

        li.dataset.id = artwork.id; // Store artwork ID for later use
        artworkList.appendChild(li);
        
        // Event listener for clicking on an artwork
        li.addEventListener('click', () => {
            alert(`Artwork ID: ${li.dataset.id}, Title: ${artwork.title || 'Untitled'}`);
        });

        // Event listener for clicking on the image to open in lightbox
        img.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the li click
            openLightbox(img.src);
        });
    });
}

// Function to search artworks
function searchArtworks() {
    const searchTerm = document.getElementById('search').value;
    fetchArtworks(searchTerm);
}

// Function to open the lightbox
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = imageSrc;
    lightbox.classList.remove('hidden');
}

// Function to close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
}

// Event listener for the search input to trigger search on button click
document.getElementById('searchButton').addEventListener('click', searchArtworks);
document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchArtworks(); // Allow search with Enter key
    }
});

// Event listener for closing the lightbox
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);

// Fetch artworks when the page loads
window.onload = () => fetchArtworks();