import App from './App'
import Router, { gotoRoute } from './Router'
import splash from './views/partials/splash'
import { html, render } from 'lit'
import Toast from './Toast'

class Auth {

    constructor() {
        this.currentUser = {
          accessLevel: 'user'
        }
    }

    // async sign in
    async signIn(userData, callback){
      try {
        const response = await fetch(`${App.apiBase}/auth/signin`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },     
          body: JSON.stringify(userData)
        })
  
        const data = await response.json()
    
        // if response not ok
        if(!response.ok){
          console.log(data)
          if (callback) callback(false)
        } else {
          localStorage.setItem('accessToken', data.accessToken)
          this.currentUser = {
            ...data.user,
            accessLevel: data.user.accessLevel || 'user'
          }
          Router.init()
          if (callback) callback(true)
        }
      } catch (error) {
        console.error('Sign-in error:', error)
        if (callback) callback(false)
      }
    }

    // async check
    async check(complete) {
        // show splash screen while loading
        render(splash, App.rootEl)

        // check loacl token exists
        if(!localStorage.getItem('accessToken')) {
          this.currentUser = {
            accessLevel: 'user',
          }
        }

        // validate token via the backend
        const response = await fetch(`${App.apiBase}/auth/validate`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.accessToken}`
            }
        })

        // response not ok
        if(!response.ok) {
          // console log error
          const err = await response.json()
          if(err) console.log(err)
          // delete local token
          localStorage.removeItem('accessToken')
          Toast.show("session expired, please sign in")
      } else {
        // token is valid
        const data = await response.json()
        this.currentUser = {
          ...data.user,
          accessLevel: data.user.accessLevel || 'user'
        }
        console.log(data.user.accessLevel)
      }

      complete()
    }

    // async sign out
    signOut() {
      localStorage.removeItem('accessToken')
      this.currentUser = {
        accessLevel: 'user'
      }
      window.location.href = '/'

      const screenContent = document.getElementById('screen-content')
      if (screenContent) {
        screenContent.classList.remove('shifted')
      }
    }
}

export default new Auth()