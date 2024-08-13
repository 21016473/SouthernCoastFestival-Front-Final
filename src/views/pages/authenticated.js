import App from '../../App'
import {html, render } from 'lit-html'
import Auth from '../../Auth'


class AuthenticatedView {
  init(){
    console.log('AuthenticatedView.init')
    document.title = 'Authenticated'    
    // auth check
    Auth.check(() => {
      this.render()    
    })
  }

  render(){
    const template = html`
      <div>        
        <h1>Yay!</h1>
        <p>Authenticated</p>
      </div>      
    `
    render(template, App.rootEl)
  }
}

export default new AuthenticatedView()