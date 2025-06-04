<template>
  <div class="home-page">
    <div class="overlay"></div>
    <!-- Conteúdo central -->
    <div class="content">
      <h1 class="title">{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
      <button class="cta-button"><router-link to="/heroes" class="cta-link">Get Started</router-link></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('Unofficial Rivals notes');
const subtitle = ref('This is a unofficial patch notes with changes suggestions to the game Marvel Rivals made by a Vanguard player who is currently developing a game and want to share his thoughts');
</script>

<style scoped>
.home-page {
  background-image: url('@/assets/images/generic/background_main.jpeg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.home-page {
  position: relative;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 40px;
  animation: fadeInUp 1s ease-out;
  background: rgba(43, 51, 64, 255);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  margin-top: -100px;
}

.title {
  font-size: 4.5rem;
  text-transform: uppercase;
  letter-spacing: 8px;
  margin-bottom: 25px;
  font-weight: 700;
  line-height: 1.1;
  color: #fff;
  font-family: 'RefrigeratorBold', 'RefrigeratorHeavy', 'Roboto Condensed', sans-serif;
}

.subtitle {
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: #ddd;
}

.cta-button {
  display: inline-block;
  background: #e62429;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 15px 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(230, 36, 41, 0.4);
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}

.cta-link {
  text-decoration: none;
  color: white;
}

.cta-link:visited {
  text-decoration: none;
  color: white;
}

.cta-button:hover {
  background: #ff3d43;
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(230, 36, 41, 0.6);
}

.cta-button:after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.cta-button:hover:after {
  left: 100%;
}

/* Animações */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .title {
    font-size: 3.5rem;
    letter-spacing: 6px;
  }

  .subtitle {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.8rem;
    letter-spacing: 4px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 12px 30px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2.2rem;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>