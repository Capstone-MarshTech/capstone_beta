import DashboardBox from '@/components/DashboardBox';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import {
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Label,
	ResponsiveContainer,
} from 'recharts';

function GraphsBox1() {
	const [policyClaimsByYear, setPolicyClaimsByYear] = useState([]);

	const selectedYear = useSelector((state) => state.filter.selectedYear);
	const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
	const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);

	// console.log('XG', selectedYear, selectedMLB1, selectedMLB2);

	const fetchData = async (years) => {
		const claimsData = await Promise.all(
			years.map(async (year) => {
				const endpoints = [
					`http://localhost:1337/graph1/open_count_by/${year}`,
					`http://localhost:1337/graph1/closed_count_by/${year}`,
					`http://localhost:1337/counts/zero_value_count_by/${year}`,
				];

				const allData = await Promise.all(
					endpoints.map((endpoint) => axios.get(endpoint))
				);

				// Return our response in the allData variable as an array
				return {
					name: year.toString(),
					Open: allData[0].data,
					Closed: allData[1].data,
					ZeroValue: allData[2].data,
				};
			})
		);

		setPolicyClaimsByYear(claimsData);
		// console.log(claimsData);
	};

	useEffect(() => {
		fetch('http://localhost:1337/dropdown/years')
			.then((response) => response.json())
			.then((yearsArray) => {
				fetchData(yearsArray); // Array of years [2017, 2018, 2019, 2020, 2021, 2022]
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
		// console.log(policyClaimsByYear)
	}, []);

	return (
		<>
			<DashboardBox bgcolor='#fff' gridArea='b1'>
				<h3>Number of Claims by Policy Year</h3>
				{policyClaimsByYear.length > 0 ? (
					<ResponsiveContainer width='90%' height='90%'>
						<ComposedChart
							width={200}
							height={400}
							data={policyClaimsByYear}
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}
						>
							<XAxis dataKey='name' />
							<YAxis>
								<Label
									value={'Number of Claims'}
									angle={-90}
									offset={-15}
									position='insideLeft'
									style={{ textAnchor: 'middle' }}
								/>
							</YAxis>
							<Tooltip />
							<Legend />
							<Bar dataKey='Open' stackId='a' fill='#002c77' />
							<Bar dataKey='Closed' stackId='a' fill='#65cdff' />
							<Line
								type='monotone'
								dataKey='ZeroValue'
								strokeWidth='2.5'
								stroke='#00968F'
							/>
						</ComposedChart>
					</ResponsiveContainer>
				) : (
					<p>Loading Data ...</p>
				)}
			</DashboardBox>
		</>
	);
}

export default GraphsBox1;
