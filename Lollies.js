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
        window.location.href = 'Lollies_homepage.html';
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
            window.location.href = 'Lollies_login.html';
        });
    }

/*LOGOUT*/
const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'Lollies_login.html';
    });
    }

/*CHECK IF USER IS LOGGED IN ON HOME PAGE*/
const movieGrid = document.getElementById('movie-grid');
if (movieGrid) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'Lollies_login.html';
    }

/*movie data*/
    const movies = [
        { id: 1, title: 'Special Victims Unit', img: 'images/svu2.jpeg', genre: 'Action', year: 2017, rating: 'PG-10' },
        { id: 2, title: 'Identity Thief', img: 'images/idthief.jpg', genre: 'Comedy', year: 2013, rating: '18+' },
        { id: 3, title: 'Catering Christmas', img: 'images/cateringchristmas.jpeg', genre: 'Romance', year: 2025, rating: 'All' },
        { id: 4, title: 'How To Get Away With Murder', img: 'images/htgawm.jpeg', genre: 'Horror', year: 2025, rating: 'R' },
        { id: 5, title: 'House', img: 'images/drhouse.jpeg', genre: 'Drama', year: 2011, rating: '18+' },

        { id: 6, title: 'The Dark Knight', img: 'images/tdk.jpeg', genre: 'Action', year: 2008, rating: 'PG-15' },
        { id: 7, title: 'The Notebook', img: 'images/notebk.jpeg', genre: 'Romance', year: 2004, rating: 'PG-15' },
        { id: 8, title: 'Get Out', img: 'images/getout.jpg', genre: 'Horror', year: 2017, rating: 'R' }
    ];

/*Render movies*/
    function renderMovies(movieArray, gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        movieArray.forEach(movie => {
            const card = document.createElement('div');
            card.className =
                'aspect-[2/3] max-w-[220px] mx-auto bg-gray-800 rounded-md overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform';

            card.innerHTML = `
                <img src="${movie.img}" alt="${movie.title}" class="w-full h-full object-cover" />
            `;

            card.addEventListener('click', () => {
                window.location.href = `Lollies_movie_deets.html?id=${movie.id}`;
            });

            grid.appendChild(card);
        });
    }

    /* POPULAR MOVIES*/
    renderMovies(movies, "movie-grid");

    /* GENRE SECTIONS */
    renderMovies(movies.filter(m => m.genre === "Action"), "action-grid");
    renderMovies(movies.filter(m => m.genre === "Comedy"), "comedy-grid");
    renderMovies(movies.filter(m => m.genre === "Romance"), "romance-grid");
    renderMovies(movies.filter(m => m.genre === "Horror"), "horror-grid");
    renderMovies(movies.filter(m => m.genre === "Drama"), "drama-grid");
}

