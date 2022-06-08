// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import ReorderTwoToneIcon from '@mui/icons-material/ReorderTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import { FaceTwoTone, FingerprintTwoTone } from '@mui/icons-material';
import CreditCardTwoTone from '@mui/icons-material/CreditCardTwoTone';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeaturePage = () => {
    const theme = useTheme();

    return (
        <Container>
            <Grid container spacing={gridSpacing} gutterBottom sx={{ mb: 5 }}>
                <Grid item xs={12} lg={5} md={10}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant="h5" color="primary">
                                        Top Features
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h2" component="div">
                                What Three Tier Security brings to you?
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Three-tier access control is a portable, high-efficiency, low-cost, and simple-to-use security system to
                                manage access to protected company resources
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                size="xl"
                                                variant="rounded"
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[900]
                                                            : theme.palette.primary.light,
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <FaceTwoTone fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">Facial Recognition</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">
                                                A way of identifying or confirming an individual&apos;s identity using their face
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                size="xl"
                                                variant="rounded"
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[900]
                                                            : theme.palette.secondary.light,
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <CreditCardTwoTone fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">RFID Technology</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">
                                                A wireless system comprised of two components: tags and readers.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                size="xl"
                                                variant="rounded"
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[900]
                                                            : theme.palette.success.light,
                                                    color: theme.palette.success.dark
                                                }}
                                            >
                                                <FingerprintTwoTone fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">Fingerprint Identification</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">
                                                Identification using the impressions made by minute ridge patterns found on fingertips
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FeaturePage;
