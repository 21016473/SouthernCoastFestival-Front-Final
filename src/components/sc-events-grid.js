import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Grid, Skeleton, Tooltip, useMediaQuery, ListItem, ListItemButton, Select, MenuItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faB, faBowlFood, faLightbulb, faShop } from '@fortawesome/free-solid-svg-icons'

import placeholderImg from '../../static/images/chef-bryan-entertainment.jpg'
import '../scss/react.scss'

// import hardcoded event data
import eventData from '../eventdata'


const EventContainer = () => {
    const [events, setEvents] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedTag, setSelectedTag] = useState('all')

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        const fetchEvents = () => {
            setEvents(eventData)
        }
        fetchEvents()
    }, [])

    const [filteredEvents, setFilteredEvents] = useState([])

    // filter events by category, then tag
    useEffect(() => {
        let filtered = events;

        if (selectedCategory === 'All' && selectedTag === 'all') {
            filtered = events 
        } else {
            if (selectedCategory !== 'All') {
                filtered = filtered.filter(event => event.eventcategory === selectedCategory)
            }

            if (selectedTag !== 'all') {
                filtered = filtered.filter(event => {
                    if (Array.isArray(event.eventtag)) {
                        return event.eventtag.includes(selectedTag)
                    }
                    return event.eventtag === selectedTag
                })
            }
        }

        setFilteredEvents(filtered)
    }, [selectedCategory, selectedTag, events])

    const handleCategoryChange = (category) => {
        console.log("selected button:", category)
        setSelectedCategory(category)
        setSelectedTag('all')
    }

    const handleTagChange = (tag) => {
        setSelectedTag(tag)
    }

    const categories = [
        { name: 'All', icon: '', label: 'All'},
        { name: 'Food', icon: faBowlFood, label: 'Eat + Drink'},
        { name: 'Entertainment', icon: faLightbulb, label: 'Entertainment'},
        { name: 'Shop', icon: faShop, label: 'Shop'}
    ]

    return (
        <>
            <div id="category-container">
                {isSmallScreen ? (
                    <Box className="category-list">
                        <Select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            sx={{ 
                                color: '#FFFFFF', 
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: '0.1em solid #FFC600'
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: '#2b2b2b',
                                        color: "#FFFFFF",
                                        '& .MuiList-root.MuiMenu-list': {
                                            backgroundColor: '#2b2b2b',
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
                            {categories.map((category) => (
                                <MenuItem key={category.name} value={category.name}>
                                    <FontAwesomeIcon icon={category.icon} style={{marginRight: '5px'}} />{category.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                ) : (
                    categories.map((category) => (
                        <button 
                            key={category.name}
                            className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.name)}
                        >
                            <FontAwesomeIcon icon={category.icon} style={{ marginRight: '5px'}} />
                            {category.label}
                        </button>
                    ))
                )}
            </div>

            <div id="tag-container">
                <button className={`tag-button ${selectedTag === 'all' ? 'active' : ''}`} onClick={() => handleTagChange('all')}>All</button>
                <button className={`tag-button ${selectedTag === 'drink' ? 'active' : ''}`} onClick={() => handleTagChange('drink')}>Drinks</button>
                <button className={`tag-button ${selectedTag === 'food' ? 'active' : ''}`} onClick={() => handleTagChange('food')}>Food</button>
                <button className={`tag-button ${selectedTag === 'alcoholic' ? 'active' : ''}`} onClick={() => handleTagChange('alcoholic')}>Alcholic</button>
                <button className={`tag-button ${selectedTag === 'gluten-free' ? 'active' : ''}`} onClick={() => handleTagChange('gluten-free')}>Gluten Free</button>
                <button className={`tag-button ${selectedTag === 'nut-free' ? 'active' : ''}`} onClick={() => handleTagChange('nut-free')}>Nut Free</button>
                <button className={`tag-button ${selectedTag === 'gourmet' ? 'active' : ''}`} onClick={() => handleTagChange('gourmet')}>Gourmet</button>
                <button className={`tag-button ${selectedTag === 'vegan' ? 'active' : ''}`} onClick={() => handleTagChange('vegan')}>Vegan</button>
                <button className={`tag-button ${selectedTag === 'favourites' ? 'active' : ''}`} onClick={() => handleTagChange('favourites')}>
                    <span className="material-icons">favorite_border</span>
                    Favourites
                </button>
                <p className="message">Showing all {filteredEvents.length} items</p>
            </div>

            {filteredEvents.length === 0 ? (
                <>
                <Typography sx={{color: '#FFFFFF', fontFamily: 'var(--base-font-family)', textAlign: 'center', paddingBottom: '10px', fontSize: '1em'}}>No events found matching that criteria</Typography>
                <Grid container spacing={3} className="skel-grid">
                    {[...Array(2)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card className="card">
                                <CardContent className="event-content">
                                    <Skeleton variant="rounded" height={200} />
                                    <Box mt={2} className="skel-box">
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="text" width="80%" />
                                        <Skeleton variant="text" width="40%" />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid> 
                </>
            ) : (
                <Grid container spacing={3} className="card-grid">
                    {filteredEvents.map(event => {
                        const imageUrl = event.eventimage || placeholderImg;

                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={event._id}>
                                <Card className="card">
                                    <CardContent className="event-content">
                                        <CardMedia
                                            component="img"
                                            alt="placeholder"
                                            height="150"
                                            image={imageUrl}
                                            className="event-image" />
                                        <Box className="event-stall-box">
                                            <Typography className="stall">Stall</Typography>
                                            <Typography className="event-stall-number">{event.eventstallnumber}</Typography>
                                        </Box>
                                        <Box className="event-title-box">
                                            <Typography className="event-title">
                                                {event.eventdisplayname}
                                            </Typography>
                                            <Tooltip title="Feature coming soon" placement="top" arrow>
                                                <span>
                                                <IconButton className="event-button" disabled>
                                                    <span className="material-icons">
                                                        favorite_border
                                                    </span>
                                                </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Box>
                                        <Typography className="event-description">
                                            {event.eventdescription}
                                        </Typography>
                                        <Typography className="event-times">
                                            {event.eventoperationdatetimestart}<br></br>
                                            {event.eventoperationdatetimeend}
                                        </Typography>
                                        <Typography className="hidden">
                                            {event.eventstallnumber}
                                        </Typography>
                                        <Typography className="hidden">
                                            {event.eventcategory}<br></br>
                                            {event.eventtag}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </>
    )
}

export default EventContainer;