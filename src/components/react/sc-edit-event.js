import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField, Stack, FormControl, Select, MenuItem, Grid, Typography, OutlinedInput, Box, FormControlLabel, Checkbox, Snackbar, SnackbarContent } from '@mui/material'
import '../../scss/react.scss'
import Event from '../../Event'

const placeholderImage = 'https://via.placeholder.com/300x200.png?text=No+Image'

const EditEventForm = ({ open, onClose }) => {

    const [eventData, setEventData] = useState({
        eventdisplayname: '',
        vendorcontactname: '',
        vendorcontactemail: '',
        vendorcontactphone: '',
        eventimage: '',
        eventcategory: '',
        eventsaturdaytime: '',
        eventsundaytime: '',
        eventstallnumber: '',
        eventdescription: '',
        eventtag: ''
    })

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [imagePreview, setImagePreview] = useState(placeholderImage)

    useEffect(() => {
        const fetchEventData = async () => {
            const eventId = localStorage.getItem('selectedEventId')
            if (eventId) {
                try {
                    const event = await Event.getEventById(eventId) // Fetch event data
                    setEventData(event)
                    setImagePreview(event.eventimage || placeholderImage)
                } catch (err) {
                    console.error('Failed to fetch event:', err)
                }
            }
        };

        if (open) {
            fetchEventData()
        }
    }, [open])

    // handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        
        setEventData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    // handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setEventData(prevData => ({
            ...prevData,
            eventimage: file
        }))
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    // validate email
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    // handle save changes
    const handleSaveChanges = async () => {
        
        if (!validateEmail(eventData.vendorcontactemail)) {
            setSnackbarMessage('Please enter a valid email address')
            console.log('Enter a valid email address')
            setSnackbarOpen(true)
            return
        }

        try {
            await Event.updateEvent(eventData._id, eventData)
            onClose()
        } catch (err) {
            console.error('Failed to update event:', err)
        }
    }

    // handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
                <Box className="edit-event-form">
                    {eventData ? (
                        <>
                        <Box className="form-content">
                            <TextField variant="outlined" label="Event Name" className="form-text" size="small" name="eventdisplayname" value={eventData.eventdisplayname} onChange={handleInputChange}></TextField>
                            <Stack direction="row" className="vendor-details">
                                <TextField variant="outlined" label="Vendor Name" className="form-text" size="small" name="vendorcontactname" value={eventData.vendorcontactname} onChange={handleInputChange}></TextField>
                                <TextField variant="outlined" label="Vendor Email" className="form-text" size="small" name="vendorcontactemail" value={eventData.vendorcontactemail} onChange={handleInputChange}></TextField>
                                <TextField variant="outlined" label="Vendor Phone Number" className="form-text" size="small" name="vendorcontactphone" value={eventData.vendorcontactphone} onChange={handleInputChange}></TextField>
                            </Stack>
                            <Stack direction="row" className="image-input">
                                {imagePreview && (
                                    <Box>
                                        <img src={imagePreview} alt="Event Image Preview" style={{ width: '10em', height: '7.5em', objectFit: 'cover', borderRadius: '0.2em'}} />
                                    </Box>
                                )}
                                <Button variant="outlined" component="label" className="upload-image">
                                    Upload Image
                                    <input type="file" hidden name="eventimage" onChange={handleImageChange} required/>
                                </Button>
                            </Stack>
                            <FormControl sx={{ width: '100%'}}>
                                <Typography>Select Category:</Typography>
                                <Select
                                    displayEmpty
                                    name="eventcategory"
                                    value={eventData.eventcategory}
                                    onChange={handleInputChange}
                                    input={<OutlinedInput />}
                                    className="category-dropdown"
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: '#FFFFFF',
                                                '& .MuiList-root.MuiMenu-list': {
                                                    backgroundColor: '#FFFFFF',
                                                    color: '#000000',
                                                    fontFamily: 'var(--base-font-family)',
                                                    fontSize: '1em',
                                                    padding: '1em',
                                                    border: 'none',
                                                    width: '90%'
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="Eat + Drink">Eat + Drink</MenuItem>
                                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                                    <MenuItem value="Shop">Shop</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography sx={{ marginTop: "0.5em" }}>Hours of Operation</Typography>
                            <Grid container className="time-details">
                                <Stack className="time-col">
                                    <Typography>Saturday</Typography>
                                    <TextField 
                                        variant="outlined" className="form-text" size="small" name="eventsaturdaytime" value={eventData.eventsaturdaytime} onChange={handleInputChange} InputLabelProps={{ shrink: true }}
                                    />
                                </Stack>
                                <Stack className="time-col">
                                    <Typography>Sunday</Typography>
                                    <TextField 
                                        variant="outlined" className="form-text" size="small" name="eventsundaytime" value={eventData.eventsundaytime} onChange={handleInputChange} InputLabelProps={{ shrink: true }}
                                    />
                                </Stack>
                            </Grid>
                            <TextField variant="outlined" label="Add description" className="form-text" size="small" multiline rows={4} name="eventdescription" value={eventData.eventdescription} onChange={handleInputChange}></TextField>
                            <TextField variant="outlined" label="Allocate stall number" className="form-text" size="small" name="eventstallnumber" value={eventData.eventstallnumber} onChange={handleInputChange}></TextField>
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button onClick={onClose} variant="outlined" color="secondary" className="event-button">Cancel</Button>
                                <Button onClick={handleSaveChanges} variant="contained" color="primary" className="event-button">Save Changes</Button>
                            </Stack>
                        </Box>
                        </>
                    ) : (
                        <p>Loading event data...</p>
                    )}
                </Box>
            </DialogContent>

            <Snackbar 
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Dialog>
    )
}

export default EditEventForm