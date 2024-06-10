import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import theme from "../constants/theme";
import CreateReturnRequestForm from "../components/CreateReturnRequestForm";

const CreateReturnRequestScreen = ({ navigation, route }) => {
	const { pharmacyId } = route.params;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["pharmacies", pharmacyId],
		queryFn: async () => await api.get(`/pharmacies/${pharmacyId}/full`),
		select: (data) => data.data,
	});

	const wholesalerIds = data.pharmacy.wholesalersLinks.map((wholesaler) =>
		wholesaler.wholesalerId.toString()
	);

	return (
		<View style={styles.container}>
			{isError ? (
				<Text style={styles.warning}>Failed to load data.</Text>
			) : isLoading ? (
				<Text style={styles.message}>Loading...</Text>
			) : (
				wholesalerIds && (
					<CreateReturnRequestForm
						navigation={navigation}
						pharmacyId={pharmacyId}
						wholesalerIds={wholesalerIds}
					/>
				)
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		backgroundColor: theme.colors.white,
	},
	warning: {
		color: theme.colors.red,
		fontSize: theme.sizes.large,
	},
	message: {
		fontSize: theme.sizes.large,
	},
});

export default CreateReturnRequestScreen;
