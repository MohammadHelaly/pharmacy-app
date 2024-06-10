import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../constants/theme";
import LargeButton from "./LargeButton";
import DeleteItemButton from "./DeleteItemButton";

const Item = (props) => {
	const { onPress, item, pharmacyId, requestId } = props;

	return (
		<View style={styles.itemContainer}>
			<View style={styles.itemHeader}>
				<Text style={styles.title}>{item.name}</Text>
				<Text style={styles.subtitle}>{item.manufacturer}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
			<Text>{"NDC: " + item.ndc}</Text>
			<Text>{"Strength: " + item.strength}</Text>
			<Text>{"Dossage: " + item.dossage}</Text>
			<Text>{"Package Size: " + item.packageSize}</Text>
			<Text>{"Full Quantity: " + item.fullQuantity}</Text>
			<Text>{"Partial Quantity: " + item.partialQuantity}</Text>
			<Text>{"Expiration Date: " + item.expirationDate}</Text>
			<Text>{"Lot Number: " + item.lotNumber}</Text>
			<Text>{"Status: " + item.status}</Text>
			<LargeButton label="Edit Item" onPress={onPress} />
			<DeleteItemButton
				itemId={item.id}
				pharmacyId={pharmacyId}
				requestId={requestId}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
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
});

export default Item;
