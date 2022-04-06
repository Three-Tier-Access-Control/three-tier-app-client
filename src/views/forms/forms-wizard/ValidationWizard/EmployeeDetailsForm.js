import PropTypes from 'prop-types';

// material-ui
import { Button, Checkbox, FormControlLabel, Grid, Stack, Typography, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SNACKBAR_OPEN } from 'store/actions';
import axios from 'api/axios';
import { useDispatch, useSelector } from 'react-redux';
import handleAxiosError from 'utils/handleAxiosErrors';

const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    emailAddress: yup.string().email('Enter a valid email address').required('Email Address is required')
});

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const EmployeeDetailsForm = ({ employeeData, setEmployeeData, handleNext, setErrorIndex }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user.accessToken);

    const formik = useFormik({
        initialValues: {
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            emailAddress: employeeData.emailAddress,
            phoneNumber: employeeData.phoneNumber,
            role: employeeData.role,
            nationalID: employeeData.nationalID,
            streetAddress: employeeData.streetAddress,
            city: employeeData.city
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { firstName, lastName, emailAddress, phoneNumber, role, nationalID, streetAddress, city } = values;

                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        email_address: emailAddress,
                        phone_number: phoneNumber,
                        national_id: nationalID,
                        street_address: streetAddress,
                        role,
                        city
                    },
                    url: '/employees'
                };

                await axios(options);

                setEmployeeData({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    emailAddress: values.emailAddress,
                    phoneNumber: values.phoneNumber,
                    role: values.role,
                    nationalID: values.nationalID,
                    streetAddress: values.streetAddress,
                    city: values.city
                });
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Employee successfully Created!',
                    variant: 'alert',
                    alertSeverity: 'success'
                });
                handleNext();
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
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Employee Information
            </Typography>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="First Name *"
                            defaultValue={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Last Name *"
                            defaultValue={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            fullWidth
                            autoComplete="family-name"
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
                            id="nationalID"
                            name="nationalID"
                            label="National ID"
                            defaultValue={formik.values.nationalID}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nationalID && Boolean(formik.errors.nationalID)}
                            helperText={formik.touched.nationalID && formik.errors.nationalID}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            fullWidth
                            id="role"
                            name="role"
                            label="Role"
                            defaultValue={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
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
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

EmployeeDetailsForm.propTypes = {
    employeeData: PropTypes.object,
    setEmployeeData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default EmployeeDetailsForm;
