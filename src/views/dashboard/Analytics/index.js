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
import { IconShare, IconAccessPoint, IconCircles, IconCreditCard, IconUserPlus, IconUsers, IconUserCheck, IconMovie } from '@tabler/icons';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { Headphones, LocalMovies, Movie, Videocam } from '@mui/icons-material';
import handleAxiosError from 'utils/handleAxiosErrors';
import { SNACKBAR_OPEN } from 'store/actions';
import axios from '../../../api/axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LatestPodcastCard from './LatestPodcastCard';
import LatestVideosCard from './LatestVideosCard';

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
    const [err, setErr] = useState();
    const dispatch = useDispatch();

    const [employeeCount, setEmployeeCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [analyticsData, setAnalyticsData] = useState({});
    const [employeesData, setEmployeesData] = useState({});
    const [usersData, setUsersData] = useState({});
    const [podcastsData, setPodcastsData] = useState([]);
    const [videosData, setVideosData] = useState([]);

    useEffect(() => {
        const getAdverts = async () => {
            try {
                setLoading(true);
                const employeesResponse = await axios.get('/employees');
                const usersResponse = await axios.get('/users');

                // const response2 = await axios.get(`${process.env.REACT_APP_BASE_URL_PRODUCTION}/newsfeed/recents/`);
                // const response3 = await axios.get(`${process.env.REACT_APP_BASE_URL_PRODUCTION}/resources/recent-podcasts/`);
                // const response4 = await axios.get(`${process.env.REACT_APP_BASE_URL_PRODUCTION}/resources/recent-videos/`);
                // setAnalyticsData(response.data);
                setEmployeesData(employeesResponse.data);
                setUsersData(usersResponse.data);
                // setPodcastsData(response3.data.results);
                // setVideosData(response4.data.results);

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
        getAdverts();
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
                                    primary="News Articles"
                                    secondary={analyticsData?.articles}
                                    content="Total News Articles"
                                    iconPrimary={DescriptionTwoToneIcon}
                                    color={theme.palette.secondary.main}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <RevenueCard
                                    primary="Podcasts"
                                    secondary={analyticsData?.podcasts}
                                    content="Total Podcasts"
                                    iconPrimary={Headphones}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <RevenueCard
                                    primary="Videos"
                                    secondary={analyticsData?.videos}
                                    content="Total Videos"
                                    iconPrimary={IconMovie}
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
                    {employeesData?.employees && employeesData?.employees.length > 0 && (
                        <Grid item xs={12} lg={6} md={6}>
                            <LatestEmployeesCard title="Recently Added Employees" employeesData={employeesData?.employees} />
                        </Grid>
                    )}

                    {/* {podcastsData && podcastsData.length > 0 && (
                        <Grid item xs={12} lg={6} md={6}>
                            <LatestPodcastCard title="Latest Podcasts" podcastsData={podcastsData} />
                        </Grid>
                    )} */}

                    {/* {videosData && videosData.length > 0 && (
                        <Grid item xs={12} lg={6} md={6}>
                            <LatestVideosCard title="Latest Videos" videosData={videosData} />
                        </Grid>
                    )} */}
                </>
            )}
        </Grid>
    );
};

export default Analytics;
