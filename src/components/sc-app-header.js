import { LitElement, html, css } from 'lit'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import HeaderMenu from './react/sc-header-menu.js'
import longLogo from '../../static/images/soco-logo-long-300px.webp'

class AppHeader extends LitElement {
    constructor() {
        super();
        this.anchorEl = null;
        this.menuOpen = false;
    }

    static get properties() {
        return {
            title: { type: String },
            user: { type: String },
            anchorEl: { type: Object },
            menuOpen: { type: Boolean }
        }
    }

    firstUpdated() {
        this.navActiveLinks();
        this.scrollTo();
        this.renderReactComponent();
        this.toTop();
        this.observeElementsInView();
    }

    observeElementsInView() {
        const elements = [
            { id: 'home', callback: () => this.handleElementInView('home') },
            { id: 'events', callback: () => this.handleElementInView('events') },
            { id: 'venue', callback: () => this.handleElementInView('venue') },
            { id: 'about', callback: () => this.handleElementInView('about') }
        ]

        const observerOptions = {
            root: null, // use viewport as root
            rootMargin: '-50% 0px', // offset bounding box by half viewport height
            threshold: 0 // trigger as soon as any part of element is visible within bounding box
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = elements.find(el => el.id === entry.target.id)
                    if (element && element.callback) {
                        element.callback(entry.target.id)
                    }
                }
            })
        }, observerOptions)

        elements.forEach(element => {
            const targetElement = document.getElementById(element.id)
            if (targetElement) {
                observer.observe(targetElement)
            }
        })
    }

    handleElementInView(element) {
        console.log(`Element ${element} is in view`)

        const link = this.shadowRoot.querySelector(`#${element}-link`)
        if (link) {
            const links = this.shadowRoot.querySelectorAll('.nav-item')
            links.forEach(link => link.classList.remove('active'))
            link.classList.add('active')
        }
    }

    // set property of link as active when clicked
    navActiveLinks() {
        const links = this.shadowRoot.querySelectorAll('.nav-item')

        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault()
                links.forEach(link => link.classList.remove('active'))
                event.currentTarget.classList.add('active')
            })
        })
    }

    scrollTo() {
        const links = this.shadowRoot.querySelectorAll('.nav-item')

        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault()
                const targetId = link.getAttribute('href').substring(1)
                const targetElement = document.getElementById(targetId)
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            })
        })
    }

    toTop() {
        const logo = this.shadowRoot.querySelector('.app-header-logo')
        if (logo) {
            logo.addEventListener('click', () => {
                window.scroll({ top: 0, behavior: 'smooth'})
                console.log('logo clicked')
            })
        }
    }

    renderReactComponent() {
        const headerMenu = this.shadowRoot.getElementById('app-header-menu')
        if (headerMenu) {
            const root = createRoot(headerMenu)
            root.render(<HeaderMenu />)
        }
    }

    render() {
        return html`
            <style>
                @keyframes blink {
                    20%,
                    24%,
                    55% {
                        color: #000000;
                        text-shadow: none;
                    }
                    0%,
                    19%,
                    21%,
                    23%,
                    25%,
                    54%,
                    56%,
                    100% {
                        text-shadow: 0 0 5px #FFC600, 0 0 10px #FFC600, 0 0 15px #FFC600, 0 0 20px #FFC600, 0 0 25px #FFC600, 0 0 30px #ff6200, 0 0 35px #ff6200;
                        color: #fdf8c9;
                    }
                }

                .app-header {
                    height: var(--app-header-height);
                    background-color: #000000;
                    border-bottom: 0.2em solid #FFC600;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: center;
                    z-index: 10;
                    position: sticky;
                    top: 0;
                }
                #app-header-menu {
                    width: auto;
                    display: none;
                }
                .app-header-logo {
                    grid-column: 1;
                    display: flex;
                    align-items: center;
                    margin-left: 0.75em;
                    background-image: url(${longLogo});
                    background-size: cover;
                    background-repeat: no-repeat;
                    width: 12em;
                    height: 3.5em;
                }
                .app-header-logo:hover {
                    cursor: pointer;
                }
                .app-header-nav {
                    grid-column: 2;
                    justify-content: center;
                    ul {
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .nav-item {
                        display: block;
                        color: #FFFFFF;
                        text-align: center;
                        padding: 0.75em;
                        text-decoration: none;
                        font-size:1.2em;
                        font-family: var(--base-font-family);
                        font-weight: 700;
                    }
                    .nav-item:hover, .nav-item.active {
                        background-color: #000000;
                        text-shadow: 0 0 5px #FFC600, 0 0 10px #FFC600, 0 0 15px #FFC600, 0 0 20px #FFC600, 0 0 25px #FFC600, 0 0 30px #ff6200, 0 0 35px #ff6200;
                        color: #fff6a9;

                        animation: blink 7s infinite;
                        -webkit-animation: blink 7s infinite;
                    }
                }

                @media (max-width: 768px) {
                    .app-header-nav {
                        .nav-item {
                            padding: 0.5em;
                            font-size: 1.2em;
                        }
                    }
                }

                @media (max-width: 768px) {
                    .app-header {
                        justify-content: space-between;
                        flex-wrap: wrap;
                        align-content: center;
                    }
                    #app-header-menu {
                        grid-column: 3;
                        display: flex;
                        justify-content: flex-end;
                        padding: 1em;
                    }
                    .app-header-nav {
                        display: none;
                    }

                }
            </style>

            <header class="app-header">

                <a><div class="app-header-logo"></div></a>

                <div id="app-header-menu"></div>

                <nav class="app-header-nav">
                    <ul>
                        <li><a class="nav-item active" href="#home" id="home-link">Home</a></li> 
                        <li><a class="nav-item" href="#events" id="events-link">Events</a></li>
                        <li><a class="nav-item" href="#venue" id="venue-link">Venue</a></li>
                        <li><a class="nav-item" href="#about" id="about-link">About</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }
}

customElements.define('sc-app-header', AppHeader);