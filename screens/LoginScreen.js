import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../constants/theme";
import LoginForm from "../components/LoginForm";
import NavigationGuard from "../navigation/NavigationGuard";

const LoginScreen = (props) => {
	const { navigation } = props;

	return (
		<NavigationGuard guardWhileLoggedIn>
			<View style={styles.container}>
				<Text style={styles.heading}>Login</Text>
				<LoginForm navigation={navigation} />
			</View>
		</NavigationGuard>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
		paddingHorizontal: 16,
		justifyContent: "center",
		gap: 24,
	},
	heading: {
		textAlign: "center",
		fontSize: theme.sizes.xxLarge,
		fontWeight: "bold",
		marginVertical: 16,
	},
});

export default LoginScreen;
