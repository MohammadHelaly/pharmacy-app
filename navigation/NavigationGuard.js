import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const NavigationGuard = (props) => {
	const { children, guardWhileLoggedIn } = props;

	const navigation = useNavigation();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	useEffect(() => {
		if (!guardWhileLoggedIn && !isLoggedIn) {
			navigation.navigate("Login");
		}
	}, [isLoggedIn, navigation]);

	if (!guardWhileLoggedIn && !isLoggedIn) return null;

	if (guardWhileLoggedIn && isLoggedIn) return null;

	return children;
};

export default NavigationGuard;
