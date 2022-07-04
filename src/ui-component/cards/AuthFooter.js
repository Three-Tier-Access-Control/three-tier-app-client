// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
            Three-Tier Security{' '}
        </Typography>
        {/* <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
            &copy; codedthemes.com
        </Typography> */}
    </Stack>
);

export default AuthFooter;
