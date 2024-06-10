import React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import theme from "../constants/theme";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import Item from "./Item";

const RequestItemsList = (props) => {
	const { navigation, pharmacyId, requestId } = props;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["requestItems", pharmacyId, requestId],
		queryFn: async () => {
			const response = await api.get(
				`/pharmacies/${pharmacyId}/returnrequests/${requestId}/items`
			);
			return response.data;
		},
	});

	const navigateToEditItemScreen = (itemId, pharmacyId, requestId) => {
		navigation.navigate("EditItem", { requestId, pharmacyId, itemId });
	};

	const renderItem = ({ item }) => (
		<Item
			item={item}
			pharmacyId={pharmacyId}
			requestId={requestId}
			onPress={() =>
				navigateToEditItemScreen(item.id, pharmacyId, requestId)
			}
		/>
	);

	const keyExtractor = (item) => item.id.toString();

	return isError ? (
		<Text style={styles.warning}>Failed to load return requests.</Text>
	) : isLoading ? (
		<Text style={styles.message}>Loading...</Text>
	) : (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			contentContainerStyle={styles.list}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: 16,
		paddingVertical: 32,
	},
	title: {
		fontSize: theme.sizes.xLarge,
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: theme.sizes.large,
	},
	description: {
		fontSize: theme.sizes.medium,
	},
	itemHeader: {
		gap: 4,
	},
	itemContainer: {
		backgroundColor: theme.colors.lightGrey,
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		gap: 16,
	},
	warning: {
		color: theme.colors.red,
		fontSize: theme.sizes.large,
		textAlign: "center",
	},
	message: {
		color: theme.colors.black,
		fontSize: theme.sizes.large,
		textAlign: "center",
	},
});

export default RequestItemsList;
