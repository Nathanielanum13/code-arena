import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import sanityClient from "../sanity";
import ResturantCard from "./ResturantCard";

function FeatureRow({ id, title, description }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured" && _id == $id] {
        ...,
        restaurants[] -> {
          ...,
          dishes[] ->,
          type-> {
            name
          }
        }
      }[0]
    `, { id }).then(data => {
        setRestaurants(data)
    })
  }, [])

  return (
    <View className="mt-4">
      <View className="flex-row justify-between items-center px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" size={20} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      {/* Resturant Cards Goes Here */}

      <ScrollView
        horizontal
        contentContainerStyle={{ ...style.ResturantCard }}
        showsHorizontalScrollIndicator={false}
        className="mt-4"
      >
        {/* Resturant Card */}
        {restaurants?.map(restaurant => 
            <ResturantCard
                key={restaurant._id}
                id={restaurant._id}
                imgUrl={restaurant.image}
                title={restaurant.name}
                rating={restaurant.rating}
                genre={restaurant?.type?.name}
                address={restaurant.address}
                short_description={restaurant.short_description}
                dishes={restaurant.dishes}
                long={restaurant.long}
                lat={restaurant.lat}
            />
        )}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  ResturantCard: {
    paddingHorizontal: 15,
  },
});

export default FeatureRow;
