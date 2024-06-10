import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../constants/theme";
import LargeButton from "../components/LargeButton";
import ReturnRequestsList from "../components/ReturnRequestsList";

const ReturnRequestsScreen = ({ navigation, route }) => {
	const { pharmacyId } = route.params;

	const navigateToCreateReturnRequestScreen = () => {
		navigation.navigate("CreateReturnRequest", { pharmacyId });
	};

	return (
		<View style={styles.container}>
			<ReturnRequestsList
				pharmacyId={pharmacyId}
				navigation={navigation}
			/>
			<View style={styles.buttonContainer}>
				<LargeButton
					label="Create New Return Request"
					onPress={navigateToCreateReturnRequestScreen}
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

export default ReturnRequestsScreen;
