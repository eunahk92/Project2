/* eslint-disable prettier/prettier */
$(() => {
  $(".").on("click", e => {
    e.preventDefault();

    let truckerName = $("#trucker_name").val().trim();
    truckerName = capitalizeWords(truckerName);
    let truckerAddress = $("#trucker_addy").val().trim();
    truckerAddress = capitalizeWords(truckerAddress);
    let truckerCity = $("#trucker_city").val().trim();
    truckerCity = capitalizeWords(truckerCity);
    let truckerState = $("#trucker_state").val().trim();
    truckerState = capitalizeWords(truckerState);
    const truckerZipcode = $("#trucker_zipcode").val().trim();

    const truckerPost = {
      trucker_name: truckerName,
      street_address: truckerAddress,
      city: truckerCity,
      state: truckerState,
      zipcode: truckerZipcode
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: truckerPost
    }).then(() => {
      console.log("New Food Truck Post has been added.");
      location.reload();
    });
  });
});

capitalizeWords = str => str.replace(/\w\S*/g, 
  txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());