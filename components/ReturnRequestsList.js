import React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import theme from "../constants/theme";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import ReturnRequestItem from "./ReturnRequestItem";

const ReturnRequestsList = (props) => {
	const { navigation, pharmacyId } = props;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["returnRequests", pharmacyId],
		queryFn: async () =>
			await api.get(`/pharmacies/${pharmacyId}/returnrequests`),
		select: (response) => response.data.content,
	});

	const {
		data: pharmacy,
		isLoading: isLoadingPharmacy,
		isError: isErrorPharmacy,
	} = useQuery({
		queryKey: ["pharmacies", pharmacyId],
		queryFn: async () => await api.get(`/pharmacies/${pharmacyId}/full`),
		select: (data) => data.data,
	});

	const navigateToItemsScreen = (requestId, pharmacyId) => {
		navigation.navigate("Items", {
			requestId: requestId,
			pharmacyId: pharmacyId,
		});
	};

	const renderItem = ({ item }) => (
		<ReturnRequestItem
			returnRequest={{
				...item,
				wholesalerId:
					pharmacy?.pharmacy?.wholesalersLinks?.[0]?.wholesalerId,
			}}
			onPress={() => {
				navigateToItemsScreen(item.returnRequest.id, pharmacyId);
			}}
		/>
	);

	const keyExtractor = (item) => item.returnRequest.id.toString();

	return isError || isErrorPharmacy ? (
		<Text style={styles.warning}>Failed to load return requests.</Text>
	) : isLoading || isLoadingPharmacy ? (
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
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
	},
	list: {
		paddingHorizontal: 16,
		paddingVertical: 32,
	},
	buttonContainer: {
		padding: 16,
	},
	itemContainer: {
		backgroundColor: theme.colors.lightGrey,
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
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

export default ReturnRequestsList;
