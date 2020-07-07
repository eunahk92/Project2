$(function() {
    $(".update-post").on("click", function(event) {
        let id = $(this).data("id");

        $.ajax(`/api/foodtrucks/${id}`, {
            type: "PUT",
            data: SOMETHINGHERE
        }).then(() => location.reload());
    });

    $(".delete-post").on("click", function(event) {
        let id = $(this).data("id");

        $.ajax(`/api/foodtrucks/${id}`, {
            type: "DELETE"
        }).then(() => location.reload());
    });
});