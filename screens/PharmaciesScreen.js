import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../constants/theme";
import PharmaciesList from "../components/PharmaciesList";

const PharmaciesScreen = (props) => {
	const { navigation } = props;

	return (
		<View style={styles.container}>
			<PharmaciesList navigation={navigation} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
	},
});

export default PharmaciesScreen;
