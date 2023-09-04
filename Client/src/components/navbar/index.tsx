import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import TuneIcon from '@mui/icons-material/Tune';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Filter } from '../modal/filter';

type Props = {};

const NavBar = (props: Props) => {
	const { palette } = useTheme();
	// const [selected, setSelected] = useState('graph-view');
	// Use a separate state variable for the filter pop-up
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const handleFilterClick = () => {
		setIsFilterOpen(true);
	};

	const handleCloseFilter = () => {
		setIsFilterOpen(false);
	};

	return (
		<FlexBetween
			mt='.25rem'
			gap='2rem'
			p='.3rem 0rem'
			color={palette.primary[500]}
		>
			{/* Download */}
			<Box sx={{ '&:hover': { color: palette.primary[100] } }}>
				<FileDownloadIcon
					sx={{ fontSize: '24px', verticalAlign: 'text-bottom' }}
				/>
				<span> Download</span>
			</Box>

			{/* Filter */}
			<Box
				sx={{ '&:hover': { color: palette.primary[100] } }}
				onClick={handleFilterClick}
			>
				<TuneIcon sx={{ fontSize: '24px', verticalAlign: 'text-bottom' }} />
				<span> Filters</span>
			</Box>

			{/* BarChart View */}
			<Box>
				<Link to='/'>
					<BarChartIcon
						sx={{
							fontSize: '24px',
							color: palette.primary[500],
							verticalAlign: 'text-bottom',
							'&:hover': { color: palette.primary[100] },
						}}
					/>
				</Link>
			</Box>

			{/* Table View */}
			<Box>
				<Link to='/table-view'>
					<TableChartIcon
						sx={{
							fontSize: '24px',
							color: palette.primary[500],
							verticalAlign: 'text-bottom',
							'&:hover': { color: palette.primary[100] },
						}}
					/>
				</Link>
			</Box>
			{/* Render the Filter component as a pop-up */}
			{isFilterOpen && (
				<Filter isOpen={isFilterOpen} onClose={handleCloseFilter} />
			)}
		</FlexBetween>
	);
};

export default NavBar;
