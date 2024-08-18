import React, { useState } from 'react'
import { Box, Typography, TextField, Stack, Button, Snackbar, MenuItem, Checkbox, Select, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, FormControlLabel, Grid, OutlinedInput, InputLabel } from '@mui/material'
import '../../scss/react.scss'
import Event from '../../Event'

const placeholderImage = 'https://via.placeholder.com/300x200.png?text=No+Image'

const NewEventForm = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        eventdisplayname: '',
        vendorcontactname: '',
        vendorcontactemail: '',
        vendorcontactphone: '',
        eventimage: '',
        eventcategory: '',
        eventtag: [],
        eventsaturdaytime: '',
        eventsundaytime: '',
        eventdescription: '',
        eventstallnumber: '',
    })

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [imagePreview, setImagePreview] = useState(placeholderImage)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            setFormData(prevState => {
                const tags = [...prevState.eventtag]
                if (checked) {
                    if (!tags.includes(value)) {
                        tags.push(value)
                    }
                } else {
                    const index = tags.indexOf(value)
                    if (index > -1) {
                        tags.splice(index, 1)
                    }
                }
                return {
                    ...prevState,
                    eventtag: tags
                }
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setFormData({
            ...formData,
            eventimage: file
        })
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.eventdisplayname || !formData.vendorcontactemail || !formData.vendorcontactphone) {
            setSnackbarMessage('Please fill out all required fields')
            setSnackbarOpen(true)
            return
        }

        if (!validateEmail(formData.vendorcontactemail)) {
            setSnackbarMessage('Please enter a valid email address')
            console.log('Enter a valid email address')
            setSnackbarOpen(true)
            return
        }

        const data = new FormData()
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(tag => data.append(key, tag))
            } else {
                data.append(key, formData[key])
            }
        }

        try {
            await Event.newEvent(data)
            setSnackbarMessage('Event created successfully')
            setSnackbarOpen(true)
            onClose()
            console.log(data)
        } catch (error) {
            setSnackbarMessage('Failed to create event.')
            setSnackbarOpen(true)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogContent>
                <Box className="new-event-form">
                    <form onSubmit={handleSubmit}>
                        <Box className="form-content">
                            <Stack>
                                <TextField variant="outlined" label="Event Name" className="form-text" size="small" name="eventdisplayname" value={formData.eventdisplayname} onChange={handleChange} required></TextField>
                                <Stack direction="row" className="vendor-details">
                                    <TextField variant="outlined" label="Vendor Name" className="form-text" size="small" name="vendorcontactname" value={formData.vendorcontactname} onChange={handleChange} required></TextField>
                                    <TextField variant="outlined" label="Vendor Email" className="form-text" size="small" name="vendorcontactemail" value={formData.vendorcontactemail} onChange={handleChange} required></TextField>
                                    <TextField variant="outlined" label="Vendor Phone Number" className="form-text" size="small" name="vendorcontactphone" value={formData.vendorcontactphone} onChange={handleChange} required></TextField>
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
                                <FormControl>
                                    <Typography>Select Category:</Typography>
                                    <Select
                                        displayEmpty
                                        name="eventcategory"
                                        value={formData.eventcategory}
                                        onChange={handleChange}
                                        input={<OutlinedInput />}
                                        className="category-dropdown"
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <em>None</em>
                                            }
                                            return selected
                                        }}
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
                                        required
                                    >
                                        <MenuItem disabled value=""><em>None</em></MenuItem>
                                        <MenuItem value="Eat + Drink">Eat + Drink</MenuItem>
                                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                                        <MenuItem value="Shop">Shop</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box className="form-section" id="tag-section">
                                    <Typography className="form-sub">Select Tags</Typography>
                                    <Grid container className="tag-grid">
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Family Friendly" control={<Checkbox value="Family Friendly" checked={formData.eventtag.includes("Family Friendly")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="18+ Adults Only" control={<Checkbox value="18+ Adults Only" checked={formData.eventtag.includes("18+ Adults Only")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="For Children" control={<Checkbox value="For Children" checked={formData.eventtag.includes("For Children")} onChange={handleChange} />} /> 
                                        </Grid>
                                    </Grid>
                                    <Typography className="form-sub">Entertainment and Shop refiners:</Typography>
                                    <Grid container className="tag-grid">
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Light Show" control={<Checkbox value="Light Show" checked={formData.eventtag.includes("Light Show")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Music" control={<Checkbox value="Music" checked={formData.eventtag.includes("Music")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Art & Crafts" control={<Checkbox value="Art & Crafts" checked={formData.eventtag.includes("Art & Crafts")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Fireworks" control={<Checkbox value="Fireworks" checked={formData.eventtag.includes("Fireworks")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Performance" control={<Checkbox value="Performance" checked={formData.eventtag.includes("Performance")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Jewelry" control={<Checkbox value="Jewelry" checked={formData.eventtag.includes("Jewelry")} onChange={handleChange} />} />
                                        </Grid>
                                    </Grid>
                                    <Typography className="form-sub">Food and Drink refiners:</Typography>
                                    <Grid container className="tag-grid">
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Food" control={<Checkbox value="Food" checked={formData.eventtag.includes("Food")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Drink" control={<Checkbox value="Drink" checked={formData.eventtag.includes("Drink")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Vegan" control={<Checkbox value="Vegan" checked={formData.eventtag.includes("Vegan")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Vegetarian" control={<Checkbox value="Vegetarian" checked={formData.eventtag.includes("Vegetarian")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Alcoholic" control={<Checkbox value="Alcoholic" checked={formData.eventtag.includes("Alcoholic")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Gluten Free" control={<Checkbox value="Gluten Free" checked={formData.eventtag.includes("Gluten Free")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Nut Free" control={<Checkbox value="Nut Free" checked={formData.eventtag.includes("Nut Free")} onChange={handleChange} />} />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel className="form-checkbox" label="Dairy Free" control={<Checkbox value="Dairy Free" checked={formData.eventtag.includes("Dairy Free")} onChange={handleChange} />} />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Typography>Hours of Operation</Typography>
                                <Grid container className="time-details">
                                    <Stack className="time-col">
                                        <Typography>Saturday</Typography>
                                        <TextField 
                                            variant="outlined" className="form-text" size="small" name="eventsaturdaytime" value={formData.eventsaturdaytime} onChange={handleChange} InputLabelProps={{ shrink: true }} required
                                        />
                                    </Stack>
                                    <Stack className="time-col">
                                        <Typography>Sunday</Typography>
                                        <TextField 
                                            variant="outlined" className="form-text" size="small" name="eventsundaytime" value={formData.eventsundaytime} onChange={handleChange} InputLabelProps={{ shrink: true }} required
                                        />
                                    </Stack>
                                </Grid>
                                <TextField variant="outlined" label="Add description" className="form-text" size="small" multiline rows={4} name="eventdescription" value={formData.eventdescription} onChange={handleChange} required></TextField>
                                <TextField variant="outlined" label="Allocate stall number" className="form-text" size="small" name="eventstallnumber" value={formData.eventstallnumber} onChange={handleChange} required></TextField>
                                <Stack direction="row" spacing={2} justifyContent="flex-end">
                                    <Button onClick={onClose} variant="outlined" color="secondary" className="event-button">Cancel</Button>
                                    <Button type="submit" variant="contained" color="primary" className="event-button">Submit</Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </form>
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

export default NewEventForm