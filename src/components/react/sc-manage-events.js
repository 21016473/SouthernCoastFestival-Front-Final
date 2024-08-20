import React, { useState, useEffect } from 'react'
import { Box, Stack, Grid, Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton, Typography } from '@mui/material'
import { FaTrash } from 'react-icons/fa6'
import '../../scss/react.scss'
import placeholderImg from '../../../static/images/treeoflife.jpg'
import Event from '../../Event'
import EditEventDialog from '../react/sc-edit-event'
import NewEventDialog from '../react/sc-new-event'

const ManageEventsContainer = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await Event.getEvents()
                setEvents(eventsData)
                setLoading(false)
                console.log('Fetched events:', eventsData)
            } catch (err) {
                console.error('Failed to fetch events:', err)
            }
        }
        fetchEvents()
    }, [])

    const handleAddClick = () => {
        setIsNewDialogOpen(true)
    }

    const handleEditClick = (eventId) => {
        localStorage.setItem('selectedEventId', eventId) // save to localStorage
        setSelectedEventId(eventId)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setSelectedEventId(null)
        setIsNewDialogOpen(false)
    }

    // when a user clicks the trash icon
    const handleDeleteClick = (eventId) => {
        setSelectedEventId(eventId)
        setIsDeleteDialogOpen(true)
    }

    // confirm delete action
    const handleConfirmDelete = async () => {
        try {
            await Event.deleteEvent(selectedEventId)
            setEvents(events.filter(event => event._id !== selectedEventId))
            console.log('Deleted event:', selectedEventId)
        } catch (err) {
            console.error('Failed to delete event:', err)
        } finally {
            setIsDeleteDialogOpen(false)
            setSelectedEventId(null)
        }
    }

    // cancel delete action
    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false)
        setSelectedEventId(null)
    }

    return (
        <div>
            <Box className="manage-event-container">
                <>
                <div className="grid-header">
                    <Button className="new-btn" onClick={() => handleAddClick()}>+ Add</Button>
                    <Typography className="grid-text">Img</Typography>
                    <Typography className="grid-text">Event Name</Typography>
                    <Typography className="grid-text">Category</Typography>
                    <Typography className="grid-text">Tags</Typography>
                    <Typography className="grid-text">Saturday</Typography>
                    <Typography className="grid-text">Sunday</Typography>
                    <Typography className="grid-text">Stall</Typography>
                    <Typography className="grid-text">Description</Typography>   
                </div>
                </>
                <Grid container>
                    {loading ? (
                        Array.from(new Array(4)).map((_, index) => (
                            <Grid className="grid-item" item xs={12} key={index} sx={{width:"80vw"}}>
                                <Stack direction="row" spacing={2}>
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                    <Skeleton variant="text" width="100%" height={40} />
                                    <Skeleton variant="text" width="100%" height={40} />
                                    <Skeleton variant="text" width="100%" height={40} />
                                    <Skeleton variant="text" width="100%" height={40} />
                                    <Skeleton variant="text" width="100%" height={40} />
                                    <Skeleton variant="text" width="100%" height={40} />
                                    <Skeleton variant="text" width="100%" height={40} />
                                </Stack>
                            </Grid>
                        ))
                    ) : (
                        events.map(event => {
                            const imageUrl = event.eventimage || placeholderImg
    
                            return (
                                <Grid className="grid-item" item xs={12} key={event._id}>
                                    <Stack direction="row">
                                        <Button className="edit-btn" onClick={() => handleEditClick(event._id)}>Edit</Button>
                                        <IconButton className="delete-btn" aria-label="delete" size="small" onClick={() => handleDeleteClick(event._id)}><FaTrash /></IconButton>
                                        <Box className="grid-img"><img src={imageUrl} style={{ width: '3em', height: '2em', objectFit: 'cover', borderRadius: '0.2em'}} /></Box>
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
                        })
                    )}
                </Grid>
                {selectedEventId && (
                <EditEventDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    eventData={selectedEventId}
                ></EditEventDialog>
                )}
                <Dialog
                    open={isDeleteDialogOpen}
                    onClose={handleCancelDelete}
                    className="delete-dialog"
                >
                    <DialogTitle>Confirm Event Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this event? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className="delete-cancel" onClick={handleCancelDelete}
                            sx={{
                                backgroundColor: "#bdbdbd",
                                color: "#000000",
                                textTransform: "capitalize",
                                fontFamily: "var(--base-font-family)",
                                minWidth: "3em",
                                height: "1em",
                                padding: "1em",
                                marginBottom: "1em",
                                "&:hover": {
                                    backgroundColor: "#000000",
                                    color: "#FFFFFF"
                                }
                            }}
                        >Cancel</Button>
                        <Button className="delete-confirm" onClick={handleConfirmDelete}
                            sx={{
                                backgroundColor: "#FFC600",
                                color: "#000000",
                                textTransform: "capitalize",
                                fontFamily: "var(--base-font-family)",
                                minWidth: "3em",
                                height: "1em",
                                padding: "1em",
                                marginBottom: "1em",
                                marginRight: "1em",
                                "&:hover": {
                                    backgroundColor: "#000000",
                                    color: "#FFFFFF"
                                }
                            }}
                        >Delete</Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <NewEventDialog open={isNewDialogOpen} onClose={handleCloseDialog}></NewEventDialog>
        </div>
    )
}

export default ManageEventsContainer