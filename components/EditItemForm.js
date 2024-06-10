import React from "react";
import {
	View,
	ScrollView,
	Text,
	TextInput,
	StyleSheet,
	Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import theme from "../constants/theme";
import LargeButton from "./LargeButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api";

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
	strength: z.string().min(1, "Strength is required"),
	dossage: z.string().min(1, "Dossage is required"),
	requestType: z.string().min(1, "Request type is required"),
	packageSize: z.string().min(1, "Package size is required"),
	status: z.enum(["PENDING", "DONE"], "Please enter a valid status."),
	ndc: z.string().min(1, "NDC is required"),
	description: z.string().min(1, "Description is required"),
	manufacturer: z.string().min(1, "Manufacturer is required"),
	fullQuantity: z.string().min(1, "Full quantity is required"),
	partialQuantity: z.string().min(1, "Partial quantity is required"),
	expirationDate: z.string().min(1, "Expiration date is required"),
	lotNumber: z.string().min(1, "Lot number is required"),
});

const EditItemForm = (props) => {
	const { navigation, pharmacyId, requestId, item } = props;

	const itemId = item.id;

	const queryClient = new QueryClient();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: item.name,
			strength: item.strength,
			dossage: item.dossage,
			requestType: item.requestType,
			packageSize: item.packageSize,
			status: item.itemStatus,
			ndc: item.ndc,
			description: item.description,
			manufacturer: item.manufacturer,
			fullQuantity: item.fullQuantity.toString(),
			partialQuantity: item.partialQuantity.toString(),
			expirationDate: item.expirationDate,
			lotNumber: item.lotNumber,
		},
	});

	const navigateToItemsScreen = () => {
		navigation.navigate("Items", {
			pharmacyId,
			requestId,
		});
	};

	const { mutate } = useMutation({
		mutationFn: (formData) => {
			return api.put(
				`/pharmacies/${pharmacyId}/returnrequests/${requestId}/items/${itemId}`,
				formData
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["requestItems", pharmacyId, requestId],
			});
			queryClient.invalidateQueries({
				queryKey: ["requestItems", pharmacyId, requestId, itemId],
			});
			Alert.alert("Success!", "Item updated successfully", [
				{ text: "Great!" },
			]);
			navigateToItemsScreen();
		},
		onError: (error) => {
			Alert.alert("Something went wrong!", "Please try again.", [
				{ text: "Okay" },
			]);
		},
	});

	const onSubmit = (data) => {
		mutate(data);
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Name:</Text>
				<Controller
					control={control}
					name="name"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.name && (
					<Text style={styles.errorText}>{errors.name.message}</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Strength:</Text>
				<Controller
					control={control}
					name="strength"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.strength && (
					<Text style={styles.errorText}>
						{errors.strength.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Dossage:</Text>
				<Controller
					control={control}
					name="dossage"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.dossage && (
					<Text style={styles.errorText}>
						{errors.dossage.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Request Type:</Text>
				<Controller
					control={control}
					name="requestType"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.requestType && (
					<Text style={styles.errorText}>
						{errors.requestType.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Package Size:</Text>
				<Controller
					control={control}
					name="packageSize"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="numeric"
						/>
					)}
				/>
				{errors.packageSize && (
					<Text style={styles.errorText}>
						{errors.packageSize.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Status:</Text>
				<Controller
					control={control}
					name="status"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.status && (
					<Text style={styles.errorText}>
						{errors.status.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>NDC:</Text>
				<Controller
					control={control}
					name="ndc"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="numeric"
						/>
					)}
				/>
				{errors.ndc && (
					<Text style={styles.errorText}>{errors.ndc.message}</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Description:</Text>
				<Controller
					control={control}
					name="description"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.description && (
					<Text style={styles.errorText}>
						{errors.description.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Manufacturer:</Text>
				<Controller
					control={control}
					name="manufacturer"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.manufacturer && (
					<Text style={styles.errorText}>
						{errors.manufacturer.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Full Quantity:</Text>
				<Controller
					control={control}
					name="fullQuantity"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="numeric"
						/>
					)}
				/>
				{errors.fullQuantity && (
					<Text style={styles.errorText}>
						{errors.fullQuantity.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Partial Quantity:</Text>
				<Controller
					control={control}
					name="partialQuantity"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="numeric"
						/>
					)}
				/>
				{errors.partialQuantity && (
					<Text style={styles.errorText}>
						{errors.partialQuantity.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Expiration Date:</Text>
				<Controller
					control={control}
					name="expirationDate"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="numeric"
						/>
					)}
				/>
				{errors.expirationDate && (
					<Text style={styles.errorText}>
						{errors.expirationDate.message}
					</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Lot Number:</Text>
				<Controller
					control={control}
					name="lotNumber"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="numeric"
						/>
					)}
				/>
				{errors.lotNumber && (
					<Text style={styles.errorText}>
						{errors.lotNumber.message}
					</Text>
				)}
			</View>
			<LargeButton label="Edit Item" onPress={handleSubmit(onSubmit)} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		padding: 16,
		gap: 24,
	},
	label: {
		fontSize: 16,
		marginBottom: 4,
	},
	input: {
		borderWidth: 1,
		borderColor: theme.colors.lightGrey,
		padding: 12,
		// marginBottom: 16,
		borderRadius: 8,
	},
});

export default EditItemForm;
