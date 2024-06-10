import { Alert } from "react-native";
import LargeButton from "./LargeButton";
import { useMutation, QueryClient } from "@tanstack/react-query";
import api from "../api";

const DeleteItemButton = (props) => {
	const { itemId, requestId, pharmacyId } = props;

	const queryClient = new QueryClient();

	const { mutate } = useMutation({
		mutationFn: () =>
			api.delete(
				`/pharmacies/${pharmacyId}/returnrequests/${requestId}/items/${itemId}`
			),
		onSuccess: () => {
			queryClient.invalidateQueries([
				"requestItems",
				pharmacyId,
				requestId,
			]);
			Alert.alert("Success!", "Item deleted successfully.", [
				{ text: "Great!" },
			]);
		},
		onError: (error) => {
			Alert.alert("Something went wrong!", "Please try again.", [
				{ text: "Okay" },
			]);
		},
	});

	const onPress = () => {
		Alert.alert(
			"Delete Item",
			"Are you sure you want to delete this item?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: mutate,
					style: "destructive",
				},
			]
		);
	};

	return <LargeButton critical label="Delete" onPress={onPress} />;
};

export default DeleteItemButton;
