<template>
  <div class="container">
    <h1>Baby Name Generator</h1>
    <p>Choose your options and click the "Find Names" button below</p>
    <div class="options-container">
      <Option v-for="optionArray in optionsArray" :key="optionArray.title" :option="optionArray" :optionState="options" />
      <button class="primary" @click="computeSelectedNames">Find Names</button>
    </div>
    <Cards :selected-names="selectedNames" @remove="removeName" />
  </div>
</template>

<script setup lang="ts">

  import { Gender, Popularity, Length, names } from '@/data'

  interface OptionsState {
    gender: Gender;
    popularity: Popularity;
    length: Length 
  }
  
  const options = reactive<OptionsState>({
    gender: Gender.GIRL,
    popularity: Popularity.TRENDY,
    length: Length.ALL
  })

  const selectedNames = ref<string[]>([])

  const computeSelectedNames = () => {
    const filterNames = 
      names
        .filter(name => name.gender === options.gender)
        .filter(name => name.popularuty === options.popularity)
        .filter(name => {
          if(options.length === Length.ALL) return true
          else return name.length === options.length
        })
    selectedNames.value = filterNames.map(name => name.name)
  }

  const optionsArray = [
    {
      title: '1) Choose a gender',
      category: 'gender',
      buttons: [Gender.BOY, Gender.GIRL, Gender.UNISEX]
    },
    {
      title: '2) Choose the name\'s popularity',
      category: 'popularity',
      buttons: [Popularity.TRENDY, Popularity.UNIQUE]
    },
    {
      title: '3) Choose name\'s length',
      category: 'length',
      buttons: [Length.SHORT, Length.ALL, Length.LONG]
    }
  ]

  const removeName = (key :number) => {
    selectedNames.value = selectedNames.value.filter((name, index) => index !== key)
  }

</script>

<style scoped>
.container {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: rgb(27, 60, 138);
  max-width: 50rem;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 3rem;
}

.options-container {
  background-color: rgb(255, 238, 236);
  border-radius: 2rem;
  padding: 1rem;
  /* padding-bottom: 2rem; */
  width: 95%;
  margin: 0 auto;
  margin-top: 4rem;
  position: relative;
}
.primary {
  background-color: rgb(249, 87, 89);
  color: white;
  border-radius: 6.5rem;
  border: none;
  padding: .75rem 4rem;
  font-size: 1rem;
  margin-block: 2rem;
  cursor: pointer;
}
</style>
