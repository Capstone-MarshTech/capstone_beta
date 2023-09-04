import axios from 'axios';
import { useState, useEffect } from 'react';

export const ClaimsBox = () => {
	const [claims, setClaims] = useState(0);
	useEffect(() => {
		const fetchClaims = async () => {
			try {
				const response = await axios.get(
					'http://localhost:1337/smallBoxes/all_claims_count'
				);
				setClaims(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchClaims();
	}, []);

	return (
		<>
			<h6>NUMBER OF CLAIMS</h6>
			<h4>{claims}</h4>
		</>
	);
};
