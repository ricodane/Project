import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

import {
	FirstScreenNavigator,
	SecondScreenNavigator,
	ThirdScreenNavigator,
} from "./screens/CustomNavigation";

const dark = "#ff4c98";
const light = "#f8c907";

const App = () => {
	return (
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
	);
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <MyTabBar {...props} />}
		>
			<Tab.Screen name="Home" component={FirstScreenNavigator} />
			<Tab.Screen name="Camera" component={SecondScreenNavigator} />
			<Tab.Screen name="Gallery" component={ThirdScreenNavigator} />
		</Tab.Navigator>
	);
};

const MyTabBar = ({ state, descriptors, navigation }) => {
	return (
		<View
			style={{
				height: 60,
				backgroundColor: "white",
				alignItems: "center",
				flexDirection: "row",
				justifyContent: "space-around",
			}}
		>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index;
				const { options } = descriptors[route.key];

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
					});
					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const color = isFocused ? light : "#aaa";
				return (
					<TouchableOpacity
						key={index}
						onPress={() => onPress()}
						testID={options.tabBarTestID}
						accessibilityRole="button"
					>
						{index === 0 && (
							<View style={styles.icon}>
								{isFocused ? (
									<MaterialCommunityIcons name="home" size={24} color={color} />
								) : (
									<MaterialCommunityIcons
										name="home-outline"
										size={24}
										color={color}
									/>
								)}
							</View>
						)}
						{index === 1 && (
							<LinearGradient
								colors={[light, dark]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={styles.middleIcon}
							>
								{isFocused ? (
									<MaterialCommunityIcons
										name="camera"
										size={24}
										color={"white"}
									/>
								) : (
									<MaterialCommunityIcons
										name="camera"
										size={24}
										color={"white"}
									/>
								)}
							</LinearGradient>
						)}
						{index === 2 && (
							<View style={styles.icon}>
								{isFocused ? (
									<MaterialCommunityIcons
										name="image"
										size={24}
										color={color}
									/>
								) : (
									<MaterialCommunityIcons
										name="image"
										size={24}
										color={color}
									/>
								)}
							</View>
						)}
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	middleIcon: {
		bottom: 18,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "black",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.6,
		elevation: 8,
	},
});

export default App;
