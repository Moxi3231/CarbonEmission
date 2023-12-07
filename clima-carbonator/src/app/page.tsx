"use client";
import React, { use, useState } from "react";
import {
	TextField,
	Button,
	Container,
	Typography,
	Card,
	CardContent,
	createTheme,
	ThemeProvider,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	CircularProgress,
	Tooltip,
} from "@mui/material";

const theme = createTheme({
	palette: {
		mode: "light", // Set the theme to dark mode
	},
});

const LocationForm = () => {
	//-0.51,29.29,2019,1,
	const [latitude, setLatitude] = useState(-0.51);
	const [longitude, setLongitude] = useState(29.29);
	const [year, setYear] = useState(2019);
	const [weekNumber, setWeekNumber] = useState(1);

	const dataFields = [
		"latitude",
		"longitude",
		"year",
		"week_no",
		"SulphurDioxide_SO2_column_number_density",
		"SulphurDioxide_SO2_column_number_density_amf",
		"SulphurDioxide_SO2_slant_column_number_density",
		"SulphurDioxide_cloud_fraction",
		"SulphurDioxide_sensor_azimuth_angle",
		"SulphurDioxide_sensor_zenith_angle",
		"SulphurDioxide_solar_azimuth_angle",
		"SulphurDioxide_solar_zenith_angle",
		"SulphurDioxide_SO2_column_number_density_15km",
		"CarbonMonoxide_CO_column_number_density",
		"CarbonMonoxide_H2O_column_number_density",
		"CarbonMonoxide_cloud_height",
		"CarbonMonoxide_sensor_altitude",
		"CarbonMonoxide_sensor_azimuth_angle",
		"CarbonMonoxide_sensor_zenith_angle",
		"CarbonMonoxide_solar_azimuth_angle",
		"CarbonMonoxide_solar_zenith_angle",
		"NitrogenDioxide_NO2_column_number_density",
		"NitrogenDioxide_tropospheric_NO2_column_number_density",
		"NitrogenDioxide_stratospheric_NO2_column_number_density",
		"NitrogenDioxide_NO2_slant_column_number_density",
		"NitrogenDioxide_tropopause_pressure",
		"NitrogenDioxide_absorbing_aerosol_index",
		"NitrogenDioxide_cloud_fraction",
		"NitrogenDioxide_sensor_altitude",
		"NitrogenDioxide_sensor_azimuth_angle",
		"NitrogenDioxide_sensor_zenith_angle",
		"NitrogenDioxide_solar_azimuth_angle",
		"NitrogenDioxide_solar_zenith_angle",
		"Formaldehyde_tropospheric_HCHO_column_number_density",
		"Formaldehyde_tropospheric_HCHO_column_number_density_amf",
		"Formaldehyde_HCHO_slant_column_number_density",
		"Formaldehyde_cloud_fraction",
		"Formaldehyde_solar_zenith_angle",
		"Formaldehyde_solar_azimuth_angle",
		"Formaldehyde_sensor_zenith_angle",
		"Formaldehyde_sensor_azimuth_angle",
		"UvAerosolIndex_absorbing_aerosol_index",
		"UvAerosolIndex_sensor_altitude",
		"UvAerosolIndex_sensor_azimuth_angle",
		"UvAerosolIndex_sensor_zenith_angle",
		"UvAerosolIndex_solar_azimuth_angle",
		"UvAerosolIndex_solar_zenith_angle",
		"Ozone_O3_column_number_density",
		"Ozone_O3_column_number_density_amf",
		"Ozone_O3_slant_column_number_density",
		"Ozone_O3_effective_temperature",
		"Ozone_cloud_fraction",
		"Ozone_sensor_azimuth_angle",
		"Ozone_sensor_zenith_angle",
		"Ozone_solar_azimuth_angle",
		"Ozone_solar_zenith_angle",
		"UvAerosolLayerHeight_aerosol_height",
		"UvAerosolLayerHeight_aerosol_pressure",
		"UvAerosolLayerHeight_aerosol_optical_depth",
		"UvAerosolLayerHeight_sensor_zenith_angle",
		"UvAerosolLayerHeight_sensor_azimuth_angle",
		"UvAerosolLayerHeight_solar_azimuth_angle",
		"UvAerosolLayerHeight_solar_zenith_angle",
		"Cloud_cloud_fraction",
		"Cloud_cloud_top_pressure",
		"Cloud_cloud_top_height",
		"Cloud_cloud_base_pressure",
		"Cloud_cloud_base_height",
		"Cloud_cloud_optical_depth",
		"Cloud_surface_albedo",
		"Cloud_sensor_azimuth_angle",
		"Cloud_sensor_zenith_angle",
		"Cloud_solar_azimuth_angle",
		"Cloud_solar_zenith_angle",
		"emission",
	];
	const [carbonEmission, setCarbonEmission] = useState(350);
	const [maxEmission, setMaxEmission] = useState(3150);

	const emissionPercentage = (carbonEmission / maxEmission) * 100;
	let initClimateData: any = {};
	dataFields.map((val) => {
		initClimateData[val] = 0;
	});
	const [climateData, setClimateData] = useState(initClimateData);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const resp = await fetch("/api/climaApi", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				latitude: latitude,
				longitude: longitude,
				weekNumber: weekNumber,
				year: year,
			}),
		}).then((res) => res.json());
		if (resp.dataFetch) {
			const cData = resp.data.climateDataAndPredictions;
			console.log(resp);
			setClimateData(cData);
			setMaxEmission(cData["MaxEmission"]);
			setCarbonEmission(cData["EmissionPred"]);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={1}>
				<Grid item md={4}>
					<Container maxWidth="sm" style={{ marginTop: "30px", marginLeft: 0 }}>
						<Card>
							<CardContent>
								<Typography variant="h5" align="center" gutterBottom>
									Enter Location Details
								</Typography>
								<Divider />
								<form onSubmit={handleSubmit}>
									<Box>
										{" "}
										<Grid container spacing={2} justifyContent="center">
											<Grid item xs={12} sm={6}>
												<TextField
													label="Latitude"
													value={latitude}
													onChange={(e) =>
														setLatitude(Number.parseFloat(e.target.value))
													}
													margin="normal"
													fullWidth
													variant="outlined"
													type="number"
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<TextField
													label="Longitude"
													value={longitude}
													onChange={(e) =>
														setLongitude(Number.parseFloat(e.target.value))
													}
													margin="normal"
													fullWidth
													variant="outlined"
													type="number"
												/>{" "}
											</Grid>
										</Grid>
									</Box>
									<Box>
										{" "}
										<Grid container spacing={2} justifyContent="center">
											<Grid item xs={12} sm={6}>
												<TextField
													fullWidth
													label="Year"
													value={year}
													onChange={(e) =>
														setYear(Number.parseInt(e.target.value))
													}
													margin="normal"
													variant="outlined"
													type="number"
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<TextField
													fullWidth
													label="Week Number"
													value={weekNumber}
													onChange={(e) =>
														setWeekNumber(Number.parseInt(e.target.value))
													}
													margin="normal"
													variant="outlined"
													type="number"
												/>
											</Grid>
										</Grid>
									</Box>
									<Button
										type="submit"
										fullWidth
										variant="outlined"
										style={{ marginTop: "20px", color: "black" }}
									>
										Submit
									</Button>
								</form>

								<Typography variant="body1" style={{ marginTop: "20px" }}>
									Understanding the carbon importance of different locations
									helps in making informed decisions about environmental
									conservation and sustainable practices.
								</Typography>
							</CardContent>
						</Card>

						<Card sx={{ margin: "auto", mt: 4, boxShadow: 2 }}>
							<CardContent>
								<Typography
									sx={{ fontSize: 20, mb: 1.5 }}
									color="text.secondary"
								>
									Carbon Emission
								</Typography>
								<Box display="flex" alignItems="center" justifyContent="center">
									<CircularProgress
										variant="determinate"
										value={emissionPercentage}
										size={125}
										thickness={2}
										style={{ color: "black" }}
									/>
									<Box
										sx={{
											position: "absolute",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Typography variant="h6" component="div" color="black">
											{carbonEmission} CO<sub>2</sub>e
										</Typography>
									</Box>
								</Box>
								<Box
									sx={{
										mt: 1,
										p: 1,
										backgroundColor: "#e3f2fd",
										borderRadius: "4px",
									}}
								>
									<Typography
										variant="subtitle1"
										color="text.primary"
										gutterBottom
									>
										Real Emission
									</Typography>
									<Typography variant="h6" color="secondary">
										{`${climateData["emission"]} CO2e`}
									</Typography>

									<Typography
										variant="subtitle1"
										color="text.primary"
										gutterBottom
									>
										Max Capacity
									</Typography>
									<Typography variant="h6" color="primary">
										{`${maxEmission} CO2e`}
									</Typography>
								</Box>
							</CardContent>
						</Card>
					</Container>
				</Grid>
				<Grid item md={4}>
					<Container maxWidth="sm">
						<Card sx={{ margin: "auto", mt: 4 }} raised={false}>
							<CardContent>
								<TableContainer sx={{ maxHeight: 740, overflow: "auto" }}>
									<Table stickyHeader aria-label="scrollable table">
										<TableHead>
											<TableRow>
												<TableCell>Parameter</TableCell>
												<TableCell>Value</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{dataFields.slice(4, 35).map((row: string, index) => (
												<TableRow key={index}>
													<TableCell component="th" scope="row">
														<Tooltip title={row} placement="bottom">
															<span>{row.substring(0, 20)}...</span>
														</Tooltip>
													</TableCell>
													<TableCell>{climateData[row]}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						</Card>
					</Container>
				</Grid>

				<Grid item md={4}>
					<Container maxWidth="sm">
						<Card sx={{ margin: "auto", mt: 4 }}>
							<CardContent>
								<TableContainer sx={{ maxHeight: 740, overflow: "auto" }}>
									<Table stickyHeader aria-label="scrollable table">
										<TableHead>
											<TableRow>
												<TableCell>Parameter</TableCell>
												<TableCell>Value</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{dataFields.slice(35).map((row, index) => (
												<TableRow key={index}>
													<TableCell component="th" scope="row">
														<Tooltip title={row} placement="bottom">
															<span>{row.substring(0, 20)}...</span>
														</Tooltip>
													</TableCell>
													<TableCell>{climateData[row]}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						</Card>
					</Container>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};

export default LocationForm;
