import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import color from "../config/color";

const OrderBox = ({ userimg, name, fuel, litre, distance, location }) => {
  return (
    <View style={styles.MainBox}>
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          paddingBottom: 0,
          alignItems: "center",
        }}
      >
        <View style={styles.proName}>
          <Image source={userimg} style={styles.userImgSty} />
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <Text style={styles.allText}>
          <View style={styles.sideText}>
            <Text>FUEL:{fuel}</Text>
            <Text>LITRE:{litre}L</Text>
            <Text>LOCATION:{location}</Text>
            <Text>DISTANCE:{distance}KM</Text>
          </View>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainBox: {
    // flex:1,
    margin: 3,
    backgroundColor: color.secondary,
    height: 140,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },

  userImgSty: {
    borderRadius: 100,
    height: 90,
    width: 90,
    bottom: 1,
  },
  proName: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 30,
      
  },
  sideText: {
    flexDirection: "column",
    marginTop: 10,
  },
  allText: {
    color: color.primary,
    fontSize: 17,
    fontWeight: "bold",
  },
  accreText: {
    color: color.secondary,
    fontSize: 17,
    fontWeight: "bold",
  },

  nameText: {
    color: color.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    backgroundColor: color.primary,
    width: "25%",
    alignItems: "center",
    padding: 1.5,
    borderRadius: 5,
    margin: 8,
    color: color.secondary,
  },
});

export default OrderBox;
