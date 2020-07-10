$(document).ready(() => {
  const postContainer = $("#postContainer");
  const foodTypeSelect = $("#foodTypes");
  const submitForm = $("#submitBtn");
  let userEmail, userID, chosenFoodType;

  $.get("/api/user_data").then(data => {
    userID = data.id;
    userEmail = data.email;
    $(".member-name").text(userEmail);
    getPosts(userID);
  });

  getPosts = userID => {
    $.get(`/api/foodtrucks/user/${userID}`, posts => {
      postContainer.empty();
      let userPostsArr = posts.Posts;
      
      if (userPostsArr.length === 0) {
        let noPostMsg = `<h4 class="has-text-centered	is-italic">User has no current posts. Add a post to change this!</h4>`
        postContainer.append(noPostMsg);
      } else {
        for (let i = 0; i < userPostsArr.length; i++) {
          let truckerPost = `
          <div class="column is-full">
            <div class="box">
                <div class="media-content">
                    <div class="content">
                        <p class="title mb-1">${userPostsArr[i].truck_name}</p>
                        <div class="descText">
                          <i class="fas fa-map-marker-alt"></i> ${userPostsArr[i].street_address}, ${userPostsArr[i].city}, ${userPostsArr[i].state} ${userPostsArr[i].zipcode}<br>
                        </div>
                        <div class="descText">
                            <i class="fas fa-clock"></i><span class="mx-1">${userPostsArr[i].time_start} to ${userPostsArr[i].time_end}</span></span>    
                        </div>
                    </div>
                    <nav class="level">
                        <div class="level-left">
                            <button id="delete-post" class="level-item button is-link is-rounded" data-id=${userPostsArr[i].id}>Delete Post</button>
                            <button id="update-post" class="button is-info is-rounded" data-id=${userPostsArr[i].id}>Update Post</button>
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
    let foodTypeId = $("#foodTypes option:selected").data("id");
    chosenFoodType = $("#foodTypes option:selected").val();
    let startTime = $("#startTime option:selected").val();
    let endTime = $("#endTime option:selected").val();

    let newPost = {
      truck_name: truckerName,
      street_address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      time_start: startTime,
      time_end: endTime,
      UserId: userID,
      CategoryId: foodTypeId
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
  window.location.href = `/foodtrucks?post_id=${id}`;
});

capitalizeWords = str => str.replace(/\w\S*/g, 
  txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());