import React from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	KeyboardAvoidingView,
	Pressable,
} from "react-native";

import { Card } from "react-native-paper";

const AlphabetScreen = ({ route }) => {
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View>
				<Card
					flipDirection={"h"}
					style={styles.cardContainer}
					onFlipStart={() => console.log("onFlipStart")}
					onFlipEnd={() => console.log("onFlipEnd")}
				/>
				<Pressable style={styles.card} onPress={() => alert("onPress")}>
					<Text style={styles.label}>BACK</Text>
				</Pressable>
				<View style={[styles.back, styles.hidden]}>
					<Card />
				</View>
				<View style={styles.manualTriggers}>
					<Pressable style={styles.trigger}>
						<Text style={{ color: "white" }}>Flip</Text>
					</Pressable>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	hidden: {
		backfaceVisibility: "hidden",
	},
	back: {
		position: "absolute",
		top: 0,
	},
	cardContainer: {
		width: 220,
		height: 270,
	},
	manualTriggers: {
		flexDirection: "row",
	},
	trigger: {
		backgroundColor: "black",
		margin: 20,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		shadowColor: "rgba(0,0,0,0.5)",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.5,
	},
	label: {
		textAlign: "center",
		fontSize: 25,
		fontFamily: "System",
		color: "#ffffff",
		backgroundColor: "transparent",
	},
	card: {
		width: 220,
		height: 270,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FE474C",
		borderRadius: 5,
		shadowColor: "rgba(0,0,0,0.5)",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.5,
	},
});

export default AlphabetScreen;
