const apiKey = '96fbbeb06e75370372e2913238d56c9b';
const apiUrl =
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

function fetchMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmZiYmViMDZlNzUzNzAzNzJlMjkxMzIzOGQ1NmM5YiIsInN1YiI6IjY1MzM1YjYwOGNmY2M3MDBhYTAxYzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c4UbSbfm0bEhl6b7D19MTUzImTLPNXwDr6vvOK-kXYo',
    },
  };

  fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // API 응답 데이터를 콘솔에 출력
      displayMovies(data.results);
    })
    .catch((err) => console.error(err));
}

// 영화 정보를 화면에 표시하는 함수
function displayMovies(movies) {
  const content = document.querySelector('.content');

  // 이전 내용을 초기화
  content.innerHTML = '';

  // 각 영화에 대한 카드를 생성하여 화면에 추가
  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    content.appendChild(card);
  });
}

// 영화 카드 생성 함수
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  const title = document.createElement('h2');
  title.textContent = movie.title;

  const overview = document.createElement('p');
  overview.textContent = movie.overview;

  const poster = document.createElement('img');
  poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const rating = document.createElement('p');
  rating.textContent = `Rating: ${movie.vote_average}`;

  card.appendChild(title);
  card.appendChild(overview);
  card.appendChild(poster);
  card.appendChild(rating);

  // 카드 클릭 시 이벤트 처리
  card.addEventListener('click', () => {
    alert(` 선택하신 영화는 ID:${movie.id} '${movie.title}'입니다.`);
  });

  return card;
}

function init() {
  fetchMovies();
}

init();

const input = document.querySelector('#search-input');
const btn = document.querySelector('#search-button');

let allMovies = []; // 모든 영화 정보를 저장하는 배열

// fetchMovies 함수는 초기 한 번만 호출되도록 수정
function fetchMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmZiYmViMDZlNzUzNzAzNzJlMjkxMzIzOGQ1NmM5YiIsInN1YiI6IjY1MzM1YjYwOGNmY2M3MDBhYTAxYzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c4UbSbfm0bEhl6b7D19MTUzImTLPNXwDr6vvOK-kXYo',
    },
  };

  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      allMovies = data.results; // 모든 영화 정보를 저장
      displayMovies(allMovies); // 영화 데이터를 표시하는 함수 호출
    })
    .catch((err) => console.error(err));
}

btn.addEventListener('click', () => {
  const content = document.querySelector('.content');
  content.innerHTML = '';

  const value = input.value.toLowerCase();

  const filteredMovies = allMovies.filter((movie) => {
    const title = movie.title.toLowerCase();
    return title.includes(value);
  });

  displayMovies(filteredMovies);
});

const homeButton = document.getElementById('home');

// 버튼 클릭 시 이벤트 처리
homeButton.addEventListener('click', () => {
  // 홈 버튼을 클릭하면 모든 영화를 다시 표시하는 함수를 호출
  displayMovies(allMovies);
});

// 1. 영화 정보 다시 불러와서, 이벤트리스너에 검색 기능 만듦.
// 2. 보여주고 있는 컨텐트를 빈 문자열로 만들어 모두 지울 수 있도록 함.
// 3. 검색창에 대소문자 불문하고 사용될 수 있도록 toLowerCase 메서드 사용
// 4. filter 메서드 이용하여 검색어와 일치하는 영화를 찾고, 이를 소문자로 변환해서 타이틀에 저장
// 5. 검색한 값이 영화 제목을 포함하고 있으면 return 값을 내놓을 수 있도록 함.
// 6. 이렇게 검색한 제목과 일치하는 영화를 필터링해서 filteredMovies에 저장하고 이를 디스플레이함.
