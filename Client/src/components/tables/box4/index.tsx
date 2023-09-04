import DashboardBox from '@/components/DashboardBox';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const columns: GridColDef[] = [
	{
		field: 'Loss Band',
		headerName: 'Loss Band',
		headerClassName: 'su-header',
		type: 'string',
		minWidth: 20,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'Largest Claim',
		headerName: 'Largest Claim',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
	{
		field: 'Average Cost of Claim',
		headerName: 'Average Cost of Claim',
		headerClassName: 'su-header',
		type: 'number',
		minWidth: 50,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
	},
];

type Props = {};

function TableBox4({}: Props) {
	const [lossBandingData, setLossBandingData] = useState([]);
	const [dataWithMetrics, setDataWithMetrics] = useState([]);
	const [lossBandingDataYear, setLossBandingDataYear] = useState([]);
	const [dataWithMetricsYear, setDataWithMetricsYear] = useState([]);
	const baseUrl = import.meta.env.VITE_BASE_URL;

	const selectedYear = useSelector((state) => state.filter.selectedYear);
	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
	const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);
	const showTitle =
		!selectedYear && !selectedMLB1 && !selectedMLB2
			? 'Largest Claim Against Average Cost per Claim by Loss Band by All Years'
			: `Largest Claim Against Average Cost per Claim by Loss Band ${
					selectedYear ? `(${selectedYear}` : ''
			  } ${selectedMLB1 ? `${selectedMLB1}` : ''} ${
					selectedMLB2 ? `and ${selectedMLB2})` : ')'
			  }`;

	useEffect(() => {
		const fetchLossBandingData = async () => {
			try {
				// console.log(import.meta.env.VITE_BASE_URL);
				const response = await axios.get(
					`${baseUrl}/dropdowns/loss_banding_values`
				);
				setLossBandingData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchLossBandingData();
	}, []);

	useEffect(() => {
		const fetchLossBandingDataByYear = async () => {
			try {
				const response = await axios.get(
					`http://localhost:1337/statistics/loss_banding_values_by/${selectedYear}`
				);
				setLossBandingDataYear(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		if (selectedYear) {
			fetchLossBandingDataByYear();
		}
	}, [selectedYear]);

	useEffect(() => {
		if (lossBandingData.length > 0) {
			const fetchData = async () => {
				try {
					const largestClaimsPromises = lossBandingData.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/largest_claim_by?loss_banding=${eachBanding}`
							);
							return response.data;
						}
					);

					const averageTotalIncurredPromises = lossBandingData.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/average_total_incurred_by?loss_banding=${eachBanding}`
							);
							return response.data;
						}
					);

					const largestClaims = await Promise.all(largestClaimsPromises);
					const averageTotalIncurred = await Promise.all(
						averageTotalIncurredPromises
					);

					const newData = lossBandingData.map((eachBanding, index) => ({
						id: index,
						'Loss Band': eachBanding,
						'Average Cost of Claim': averageTotalIncurred[index],
						'Largest Claim': largestClaims[index],
					}));

					setDataWithMetrics(newData);
				} catch (err) {
					console.error(err);
				}
			};

			fetchData();
		}
	}, [lossBandingData]);

	//   console.log(dataWithMetrics);

	// if the YEAR filter is applied
	useEffect(() => {
		/*change here */
		if (lossBandingDataYear.length > 0 && selectedYear) {
			const fetchDataByYear = async () => {
				try {
					const largestClaimsPromises = lossBandingDataYear.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/largest_claim_by/${selectedYear}?loss_banding=${eachBanding}`
							);
							return response.data;
						}
					);

					const averageTotalIncurredPromises = lossBandingDataYear.map(
						async (eachBanding) => {
							const response = await axios.get(
								`${baseUrl}/statistics/average_total_incurred_by/${selectedYear}?loss_banding=${eachBanding}`
							);
							return response.data;
						}
					);

					const largestClaims = await Promise.all(largestClaimsPromises);
					const averageTotalIncurred = await Promise.all(
						averageTotalIncurredPromises
					);

					const newData = lossBandingDataYear.map((eachBanding, index) => ({
						id: index,
						'Loss Band': eachBanding,
						'Average Cost of Claim': averageTotalIncurred[index],
						'Largest Claim': largestClaims[index],
					}));

					setDataWithMetricsYear(newData);
				} catch (err) {
					console.error(err);
				}
			};
			fetchDataByYear();
		}
	}, [lossBandingDataYear, selectedYear]);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b4'>
				<h3>{showTitle}</h3>
				{selectedYear ? (
					<DataGrid
						rows={dataWithMetricsYear}
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
				) : (
					<DataGrid
						rows={dataWithMetrics}
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
				)}
			</DashboardBox>
		</>
	);
}

export default TableBox4;
