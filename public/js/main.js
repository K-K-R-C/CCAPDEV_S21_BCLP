let logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", async function() {

        // Server side (destroy session)
        try
        {
            await fetch("/logout", { method: "GET" });
        }
        catch (e)
        {
            console.log("Logout request failed");
        }

        window.location.href = "/";
    });
}

document.addEventListener("click", function(e)
{
    // Find post container
    const postContainer = e.target.closest(".post");
    if (!postContainer) return;

    const likeBtn = postContainer.querySelector(".like-btn img");
    const dislikeBtn = postContainer.querySelector(".dislike-btn img");

    if (!likeBtn || !dislikeBtn) return;

    // Like button
    if (e.target.closest('.like-btn'))
    {
        // Reset dislike
        dislikeBtn.src = "/images/thumbs-down.png";

        // Toggle like
        if (likeBtn.src.includes("thumbs-up.png")) {
            likeBtn.src = "/images/blue-like.png";
        } else {
            likeBtn.src = "/images/thumbs-up.png";
        }
    }

    // Dislike button
    if (e.target.closest(".dislike-btn")) {
        // Reset like
        likeBtn.src = "/images/thumbs-up.png";

        // Toggle dislike
        if (dislikeBtn.src.includes("thumbs-down.png")) {
            dislikeBtn.src = "/images/red-dislike.png";
        } else {
            dislikeBtn.src = "/images/thumbs-down.png";
        }
    }
});

// Image Preview for Create Post
document.addEventListener("DOMContentLoaded", function(e) {
    const photoInput = document.getElementById("photo");
    const preview = document.getElementById("preview");
    const uploadBox = document.getElementById("uploadBox");
    const uploadText = document.getElementById('uploadText');

    if (photoInput)
    {
        photoInput.addEventListener("change", function(e) {

            const files = Array.from(e.target.files);
            const firstFile = files[0];

            if (firstFile && firstFile.type.startsWith("image/")) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = "block";
                    uploadBox.classList.add("has-image");
                    uploadText.textContent = `${files.length} image${files.length > 1 ? 's' : ''} ready! (${firstFile.name})`;
                };

                reader.readAsDataURL(firstFile);
            } else {
                preview.style.display = "none";
                uploadBox.classList.remove("has-image");
                uploadText.textContent = "Drag photo here or click to upload";
            }
        });
    }
});

// Search on enter
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.searchbar input[name="search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('searchForm').submit();
            }
        });
    }
});

// Clear all user input/choices
function clearAll() {
    const url = new URL(window.location);
    url.searchParams.delete('search');
    url.searchParams.set('destination', 'all');
    url.searchParams.set('travelStyle', 'all');
    window.location = url;
}