import App from './App'
import Router, { gotoRoute } from './Router'
import Toast from './Toast'

class Event {

    constructor() {
        this.currentUser = {}
    }

    // NEW EVENT
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
            window.location.reload()
        }
    }

    // GET ALL EVENTS
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

    // GET SINGLE EVENT BY ID
    async getEventById(eventId) {
        const response = await fetch(`${App.apiBase}/events/${eventId}`, {
            method: 'GET',
            headers: {"Authorization": `Bearer ${localStorage.accessToken}`}
        })

        // if response not ok
        if(!response.ok) {
            const err = await response.json()
            if(err) console.log(err)
            throw new Error('Problem getting event')
        } else {
            const eventData = await response.json()
            return eventData   
        }
    }

    // EDIT EVENT
    async updateEvent(eventId, eventData, dataType = 'form'){
        // validate
        if(!eventId || !eventData) return

        let responseHeader

        // form data
        if(dataType == 'form') {
            const formData = new FormData()
            for (const key in eventData) {
                    formData.append(key, eventData[key])
            }

            // fetch request to backend
            responseHeader = {
                method: 'PUT',
                headers: {"Authorization": `Bearer ${localStorage.accessToken}`},
                body: formData
            }

            // json data
        } else if(dataType == 'json') {
            responseHeader = {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localStorage.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData)
            }
        }

        // make fetch request to update event
        try {
            const response = await fetch(`${App.apiBase}/events/${eventId}`, responseHeader)
        
            // if response not ok
            if (!response.ok) {
                const err = await response.json()
                if (err) console.log(err)
                throw new Error('Problem updating event')
            }

            // parse json response from back
            const data = await response.json()
            console.log(data)

            window.location.reload()

            return data
        } catch (error) {
            console.error('Error updating event:', error)
            throw error
        }
    }

    // DELETE EVENT
    async deleteEvent(eventId) {
            const response = await fetch(`${App.apiBase}/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
        
            // if response not ok
            if (!response.ok) {
                const err = await response.json()
                if (err) console.log(err)
                throw new Error('Problem updating event')
            } else {
                console.log('Event deleted successfully')
                return
            }        
    }
}

export default new Event()