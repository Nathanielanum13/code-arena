import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{...style.ScrollView}}
    >
      {/* Category Cards */}
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1" />

    </ScrollView>
  )
}

const style = StyleSheet.create({
  ScrollView: {
    paddingHorizontal: 15,
    paddingTop: 15
  }
})

export default Categories