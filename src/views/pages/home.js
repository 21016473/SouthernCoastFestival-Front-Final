import App from '../../App'
import {html, render } from 'lit-html'
import Utils from '../../Utils'
import Auth from '../../Auth.js'

import { renderReactComponent } from '../../components/react/reactHelper'
import EventContainer from '../../components/sc-events-grid.js'
import ContactForm from '../../components/react/sc-contact-form.js'
import VenueCard from '../../components/react/sc-venue-cards.js'
import AdminNav from '../../components/sc-admin-nav.js'

class HomeView {
  constructor() {
  }

  async init(){
    console.log('HomeView.init')
    console.log(Auth.currentUser)
    document.title = 'Southern Coast Festival of Lights'   
    
    // await this.getEvents() // only use when front and back are talking
    this.render()
    Utils.pageIntroAnim()

    const jumpTo = document.querySelectorAll('.jumpTo')
    jumpTo.forEach(button => button.addEventListener('click', this.scrollTo))
  }

  scrollTo() {
    const eventsSection = document.getElementById('events')
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  getVideoUrl() {
    return new URL('../../../static/images/hero-light.mp4', import.meta.url).toString()
  }

  toggleVideoPlayback() {
    const video = document.querySelector('.hero-video')
    const controlButton = document.querySelector('.video-control i')
    if (video.paused) {
      video.play()
      controlButton.classList.remove('fa-play')
      controlButton.classList.add('fa-pause')
    } else {
      video.pause()
      controlButton.classList.remove('fa-pause')
      controlButton.classList.add('fa-play')
    }
  }

  render(){
    const videoUrl = this.getVideoUrl()

    const template = html`

    <div id="screen-content" class="${(Auth.currentUser.accessLevel) === 'admin' ? 'shifted' : ''}">
      ${ (Auth.currentUser.accessLevel) === 'admin' ? html`
        <div id="admin-nav" class="visible"></div>
      `: html`
        <div id="admin-nav"></div>
      `}

      <sc-app-header></sc-app-header>

      <div class="page-content">        
        <!--HERO-->
          <div id="home">
            <div class="hero-banner">
              <video autoplay muted loop class="hero-video">
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <button class="video-control" @click="${this.toggleVideoPlayback}">
                <i class="fas fa-pause"></i>
              </button>
              <div id="hero-content">
                <h1 style="font-weight: bold; color: #FFC600;">Come to Geelong's Festival of Lights!</h1>
                <h3 >24 to 25 August 2024</h3><p>Family-friendly fireworks. Laser shows. Over 100,000 lightbulbs. Eat the night away!</p>
                <button class="jumpTo">FIND AN EVENT</button>
              </div>
            </div>
          </div>

        <!--EVENTS-->
        <!-- use react grid to create events layout -->

          <div id="events">
            <h1 class="mobile-title">Events</h1>
            <div id="filter-container"></div>
          </div>

        <!--VENUE-->
          <div id="venue"></div>

        <!--ABOUT-->
          <div id="about">
            <div class="about-container">
              <div id="about-info">
                <h1>About the Festival</h1>
                <strong><p>Transforming the city of Geelong into a luminous wonderland with art installations, dazzling displays, vibrant projections, and fireworks.</p></strong>
                <p>Celebrate creativity and community spirit as local artists, alongside talented performers, showcase their artistry.</p>
                <p>Explore local shops offering unique wares, and savour delicious food from diverse local vendors with moments that captivate all who attend.</p>
                <h2>Festival Dates</h2>
                <ul>
                  <li>Saturday and Sunday</li>
                  <li>24 to 25 August 2024</li>
                </ul>
                <h2>Hours of Operation</h2>
                <ul>
                  <li>Saturday: Noon to midnight</li>
                  <li>Sunday: 11am to 10pm</li>
                </ul>
              </div>
              <div id="contact-form"></div>
            </div>
          </div>

      </div>   

      <sc-app-footer></sc-app-footer>
    
    `
    render(template, App.rootEl)

    const adminNavContainer = document.getElementById('admin-nav')
    if (adminNavContainer) {
      renderReactComponent(AdminNav, adminNavContainer)
    }

    const filterContainer = document.getElementById('filter-container')
    renderReactComponent(EventContainer, filterContainer)

    const venueContainer = document.getElementById('venue')
    renderReactComponent(VenueCard, venueContainer)

    const contactFormContainer = document.getElementById('contact-form')
    renderReactComponent(ContactForm, contactFormContainer)
  }
}

export default new HomeView()