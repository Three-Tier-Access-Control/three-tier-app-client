// material-ui
import { useTheme } from '@mui/material/styles';
import { CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';

// project imports
import MarketShareAreaChartCard from './MarketShareAreaChartCard';
import TotalRevenueCard from './TotalRevenueCard';
import LatestEmployeesCard from './LatestEmployeesCard';
import MainCard from 'ui-component/cards/MainCard';
import RevenueCard from 'ui-component/cards/RevenueCard';
import UserCountCard from 'ui-component/cards/UserCountCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconUsers, IconUserCheck, IconMovie } from '@tabler/icons';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FaceIcon from '@mui/icons-material/Face';
import handleAxiosError from 'utils/handleAxiosErrors';
import { SNACKBAR_OPEN } from 'store/actions';
import axios, { axiosFace } from '../../../api/axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LatestBadgesCard from './LatestBadgesCard';
import LatestFingerprintsCard from './LatestFingerprintsCard';
import useNetworkStatus from 'hooks/useNetworkStatus';
import LatestAccessLogsCard from './LatestAccessLogs';

// ==============================|| ANALYTICS DASHBOARD ||============================== //

const Analytics = () => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const blockSX = {
        p: 2.5,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const status = useNetworkStatus();

    const [fingerprintsData, setFingerprintsData] = useState([]);
    const [employeesData, setEmployeesData] = useState({});
    const [usersData, setUsersData] = useState({});
    const [facesData, setFacesData] = useState([]);
    const [badgesData, setBadgesData] = useState([]);
    const [accessLogsData, setAccessLogsData] = useState({});

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                setLoading(true);
                const employeesResponse = await axios.get('/employees/?limit=3');
                const badgesResponse = await axios.get('/rfid/?limit=3');
                const fingerprintsResponse = await axios.get('/fingerprint/?limit=3');
                const usersResponse = await axios.get('/users/');
                const accessLogResponse = await axios.get('/access/');

                setEmployeesData(employeesResponse.data);
                setBadgesData(badgesResponse.data.results);
                setFingerprintsData(fingerprintsResponse.data.results);
                setUsersData(usersResponse.data);
                setAccessLogsData(accessLogResponse.data);

                const facesDataOptions = {
                    method: 'GET',
                    url: '/faces/'
                };

                const indexFaceResponse = await axiosFace(facesDataOptions);
                setFacesData(indexFaceResponse.data);
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
        getDashboardData();
    }, [dispatch]);

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
                <>
                    <Grid item xs={12} lg={8} md={6}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} lg={4}>
                                <RevenueCard
                                    primary="Badges Issued"
                                    secondary={badgesData?.length}
                                    content="Total Badges Issued"
                                    iconPrimary={CreditCardIcon}
                                    color={theme.palette.secondary.main}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <RevenueCard
                                    primary="Fingerprints Enrolled"
                                    secondary={fingerprintsData?.length}
                                    content="Total Fingerprints Enrolled"
                                    iconPrimary={FingerprintIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <RevenueCard
                                    primary="Faces Indexed"
                                    secondary={facesData.length}
                                    content="Total Faces Indexed"
                                    iconPrimary={FaceIcon}
                                    color={theme.palette.orange.dark}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={4} md={6}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MainCard
                                    content={false}
                                    sx={{
                                        '& svg': {
                                            width: 50,
                                            height: 50,
                                            color: theme.palette.secondary.main,
                                            borderRadius: '14px',
                                            p: 1.25,
                                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                        }
                                    }}
                                >
                                    <Grid container alignItems="center" spacing={0}>
                                        <Grid item xs={12} sm={6} sx={blockSX}>
                                            <Grid
                                                container
                                                alignItems="center"
                                                spacing={1}
                                                justifyContent={matchDownXs ? 'space-between' : 'center'}
                                            >
                                                <Grid item>
                                                    <IconUserCheck stroke={1.5} />
                                                </Grid>
                                                <Grid item sm zeroMinWidth>
                                                    <Typography variant="h5" align="center">
                                                        {usersData?.count}
                                                    </Typography>
                                                    <Typography variant="subtitle2" align="center">
                                                        ADMIN USERS
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={6} sx={blockSX}>
                                            <Grid
                                                container
                                                alignItems="center"
                                                spacing={1}
                                                justifyContent={matchDownXs ? 'space-between' : 'center'}
                                            >
                                                <Grid item>
                                                    <IconUsers stroke={1.5} />
                                                </Grid>
                                                <Grid item sm zeroMinWidth>
                                                    <Typography variant="h5" align="center">
                                                        {employeesData?.count}
                                                    </Typography>
                                                    <Typography variant="subtitle2" align="center">
                                                        EMPLOYEES
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Grid>

                    {accessLogsData?.results && accessLogsData?.results.length > 0 && (
                        <Grid item xs={12} lg={6} md={6}>
                            <LatestAccessLogsCard title="Recent Access Logs" accessLogsData={accessLogsData?.results} />
                        </Grid>
                    )}

                    {employeesData?.results && employeesData?.results.length > 0 && (
                        <Grid item xs={12} lg={6} md={6}>
                            <LatestEmployeesCard title="Recently Added Employees" employeesData={employeesData?.results} />
                        </Grid>
                    )}

                    {badgesData && badgesData.length > 0 && (
                        <Grid item xs={12} lg={6} md={6}>
                            <LatestBadgesCard title="Recently Added RFID Badges" badgesData={badgesData} />
                        </Grid>
                    )}

                    {fingerprintsData && fingerprintsData.length > 0 && (
                        <Grid item xs={12} lg={6} md={6}>
                            <LatestFingerprintsCard title="Recently Added Fingerprint Records" fingerprintsData={fingerprintsData} />
                        </Grid>
                    )}
                </>
            )}
        </Grid>
    );
};

export default Analytics;
