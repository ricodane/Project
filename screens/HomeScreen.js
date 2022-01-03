import React, { useState, useRef } from "react";

import {
	View,
	Text,
	FlatList,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	TouchableOpacity,
	Button,
	TouchableWithoutFeedback,
	Animated,
	Modal,
	ScrollView,
} from "react-native";
import { Image } from "react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import text from "./text";
import text1 from "./text1";
import Checkbox from "expo-checkbox";
import HyperLink from "react-native-hyperlink";

const SPACING = 20;

const HomeScreen = ({ navigation }) => {
	const animation = useRef(new Animated.Value(0)).current;
	const [showState, setShowState] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [toggleCheckBox, setToggleCheckBox] = useState(false);

	toggleMenu = () => {
		const toValue = this.open ? 0 : 1;

		Animated.spring(animation, {
			toValue,
			friction: 5,
			useNativeDriver: true,
		}).start();
		this.open = !this.open;
	};

	const rotation = {
		transform: [
			{
				rotate: animation.interpolate({
					inputRange: [0, 1],
					outputRange: ["0deg", "45deg"],
				}),
			},
		],
	};

	const pinStyle = {
		transform: [
			{ scale: animation },
			{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -5],
				}),
			},
		],
	};

	const handStyle = {
		transform: [
			{ scale: animation },
			{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -105],
				}),
			},
		],
	};

	const [list, setList] = useState([
		{
			headertext: "nauna",
			title: "Sinugbuanong Binisaya \nAlpabeto",
			description: "Mga alpabeto \nsa Sinugbuanong Binisaya",
			credits: "credits to APK Premier",
			id: 1,
			image: require("../pictures/credits.png"),
			screen_name: "AlphabetScreen",
		},
		{
			headertext: "kaduha",
			title: "Pulong sa Sinugbuanong \nBinisaya",
			description: "Mga pananglitan na pulong \nsa Sinugbuanong Binisaya",
			credits: "credits to HuntersWoodsPH",
			id: 2,
			image: require("../pictures/terms.jpg"),
			screen_name: "TermScreen",
		},
		{
			headertext: "katulo",
			title: "Links",
			description:
				"Dira nakabutang kung asa gikan ang mga materyales na gigamit ug ang mga tagiya ni ini",
			id: 3,
			screen_name: "LinkScreen",
		},
	]);

	return (
		<SafeAreaView>
			<FlatList
				keyExtractor={(item) => item.id}
				data={list}
				contentContainerStyle={{
					padding: SPACING / 2,
					paddingTop: StatusBar.currentHeight || 42,
				}}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate(item.screen_name, { id: item.id });
							}}
							style={{
								flexDirection: "row",
								padding: SPACING,
								marginBottom: SPACING,
								backgroundColor: "rgba(255, 255, 255, 0.8)",
								borderRadius: 26,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 10,
								},
								shadowOpacity: 0.3,
								shadowRadius: 20,
							}}
						>
							<Image
								source={item.image}
								style={{
									width: 90,
									height: 90,
									marginRight: SPACING / 2,
								}}
							/>
							<View
								style={{
									flex: 1,
									flexDirection: "column",
									height: 100,
								}}
							>
								<Text
									style={{
										fontSize: 17,
										fontWeight: "700",
										color: "black",
									}}
								>
									{item.title}
								</Text>

								<Text style={{ fontSize: 16, opacity: 0.6 }}>
									{item.description}
								</Text>
								<Text
									style={{
										fontSize: 14,
										opacity: 0.5,
										color: "#0099cc",
										paddingLeft: 20,
									}}
								>
									{item.credits}
								</Text>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
			<View style={[styles.container]}>
				<TouchableWithoutFeedback>
					<Animated.View style={[styles.button, styles.secondary, pinStyle]}>
						<Entypo
							name="warning"
							size={20}
							color="#F02A4B"
							onPress={() => {
								setShowState(true);
							}}
						/>

						<Modal transparent={true} visible={showState} animationType="slide">
							<SafeAreaView>
								<ScrollView>
									<View style={styles.modalContainer}>
										<View style={styles.modalView}>
											<Text style={styles.modalTitle}>Disclaimer</Text>
											<Text>{text}</Text>
											<View style={styles.checkboxContainer}>
												<Checkbox
													style={styles.checkbox}
													disabled={false}
													value={toggleCheckBox}
													onValueChange={(newValue) =>
														setToggleCheckBox(newValue)
													}
												/>
												<Text>I understand.</Text>
											</View>
											<TouchableOpacity
												style={[
													styles.continueButton,
													{
														backgroundColor: toggleCheckBox
															? "dodgerblue"
															: "grey",
													},
												]}
												disabled={!toggleCheckBox}
												onPress={() => setShowState(false)}
											>
												<Text>Close</Text>
											</TouchableOpacity>
										</View>
									</View>
								</ScrollView>
							</SafeAreaView>
						</Modal>
					</Animated.View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback>
					<Animated.View style={[styles.button, styles.secondary, handStyle]}>
						<FontAwesome5
							name="handshake"
							size={20}
							color="#F02A4B"
							onPress={() => {
								setShowModal(true);
							}}
						/>

						<Modal transparent={true} visible={showModal} animationType="slide">
							<SafeAreaView>
								<ScrollView>
									<View style={styles.modalContainer}>
										<View style={styles.modalView}>
											<Text style={styles.modalTitle}>Acknowledgement</Text>

											<Text>{text1}</Text>
											<TouchableOpacity
												style={[styles.continueButton2nd]}
												onPress={() => setShowModal(false)}
											>
												<Text>Continue</Text>
											</TouchableOpacity>
										</View>
									</View>
								</ScrollView>
							</SafeAreaView>
						</Modal>
					</Animated.View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={toggleMenu}>
					<Animated.View style={[styles.button, styles.menu, rotation]}>
						<AntDesign name="plus" size={24} color="#FFF" />
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		position: "absolute",
	},
	title: {
		fontSize: 17,
		fontWeight: "700",
		color: "black",
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 60 / 2,
		alignItems: "center",
		justifyContent: "center",
		shadowRadius: 10,
		shadowColor: "#F02A4B",
		shadowOpacity: 0.3,
		shadowOffset: { height: 10 },
		left: 280,
		top: 500,
	},
	menu: {
		backgroundColor: "#F02A4B",
	},
	secondary: {
		width: 48,
		height: 48,
		borderRadius: 48 / 2,
		backgroundColor: "#FFF",
		left: 285,
		top: 545,
	},
	third: {
		width: 48,
		height: 48,
		borderRadius: 48 / 2,
		backgroundColor: "#FFF",
		left: 285,
		bottom: 250,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0, .6)",
	},
	modalView: {
		flex: 1,
		backgroundColor: "white",
		borderRadius: 20,
		margin: 20,
		padding: 20,
		alignItems: "center",
	},
	modalTitle: {
		marginBottom: 20,
		color: "dodgerblue",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 18,
	},
	checkboxContainer: {
		flexDirection: "row",
		marginVertical: 30,
		alignItems: "center",
	},
	checkbox: {
		width: 30,
		height: 30,
		marginRight: 20,
	},
	continueButton: {
		marginTop: 20,
		padding: 20,
		borderRadius: 18,
	},
	continueButton2nd: {
		marginTop: 20,
		padding: 20,
		borderRadius: 18,
		backgroundColor: "dodgerblue",
	},
});

export default HomeScreen;
