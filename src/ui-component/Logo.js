// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logo.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
        //  * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Three Tier Security" width="100" />
         *
         */
        <img src={logo} alt="Three Tier Security" height="50" />
    );
};

export default Logo;
