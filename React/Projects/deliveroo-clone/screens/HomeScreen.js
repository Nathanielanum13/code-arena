import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon, SearchIcon, AdjustmentsIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeatureRow from '../components/FeatureRow';
import sanityClient from '../sanity';

export default function HomeScreen() {

    const navigation = useNavigation()
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[] -> {
              ...,
              dishes[] -> 
            }
          }
        `).then(data => {
            setFeaturedCategories(data)
        })
    }, [])

  return (
    <SafeAreaView style={style.AndroidSafeArea} className="">
      {/* Header Goes Here */}
      <View className="flex-row pb-3 items-center mx-4 space-x-3">
        <Image
            source={{
                uri: "https://links.papareact.com/wru"
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs -mb-1">Deliver now!</Text>
            <Text className="font-bold text-xl">
                Current Location
                <ChevronDownIcon size={15} color="#00CCBB" /> 
            </Text>
        </View>
        <View className="w-9 h-9 bg-gray-200 rounded-full flex justify-center items-center">
            <UserIcon size={20} color="#00CCBB" />
        </View>
      </View>

      {/* Search Section */}
      <View className="flex-row items-center space-x-2 mx-4 pb-4">
        <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-2 rounded-md">
            <SearchIcon color="gray" size={20}/>
            <TextInput 
                placeholder='Resturants and Cousines'
                keyboardType='default'
            />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* Body Section */}
      <ScrollView className="bg-gray-100">
        {/* Categories Component */}
        <Categories />

        {/* Featured Row Component */}
        {featuredCategories?.map(featureCategory => 
            <FeatureRow
                key={featureCategory._id}
                id={featureCategory._id}
                title={featureCategory.name}
                description={featureCategory.short_description}
            />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    CheckoutBox: {
        border: "1px solid red"
    }
})