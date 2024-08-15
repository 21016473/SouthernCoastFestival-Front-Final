import App from '../../App'
import { html, render } from 'lit-html'
import Auth from '../../Auth.js'


class OtherView {
  constructor() {
  }

  async init() {
    document.title = 'Southern Coast Festival of Lights'

    this.render()
  }

  render() {
    const template = html`
      <div id="screen-content" class="${(Auth.currentUser.accessLevel) === 'admin' ? 'shifted' : ''}">
        ${ (Auth.currentUser.accessLevel) === 'admin' ? html`
          <div id="admin-nav" class="visible"></div>
        `: html`
          <div id="admin-nav"></div>
        `}

        <sc-app-header></sc-app-header>
        <div class="page-content" style="display: block;">
          <div id="about">
            <div class="about-container">
              <div id="about-info">
                <h1>Other page</h1>
                <p>Other page content goes here</p>
              </div>
            </div>
          </div>
        </div>
        <sc-app-footer></sc-app-footer>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new OtherView()