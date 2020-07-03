const postContainer = $(".post-container");

$(document).ready(() => {
    postContainer.on("click", "button", () => {

        let categoryId = event.target.getAttribute("data-id");
        console.log(categoryId);

        $.get(`/api/categories/${categoryId}`).then(data => {
            window.location.href = `/api/categories/${categoryId}`;
        });
    });
});