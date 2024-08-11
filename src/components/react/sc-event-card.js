import * as React from 'react'
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Grid, Badge } from '@mui/material'
import placeholderImg from '../../../static/images/chef-bryan-entertainment.jpg'
import '../../scss/react.scss'

const eventCard = ({ events }) => {
    if (!events) { return null }

    return (
        <Grid container spacing={3} className="card-grid">
            {events.map(event => {
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
                                <Typography className="event-stall-number">{event.eventstallnumber}</Typography>
                                <Box className="event-title-box">
                                    <Typography className="event-title">
                                        {event.eventdisplayname}
                                    </Typography>
                                    <IconButton className="event-button">
                                        <span className="material-icons">
                                            favorite_border
                                        </span>
                                    </IconButton>
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
    )
}

export default eventCard