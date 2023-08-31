import { Store } from "../core/heropy";

interface State {
  photo: string
  name: string
  email: string
  blog: string
  github: string
  repository: string
}

export default new Store<State>({
  photo: 'https://heropy.blog/css/images/logo.png',
  name: 'Furaha / LeeYeIn',
  email: 'zxcv0823@naver.com',
  blog: 'https://furaha.tistory.com/',
  github: 'https://github.com/furaha707',
  repository: 'https://github.com/furaha707?tab=repositories',
})