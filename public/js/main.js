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

document.addEventListener("DOMContentLoaded", function() {
    const currentUser = document.body.dataset.userId || null;

    document.querySelectorAll(".post").forEach(post => {
        const postId = post.dataset.postId;

        const likeBtn = post.querySelector(".like-btn img");
        const dislikeBtn = post.querySelector(".dislike-btn img");

        const upvotes = JSON.parse(post.dataset.upvotes || "[]");
        const downvotes = JSON.parse(post.dataset.downvotes || "[]");

        if (upvotes.includes(currentUser)) likeBtn.src = "/images/blue-like.png";
        if (downvotes.includes(currentUser)) dislikeBtn.src = "/images/red-dislike.png";
    });

    document.querySelectorAll(".like-btn, .dislike-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const postId = btn.dataset.postId;
            const likeBtn = document.querySelector(`.like-btn[data-post-id="${postId}"] img`);
            const dislikeBtn = document.querySelector(`.dislike-btn[data-post-id="${postId}"] img`);

            if (!currentUser) {
                alert("Log in to like or dislike posts");
                return;
            }

            const isLike = btn.classList.contains("like-btn");
            const endpoint = isLike ? `/post/${postId}/like` : `/post/${postId}/dislike`;

            try {
                const res = await fetch(endpoint, { method: "POST" });
                const data = await res.json();

                document.getElementById(`like-count-${postId}`).textContent = data.upvotes;
                document.getElementById(`dislike-count-${postId}`).textContent = data.downvotes;

                likeBtn.src = data.userLiked ? "/images/blue-like.png" : "/images/thumbs-up.png";
                dislikeBtn.src = data.userDisliked ? "/images/red-dislike.png" : "/images/thumbs-down.png";

            } catch (err) {
                console.error(err);
            }
        });
    });
});
