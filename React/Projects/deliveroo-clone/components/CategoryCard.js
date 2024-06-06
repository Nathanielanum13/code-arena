import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'

function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="relative mr-2">
        <Image 
            source={{
                uri: imgUrl
            }}
            className="w-20 h-20 rounded"
        />
        <Text className="absolute left-1 bottom-1 font-bold text-white">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard