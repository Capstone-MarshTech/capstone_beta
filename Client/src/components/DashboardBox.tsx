import { Box } from '@mui/material';
import { styled } from '@mui/system';

const DashboardBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.light,
	borderRadius: '.5rem',
	boxShadow: '0.15rem 0.15rem 0.25rem 0.1rem rgba(0, 0, 0, .1)',
	padding: '.3rem',
}));

export default DashboardBox;
