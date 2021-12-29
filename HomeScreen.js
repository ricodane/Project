import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";

import {
	View,
	Text,
	FlatList,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	TouchableOpacity,
	Button,
} from "react-native";
import { Image } from "react-native";
import CreditScreen from "./CreditScreen";

const SPACING = 20;

const HomeScreen = ({ navigation }) => {
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
			headertext: "ikatulo",
			title: "Click here first!",
			description: "Tingnan muna ito",
			id: 3,
			screen_name: "CreditScreen",
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
								console.log(item);
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
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 17,
		fontWeight: "700",
		color: "black",
	},
});

export default HomeScreen;
