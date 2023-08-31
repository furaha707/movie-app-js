import { createRouter } from '../core/heropy'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

// 순차적으로 일치하는 것이 반환됨
export default createRouter([
  { path:'#/', component: Home },
  { path:'#/movie', component: Movie },
  { path:'#/about', component: About },
  { path:'.*', component: NotFound }
])