import { Store } from "../core/heropy";

const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: 'Search for the movie title!'
})

export default store

export const searchMovies = async page => {

  // 로딩애니메이션
  store.state.loading = true

  store.state.page = page

  if(page === 1){
    store.state.movies = []
    store.state.message = ''
  }

  try{
    // const res = await fetch(`https://omdbapi.com?apikey=e066e169&s=${store.state.searchText}&page=${page}`)
    const res = await fetch(`/api/movie`, {
      method: 'POST',
      body: JSON.stringify({
          title: store.state.searchText,
          page
      })
    })
    const { Search, totalResult, Response, Error } = await res.json()
    if(Response === 'True') {
      store.state.movies = [...store.state.movies, ...Search]
      // 페이지 최대 번호
      store.state.pageMax = Math.ceil(Number(totalResult) / 10)
    } else {
      store.state.message = Error
    }
    store.state.pageMax = 1
  } catch(error){
    console.log('searchMovies error:' , error)
  } finally {
    store.state.loading = false
  }
}

// 영화 상세정보 가져오는 함수
export const getMovieDetails = async id => {
  try{
    // const res = await fetch(`https://omdbapi.com?apikey=e066e169&i=${id}&plot=full`)
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        id
      })
    })
    store.state.movie = await res.json()
  }catch(error){
    console.log('getMovieDetails error:', error);
  }
}
