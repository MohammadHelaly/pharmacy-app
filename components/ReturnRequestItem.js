import { View, Text, StyleSheet } from "react-native";
import theme from "../constants/theme";
import LargeButton from "./LargeButton";

const ReturnRequestItem = (props) => {
	const { onPress, returnRequest: item } = props;

	return (
		<View style={styles.itemContainer}>
			<View style={styles.itemContent}>
				<Text>ID: {item.returnRequest.id}</Text>
				<Text>
					Created At:{" "}
					{new Date(
						item.returnRequest.createdAt
					).toLocaleDateString()}
				</Text>
				<Text>Number of Items: {item.numberOfItems}</Text>
				<Text>Number of Reports: {item.numberOfReports}</Text>
				<Text>Number of Shipments: {item.numberOfShipments}</Text>
				<Text>
					Status: {item.returnRequest.returnRequestStatusLabel}
				</Text>
				<Text>Service Type: {item.returnRequest.serviceType}</Text>
				<Text>Associated Wholesaler: {item.wholesalerId}</Text>
			</View>
			<LargeButton label="View Items" onPress={onPress} />
		</View>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: theme.colors.lightGrey,
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		gap: 8,
	},
	itemContent: {
		gap: 2,
	},
});

export default ReturnRequestItem;
