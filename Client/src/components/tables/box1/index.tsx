import DashboardBox from '@/components/DashboardBox';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Mock Data
const columns: GridColDef[] = [
	{
		field: 'year',
		headerName: 'Year',
		headerClassName: 'su-header',
		type: 'string',
		minWidth: 20,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'open',
		headerName: 'Open',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'closed',
		headerName: 'Closed',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'zeroValueClaims',
		headerName: 'Zero Value Claims',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 100,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
];

type Props = {};

function TableBox1({}: Props) {
	const [policyClaimsByYear, setPolicyClaimsByYear] = useState([]);

	const selectedYear = useSelector((state) => state.filter.selectedYear);
	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
	const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);

	console.log('From XG-Table', selectedYear, selectedMLB1, selectedMLB2);

	const fetchData = async (years) => {
		const claimsData = await Promise.all(
			years.map(async (year) => {
				const endpoints = [
					`http://localhost:1337/counts/open_count/${year}`,
					`http://localhost:1337/counts/closed_count/${year}`,
					`http://localhost:1337/counts/zero_value_count/${year}`,
				];

				const allData = await Promise.all(
					endpoints.map((endpoint) => axios.get(endpoint))
				);

				return {
					id: year,
					year: year.toString(),
					open: allData[0].data,
					closed: allData[1].data,
					zeroValueClaims: allData[2].data,
				};
			})
		);
		setPolicyClaimsByYear(claimsData);
		console.log('claims', claimsData);
	};

	useEffect(() => {
		let years = [];
		fetch('http://localhost:1337/dropdowns/years')
			.then((response) => response.json())
			.then((yearsArray) => {
				years = yearsArray;
				console.log('years', yearsArray);
				fetchData(years); // Array of years [2017, 2018, 2019, 2020, 2021, 2022]
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});

		console.log(policyClaimsByYear);
	}, []);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b1'>
				<h3>Number of Claims by Policy Year</h3>
				<DataGrid
					rows={policyClaimsByYear}
					columns={columns}
					autoHeight={true}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
					sx={{
						m: 2,
						mb: 2,
						border: 0,
						'& .su-header': {
							backgroundColor: 'rgba(118, 211, 255, 0.25)',
						},
					}}
				/>
			</DashboardBox>
		</>
	);
}

export default TableBox1;
