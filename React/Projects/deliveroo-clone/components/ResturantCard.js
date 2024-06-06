import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

function ResturantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {
  return (
    <TouchableOpacity className="bg-white mr-3 shadow rounded-md">
      <Image
        source={{
          uri: urlFor(imgUrl).url()
        }}
        className="w-64 h-36 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold pt-2 text-lg pb-0.5">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={20} />
          <Text className="text-xs text-gray-500 font-bold">
            <Text className="text-green-500">{rating}</Text> • {genre}
          </Text>
        </View>
        <View className="flex-row space-x-1 items-center">
          <LocationMarkerIcon color="gray" opacity={0.4} size={20} />
          <Text className="text-xs text-gray-500">Nearby • {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ResturantCard;
