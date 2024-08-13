import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Grid, Skeleton, Tooltip, useMediaQuery, ListItem, ListItemButton, Select, MenuItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faBowlFood, faLightbulb, faShop } from '@fortawesome/free-solid-svg-icons'

import placeholderImg from '../../static/images/alisa-music-entertainment.jpg'
import '../scss/react.scss'

// import Event
import Event from '../Event'


const EventContainer = () => {
    const [events, setEvents] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedTag, setSelectedTag] = useState('all')

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
        { name: 'All', icon: faCircle, label: 'All'},
        { name: 'Food', icon: faBowlFood, label: 'Eat + Drink'},
        { name: 'Entertainment', icon: faLightbulb, label: 'Entertainment'},
        { name: 'Shop', icon: faShop, label: 'Shop'}
    ]

    const tags = [
        { value: 'all', label: 'All', categories: ['All', 'Food', 'Entertainment', 'Shop'] },
        { value: 'Family Friendly', label: 'Family Friendly', categories: ['All', 'Entertainment', 'Shop'] },
        { value: '18+ Adults Only', label: '18+ Adults Only', categories: ['All', 'Entertainment', 'Shop'] },
        { value: 'For Children', label: 'For Children', categories: ['All', 'Entertainment', 'Shop'] },
        { value: 'Light Show', label: 'Light Show', categories: ['Entertainment', 'Shop'] },
        { value: 'Music', label: 'Music', categories: ['Entertainment', 'Shop'] },
        { value: 'Art & Crafts', label: 'Art & Crafts', categories: ['Entertainment', 'Shop'] },
        { value: 'Fireworks', label: 'Fireworks', categories: ['Entertainment', 'Shop'] },
        { value: 'Performance', label: 'Performance', categories: ['Entertainment', 'Shop'] },
        { value: 'Jewelry', label: 'Jewelry', categories: ['Shop'] },
        { value: 'Food', label: 'Food', categories: ['Food'] },
        { value: 'Drink', label: 'Drink', categories: ['Food'] },
        { value: 'Vegan', label: 'Vegan', categories: ['Food'] },
        { value: 'Vegetarian', label: 'Vegetarian', categories: ['Food'] },
        { value: 'Alcoholic', label: 'Alcoholic', categories: ['Food'] },
        { value: 'Gluten Free', label: 'Gluten Free', categories: ['Food'] },
        { value: 'Nut Free', label: 'Nut Free', categories: ['Food'] },
        { value: 'Dairy Free', label: 'Dairy Free', categories: ['Food'] },    
        { value: 'favourites', label: 'Favourites', categories: ['All'], icon: 'favorite_border' }
    ]

    const filteredTags = tags.filter(tag => tag.categories.includes(selectedCategory) || selectedCategory === 'All')

    return (
        <>
            <div id="category-container">
                {isSmallScreen ? (
                    <Box className="category-list">
                        <Select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            sx={{ color: '#FFFFFF' }}
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
                                            width: '50vw'
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
                {filteredTags.map((tag) => (
                    <button
                        key={tag.value}
                        className={`tag-button ${selectedTag === tag.value ? 'active' : ''}`}
                        onClick={() => handleTagChange(tag.value)}
                    >
                        {tag.label}
                    </button>
                ))}
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
                        const imageUrl = event.eventimage ??  placeholderImg

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
                                            {event.eventsaturdaytime}<br></br>
                                            {event.eventsundaytime}
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