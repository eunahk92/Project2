const foodTypeSelect = $("#foodTypes");
const submitForm = $("#submitBtn");

$(document).ready(() => {
  submitForm.on("click", event => {
    event.preventDefault();

    let truckerName = capitalizeWords($("#trucker_name").val().trim());
    let address = capitalizeWords($("#trucker_addy").val().trim());
    let city = capitalizeWords($("#trucker_city").val().trim());
    let state = capitalizeWords($("#trucker_state").val().trim());
    let zipcode = $("#trucker_zipcode").val().trim();
    let foodType = $("#foodTypes option:selected").data("id");
    let startTime = $("#startTime option:selected").val();
    let endTime = $("#endTime option:selected").val();

    let truckerPost = {
      trucker_name: truckerName,
      street_address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      food_type: foodType,
      time_start: startTime,
      time_end: endTime
    };
    
    $.ajax("/api/foodtrucks", {
      type: "POST",
      data: truckerPost
    }).then(() => location.reload());
  });

  getCategories = () => {
    $.get("/api/categories", data => {
      let rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        let listOption = `
          <option data-id="${data[i].id}">${data[i].food_type}</option>
        `
        rowsToAdd.push(listOption);
      }
      foodTypeSelect.empty();
      console.log(rowsToAdd);
      console.log(foodTypeSelect);
      foodTypeSelect.append(rowsToAdd);
    })
  }
  getCategories();
});

capitalizeWords = str => str.replace(/\w\S*/g, 
  txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

