import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import theme from "../constants/theme";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import LargeButton from "../components/LargeButton";
import PharmacyDetails from "../components/PharmacyDetails";

const PharmacyDetailsScreen = (props) => {
	const { navigation, route } = props;
	const { pharmacyId } = route.params;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["pharmacies", pharmacyId],
		queryFn: async () => await api.get(`/pharmacies/${pharmacyId}/full`),
		select: (data) => data.data,
	});

	const navigateToReturnRequestsScreen = (pharmacyId) => {
		navigation.navigate("ReturnRequests", { pharmacyId: pharmacyId });
	};

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{isError ? (
					<Text style={styles.warning}>Something Went Wrong!</Text>
				) : isLoading ? (
					<Text style={styles.message}>Loading...</Text>
				) : (
					<PharmacyDetails details={data} />
				)}
			</ScrollView>
			<View style={styles.buttonContainer}>
				<LargeButton
					label="See Return Requests"
					onPress={() => navigateToReturnRequestsScreen(pharmacyId)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
	},
	scrollContainer: {
		padding: 16,
	},
	buttonContainer: {
		padding: 16,
	},
});

export default PharmacyDetailsScreen;
