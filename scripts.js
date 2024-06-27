document.querySelector('.search-bar input').addEventListener('keyup', function(event) {
    const query = event.target.value.toLowerCase();
    const artPieces = document.querySelectorAll('.gallery-grid .art-piece');

    artPieces.forEach(piece => {
        const title = piece.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            piece.style.display = '';
        } else {
            piece.style.display = 'none';
        }
    });
});
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again later.');
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Your message was sent successfully!');
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Oops! There was a problem submitting your form');
                }
            })
        }
    }).catch(error => {
        alert('There was an error sending your message. Please try again later.');
    });
});