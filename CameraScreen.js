import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

const CameraScreen = () => {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const isFocused = useIsFocused();

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return alert("You have not granted permission to open Camera.");
	}

	return (
		isFocused && (
			<Camera style={{ flex: 1 }} type={type}>
				<View
					style={{
						flex: 1,
						backgroundColor: "transparent",
						flexDirection: "row",
					}}
				>
					<TouchableOpacity
						style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Text style={styles.text}> Flip </Text>
					</TouchableOpacity>
				</View>
			</Camera>
		)
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
		color: "white",
	},
});

export default CameraScreen;
