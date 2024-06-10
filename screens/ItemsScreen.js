import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../constants/theme";
import RequestItemsList from "../components/RequestItemsList";
import LargeButton from "../components/LargeButton";

const ItemsScreen = (props) => {
	const { navigation, route } = props;
	const { pharmacyId, requestId } = route.params;

	const navigateToAddItemsScreen = () => {
		navigation.navigate("AddItems", {
			pharmacyId: pharmacyId,
			requestId: requestId,
		});
	};

	return (
		<View style={styles.container}>
			<RequestItemsList
				pharmacyId={pharmacyId}
				requestId={requestId}
				navigation={navigation}
			/>
			<View style={styles.buttonContainer}>
				<LargeButton
					label="Add New Item"
					onPress={navigateToAddItemsScreen}
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
	buttonContainer: {
		padding: 16,
	},
});

export default ItemsScreen;
