$(document).ready(function() {
  const submitForm = $("#submitBtn");
  const cancelForm = $("#cancelBtn");
  let url = window.location.search;
  let postId;

  findID = () => {
    if (url.indexOf("?post_id=") !== -1) {
      return postId = url.split("=")[1];
    }
    return;
  };

  findID();

  getCategories = () => {
    $.get("/api/categories", data => {
      let rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        const { id, food_type } = data[i];
        let listOption = `
          <option data-id="${id}">${food_type}</option>
        `
        rowsToAdd.push(listOption);
      }
      $("#update_foodTypes").empty();
      $("#update_foodTypes").append(rowsToAdd);
    })
  }
  getCategories();

  $.get("/api/foodtrucks", data => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == postId) {
        let { truck_name, street_address, city, state, zipcode, time_start, time_end, CategoryId, only_cc, only_cash, outdoor_seating } = data[i];

        $("#update_trucker_name").val(truck_name);
        $("#update_trucker_addy").val(street_address);
        $("#update_trucker_city").val(city);
        $("#update_trucker_state").val(state);
        $("#update_trucker_zipcode").val(zipcode);
        
        $('#update_startTime').find('option').each(function() {
          let $this = $(this);
          if ($this.text() == time_start) {
              $this.attr('selected','selected');
              return false;
          }
        });
        $('#update_endTime').find('option').each(function() {
          let $this = $(this);
          if ($this.text() == time_end) {
              $this.attr('selected','selected');
              return false;
          }
        });
        $('#update_foodTypes').find('option').each(function() {
          let $this = $(this);
          let option = $this.val();
          if ($this.data("id") === CategoryId) {
            $('#update_foodTypes').val(option);
            return false;
          }
        });
        if (only_cc) {
          $('#update_cardOnlyBox').prop('checked', true);
        }
        if (only_cash) {
          $('#update_cashOnlyBox').prop('checked', true);
        }
        if (outdoor_seating) {
          $('#update_outdoorSeatingBox').prop('checked', true);
        }
      }
    }
  });

  submitForm.on("click", event => {
    event.preventDefault();
    
    const truckerName = capitalizeWords($("#update_trucker_name").val().trim());
    const address = capitalizeWords($("#update_trucker_addy").val().trim());
    const city = capitalizeWords($("#update_trucker_city").val().trim());
    const state = capitalizeWords($("#update_trucker_state").val().trim());
    const zipcode = $("#update_trucker_zipcode").val().trim();
    const chosenFoodTypeId = $("#update_foodTypes option:selected").data("id");
    const startTime = $("#update_startTime option:selected").val();
    const endTime = $("#update_endTime option:selected").val();
    const cardOnly = $("#update_cardOnlyBox").prop("checked");
    const cashOnly = $("#update_cashOnlyBox").prop("checked");
    const outdoorAvail = $("#update_outdoorSeatingBox").prop("checked");

    let post = {
      id: postId,
      truck_name: truckerName,
      street_address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      time_start: startTime,
      time_end: endTime,
      CategoryId: chosenFoodTypeId,
      only_cc: cardOnly,
      only_cash: cashOnly,
      outdoor_seating: outdoorAvail
    };

    console.log(post);

    $.ajax(`/api/foodtrucks`, {
      method: "PUT",
      data: post
    }).then(() => window.location.href = "/members");

  });

  cancelForm.on("click", event => {
    event.preventDefault();
    window.location.href = "/members";
  });
});

capitalizeWords = str => str.replace(/\w\S*/g, 
  txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
