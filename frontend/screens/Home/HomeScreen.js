import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  Platform,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import Profile from "./Profile";
import OrderPage from "./OrderPage";

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      sceneContainerStyle={Platform.OS === "android" ? { paddingTop: 50 } : {}}
      screenOptions={options}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderPage}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#eee", height: 90 },
        }}
      />
    </Tab.Navigator>
  );
};

const options = ({ route }) => ({
  tabBarActiveBackgroundColor: "#333",

  tabBarActiveTintColor: "#fff",

  tabBarIcon: ({ focused, size }) => {
    let iconName, color;
    color = focused ? "#fff" : "#333";
    //setting the icon based on render state
    switch (route.name) {
      case "Home":
        iconName = focused ? "home" : "home-outline";

        return <Ionicons name={iconName} size={size} color={color} />;

      case "Orders":
        iconName = focused ? "md-cart" : "md-cart-outline";
        return <Ionicons name={iconName} size={size} color={color} />;

      case "Profile":
        iconName = focused ? "user-circle" : "user-circle-o";
        return <FontAwesome name={iconName} size={size} color={color} />;

      default:
        iconName = focused ? "home" : "home-outline";
        return <Ionicons name={iconName} size={size} color="red" />;
    }
  },
});

export default HomeScreen;
