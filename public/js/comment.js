$(document).ready(function () {
  const commentFormHandler = async function (event) {
    event.preventDefault();

    const comment_body = document.querySelector('#comment-body').value;
    const id = document.getElementById('post-id').value;

    if (comment_body) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          id,
          comment_body,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };

  document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);
});
