import React, { useState } from 'react'
import { Grid, Box, Button, Stack, Typography, useMediaQuery, Select, MenuItem, FormControl } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMap, faWheelchair, faParking, faBus } from '@fortawesome/free-solid-svg-icons'
import '../../scss/react.scss'

const venueCards = () => {
    const [activeSection, setActiveSection] = useState('location')
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const handleButtonClick = (section) => {
        setActiveSection(section)
    }

    // array of navigation items
    const sections = [
        { id: 'location', label: 'Location', icon: faLocationDot },
        { id: 'map', label: 'Event Map', icon: faMap },
        { id: 'accessibility', label: 'Accessibility', icon: faWheelchair },
        { id: 'parking', label: 'Parking', icon: faParking },
        { id: 'transport', label: 'Transport', icon: faBus },
    ]

    return (
        <>
        {isSmallScreen ? (
            <Box className="venue-nav-list">
                <Select 
                    value={activeSection} 
                    onChange={(e) => handleButtonClick(e.target.value)}
                    className="venue-list"
                    sx={{ 
                        backgroundColor: '#2b2b2b',
                        width: '60%',
                        color: '#FFFFFF',
                        marginBottom: '1em',
                        display: 'flex',
                        justifyContent: 'center',  
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '0.15em solid #FFC600'
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
                                    width: '50vw'
                                }
                            }
                        }
                    }}  
                >
                    {sections.map((section) => (
                        <MenuItem key={section.id} value={section.id}>
                            <FontAwesomeIcon icon={section.icon} style={{marginRight:'5px'}} />{section.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        ) : (
            <Box className="venue-nav">
                <Box
                    sx={{
                        overflowX: isSmallScreen ? 'auto' : 'visible',
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'row' : 'column',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {sections.map((section) => (
                        <Button
                            key={section.id}
                            onClick={() => handleButtonClick(section.id)}
                            variant={activeSection === section.id ? 'contained' : 'outlined'}
                            startIcon={<FontAwesomeIcon icon={section.icon}/>}
                            sx={{ 
                                flexShrink: 0, 
                                borderRadius: '0.2em',
                                textTransform: 'capitalize',
                                ...(activeSection !== section.id && {
                                    color: '#000000',
                                    backgroundColor: '#BDBDBD',
                                    borderColor: '#BDBDBD',
                                    '&:hover': {
                                        color: '#000000',
                                        backgroundColor: '#FFC600',
                                        borderColor: '#FFC600',
                                        fontWeight: 'bold'
                                    }
                                }),
                                ...(activeSection === section.id && {
                                    backgroundColor: '#FFC600',
                                    color: '#000000',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#FFC600'
                                    }
                                })
                            }}
                        >
                            {section.label}
                        </Button>
                    ))}
                </Box>
            </Box>
        )}
        
        <Box className="venue-container">
            {activeSection === 'location' && (
                <Box id="location" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Stack>
                        <Typography className="subtitle">
                            <FontAwesomeIcon icon={faLocationDot} /> Location
                        </Typography>
                        <Typography className="paragraph">Rippleside Park, Bell Parade Geelong, Victoria, Australia</Typography>
                        <Box className="google-map">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.567231010363!2d144.35266371147935!3d-38.12700147178166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad416b703b7800b%3A0xf04567605324bc0!2sRippleside%20Park!5e0!3m2!1sen!2sau!4v1721380831126!5m2!1sen!2sau"  
                                allowFullScreen="" 
                                loading="lazy"
                            >
                            </iframe>
                        </Box>
                    </Stack>
                </Box>
            )}
            {activeSection === 'map' && (
                <Box id="map">
                    <Typography className="subtitle">Festival Map</Typography>
                    <Box id="map-img"></Box>
                </Box>
            )}
            {activeSection === 'accessibility' && (
                <Box id="accessibility">
                    <Typography className="subtitle">Accessibility</Typography>
                    <Typography className="paragraph">We are committed to providing an accommodating experience for all our guests. If you have any specific requirements, don't hesitate to contact us.</Typography>
                    <Stack className="info">
                        <Typography className="bold">Parking:</Typography>
                        <Typography className="paragraph">Designated infoarking spots are located close to the entrance for guests with mobility needs. Display the appropriate permits.</Typography>
                    </Stack>
                    <Stack className="info">
                        <Typography className="bold">Pathways:</Typography>
                        <Typography className="paragraph">The event grounds feature smooth pathways to ensure easy navigation for wheelchairs and mobility aids.</Typography>
                    </Stack>
                    <Stack className="info">
                        <Typography className="bold">Restrooms:</Typography>
                        <Typography className="paragraph">Wheelchair-infoestrooms are available throughout the event site.</Typography>
                    </Stack>
                    <Stack className="info">
                        <Typography className="bold">Viewing:</Typography>
                        <Typography className="paragraph">We offer designated viewing areas for guests using wheelchairs, ensuring an unobstructed view of the light displays and performances.</Typography>
                    </Stack>
                    <Stack className="info">
                        <Typography className="bold">Assistance: </Typography>
                        <Typography className="paragraph">Our friendly staff and volunteers are on hand to assist with any needs or questions you may have during your visit.</Typography>
                    </Stack>
                </Box>
            )}
            {activeSection === 'parking' && (
                <Box id="parking">
                    <Typography className="subtitle">Parking</Typography>
                    <Stack className="info">
                        <Typography className="bold">On-site: </Typography>
                        <Typography className="paragraph">Our main event site features ample parking spaces just a short walk from the entrance. Follow signs to designated parking areas upon arrival.</Typography>
                    </Stack>
                    <Stack className="info">
                        <Typography className="bold">Street: </Typography>
                        <Typography className="paragraph">Limited street parking is available around the event site. Be sure to check local signage for any restrictions or time limits.</Typography>
                    </Stack>
                    <Stack className="info">
                        <Typography className="bold">On-site: </Typography>
                        <Typography className="paragraph">During peak times, additional overflow parking is available nearby. Shuttle services will be provided to transport guests to and from the main event area.</Typography>
                    </Stack>
                </Box>
            )}
            {activeSection === 'transport' && (
                <Box id="transport">
                    <Typography className="subtitle">Transport</Typography>
                    <Typography className="paragraph">For convenient access to the light festival, many parking spots are available nearby. Alternatively, infoublic transport is easy with frequent bus services and a nearby train station.</Typography>
                    <Typography className="paragraph">Follow signs for designated parking areas or plan your journey using public transport options for a hassle-free visit to this event.</Typography>
                </Box>
            )}
        </Box>
        </>
    )
}

export default venueCards