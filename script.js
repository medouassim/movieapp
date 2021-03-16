var API_URL = 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5e5574b4d9160412c4ee1d7a7c74e279&'
var IMG_PATH = 'https://image.tmdb.org/t/p/w500'
var SEARCH_APi = 'https://api.themoviedb.org/3/search/movie?api_key=5e5574b4d9160412c4ee1d7a7c74e279&query="'

var form = document.getElementById("form")
var search = document.getElementById('search')
var main = document.getElementById('main')
getMovies(API_URL)
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results)
    console.log(data.results)
}
function showMovies(movies) {
    main.innerHTML =''
    movies.forEach((movie) => {
        var {title, poster_path, vote_average,original_title, overview, release_date} = movie;
        var movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="can't uplaod the image ">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="getClassByRate(${vote_average})">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>${original_title}</h3>
            <p>${release_date.substring(0,4)}</p>
            ${overview}
        </div>`
        main.appendChild(movieEl);
    })
}
function getClassByRate(vote) {
    if(vote <= 6) {
        return 'red'
    }else if (vote <= 8 && vote > 6){
        return 'yellow'
    }
    else {
        return "green"
    }
}



form.addEventListener('submit', e => {
    e.preventDefault()

    var searchTerm = search.value
    if(searchTerm && searchTerm!=='') {
        getMovies(SEARCH_APi + searchTerm)
        search.value = ''
    }
    else {
        window.location.reload
    }

})
