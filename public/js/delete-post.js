$(document).ready(function () {

  const deletePostHandler = async function (event) {
    event.preventDefault();
    
    const id = document.getElementById('post-id').value;

    fetch(`/api/post/${id}`, {
      method: 'delete',
    })
      .then(function () {
        document.location.replace('/dashboard');
      })
      .catch((err) => console.log(err));
  };

  document
    .querySelector('#delete-btn')
    .addEventListener('click', deletePostHandler);
});
