import React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import theme from "../constants/theme";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import PharmacyItem from "./PharmacyItem";

const PharmaciesList = (props) => {
	const { navigation } = props;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["pharmacies"],
		queryFn: async () => await api.get("/pharmacies/management"),
		select: (data) => data.data,
	});

	const navigateToPharmacyDetailsScreen = (pharmacyId) => {
		navigation.navigate("PharmacyDetails", { pharmacyId: pharmacyId });
	};

	const keyExtractor = (item) => item.pharmacyId.toString();

	const renderItem = ({ item }) => (
		<PharmacyItem
			pharmacy={item}
			onPress={() => navigateToPharmacyDetailsScreen(item.pharmacyId)}
		/>
	);

	return isError ? (
		<Text style={styles.warning}>Something Went Wrong!</Text>
	) : isLoading ? (
		<Text style={styles.message}>Loading...</Text>
	) : (
		<FlatList
			contentContainerStyle={styles.list}
			data={data}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		padding: 16,
		gap: 16,
	},
	warning: {
		paddingVertical: 32,
		textAlign: "center",
		fontSize: theme.sizes.large,
		fontWeight: "bold",
		color: theme.colors.red,
	},
	message: {
		paddingVertical: 32,
		textAlign: "center",
		fontSize: theme.sizes.large,
		fontWeight: "bold",
		color: theme.colors.black,
	},
});

export default PharmaciesList;
