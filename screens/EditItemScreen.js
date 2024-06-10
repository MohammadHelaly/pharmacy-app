import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import theme from "../constants/theme";
import api from "../api";
import EditItemForm from "../components/EditItemForm";

const EditItemScreen = (props) => {
	const { navigation, route } = props;
	const { pharmacyId, requestId, itemId } = route.params;

	const { data, isError, isLoading } = useQuery({
		queryFn: () =>
			api.get(
				`/pharmacies/${pharmacyId}/returnrequests/${requestId}/items/${itemId}`
			),
		queryKey: ["requsetItems", pharmacyId, requestId, itemId],
		select: (response) => response.data,
	});

	return (
		<View style={styles.container}>
			{isError ? (
				<Text style={styles.warning}>Something went wrong!</Text>
			) : isLoading ? (
				<Text style={styles.message}>Loading...</Text>
			) : (
				<EditItemForm
					item={data}
					pharmacyId={pharmacyId}
					requestId={requestId}
					navigation={navigation}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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

export default EditItemScreen;
