import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from 'store/actions';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import handleAxiosError from 'utils/handleAxiosErrors';
import qs from 'qs';
import axios, { axiosHardware } from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({});

// ==============================|| FORM VALIDATION - ADD NEW EMPLOYEE FORM  ||============================== //

const CreateRFIDBadgeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.user.accessToken);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState();

    const [employeesData, setEmployeesData] = useState([]);

    useEffect(() => {
        const getEmployeeData = async () => {
            try {
                setLoading(true);
                const employeesResponse = await axios.get('/employees');
                setEmployeesData(employeesResponse.data.results);
                setLoading(false);
                setSuccess(true);
            } catch (error) {
                setLoading(false);
                const errorMsg = handleAxiosError(error);
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
        };
        getEmployeeData();
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            employeeId: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { employeeId } = values;

                const writeToRFIDCardOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        employee_id: employeeId
                    },
                    url: '/write-to-rfid-card/'
                };

                const writeToRFIDCardResponse = await axiosHardware(writeToRFIDCardOptions);
                const uid = writeToRFIDCardResponse.data.data.uid;

                const saveRFIDCardOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('accessToken')}` },
                    data: {
                        uid_tag: uid,
                        employee: employeeId
                    },
                    url: '/rfid/'
                };

                await axios(saveRFIDCardOptions);

                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'RFID Badge successfully created!',
                    variant: 'alert',
                    alertSeverity: 'success'
                });
                navigate('/badges');
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
            {loading && (
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                </Grid>
            )}

            {success && (
                <Grid item xs={12}>
                    <MainCard title="Add New RFID Card">
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="employee-select">Employee</InputLabel>
                                        <Select
                                            labelId="employee-select"
                                            id="employeeId"
                                            name="employeeId"
                                            defaultValue={formik.values.employeeId}
                                            onChange={formik.handleChange}
                                            label="Age"
                                        >
                                            {employeesData.map((employee) => (
                                                <MenuItem value={employee.id}>
                                                    {employee.first_name} {employee.last_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.errors.employeeId && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {formik.errors.employeeId}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
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
            )}
        </Grid>
    );
};

export default CreateRFIDBadgeForm;
