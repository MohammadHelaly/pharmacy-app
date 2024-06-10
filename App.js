import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/store";
import AuthNavigator from "./navigation/AuthNavigator";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<AuthNavigator />
					<StatusBar style="dark" />
				</NavigationContainer>
			</QueryClientProvider>
		</Provider>
	);
};

export default App;
