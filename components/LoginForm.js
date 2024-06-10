import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import theme from "../constants/theme";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/auth-slice";
import LargeButton from "./LargeButton";

const loginSchema = z.object({
	username: z.string(),
	password: z
		.string()
		.min(8, "Your password must be at least 8 characters long."),
});

const LoginForm = (props) => {
	const { navigation } = props;

	const dispatch = useDispatch();

	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
	});

	const { mutate } = useMutation({
		mutationFn: (formData) => api.post("/auth", formData),
		onSuccess: (data) => {
			dispatch(authActions.login({ token: data.data.token }));
			api.defaults.headers.common[
				"Authorization"
			] = `Bearer ${data.data.token}`;
			Alert.alert("Success!");
			navigation.navigate("Management");
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
		<View style={styles.form}>
			<Controller
				control={control}
				name="username"
				render={({
					field: { onChange, onBlur, value },
					fieldState: { error },
				}) => (
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Username"
							style={[
								styles.input,
								error && { borderColor: theme.colors.red },
							]}
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
						/>
						{error && (
							<Text style={styles.errorText}>
								{error.message}
							</Text>
						)}
					</View>
				)}
			/>
			<Controller
				control={control}
				name="password"
				render={({
					field: { onChange, onBlur, value },
					fieldState: { error },
				}) => (
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Password"
							secureTextEntry
							style={[
								styles.input,
								error && { borderColor: theme.colors.red },
							]}
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
						/>
						{error && (
							<Text style={styles.errorText}>
								{error.message}
							</Text>
						)}
					</View>
				)}
			/>
			<LargeButton label="Login" onPress={handleSubmit(onSubmit)} />
		</View>
	);
};

const styles = StyleSheet.create({
	form: {
		gap: 2,
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
		fontSize: theme.sizes.xSmall,
	},
});

export default LoginForm;
