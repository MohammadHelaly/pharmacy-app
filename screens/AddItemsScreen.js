import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import theme from "../constants/theme";
import LargeButton from "../components/LargeButton";
import AddItemForm from "../components/AddItemForm";

const AddItemsScreen = (props) => {
	const { navigation, route } = props;
	const { pharmacyId, requestId } = route.params;

	const navigateToItemsScreen = () => {
		navigation.navigate("Items", {
			pharmacyId,
			requestId,
		});
	};

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<AddItemForm
					navigation={navigation}
					pharmacyId={pharmacyId}
					requestId={requestId}
				/>
				<LargeButton
					label="View Request Items"
					onPress={navigateToItemsScreen}
				/>
			</ScrollView>
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
		gap: 24,
	},
});

export default AddItemsScreen;
