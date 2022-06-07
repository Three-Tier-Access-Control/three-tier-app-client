import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Button, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from 'store/actions';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import handleAxiosError from 'utils/handleAxiosErrors';
import axios, { axiosFace } from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                {
                    // eslint-disable-next-line react/destructuring-assignment
                    <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
                }
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired
};
/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    emailAddress: yup.string().email('Enter a valid email address').required('Email Address is required'),
    phoneNumber: yup.string().required('Phone is required')
});

// ==============================|| FORM VALIDATION - ADD NEW EMPLOYEE FORM  ||============================== //

const CreateEmployeeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            file: null
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { firstName, lastName, emailAddress, phoneNumber, streetAddress, city, file } = values;

                const formData = new FormData();
                formData.append('first_name', firstName);
                formData.append('last_name', lastName);
                formData.append('email_address', emailAddress);
                formData.append('phone_number', phoneNumber);
                formData.append('street_address', streetAddress);
                formData.append('city', city);
                formData.append('photo', file);

                const saveEmployeeOptions = {
                    method: 'POST',
                    headers: {
                        'content-type': 'multipart/form-data',
                        Authorization: `Bearer ${Cookies.get('accessToken')}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        const percent = Math.floor((loaded * 100) / total);
                        setUploadPercentage(percent);
                    },
                    data: formData,
                    url: '/employees/'
                };

                const saveEmployeeResponse = await axios(saveEmployeeOptions);
                const employeeData = saveEmployeeResponse.data;
                console.log(employeeData);

                const indexFaceOptions = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        const percent = Math.floor((loaded * 100) / total);
                        setUploadPercentage(percent);
                    },
                    data: employeeData,
                    url: '/faces/'
                };

                const indexFaceResponse = await axiosFace(indexFaceOptions);
                const indexFaceData = indexFaceResponse.data;
                console.log(indexFaceData);

                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Employee successfully Created!',
                    variant: 'alert',
                    alertSeverity: 'success'
                });
                navigate('/employees');
            } catch (error) {
                const errorMsg = handleAxiosError(error);
                if (Array.isArray(errorMsg)) {
                    errorMsg.map((error) =>
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: error,
                            variant: 'alert',
                            alertSeverity: 'error',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            }
                        })
                    );
                } else {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: errorMsg,
                        variant: 'alert',
                        alertSeverity: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    });
                }
            }
        }
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Add New Employee">
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    defaultValue={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    defaultValue={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="fileUrl"
                                    name="fileUrl"
                                    accept="image/png, image/jpeg"
                                    defaultValue={formik.values.file}
                                    onChange={async (event) => {
                                        const file = event.currentTarget.files[0];
                                        const fileType = file.type;
                                        const type = fileType.split('/');
                                        if (type[0] === 'image') {
                                            // formData.append('file', file);
                                            formik.setFieldValue('file', file);
                                        } else {
                                            dispatch({
                                                type: SNACKBAR_OPEN,
                                                open: true,
                                                message: 'Unsupported file format',
                                                variant: 'alert',
                                                alertSeverity: 'error',
                                                anchorOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }
                                            });
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.file && Boolean(formik.errors.file)}
                                    helperText={(formik.touched.file && formik.errors.file) || "User's Image File"}
                                    type="file"
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="emailAddress"
                                    name="emailAddress"
                                    label="Email Address"
                                    defaultValue={formik.values.emailAddress}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                                    helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    defaultValue={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="streetAddress"
                                    name="streetAddress"
                                    label="Street Address"
                                    defaultValue={formik.values.streetAddress}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                                    helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="city"
                                    name="city"
                                    label="City"
                                    defaultValue={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                    helperText={formik.touched.city && formik.errors.city}
                                />
                            </Grid>
                            {uploadPercentage > 0 && (
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgressWithLabel value={uploadPercentage} />
                                    </Box>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="flex-end">
                                    <AnimateButton>
                                        <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                                            Submit
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreateEmployeeForm;
