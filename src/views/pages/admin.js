import App from '../../App'
import {html, render } from 'lit-html'
import Auth from '../../Auth'
import Utils from '../../Utils'

import { renderReactComponent } from '../../components/react/reactHelper'
import AdminNav from '../../components/sc-admin-nav.js'
import ManageEvents from '../../components/react/sc-manage-events.js'
import { gotoRoute } from '../../Router.js'

class AdminView {
  init(){
    document.title = 'Southern Coast Festival of Lights'
    Auth.check(() => {})
    if (Auth.currentUser.accessLevel === 'admin') {
      this.render()
    } else {
      gotoRoute('/')
    }
    console.log('AdminView.init')
    console.log(Auth.currentUser)      
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <div class="page-content">        
        <div id="screen-content" class="${(Auth.currentUser.accessLevel) === 'admin' ? 'shifted' : ''}">
        ${ (Auth.currentUser.accessLevel) === 'admin' ? html`
          <div id="admin-nav" class="visible" style="right: 14em;"></div>
        `: html`
          <div id="admin-nav"></div>
        `}

        <sc-app-header></sc-app-header>
        
        <div id="manage-events">
          <h1>Events Manager</h1>
          <div id="admin-content"></div>
        </div>

        <sc-app-footer></sc-app-footer>
      </div>
      </div>      
    `
    render(template, App.rootEl)

    const adminNavContainer = document.getElementById('admin-nav')
    if (adminNavContainer) {
      renderReactComponent(AdminNav, adminNavContainer)
    }

    const manageEventsContainer = document.getElementById('admin-content')
    renderReactComponent(ManageEvents, manageEventsContainer)
  }
}

export default new AdminView()