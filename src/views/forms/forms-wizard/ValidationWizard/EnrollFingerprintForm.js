import PropTypes from 'prop-types';

// material-ui
import { Button, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    fingerprintLocation: yup
        .number()
        .positive('Fingerprint Location should be a positive number')
        .integer('Fingerprint Location must be a whole number')
        .required('Fingerprint Location is required')
});

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function EnrollFingerprintForm({ fingerprintData, setFingerprintData, handleNext, handleBack, setErrorIndex }) {
    const formik = useFormik({
        initialValues: {
            fingerprintLocation: fingerprintData.fingerprintLocation
        },
        validationSchema,
        onSubmit: (values) => {
            setFingerprintData({
                fingerprintLocation: values.fingerprintLocation
            });
            handleNext();
        }
    });

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Enroll Fingerprint
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="fingerprintLocation"
                            name="fingerprintLocation"
                            type="number"
                            defaultValue={formik.values.fingerprintLocation}
                            onChange={formik.handleChange}
                            error={formik.touched.fingerprintLocation && Boolean(formik.errors.fingerprintLocation)}
                            helperText={
                                (formik.touched.fingerprintLocation && formik.errors.fingerprintLocation) ||
                                'Enter a valid number from 1 to 127. Retry till success'
                            }
                            label="Fingerprint Location"
                            fullWidth
                            autoComplete="cc-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                Back
                            </Button>
                            <AnimateButton>
                                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

EnrollFingerprintForm.propTypes = {
    fingerprintData: PropTypes.object,
    setFingerprintData: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};
