import React, { useState } from 'react'
import { Box, Typography, TextField, Stack, Checkbox, Button, FormGroup, FormControlLabel, Alert, Snackbar } from '@mui/material'
import '../../scss/react.scss'


const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        enquiry: '',
    });

        const [errors, setErrors] = useState({
        name: false,
        email: false,
        phone: false,
        enquiry: false,
    })
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateFields = () => {
        const newErrors = {
            name: !formData.name,
            email: !formData.email || !/\S+@\S+\.\S+/.test(formData.email),
            phone: !formData.phone,
            enquiry: !formData.enquiry,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            setSubmitted(true);
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            enquiry: '',
        });
        setErrors({
            name: false,
            email: false,
            phone: false,
            enquiry: false,
        });
        setSubmitted(false);
    };

    if (submitted) {
        return (
            <Box sx={{ mt: 3 }}>
                <Alert severity="success">Thank you for your time contacting us. We will be in touch with you shortly.</Alert>
                <Button className="send-another-email" type="button" variant="outlined" color="secondary" onClick={handleReset}>
                        Reset form to send another message.
                    </Button>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Typography variant="h2" gutterBottom>
                Contact Us
            </Typography>
            <Typography className="form-sub" variant="h3">How can we help you?</Typography>
                    <FormGroup>
                        <FormControlLabel className="form-checkbox" control={<Checkbox />} label="General enquiry" />
                        <FormControlLabel className="form-checkbox" control={<Checkbox />} label="Expression of interest as vendor" />
                        <FormControlLabel className="form-checkbox" control={<Checkbox />} label="Accessibility enquiry" />
                    </FormGroup>
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    error={errors.name}
                    helperText={errors.name ? "Name is required" : ""}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    error={errors.email}
                    helperText={errors.email ? "Valid email is required" : ""}
                />
                <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    error={errors.phone}
                    helperText={errors.phone ? "Only add number. A valid 8 digit phone number is required" : ""}
                />
                <TextField
                    label="Enquiry"
                    name="enquiry"
                    value={formData.enquiry}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    error={errors.enquiry}
                    helperText={errors.enquiry ? "Enquiry is required" : ""}
                />
  
                <Stack className="submit-reset" direction="row" spacing={2}>
                    <Button type="submit" variant="outlined" color="secondary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ContactForm;