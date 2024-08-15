import App from '../../App'
import { html, render } from 'lit-html'
import Utils from '../../Utils'
import Auth from '../../Auth.js'

import { renderReactComponent } from '../../components/react/reactHelper'
import EventContainer from '../../components/sc-events-grid.js'
import ContactForm from '../../components/react/sc-contact-form.js'
import VenueCard from '../../components/react/sc-venue-cards.js'
import AdminNav from '../../components/sc-admin-nav.js'
import VideoControlButton from '../../components/react/icons/sc-video-control.js'

class HomeView {
  constructor() {
    this.state = {
      isPlaying: true,
      isPageContentVisible: true,
    }

    this.togglePageContentVisibility = this.togglePageContentVisibility.bind(this)
  }

  async init() {
    console.log('HomeView.init')
    console.log(Auth.currentUser)
    document.title = 'Southern Coast Festival of Lights'

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

  toggleVideoPlayback = () => {
    const video = document.querySelector('.hero-video')
    if (video.paused) {
      video.play()
      this.updateState({ isPlaying: true })
    } else {
      video.pause()
      this.updateState({ isPlaying: false })
    }
  }

  togglePageContentVisibility() {
    this.updateState({ isPageContentVisible: !this.state.isPageContentVisible })
  }

  updateState(newState) {
    this.state = { ...this.state, ...newState }
    this.render()
  }

  renderVideoControlButton() {
    const videoControlButtonContainer = document.getElementById('video-control-button')
    if (videoControlButtonContainer) {
      renderReactComponent(() => (
        <VideoControlButton isPlaying={this.state.isPlaying} onClick={this.toggleVideoPlayback} />
      ), videoControlButtonContainer)
    }
  }

  render() {
    const videoUrl = this.getVideoUrl()
    const pageContentDisplayStyle = this.state.isPageContentVisible ? 'block' : 'none'

    const template = html`
      <div id="screen-content" class="${(Auth.currentUser.accessLevel) === 'admin' ? 'shifted' : ''}">
        ${ (Auth.currentUser.accessLevel) === 'admin' ? html`
          <div id="admin-nav" class="visible"></div>
        `: html`
          <div id="admin-nav"></div>
        `}

        <sc-app-header></sc-app-header>
        <div class="page-content" style="display: ${pageContentDisplayStyle};">
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
                <h1>Come experience Geelong's Festival of Lights!</h1>
                <p>We are back again! Enjoy family-friendly fireworks, laser shows, light installations with over 100,000 bulbs and eat the night away.</p>
                <h3 style="font-weight: bold; color: #FFC600;">From 24 to 25 August 2024.</h3>
                <button class="jumpTo">Find an event &#8595;</button>
              </div>
            </div>
          </div>

          <!--EVENTS-->
          <div id="events">
            <h2 class="mobile-title">Events</h2>
            <div id="filter-container"></div>
          </div>

          <!--VENUE-->
          <div id="venue"></div>

          <!--ABOUT-->
          <div id="about">
            <div class="about-container">
              <div id="about-info">
                <h1>About the Festival</h1>
                <p>Transforming the city of Geelong into a luminous wonderland with art installations, dazzling displays, vibrant projections, and fireworks.</p>
                <p>Celebrate creativity and community spirit as local artists, alongside talented performers, showcase their artistry.</p>
                <p>Explore local shops offering unique wares, and savour delicious food from diverse local vendors, with moments that captivate all who attend.</p>
                <h2>Festival Dates</h2>
                <p>Saturday to Sunday, 24th to 25th of August, 2024</p>
                <h2>Hours of Operation</h2>
                <p>Saturday — 12:00PM to Midnight</p>
                <p>Sunday — 11:00AM to 10:00PM</p>
              </div>
              <div id="contact-form"></div>
            </div>
          </div>
        </div>
        <sc-app-footer></sc-app-footer>
      </div>
    `
    render(template, App.rootEl)

    const adminNavContainer = document.getElementById('admin-nav')
    renderReactComponent(AdminNav, adminNavContainer)

    const filterContainer = document.getElementById('filter-container')
    renderReactComponent(EventContainer, filterContainer)

    const venueContainer = document.getElementById('venue')
    renderReactComponent(VenueCard, venueContainer)

    const contactFormContainer = document.getElementById('contact-form')
    renderReactComponent(ContactForm, contactFormContainer)

    this.renderVideoControlButton()
  }
}

export default new HomeView()