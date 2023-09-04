import DashboardBox from '@/components/DashboardBox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
		field: 'totalOutstanding',
		headerName: 'Total Outstanding',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'totalPaid',
		headerName: 'Total Paid',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'largestClaim',
		headerName: 'Largest Claim',
		description: 'This column has a value getter and is not sortable.',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 100,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
];

function TableBox2() {
	const [policyYear, setPolicyYear] = useState([]);
	const selectedYear = useSelector((state) => state.filter.selectedYear);
	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
	const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);

	console.log(selectedYear, selectedMLB1, selectedMLB2);

	const fetchData = async (years) => {
		const claimsData = await Promise.all(
			years.map(async (year) => {
				const endpoints = [
					`http://localhost:1337/metrics/total_outstanding/${year}`,
					`http://localhost:1337/metrics/total_net_paid/${year}`,
					`http://localhost:1337/metrics/largest_incurred/${year}`,
				];

				const allData = await Promise.all(
					endpoints.map((endpoint) => axios.get(endpoint))
				);

				return {
					id: year,
					year: year.toString(),
					totalOutstanding: allData[0].data,
					totalPaid: allData[1].data,
					largestClaim: allData[2].data,
				};
			})
		);

		setPolicyYear(claimsData);
		// console.log(claimsData);
	};

	useEffect(() => {
		// let years = [];
		fetch('http://localhost:1337/dropdowns/years')
			.then((response) => response.json())
			.then((yearsArray) => {
				fetchData(yearsArray);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b2'>
				<h3>Total Incurred by Policy Year</h3>
				<DataGrid
					rows={policyYear}
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

export default TableBox2;
