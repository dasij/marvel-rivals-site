<template>
    <div class="page-content">
        <GlobalBackground />

        <div class="hero-list">
            <!-- Banner de heróis como título/separador -->
            <div class="heroes-banner">
                <img src="@/assets/images/heroes/hero_select.png" alt="Heróis" class="banner-image">
            </div>

            <div class="hero-grid">
                <router-link v-for="hero in heroes" :key="hero.id" :to="`/heroes/${hero.id}`" class="hero-card">
                    <div class="thumb-container">
                        <img :src="getHeroThumb(hero.folder)" :alt="hero.name" class="hero-thumb" />
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import heroes from '@/assets/heroes.json'
import GlobalBackground from '@/components/GlobalBackground.vue';

export default {
    components: {
        GlobalBackground
    },
    name: 'HeroList',
    data() {
        return {
            heroes: heroes
        }
    },
    methods: {
        getHeroThumb(folder) {
            try {
                return require(`@/assets/images/heroes/${folder}/thumb.png`);
            } catch {
                return require('@/assets/images/placeholder.png');
            }
        }
    }
}
</script>

<style scoped>
.page-content,
.hero-list,
.hero-grid {
    background-color: transparent !important;
}

.hero-list {
    padding: 20px;
    position: relative;
    z-index: 2;
    text-align: center;
}

.heroes-banner {
    margin: 30px 0 40px 0;
    /* Margem superior de 30px e inferior de 40px */
    text-align: center;
}

.banner-image {
    max-width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: contain;
    /* Removidas todas as propriedades de transição e hover */
}

/* Restante do CSS permanece igual */
h1 {
    font-family: 'RefrigeratorBold', sans-serif;
    color: #FFFFFF;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
    font-size: 3rem;
    margin-bottom: 40px;
    letter-spacing: 1px;
    margin-top: 0;
}

.hero-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(181px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
}

.hero-card {
    background: transparent !important;
    border-radius: 4px;
    text-decoration: none;
    display: block;
    transition: all 0.3s ease;
    transform-origin: center bottom;
}

.hero-card:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.8));
}

.thumb-container {
    position: relative;
    display: inline-block;
    overflow: visible;
    border-radius: 4px;
    border: 2px solid transparent;
    transition: border-color 0.3s ease;
}

.hero-thumb {
    width: 181px;
    height: 329px;
    object-fit: contain;
    display: block;
    transition: transform 0.4s ease;
    filter: drop-shadow(0 0 0 transparent);
}

.hero-card:hover .hero-thumb {
    transform: scale(1.00);
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.9));
}

.hero-card:hover .thumb-container {
    border-color: transparent;
    box-shadow: none;
}
</style>