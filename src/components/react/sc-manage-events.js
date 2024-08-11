import React, { useState, useEffect } from 'react'
import { Box, Typography, Stack, Grid, Button, IconButton, TextField } from '@mui/material'
import { FaTrash } from 'react-icons/fa6'
import '../../scss/react.scss'
import placeholderImg from '../../../static/images/chef-bryan-entertainment.jpg'
import Event from '../../Event'

const ManageEventsContainer = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await Event.getEvents()
                setEvents(eventsData)
                console.log('Fetched events:', eventsData)
            } catch (err) {
                console.error('Failed to fetch events:', err)
            }
        }
        fetchEvents()
    }, [])

    return (
        <Box className="manage-event-container">
            <Stack>
                <Typography>
                Manage Events
                </Typography>
            </Stack>
            <Grid container>
                {events.map(event => {
                    const imageUrl = event.eventimage ? `http://localhost:3000/images/${event.eventimage}` : placeholderImg

                    return (
                        <Grid item xs={12} key={event.id}>
                            <Stack direction="row">
                            <Button>Edit</Button>
                            <IconButton aria-label="delete" size="small"><FaTrash /></IconButton>
                            <Box><img src={imageUrl} style={{ width: '2em', height: '1.5em', objectFit: 'cover', borderRadius: '0.2em'}} /></Box>
                            <TextField variant="outlined" className="grid-text" size="small" name="eventdisplayname" value={event.eventdisplayname} InputProps={{readOnly: true}}></TextField>
                            <TextField variant="outlined" className="grid-text" size="small" name="eventcategory" value={event.eventcategory} InputProps={{readOnly: true}}></TextField>
                            <TextField variant="outlined" className="grid-text" size="small" name="eventtag" value={event.eventtag} InputProps={{readOnly: true}}></TextField>
                            <TextField variant="outlined" className="grid-text" size="small" name="eventsaturdaytime" value={event.eventsaturdaytime} InputProps={{readOnly: true}}></TextField>
                            <TextField variant="outlined" className="grid-text" size="small" name="eventsundaytime" value={event.eventsundaytime} InputProps={{readOnly: true}}></TextField>
                            <TextField variant="outlined" className="grid-text" size="small" name="eventstall" value={event.eventstallnumber} InputProps={{readOnly: true}}></TextField>
                            <TextField variant="outlined" className="grid-text" size="small" name="eventdescription" value={event.eventdescription} InputProps={{readOnly: true}}></TextField>
                            </Stack>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default ManageEventsContainer