import React, { useState } from 'react'
import { Box, Typography, TextField, Stack, Button, Snackbar } from '@mui/material'
import '../../scss/react.scss'
import Auth from '../../Auth'

const LoginForm = ({ open, onClose, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [showModal, setShowModal] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {
            email: !formData.email || !validateEmail(formData.email),
            password: !formData.password,
        }

        setErrors(newErrors)

        // if input values of fields are correct, attempt signin
        if (!Object.values(newErrors).includes(true)) {
            const submitBtn = document.querySelector('.form-button')
            submitBtn.setAttribute('loading', '')

            // send data to signIn() method
            Auth.signIn(formData, (success) => {
                submitBtn.removeAttribute('loading')
                if (success) {
                    setSnackbarMessage('Logged in successfully')
                    setSnackbarOpen(true)
                    onLoginSuccess()
                } else {
                    setSnackbarOpen(true)
                }
            })
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
    }

    if (!showModal) return null

    return (
        <Box className="login-container">
            <Typography className="login-title">Admin Login</Typography>
            <form onSubmit={handleSubmit}>
                <Box className="login-section">
                    <Stack>
                        <TextField variant="outlined" label="Email address" className="form-text" size="small" name="email" onChange={handleChange} error={errors.email} helperText={errors.email ? "Email is required" : ""}></TextField>
                        <TextField variant="outlined" label="Password" className="form-text" size="small" name="password" onChange={handleChange} error={errors.password} helperText={errors.password ? "Password is required" : ""}></TextField>
                    </Stack>
                </Box>
                <Stack className="form-controls">
                    <Button className="form-button" type="submit">Login</Button>
                </Stack>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    )
}

export default LoginForm