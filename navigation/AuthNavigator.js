import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator";
import LoginScreen from "../screens/LoginScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const AuthNavigator = () => {
	const stackNavigatorScreenOptions = {
		headerShown: false,
	};

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={stackNavigatorScreenOptions}>
			{!isLoggedIn ? (
				<Stack.Screen name="Login" component={LoginScreen} />
			) : (
				<Stack.Screen name="Management" component={AppNavigator} />
			)}
		</Stack.Navigator>
	);
};

export default AuthNavigator;
