import { useState } from 'react';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project imports
import EmployeeDetailsForm from './EmployeeDetailsForm';
import EnrollFingerprintForm from './EnrollFingerprintForm';
import Review from './Review';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// step options
const steps = ['Employee details', 'Enroll Fingerprint', 'Write to RFID Card', 'Capture Face'];

function getStepContent(step, handleNext, handleBack, setErrorIndex, employeeData, setEmployeeData, fingerprintData, setFingerprintData) {
    switch (step) {
        case 0:
            return (
                <EmployeeDetailsForm
                    handleNext={handleNext}
                    setErrorIndex={setErrorIndex}
                    employeeData={employeeData}
                    setEmployeeData={setEmployeeData}
                />
            );
        case 1:
            return (
                <EnrollFingerprintForm
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    fingerprintData={fingerprintData}
                    setFingerprintData={setFingerprintData}
                />
            );
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ValidationWizard = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [employeeData, setEmployeeData] = useState({});
    const [fingerprintData, setFingerprintData] = useState({});
    const [errorIndex, setErrorIndex] = useState(null);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setErrorIndex(null);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <MainCard title="Validation">
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label, index) => {
                    const labelProps = {};

                    if (index === errorIndex) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Error
                            </Typography>
                        );

                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your
                            order has shipped.
                        </Typography>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setEmployeeData({});
                                        setFingerprintData({});
                                        setActiveStep(0);
                                    }}
                                    sx={{ my: 3, ml: 1 }}
                                >
                                    Reset
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </>
                ) : (
                    <>
                        {getStepContent(
                            activeStep,
                            handleNext,
                            handleBack,
                            setErrorIndex,
                            employeeData,
                            setEmployeeData,
                            fingerprintData,
                            setFingerprintData
                        )}
                        {activeStep === steps.length - 1 && (
                            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        )}
                    </>
                )}
            </>
        </MainCard>
    );
};

export default ValidationWizard;
