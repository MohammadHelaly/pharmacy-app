import React from "react";
import { StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ReturnRequestsScreen from "../screens/ReturnRequestsScreen";
import CreateReturnRequestsScreen from "../screens/CreateReturnRequestsScreen";
import ItemsScreen from "../screens/ItemsScreen";
import AddItemsScreen from "../screens/AddItemsScreen";
import EditItemScreen from "../screens/EditItemScreen";
import PharmaciesScreen from "../screens/PharmaciesScreen";
import PharmacyDetailsScreen from "../screens/PharmacyDetailsScreen";
import theme from "../constants/theme";
import NavigationGuard from "./NavigationGuard";

const Stack = createStackNavigator();

const AppNavigator = () => {
	const stackNavigatorScreenOptions = {
		headerStyle: styles.header,
		headerTitleStyle: styles.headerTitle,
		headerTitleAlign: "center",
	};

	const pharmaciesScreenOptions = {
		headerTitle: "Your Pharmacies",
	};

	const pharmacyDetailsScreenOptions = {
		headerTitle: "Pharmacy Details",
	};

	const returnRequestsScreenOptions = {
		headerTitle: "Your Return Requests",
	};

	const createReturnRequestsScreenOptions = {
		headerTitle: "Create a Return Request",
	};

	const itemsScreenOptions = {
		headerTitle: "Request Items",
	};

	const addItemsScreenOptions = {
		headerTitle: "Add Items",
	};

	const editItemScreenOptions = {
		headerTitle: "Edit Item",
	};

	return (
		<NavigationGuard>
			<Stack.Navigator
				initialRouteName="Pharmacies"
				screenOptions={stackNavigatorScreenOptions}>
				<Stack.Screen
					name="Pharmacies"
					options={pharmaciesScreenOptions}
					component={PharmaciesScreen}
				/>
				<Stack.Screen
					name="PharmacyDetails"
					options={pharmacyDetailsScreenOptions}
					component={PharmacyDetailsScreen}
				/>
				<Stack.Screen
					name="ReturnRequests"
					options={returnRequestsScreenOptions}
					component={ReturnRequestsScreen}
				/>
				<Stack.Screen
					name="CreateReturnRequest"
					options={createReturnRequestsScreenOptions}
					component={CreateReturnRequestsScreen}
				/>
				<Stack.Screen
					name="Items"
					options={itemsScreenOptions}
					component={ItemsScreen}
				/>
				<Stack.Screen
					name="AddItems"
					options={addItemsScreenOptions}
					component={AddItemsScreen}
				/>
				<Stack.Screen
					name="EditItem"
					options={editItemScreenOptions}
					component={EditItemScreen}
				/>
			</Stack.Navigator>
		</NavigationGuard>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: theme.colors.cyan,
		// borderBottomWidth: 0,
	},
	headerTitle: {
		color: theme.colors.white,
		fontSize: theme.sizes.large,
		fontWeight: "bold",
	},
	headerBackIcon: {
		marginLeft: Platform.OS === "ios" ? 8 : 0,
	},
});

export default AppNavigator;
