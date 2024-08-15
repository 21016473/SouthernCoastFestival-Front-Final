import Router from './Router'
import Auth from './Auth'
import Toast from './Toast'
import User from './User'

class App {
    constructor() {
        this.name = "Southern Coast Festival"
        this.version = "1.0.0"
        this.apiBase = "https://southerncostfestival-backend-a3.onrender.com"
        this.rootEl = document.getElementById("root")
    }

    init() {
        console.log("App.init")

        // toast init
        Toast.init()

        // auth check
            // authenticated
        Router.init()
    }
}

export default new App()