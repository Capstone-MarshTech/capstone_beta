import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardBox from '@/components/DashboardBox';
import {
	ComposedChart,
	Bar,
	XAxis,
	YAxis,
	Label,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Line,
} from 'recharts';

const GraphsBox3 = () => {
	const [lossBandingData, setLossBandingData] = useState([]);
	const [dataWithMetrics, setDataWithMetrics] = useState([]);

	useEffect(() => {
		const fetchLossBandingData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:1337/dropdown/loss_banding_values'
				);
				setLossBandingData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchLossBandingData();
	}, []);

	useEffect(() => {
		if (lossBandingData.length > 0) {
			const fetchData = async () => {
				try {
					const totalIncurredPromises = lossBandingData.map(
						async (eachBanding) => {
							const response = await axios.get(
								`http://localhost:1337/graph3/total_incurred_by?loss_banding=${eachBanding}`
							);
							return response.data; // Assuming this endpoint returns total incurred data
						}
					);

					const numberOfClaimsPromises = lossBandingData.map(
						async (eachBanding) => {
							const response = await axios.get(
								`http://localhost:1337/graph3/number_of_claims_by?loss_banding=${eachBanding}`
							);
							return response.data; // Assuming this endpoint returns number of claims data
						}
					);

					const numberOfClaimsData = await Promise.all(numberOfClaimsPromises);
					const totalIncurredData = await Promise.all(totalIncurredPromises);

					const newData = lossBandingData.map((eachBanding, index) => ({
						'Loss Banding': eachBanding,
						'Total Incurred': totalIncurredData[index],
						'Number of Claims': numberOfClaimsData[index],
					}));

					setDataWithMetrics(newData);
				} catch (err) {
					console.error(err);
				}
			};

			fetchData();
		}
	}, [lossBandingData]);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b3'>
				<h3>Total Incurred Against Number of Claims by Loss Band</h3>
				<ResponsiveContainer width='100%' height='90%'>
					<ComposedChart
						width={200}
						height={400}
						data={dataWithMetrics}
						margin={{
							top: 20,
							right: 20,
							bottom: 20,
							left: 20,
						}}
					>
						<XAxis dataKey='Loss Banding' />
							<YAxis >
							<Label
								value={'Total Incurred'}
								angle={-90}
								offset={-15}
								position='insideLeft'
								style={{ textAnchor: 'middle' }}
							/>
						</YAxis>
						
						<Tooltip />
						<Legend />
						<Bar dataKey='Total Incurred' stackId='a' fill='#002c77' />

						<Line
							type='monotone'
							dataKey='Number of Claims'
							strokeWidth='2.5'
							stroke='#65cdff'
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default GraphsBox3;
