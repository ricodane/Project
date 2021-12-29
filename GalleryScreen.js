import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	Image,
	StyleSheet,
	Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Constants } from "expo-constants";

const GalleryScreen = () => {
	const [image, setImage] = useState(null);
	const [text, setText] = useState();

	useEffect(async () => {
		if (Platform.OS !== "web") {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				alert("Permission denied!");
			}
		}
	});

	const PickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: "https://scontent.fcgy1-1.fna.fbcdn.net/v/t1.15752-9/217256552_1316329515431934_7866124980126717104_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeGP6HDOZNr2a6hfmMK1Bt5U9-gtd-FWUtP36C134VZS0yZZNFdNlxx8TcaWIx7KMgWhCEIRkV5uqyOrJ06QD-4T&_nc_ohc=zksnBXx80osAX-wL5_u&_nc_ht=scontent.fcgy1-1.fna&oh=3c8f44b962ee74533ce6c66cc5f57359&oe=61BC0960",
				}}
				style={styles.logo}
			/>
			<Text style={styles.instruction}>
				To scan a photo, press the button below!
			</Text>

			<TouchableOpacity style={styles.button} onPress={() => PickImage()}>
				<Text style={styles.buttonText}>Pick a photo</Text>
			</TouchableOpacity>
			{image && (
				<Image
					source={{ uri: image }}
					style={{
						width: 300,
						height: 200,
					}}
				/>
			)}
			{text}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 8,
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
	},
	logo: {
		width: 240,
		height: 200,
		marginBottom: 8,
	},
	instruction: {
		color: "#888",
		fontSize: 18,
		marginHorizontal: 15,
		marginBottom: 10,
	},
});

export default GalleryScreen;
