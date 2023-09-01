import { Component } from "../core/heropy";

interface State {
  [key: string]: unknown
  menus : {
    name: string
    href: string
  }[]
}

export default class TheHeader extends Component {

  public state!: State

  constructor(){
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/'
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt4520988'
          },
          {
            name: 'About',
            href: '#/about'
          }
        ]
      }
    })
    // 어떻게 이 생각을 하지,,
    window.addEventListener('popstate', () => {
      this.render()
    })
  }
  render(){
    this.el.innerHTML = /* html */ `
    <a 
      href="#/" 
      class="logo">
      <span>OMDbAPI</span>.COM
    </a>
    <nav>
      <ul>
        ${this.state.menus.map(menu => {

          const href = menu.href.split('?')[0]
          const hash = location.hash.split('?')[0]
          const isActive = href === hash

          return /* html */ `
            <li>
              <a href="${menu.href}" class="${isActive ? 'active' : ''}">
                ${menu.name}
              </a>
            </li>
          `
        }).join('')}
      </ul>
    </nav>
    <a href="#/about" class="user">
      <img src="https://heropy.blog/css/images/logo.png" alt="User" >
    </a>
    `
  }
}