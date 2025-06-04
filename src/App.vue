<template>
  <div id="app">
    <MarvelHeader />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import MarvelHeader from '@/components/MarvelHeader.vue'

export default {
  name: 'App',
  components: {
    MarvelHeader
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

html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: transparent !important;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content-wrapper {
  padding-top: 100px;
  /* Espaço reservado para o header */
}
</style>