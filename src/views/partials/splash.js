import { html } from 'lit'
import longLogo from '../../../static/images/soco-logo-long-300px.webp'

const splash = html`
    <style>
        .app-splash {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .app-logo {
          background-image: url(${longLogo});
          background-size: contain;
          background-repeat: no-repeat;
          background-position: bottom;
          width: 40vw;
          height: 15vh;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      </style>

    <div class="app-splash">
        <div>
            <div class="app-logo"></div>
        </div>
    </div>     
`

export default splash