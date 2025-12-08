/* LOGIN */
const loginForm = document.getElementById('login-form');
    if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
        localStorage.setItem('loggedInUser', user.username);
        alert('Login successful!');
        window.location.href = 'home.html';
        } else {
        alert('Invalid email or password');
        }
    });
    }

/*SIGNUP*/
const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];

            if (users.find(u => u.email === email)) {
            alert('Email already exists!');
            return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! You can now login.');
            window.location.href = 'login.html';
        });
    }

/*LOGOUT*/
const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
    }

/*CHECK IF USER IS LOGGED IN ON HOME PAGE*/
const movieGrid = document.getElementById('movie-grid');
if (movieGrid) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
    }

/*Sample movie data*/
    const movies = [
        { id: 1, title: 'Action Movie', img: 'images/movie1.jpg', genre: 'Action', year: 2025, rating: 'PG-13' },
        { id: 2, title: 'Comedy Movie', img: 'images/movie2.jpg', genre: 'Comedy', year: 2024, rating: 'PG' },
        { id: 3, title: 'Romance Movie', img: 'images/movie3.jpg', genre: 'Romance', year: 2023, rating: 'PG-13' },
        { id: 4, title: 'Horror Movie', img: 'images/movie4.jpg', genre: 'Horror', year: 2025, rating: 'R' },
        { id: 5, title: 'Drama Movie', img: 'images/movie5.jpg', genre: 'Drama', year: 2022, rating: 'PG' }
    ];

/*Render movies*/
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'aspect-[2/3] max-w-[220px] mx-auto bg-gray-800 rounded-md overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform';
        card.innerHTML = `<img src='${movie.img}' alt='${movie.title}' class='w-full h-full object-cover' />`;

        // Click to movie details page
        card.addEventListener('click', () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
        });

        movieGrid.appendChild(card);
    });
}
