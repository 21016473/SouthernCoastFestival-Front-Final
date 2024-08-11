import App from './App'
import Router, { gotoRoute } from './Router'
import Toast from './Toast'

class Event {

    constructor() {
        this.currentUser = {}
    }

    async newEvent(data) {
        // post request
        const response = await fetch(`${App.apiBase}/events`, {
            method: 'POST',
            headers: { "Authorization": `Bearer ${localStorage.accessToken}` },
            body: data
        })

        // if response not ok
        if(!response.ok) {
            // console log error
            const err = await response.json()
            if(err) console.log(err)
            // run fail()
        if(typeof fail == 'function') fail()
        } else {
            gotoRoute('/')
        }
    }

    async getEvents() {
        // fetch json data
        const response = await fetch(`${App.apiBase}/events`, {
            method: 'GET',
            headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
        })

        // if response not ok
        if(!response.ok) {
            // log error
            const err = await response.json()
            if(err) console.log(err)
            // throw error (exit function)
            throw new Error('Problem getting events')
        }

        // convert payload into json - store as data
        const data = await response.json()

        // return data
        return data
    }
}

export default new Event()