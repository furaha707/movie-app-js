///// Component /////
export class Component {
  constructor(payload = {}) {
    const { tagName = 'div', props = {}, state = {} } = payload;
    this.el = document.createElement(tagName);
    this.props = props;
    this.state = state;
    this.render();
  }
  render() {
    // ...
  }
}

///// Router /////
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/');
  }
  const routerView = document.querySelector('router-view');
  const [hash, queryString = ''] = location.hash.split('?');

  // 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  const query = queryString.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
  }, {});
  history.replaceState(query, '');

  // 2) 현재 라우트 정보를 찾아서 렌더링
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash));
  if (routerView) {
    routerView.innerHTML = '';
    if (currentRoute) {
      routerView.append(new currentRoute.component().el);
    }
  }
  // 3) 화면 출력 후 스크롤 위치 복구
  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

///// Store /////
export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: val => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach(observer => observer(val));
          }
        }
      });
    }
  }
  subscribe(key, cb) {
    if (Array.isArray(this.observers[key])) {
      this.observers[key].push(cb);
    } else {
      this.observers[key] = [cb];
    }
  }
}
