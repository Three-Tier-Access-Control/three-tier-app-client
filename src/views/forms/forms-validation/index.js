// material-ui
import { Grid } from '@mui/material';

// project imports
import LoginForms from './LoginForms';
import CreateEmployeeForm from './CreateEmployeeForm';
import RadioGroupForms from './RadioGroupForms';
import CheckboxForms from './CheckboxForms';
import SelectForms from './SelectForms';
import { gridSpacing } from 'store/constant';

// ==============================|| FORMS VALIDATION - FORMIK ||============================== //

const CreateEmployee = () => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
            <CreateEmployeeForm />
        </Grid>
    </Grid>
);

export default CreateEmployee;
