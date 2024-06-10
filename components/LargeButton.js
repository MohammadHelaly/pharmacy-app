import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import theme from "../constants/theme";

const LargeButton = (props) => {
	const { label, onPress, critical } = props;

	const buttonStyles = {
		...styles.button,
		...(critical ? styles.critical : styles.normal),
	};

	return (
		<TouchableOpacity style={buttonStyles} onPress={onPress}>
			<Text style={styles.buttonText}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 16,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	normal: {
		backgroundColor: theme.colors.cyan,
	},
	critical: {
		backgroundColor: theme.colors.red,
	},
	buttonText: {
		color: theme.colors.white,
		fontWeight: "bold",
		fontSize: theme.sizes.small,
	},
});

export default LargeButton;
