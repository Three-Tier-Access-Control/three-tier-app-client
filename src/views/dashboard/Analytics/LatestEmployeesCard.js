import PropTypes from 'prop-types';

// material-ui
import { Button, CardActions, CardMedia, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import Flag1 from 'assets/images/widget/AUSTRALIA.jpg';
import Flag2 from 'assets/images/widget/BRAZIL.jpg';
import Flag3 from 'assets/images/widget/GERMANY.jpg';
import Flag4 from 'assets/images/widget/UK.jpg';
import Flag5 from 'assets/images/widget/USA.jpg';
import ReactTimeAgo from 'react-time-ago';
import { format } from 'date-fns';
import moment from 'moment';
import { Link } from 'react-router-dom';

// table data
function createData(image, subject, dept, date) {
    return { image, subject, dept, date };
}
const rows = [
    createData(Flag1, 'Germany', 'Angelina Jolly', '56.23%'),
    createData(Flag2, 'USA', 'John Deo', '25.23%'),
    createData(Flag3, 'Australia', 'Jenifer Vintage', '12.45%'),
    createData(Flag4, 'United Kingdom', 'Lori Moore', '8.65%'),
    createData(Flag5, 'Brazil', 'Allianz Dacron', '3.56%'),
    createData(Flag1, 'Australia', 'Jenifer Vintage', '12.45%'),
    createData(Flag3, 'USA', 'John Deo', '25.23%'),
    createData(Flag5, 'Australia', 'Jenifer Vintage', '12.45%'),
    createData(Flag2, 'United Kingdom', 'Lori Moore', '8.65%')
];

// =========================|| DASHBOARD ANALYTICS - LATEST ARTICLES TABLE CARD ||========================= //

const LatestEmployeesCard = ({ title, employeesData }) => (
    <MainCard title={title} content={false}>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>#</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email Address</TableCell>
                        <TableCell align="right" sx={{ pr: 3 }}>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employeesData.map((employee, index) => (
                        <TableRow hover key={index}>
                            <TableCell sx={{ pl: 3 }}>
                                <CardMedia
                                    component="img"
                                    image={employee?.profile_image_url}
                                    alt={employee.first_name}
                                    title="image"
                                    sx={{ width: 30, height: 'auto' }}
                                />
                            </TableCell>
                            <TableCell>
                                {employee.first_name} {employee.first_name}
                            </TableCell>
                            <TableCell>{employee.email_address}</TableCell>
                            <TableCell align="right" sx={{ pr: 3 }}>
                                {format(new Date(employee.created_at), 'E, MMM d yyyy')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button component={Link} to="/admin/articles" variant="text" size="small">
                View all Employees
            </Button>
        </CardActions>
    </MainCard>
);

LatestEmployeesCard.propTypes = {
    title: PropTypes.string,
    employeesData: PropTypes.object
};

export default LatestEmployeesCard;
