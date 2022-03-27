import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, Stack, TextField } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from 'store/actions';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    emailAddress: yup.string().email('Enter a valid email').required('Email is required'),
    passwordInstant: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required')
});

// ==============================|| FORM VALIDATION - INSTANT FEEDBACK FORMIK  ||============================== //

const CreateEmployeeForm = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            department: '',
            profileImage: null,
            role: '',
            nationalID: '',
            streetAddress: '',
            city: ''
        },
        validationSchema,
        onSubmit: async () => {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'On Leave - Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
        }
    });

    return (
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
                    <Grid item xs={12} lg={6}>
                        <TextField
                            fullWidth
                            id="emailAddress"
                            name="emailAddress"
                            label="Email"
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
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            // label="Profile Image"
                            defaultValue={formik.values.profileImage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
                            helperText={formik.touched.profileImage && formik.errors.profileImage}
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
                            id="department"
                            name="department"
                            label="Department"
                            defaultValue={formik.values.department}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.department && Boolean(formik.errors.department)}
                            helperText={formik.touched.department && formik.errors.department}
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
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default CreateEmployeeForm;
