import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Screens = ({ route }) => {
	return (
		<View>
			<Text style={styles.myText}>{route.params.msg}</Text>
			<Text>Screen here</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	myText: {
		color: "black",
		fontSize: 25,
	},
});

export default Screens;
