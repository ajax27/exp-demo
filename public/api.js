var getButton = document.getElementById('user_form');
getButton.addEventListener('submit', getRequest);

function getRequest(event) {
  event.preventDefault();
  var movieId = event.target.movieId.value;
  fetch(`/movies/${movieId}`)
    .then((response) => response.json())
    .then(function (data) {
      if (!movieId) {
        document.getElementById("results").innerHTML = '';
        for (var i in data) {
          document.getElementById("results").innerHTML += data[i].movieTitle + '<br />';
        }
      } else {
        document.getElementById("results").innerHTML = '';
        document.getElementById("results").innerHTML += data.movieTitle + '<br />';
      }
      console.log(data);
    });
};

var postButton = document.getElementById('user_form_post');
postButton.addEventListener('submit', newPost);

function newPost(event, post) {
  event.preventDefault();
  var movieTitle = event.target.movieTitle.value;
  var movieDirector = event.target.movieDirector.value;
  post = {
    movieTitle,
    movieDirector
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  return fetch('/movies', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(error => console.error('error: ', error));
};

var deleteButton = document.getElementById('user_form_delete');
deleteButton.addEventListener('submit', deletePost);

function deletePost(event) {
  event.preventDefault();
  var movieId = event.target.movieId.value;
  console.log(movieId);
  const options = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      movieId
    })
  }
  const URL = `/movies/${movieId}`;
  fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('Movie to Delete: ', data))
}

var putButton = document.getElementById('user_form_put');
putButton.addEventListener('submit', putPost);

function putPost(event) {
  event.preventDefault();
  var movieId = event.target.movieId.value;
  var movieTitle = event.target.movieTitle.value;
  var movieDirector = event.target.movieDirector.value;
  post = {
    movieTitle,
    movieDirector
  }
  const options = {
    method: 'PATCH',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  const URL = `/movies/${movieId}`;
  return fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('Movie to Update', data))
}
