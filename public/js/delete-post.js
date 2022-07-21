$(document).ready(function () {
  const deletePostHandler = async function (event) {
    event.preventDefault();

    const id = document.getElementById('post-id').value;

    const response = await fetch(`/api/posts/${id}`, {
      method: 'delete',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  document
    .querySelector('#delete-btn')
    .addEventListener('click', deletePostHandler);
});
