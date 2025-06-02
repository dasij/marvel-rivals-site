<template>
    <div class="hero-detail">
        <div v-if="hero" class="hero-content">
            <h1>{{ hero.name }}</h1>
            <img :src="require(`@/assets/images/heroes/${hero.icon}`)" :alt="hero.name" class="hero-image">
            <!-- Adicione mais informações conforme necessário -->
        </div>
        <div v-else class="loading">
            Herói não encontrado
        </div>
        <router-link to="/heroes" class="back-button">Voltar para lista</router-link>
    </div>
</template>

<script>
import heroes from '@/assets/heroes.json'

export default {
    name: 'HeroDetail',
    props: ['id'],
    computed: {
        hero() {
            return heroes.find(h => h.id === parseInt(this.id))
        }
    }
}
</script>

<style scoped>
.hero-detail {
    padding: 100px 20px 50px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.hero-content {
    background: #151515;
    padding: 40px;
    border-radius: 15px;
}

.hero-image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    margin: 30px 0;
    border: 5px solid #e62429;
}

.back-button {
    display: inline-block;
    margin-top: 30px;
    padding: 10px 25px;
    background: #e62429;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s ease;
}

.back-button:hover {
    background: #c11a1f;
}
</style>