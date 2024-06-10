import { View, Text, StyleSheet } from "react-native";
import theme from "../constants/theme";

const PharmacyDetails = (props) => {
	const { details: data } = props;

	return (
		data && (
			<>
				<View style={styles.section}>
					<Text style={styles.header}>Pharmacy Details</Text>
					<Text style={styles.text}>ID: {data.pharmacy.id}</Text>
					<Text style={styles.text}>
						Business Name: {data.pharmacy.doingBusinessAs}
					</Text>
					<Text style={styles.text}>
						Legal Business Name: {data.pharmacy.legalBusinessName}
					</Text>
					<Text style={styles.text}>DEA: {data.pharmacy.dea}</Text>
					<Text style={styles.text}>NPI: {data.pharmacy.npi}</Text>
					<Text style={styles.text}>
						Pharmacy Type: {data.pharmacy.companyType}
					</Text>
					<Text style={styles.text}>
						Service Type: {data.pharmacy.reimbursementType}
					</Text>
					<Text style={styles.text}>
						License State: {data.pharmacy.licenseState}
					</Text>
					<Text style={styles.text}>
						License State Code: {data.pharmacy.licenseStateCode}
					</Text>
					<Text style={styles.text}>
						Status: {data.pharmacy.enabled ? "Enabled" : "Disabled"}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.header}>User Info</Text>
					<Text style={styles.text}>
						User ID: {data.pharmacy.user.id}
					</Text>
					<Text style={styles.text}>
						User Role: {data.pharmacy.user.role}
					</Text>
					<Text style={styles.text}>
						Username: {data.pharmacy.user.username}
					</Text>
					<Text style={styles.text}>
						User Email: {data.pharmacy.user.email}
					</Text>
					<Text style={styles.text}>
						Activated: {data.pharmacy.user.activated ? "Yes" : "No"}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.header}>Contact Info</Text>
					<Text style={styles.text}>
						Email: {data.pharmacyContactInfo.email}
					</Text>
					<Text style={styles.text}>
						Phone: {data.pharmacyContactInfo.phone}
					</Text>
					<Text style={styles.text}>
						Fax: {data.pharmacyContactInfo.fax}
					</Text>
					<Text style={styles.text}>
						First Name: {data.pharmacyContactInfo.firstName}
					</Text>
					<Text style={styles.text}>
						Last Name: {data.pharmacyContactInfo.lastName}
					</Text>
					<Text style={styles.text}>
						Title: {data.pharmacyContactInfo.title}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.header}>Address</Text>
					<Text style={styles.text}>
						Street: {data.pharmacyCompanyAddressInfo.address1}
					</Text>
					<Text style={styles.text}>
						Address Line 2:{" "}
						{data.pharmacyCompanyAddressInfo.address2}
					</Text>
					<Text style={styles.text}>
						City: {data.pharmacyCompanyAddressInfo.city}
					</Text>
					<Text style={styles.text}>
						State: {data.pharmacyCompanyAddressInfo.state}
					</Text>
					<Text style={styles.text}>
						Zip: {data.pharmacyCompanyAddressInfo.zip}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.header}>Wholesalers</Text>
					{data.pharmacy.wholesalersLinks.map((wholesaler, index) => (
						<View
							key={index}
							style={
								data.pharmacy.wholesalersLinks?.length > 1
									? styles.wholesaler
									: {}
							}>
							<Text style={styles.text}>
								ID: {wholesaler.wholesalerId}
							</Text>
							<Text style={styles.text}>
								Address: {wholesaler.address}, {wholesaler.city}
								, {wholesaler.state} {wholesaler.zipCode}
							</Text>
							<Text style={styles.text}>
								Primary Contact:{" "}
								{wholesaler.primary ? "Yes" : "No"}
							</Text>
						</View>
					))}
				</View>
			</>
		)
	);
};

const styles = StyleSheet.create({
	section: {
		marginBottom: 12,
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderColor: theme.colors.grey,
	},
	header: {
		fontSize: theme.sizes.xLarge,
		fontWeight: "bold",
		marginVertical: 16,
	},
	text: {
		fontSize: theme.sizes.small,
		marginBottom: 5,
	},
	wholesaler: {
		marginBottom: 4,
		paddingBottom: 4,
		borderBottomWidth: 1,
		borderColor: theme.colors.grey,
	},
});

export default PharmacyDetails;
