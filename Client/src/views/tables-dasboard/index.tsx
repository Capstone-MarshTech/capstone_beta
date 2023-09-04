import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import NavBar from '@/components/navbar/index';
import DashboardBox from '@/components/DashboardBox';
import TableBox1 from '@/components/tables/box1';
import TableBox2 from '@/components/tables/box2';
import TableBox3 from '@/components/tables/box3';
import TableBox4 from '@/components/tables/box4';
import { ClaimsBox } from '@/components/boxes/ClaimsBox';
import { TotalIncurredBox } from '@/components/boxes/TotalIncurredBox';
import { useEffect, useState } from 'react';
import axios from 'axios';

const gridTemplateLargeScreens = `
't . . . . .'
'a a . . nav nav'
'b c . . . .'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b1 b1 b1 b2 b2 b2'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
'b3 b3 b3 b4 b4 b4'
`;

const gridTemplateSmallScreens = `
't t'
'nav nav'
'a a'
'b c'
'b1 b1'
'b1 b1'
'b1 b1'
'b1 b1'
'b2 b2'
'b2 b2'
'b2 b2'
'b2 b2'
'b3 b3'
'b3 b3'
'b3 b3'
'b3 b3'
'b3 b3'
'b4 b4'
'b4 b4'
'b4 b4'
'b4 b4'
`;

const TablesDashboard = () => {
	const { palette } = useTheme();
	const [menuItem, setMenuItem] = useState([]);

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const response = await axios.get(
					`http://localhost:1337/dropdowns/clients`
				);
				setMenuItem(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchCompanies();
	}, []);

	const isLargeScreen = useMediaQuery('(min-width: 1008px)');
	return (
		<Box
			width='100%'
			height='100%'
			display='grid'
			gap='2rem'
			sx={
				isLargeScreen
					? {
							gridTemplateColumns: 'repeat (6, minmax(150px, 1fr))',
							gridTemplateRows: 'repeat (15, minmax(60px, 1fr))',
							gridTemplateAreas: gridTemplateLargeScreens,
					  }
					: {
							gridAutoColumns: '1fr',
							gridAutoRows: 'auto',
							gridTemplateAreas: gridTemplateSmallScreens,
					  }
			}
		>
			{' '}
			<Box gridArea='t'>
				<h1>Year & Size</h1>
			</Box>
			{/* Client Dropdown */}
			<Box gridArea='a'>
				<h5>Client Name</h5>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Client Name</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						label='Client Name'
						// onChange={handleChange}
					>
						{menuItem.map((client, idx) => (
							<MenuItem key={idx} value={idx}>
								{client}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box gridArea='nav'>
				<NavBar />
			</Box>
			{/* Number of Claims Box */}
			<DashboardBox bgcolor='#fff' gridArea='b'>
				<ClaimsBox />
			</DashboardBox>
			{/* Total Incurred DashboardBox */}
			<DashboardBox bgcolor='#fff' gridArea='c'>
				<TotalIncurredBox />
			</DashboardBox>
			{/* Table Charts */}
			<TableBox1 />
			<TableBox2 />
			<TableBox3 />
			<TableBox4 />
		</Box>
	);
};

export default TablesDashboard;
