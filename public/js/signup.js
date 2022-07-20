$(document).ready(function () {
  
    const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && email && password) {
      const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        document.location.replace('/dashboard');
        alert('New user created successfully!');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
    .querySelector('#signup-form')
    .addEventListener('submit', signupHandler);
});
