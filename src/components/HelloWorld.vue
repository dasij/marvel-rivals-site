<template>
  <div class="min-h-screen flex flex-col justify-center items-center text-center p-8"
    style="background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('@/assets/marvel-bg.jpg') center/cover;">
    <h1 class="text-6xl font-bold uppercase mb-8 text-white drop-shadow-lg">Marvel Rivals Hub</h1>
    <div class="flex gap-4">
      <router-link to="/characters"
        class="bg-marvel-red hover:bg-red-800 text-white font-bold py-3 px-6 rounded transition">
        Personagens
      </router-link>
      <router-link to="/maps"
        class="bg-transparent hover:bg-white/20 border-2 border-white text-white font-bold py-3 px-6 rounded transition">
        Mapas
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
