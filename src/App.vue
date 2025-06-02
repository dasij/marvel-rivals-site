<template>
  <div id="app">
    <MarvelHeader />
    <GlobalBackground />
    <MainPage />
  </div>
</template>

<script>
import MarvelHeader from '@/components/MarvelHeader.vue'
import GlobalBackground from '@/components/GlobalBackground.vue';
import MainPage from '@/components/MainPage.vue'

export default {
  name: 'App',
  components: {
    MarvelHeader,
    GlobalBackground,
    MainPage
  }
}
</script>

<style>
@font-face {
  font-family: 'RefrigeratorBold';
  src: url('assets/fonts/Refrigerator Deluxe Bold.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'RefrigeratorHeavy';
  src: url('assets/fonts/Refrigerator Deluxe Heavy.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
