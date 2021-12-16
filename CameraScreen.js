import React, { useRef, useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Modal,
	Pressable,
	Button,
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import {
	getModel,
	convertBase64ToTensor,
	startPrediction,
} from "../helpers/tensor-helper/tensor-helper";
import { cropPicture } from "../helpers/image-helper/image-helper";
import { ActivityIndicator } from "react-native-paper";
import * as Speech from "expo-speech";

const RESULT_MAPPING = ["Apa", "Mata", "Talong"];

const CameraScreen = () => {
	const cameraRef = useRef();
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const isFocused = useIsFocused();
	const [isProcessing, setIsProcessing] = useState(false);
	const [presentedText, setPresentedText] = useState("");

	const handleImageCapture = async () => {
		setIsProcessing(true);
		const imageData = await cameraRef.current.takePictureAsync({
			base64: true,
		});
		processImagePrediction(imageData);
	};

	const processImagePrediction = async (base64Image) => {
		const croppedData = await cropPicture(base64Image, 300);
		const model = await getModel();
		const tensor = await convertBase64ToTensor(croppedData.base64);

		const prediction = await startPrediction(model, tensor);

		const highestPrediction = prediction.indexOf(
			Math.max.apply(null, prediction)
		);
		setPresentedText(RESULT_MAPPING[highestPrediction]);
	};

	const speak = () => {
		const thingToSay = presentedText;
		Speech.speak(thingToSay);
	};

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
			<View style={styles.container}>
				<Modal visible={isProcessing} transparent={true} animationType="slide">
					<View style={styles.modal}>
						<View style={styles.modalContent}>
							<Text>Your text is {presentedText}</Text>

							{presentedText === "" && <ActivityIndicator size="large" />}
							<Pressable
								style={styles.dismissButton}
								onPress={() => {
									setPresentedText("");
									setIsProcessing(false);
								}}
							>
								<Button title="Press to hear some words" onPress={speak} />
								<Text>Dismiss</Text>
							</Pressable>
						</View>
					</View>
				</Modal>
				<Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
					<View
						style={{
							flex: 1,
							backgroundColor: "transparent",
							flexDirection: "row",
						}}
					>
						<TouchableOpacity
							style={{
								flex: 0.1,
								alignSelf: "flex-end",
								alignItems: "center",
							}}
							onPress={() => {
								setType(
									type === Camera.Constants.Type.back
										? Camera.Constants.Type.front
										: Camera.Constants.Type.back
								);
							}}
						></TouchableOpacity>
					</View>
				</Camera>
				<Pressable
					onPress={() => handleImageCapture()}
					style={styles.captureButton}
				>
					<Text style={styles.scanText}>Scan</Text>
				</Pressable>
			</View>
		)
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scanText: {
		fontSize: 20,
		fontFamily: "Roboto",
		fontWeight: "normal",
	},
	text: {
		fontSize: 18,
		color: "white",
	},
	modal: {
		flex: 1,
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	captureButton: {
		position: "absolute",
		left: 156,
		bottom: 28,
		width: 48,
		zIndex: 50,
		height: 30,
		backgroundColor: "#FFE5D8",
		borderRadius: 7,
	},
	modalContent: {
		alignItems: "center",
		justifyContent: "center",
		width: 300,
		height: 300,
		borderRadius: 24,
		backgroundColor: "gray",
	},
	dismissButton: {
		width: 150,
		height: 50,
		marginTop: 60,
		borderRadius: 24,
		color: "white",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "red",
	},
});

export default CameraScreen;
