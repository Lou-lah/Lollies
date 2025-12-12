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

/* SIGNUP */
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

/* LOGOUT*/
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'Lollies_login.html';
    });
}

const loggedInUser = localStorage.getItem("loggedInUser");

/* MOVIE DATA*/
const movies = [
    { id: 1, title: 'Special Victims Unit', img: 'images/svu2.jpeg', genre: 'Action', year: 2017, rating: 'PG-10', description:"Lorem ipsum sit..." },
    { id: 2, title: 'Identity Thief', img: 'images/idthief.jpg', genre: 'Comedy', year: 2013, rating: '18+', description:"Lorem ipsum sit..." },
    { id: 3, title: 'Catering Christmas', img: 'images/cateringchristmas.jpeg', genre: 'Romance', year: 2025, rating: 'All', description:"Lorem ipsum sit..." },
    { id: 4, title: 'How To Get Away With Murder', img: 'images/htgawm.jpeg', genre: 'Horror', year: 2025, rating: 'R', description:"Lorem ipsum sit..." },
    { id: 5, title: 'House', img: 'images/drhouse.jpeg', genre: 'Drama', year: 2011, rating: '18+', description:"Lorem ipsum sit..." },
    { id: 6, title: 'The Dark Knight', img: 'images/tdk.jpeg', genre: 'Action', year: 2008, rating: 'PG-15', description:"Lorem ipsum sit..." },
    { id: 7, title: 'The Notebook', img: 'images/notebk.jpeg', genre: 'Romance', year: 2004, rating: 'PG-15', description:"Lorem ipsum sit..." },
    { id: 8, title: 'Get Out', img: 'images/getout.jpg', genre: 'Horror', year: 2017, rating: 'R', description:"Lorem ipsum sit..." }
];
/*movie data*/
    const movies = [
        { id: 1, title: 'Special Victims Unit', img: 'images/svu2.jpeg', genre: 'Action', year: 2017, rating: 'PG-10' },
        { id: 2, title: 'Identity Thief', img: 'images/idthief.jpg', genre: 'Comedy', year: 2013, rating: '18+' },
        { id: 3, title: 'Catering Christmas', img: 'images/cateringchristmas.jpeg', genre: 'Romance', year: 2025, rating: 'All' },
        { id: 4, title: 'How To Get Away With Murder', img: 'images/htgawm.jpeg', genre: 'Horror', year: 2022, rating: 'R' },
        { id: 5, title: 'House', img: 'images/drhouse.jpeg', genre: 'Drama', year: 2011, rating: '18+' },

        { id: 6, title: 'The Dark Knight', img: 'images/tdk.jpeg', genre: 'Action', year: 2008, rating: 'PG-15' },
        { id: 7, title: 'The Notebook', img: 'images/notebk.jpeg', genre: 'Romance', year: 2004, rating: 'PG-15' },
        { id: 8, title: 'Get Out', img: 'images/getout.jpg', genre: 'Horror', year: 2017, rating: 'R' }
    ];

/* HOMEPAGE RENDERING */
function renderMovies(movieArray, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = ""; // Prevent duplicates

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

if (document.getElementById("movie-grid")) {
    if (!loggedInUser) window.location.href = 'Lollies_login.html';

    /* MOVIES*/
    renderMovies(movies, "movie-grid");
    renderMovies(movies.filter(m => m.genre === "Action"), "action-grid");
    renderMovies(movies.filter(m => m.genre === "Comedy"), "comedy-grid");
    renderMovies(movies.filter(m => m.genre === "Romance"), "romance-grid");
    renderMovies(movies.filter(m => m.genre === "Horror"), "horror-grid");
    renderMovies(movies.filter(m => m.genre === "Drama"), "drama-grid");
}

/* MOVIE DETAILS PAGE*/
const movieDetailsContainer = document.getElementById("movie-details");

if (movieDetailsContainer) {

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get("id"));

    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
        movieDetailsContainer.innerHTML = `<p class="text-red-500 text-center">Movie not found.</p>`;
    } else {
        movieDetailsContainer.innerHTML = `
            <img src="${movie.img}" class="w-full rounded-lg mb-4" />

            <h1 class="text-3xl font-bold mb-2">${movie.title}</h1>
            <p class="text-gray-300 mb-2"><strong>Genre:</strong> ${movie.genre}</p>
            <p class="text-gray-300 mb-2"><strong>Year:</strong> ${movie.year}</p>
            <p class="text-gray-300 mb-2"><strong>Rating:</strong> ${movie.rating}</p>

            <p class="mt-4 text-gray-200">
                The Special Victims Unit investigates crimes involving vulnerable victims...
            </p>
        `;
    }
}

/* SETTINGS PAGE */
const newUsernameInput = document.getElementById("new-username");
const saveUsernameBtn = document.getElementById("save-username");
const newEmailInput = document.getElementById("new-email");
const saveEmailBtn = document.getElementById("save-email");
const newPasswordInput = document.getElementById("new-password");
const savePasswordBtn = document.getElementById("save-password");

if (loggedInUser) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(u => u.username === loggedInUser);

    if (saveUsernameBtn) {
        saveUsernameBtn.addEventListener("click", () => {
            if (newUsernameInput.value.trim() !== "") {
                currentUser.username = newUsernameInput.value.trim();
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("loggedInUser", currentUser.username);
                alert("Username updated!");
            }
        });
    }

    if (saveEmailBtn) {
        saveEmailBtn.addEventListener("click", () => {
            if (newEmailInput.value.trim() !== "") {
                currentUser.email = newEmailInput.value.trim();
                localStorage.setItem("users", JSON.stringify(users));
                alert("Email updated!");
            }
        });
    }

    if (savePasswordBtn) {
        savePasswordBtn.addEventListener("click", () => {
            if (newPasswordInput.value.trim() !== "") {
                currentUser.password = newPasswordInput.value.trim();
                localStorage.setItem("users", JSON.stringify(users));
                alert("Password updated!");
            }
        });
    }
}

/* PROFILE PAGE */
const profileUsername = document.getElementById("profile-username");
const profileEmail = document.getElementById("profile-email");
const profileImg = document.getElementById("profile-img");
const profileSvg = document.getElementById("profile-svg");
const profileUpload = document.getElementById("profile-upload");

if (profileUsername && loggedInUser) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(u => u.username === loggedInUser);

    profileUsername.textContent = currentUser.username;
    profileEmail.textContent = currentUser.email;

    if (currentUser.profileImage) {
        profileImg.src = currentUser.profileImage;
        profileImg.classList.remove("hidden");
        profileSvg.classList.add("hidden");
    }

    if (profileUpload) {
        profileUpload.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(event) {
                currentUser.profileImage = event.target.result;

                profileImg.src = event.target.result;
                profileImg.classList.remove("hidden");
                profileSvg.classList.add("hidden");

                localStorage.setItem("users", JSON.stringify(users));
            };

            reader.readAsDataURL(file);
        });
    }
}
