$(document).ready(function () {

    const newFormHandler = async function(event) {
        event.preventDefault();
      
        const title = document.querySelector("#post-title").value;
        const post_text = document.querySelector("#post-body").value;

       const response = await fetch('/api/posts', {
          method: "POST",
          body: JSON.stringify({
            title,
            post_text
          }),
          headers: {
            "Content-Type": "application/json",

          }
        });
      
        if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert(response.statusText);
      }
  }
      
      document
        .querySelector("#new-post-form")
        .addEventListener("submit", newFormHandler);

})