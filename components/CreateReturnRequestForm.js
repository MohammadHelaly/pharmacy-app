import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, QueryClient } from "@tanstack/react-query";
import api from "../api";
import theme from "../constants/theme";
import LargeButton from "./LargeButton";

const formSchema = z.object({
	serviceType: z.enum(
		["EXPRESS_SERVICE", "FULL_SERVICE"],
		"Please select a service type."
	),
	wholesalerId: z.string(),
});

const CreateReturnRequestForm = (props) => {
	const { pharmacyId, navigation, wholesalerIds } = props;

	const queryClient = new QueryClient();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			serviceType: "EXPRESS_SERVICE",
			wholesalerId: wholesalerIds[0],
		},
	});

	const { mutate } = useMutation({
		mutationFn: (formData) =>
			api.post(`/pharmacies/${pharmacyId}/returnrequests`, formData),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["returnRequests", pharmacyId],
			});
			queryClient.invalidateQueries({
				queryKey: ["pharmacies"],
			});
			queryClient.invalidateQueries({
				queryKey: ["pharmacies", pharmacyId],
			});
			Alert.alert("Success!", "Request created successfully!", [
				{ text: "Great!" },
			]);
			navigation.navigate("AddItems", {
				requestId: data.data.id,
			});
		},
		onError: () => {
			Alert.alert("Something went wrong!", "Please try again.", [
				{ text: "Okay" },
			]);
		},
	});

	const onSubmit = (data) => {
		mutate(data);
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Service Type:</Text>
				<Controller
					control={control}
					name="serviceType"
					render={({ field: { onChange, value } }) => (
						<Picker selectedValue={value} onValueChange={onChange}>
							<Picker.Item
								label="Express Service"
								value="EXPRESS_SERVICE"
							/>
							<Picker.Item
								label="Full Service"
								value="FULL_SERVICE"
							/>
						</Picker>
					)}
				/>
				{errors.serviceType && (
					<Text style={styles.errorText}>
						{errors.serviceType.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Wholesaler:</Text>
				<Controller
					control={control}
					name="wholesalerId"
					render={({ field: { onChange, value } }) => (
						<Picker selectedValue={value} onValueChange={onChange}>
							{wholesalerIds.map((wholesalerId) => (
								<Picker.Item
									key={wholesalerId}
									label={wholesalerId}
									value={wholesalerId}
								/>
							))}
						</Picker>
					)}
				/>
				{errors.wholesalerId && (
					<Text style={styles.errorText}>
						{errors.wholesalerId.message}
					</Text>
				)}
			</View>
			<LargeButton
				label="Create Return Request"
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	form: {
		gap: 2,
	},
	label: {
		fontSize: theme.sizes.small,
		marginBottom: 10,
	},
	inputContainer: {
		gap: 1,
	},
	input: {
		borderWidth: 1,
		borderColor: theme.colors.lightGrey,
		padding: 12,
		marginBottom: 16,
		borderRadius: 8,
	},
	errorText: {
		color: theme.colors.red,
		fontSize: theme.sizes.xxSmall,
	},
});

export default CreateReturnRequestForm;
