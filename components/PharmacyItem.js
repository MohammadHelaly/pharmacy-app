import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../constants/theme";
import LargeButton from "./LargeButton";

const PharmacyItem = (props) => {
	const { pharmacy, onPress } = props;

	return (
		<View style={styles.itemContainer}>
			<View style={styles.itemHeadingContianer}>
				<Text style={styles.itemHeading}>
					{pharmacy.doingBusinessAs}
				</Text>
				<Text style={styles.itemText}>
					{"Pharmacy ID - " + pharmacy.pharmacyId}
				</Text>
			</View>
			<View style={styles.itemBody}>
				<Text style={styles.itemBodyText}>
					{pharmacy.numberOfReturns + " Returns"}
				</Text>
			</View>
			<LargeButton label="View Pharmacy Details" onPress={onPress} />
		</View>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: theme.colors.lightGrey,
		borderRadius: 8,
		gap: 12,
	},
	itemHeadingContianer: {
		borderBottomWidth: 1,
		borderColor: theme.colors.grey,
		paddingBottom: 4,
	},
	itemHeading: {
		fontSize: theme.sizes.large,
		fontWeight: "bold",
	},
	itemText: {
		fontSize: theme.sizes.small,
	},
	itemBody: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 8,
	},
	itemBodyText: {
		fontSize: theme.sizes.medium,
	},
});

export default PharmacyItem;
