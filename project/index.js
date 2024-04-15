document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
  
    searchButton.addEventListener("click", searchBooks);
    clearButton.addEventListener("click", clearSearchResults);
  
    function searchBooks() {
        const searchQuery = document.getElementById("searchInput").value;
        const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`;
  
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const searchResultsDiv = document.getElementById("searchResults");
                searchResultsDiv.innerHTML = "";
  
                data.docs.forEach((book, index) => {
                    if (index < 10) {
                        const bookTitle = book.title;
                        const bookAuthor = (book.author_name && book.author_name.length > 0) ? book.author_name[0] : "Unknown author";
                        const bookKey = book.key;
                        const bookURL = `https://openlibrary.org${bookKey}`;
  
                        const bookHTML = `<p><strong>Title:</strong> <a href="${bookURL}" target="_blank">${bookTitle}</a></p><p><strong>Author:</strong> ${bookAuthor}</p>`;
                        searchResultsDiv.insertAdjacentHTML("beforeend", bookHTML);
                    }
                });
  
                // If there are more than ten results, create a "Read More" button
                if (data.docs.length > 10) {
                    const readMoreButton = document.createElement("button");
                    readMoreButton.textContent = "Read More";
                    readMoreButton.addEventListener("click", () => {
                        // Display all search results
                        searchResultsDiv.innerHTML = "";
                        data.docs.forEach(book => {
                            const bookTitle = book.title;
                            const bookAuthor = (book.author_name && book.author_name.length > 0) ? book.author_name[0] : "Unknown author";
                            const bookKey = book.key;
                            const bookURL = `https://openlibrary.org${bookKey}`;
  
                            const bookHTML = `<p><strong>Title:</strong> <a href="${bookURL}" target="_blank">${bookTitle}</a></p><p><strong>Author:</strong> ${bookAuthor}</p>`;
                            searchResultsDiv.insertAdjacentHTML("beforeend", bookHTML);
                        });
                        // Remove the "Read More" button after displaying all results
                        readMoreButton.remove();
                    });
                    searchResultsDiv.appendChild(readMoreButton);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
  
    function clearSearchResults() {
        document.getElementById("searchResults").innerHTML = "";
    }
  });
  