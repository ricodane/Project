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
} from "react-native";
import { Image } from "react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";

const SPACING = 20;

const HomeScreen = ({ navigation }) => {
	const animation = useRef(new Animated.Value(0)).current;
	const [showState, setShowState] = useState(false);
	const [showModal, setShowModal] = useState(false);

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
							<View style={{ backgroundColor: "#000000aa", flex: 1 }}>
								<View
									style={{
										backgroundColor: "#ffffff",
										margin: 50,
										padding: 40,
										borderRadius: 10,
										flex: 1,
									}}
								>
									<Text style={{ fontSize: 35 }}>Disclaimer!</Text>
									<Button
										title="close"
										onPress={() => {
											setShowState(false);
										}}
									/>
								</View>
							</View>
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
							<View style={{ backgroundColor: "#000000aa", flex: 1 }}>
								<View
									style={{
										backgroundColor: "#ffffff",
										margin: 50,
										padding: 40,
										borderRadius: 10,
										flex: 1,
									}}
								>
									<Text style={{ fontSize: 35 }}>Acknowledgement!</Text>
									<Button
										title="close"
										onPress={() => {
											setShowModal(false);
										}}
									/>
								</View>
							</View>
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
});

export default HomeScreen;
