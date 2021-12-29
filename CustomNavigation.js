import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import GalleryScreen from "./GalleryScreen";
import CameraScreen from "./CameraScreen";
import AlphabetScreen from "./AlphabetScreen";
import TermScreen from "./TermScreen";
import CreditScreen from "./CreditScreen";

const Stack = createStackNavigator();

const FirstScreenNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Homescreen" component={HomeScreen} />
			<Stack.Screen name="AlphabetScreen" component={AlphabetScreen} />
			<Stack.Screen name="TermScreen" component={TermScreen} />
			<Stack.Screen name="CreditScreen" component={CreditScreen} />
		</Stack.Navigator>
	);
};

export { FirstScreenNavigator };

const SecondScreenNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Camerascreen" component={CameraScreen} />
		</Stack.Navigator>
	);
};

export { SecondScreenNavigator };

const ThirdScreenNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Galleryscreen" component={GalleryScreen} />
		</Stack.Navigator>
	);
};

export { ThirdScreenNavigator };
