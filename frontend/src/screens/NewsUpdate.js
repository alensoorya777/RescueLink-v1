import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const NewsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [newsData, setNewsData] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Use useState to persist animation

  // Function to fetch disaster news
  const fetchDisasterNews = async () => {
    try {
      setRefreshing(true);
      console.log('in fetch Disaster')
      const response = await axios.get("http://10.0.2.2:8000/get-disaster-news", {
        params: { lat: 8.4697, lng: 76.9818 }, // Pass latitude & longitude as query params
      });

    //   console.log("✅ Full API Response:", response.data); // Check the full API response

      if (response.data.status === "success") {
        setNewsData(response.data); // Update state with API response
        setLastUpdated(new Date()); // Update last refresh time
      } else {
        console.error("❌ Error:", response.data.message);
      }
    } catch (error) {
      console.error("⚠️ API Error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchDisasterNews();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", marginTop: 40 }}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#1eaad1", "#1e80d1"]}
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
            Disaster News
          </Text>
          <Text style={{ color: "#f5f5f5", fontSize: 12 }}>
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        </View>
        <TouchableOpacity onPress={fetchDisasterNews}>
          {refreshing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Ionicons name="refresh" size={26} color="white" />
          )}
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={{ marginTop: 20, paddingHorizontal: 15 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchDisasterNews} />
        }
      >
        {/* Show Loading Indicator while fetching news */}
        {!newsData || !newsData.news ? (
          <ActivityIndicator size="large" color="#1e80d1" style={{ marginTop: 20 }} />
        ) : (
          [
            {
              title: `📍 State News - ${newsData.state}`,
              content: newsData.news.state || "No news available.",
              color: "#1eaad1",
            },
            {
              title: `🌍 Country News - ${newsData.country}`,
              content: newsData.news.country || "No news available.",
              color: "red",
            },
          ].map((item, index) => (
            <Animated.View
              key={index}
              style={{
                backgroundColor: "white",
                marginBottom: 15,
                padding: 20,
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                opacity: fadeAnim,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: item.color }}>
                {item.title}
              </Text>
              <Text style={{ marginTop: 8, color: "#333", fontSize: 16, lineHeight: 24 }}>
                {item.content}
              </Text>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default NewsScreen;
