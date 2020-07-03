const postContainer = $(".post-container");

$(document).ready(() => {
  postContainer.on("click", "button", () => {
    // eslint-disable-next-line prefer-const
    let categoryId = event.target.getAttribute("data-id");
    console.log(categoryId);

    // eslint-disable-next-line no-unused-vars
    $.get(`/api/categories/${categoryId}`).then(data => {
      window.location.href = `/api/categories/${categoryId}`;
    });
  });
});
