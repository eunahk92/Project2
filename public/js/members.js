$(document).ready(() => {
  const postContainer = $("#postContainer");
  const foodTypeSelect = $("#foodTypes");
  const submitForm = $("#submitBtn");
  let userEmail, userID;

  $.get("/api/user_data").then(data => {
    userID = data.id;
    userEmail = data.email;
    $(".member-name").text(userEmail);
    getPosts(userID);
  });

  getPosts = userID => {
    $.get(`/api/foodtrucks/user/${userID}`, posts => {
      postContainer.empty();
      if (posts.length === 0) {
        let noPostMsg = `<h4 class="has-text-centered	is-italic">User has no current posts. Add a post to change this!</h4>`
        postContainer.append(noPostMsg);
      } else {
        for (let i = 0; i < posts.length; i++) {
          let truckerPost = `
          <div class="column is-full">
            <div class="box">
                <div class="media-content">
                    <div class="content">
                        <p class="title">${posts[i].truck_name}</p>
                        <p class="subtitle"> 
                            Open from ${posts[i].time_start} to ${posts[i].time_end}<br>
                            ${posts[i].street_address}, ${posts[i].city}, ${posts[i].state} ${posts[i].zipcode}
                        </p>
                    </div>
                    <nav class="level">
                        <div class="level-left">
                            <button id="delete-post" class="level-item button is-link is-rounded" data-id=${posts[i].id}>Delete Post</button>
                            <button id="update-post" class="button is-info is-rounded" data-id=${posts[i].id}>Update Post</button>
                        </div>
                    </nav>
                </div>
            </div>
          </div>
          `
          postContainer.append(truckerPost);
        }
      }
    });
  }

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

    let newPost = {
      truck_name: truckerName,
      street_address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      food_type: foodType,
      time_start: startTime,
      time_end: endTime,
      user_id: userID
    };
    
    $.ajax("/api/foodtrucks", {
      type: "POST",
      data: newPost
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
      foodTypeSelect.append(rowsToAdd);
    })
  }
  getCategories();
  getPosts(userID);

});

$(document).on("click", "#delete-post", function() {
  let id = $(this).data("id");
  console.log("i clicked");

  $.ajax(`/api/foodtrucks/posts/${id}`, {
      type: "DELETE"
  }).then(() => location.reload());
});

$(document).on("click", "#update-post", function() {
  let id = $(this).data("id");
  
  $.ajax(`/api/foodtrucks/${id}`, {
      type: "PUT",
      data: SOMETHINGHERE
  }).then(() => location.reload());
});

capitalizeWords = str => str.replace(/\w\S*/g, 
  txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());