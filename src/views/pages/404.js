import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'

class ErrorView {
  init(){
    console.log('ErrorView.init')
    document.title = '404 File not found'    
    this.render()    
  }

  render(){
    const template = html`
      <div class="fourohfour">
        <h1>Oops!</h1>
        <p>We couldn't find that page.</p>
        <button class="home-btn" @click=${() => {gotoRoute('/')}}>Home</button>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new ErrorView()