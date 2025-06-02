<template>
    <div class="hero-list">
        <h1>Selecione seu Herói</h1>
        <div class="hero-grid">
            <router-link v-for="hero in heroes" :key="hero.id" :to="`/heroes/${hero.id}`" class="hero-card">
                <img :src="require(`@/assets/images/heroes/${hero.icon}`)" :alt="hero.name" class="hero-icon">
                <h3>{{ hero.name }}</h3>
            </router-link>
        </div>
    </div>
</template>

<script>
import heroes from '@/assets/heroes/heroes.json'

export default {
    name: 'HeroList',
    data() {
        return {
            heroes: heroes
        }
    }
}
</script>

<style scoped>
.hero-list {
    padding: 100px 20px 50px;
    max-width: 1200px;
    margin: 0 auto;
}

.hero-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.hero-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: white;
    background: #151515;
    border-radius: 10px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(230, 36, 41, 0.3);
}

.hero-icon {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 15px;
    border: 3px solid #e62429;
}
</style>