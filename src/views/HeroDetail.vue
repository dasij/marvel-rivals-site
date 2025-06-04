<template>
    <div class="hero-detail-page">
        <div class="hero-background" :style="heroBackgroundStyle"></div>

        <div class="hero-content-container">
            <div v-if="hero" class="hero-content">
                <h1 class="hero-title">{{ hero.name }}</h1>

                <!-- Abas de navegação -->
                <div class="tabs-container">
                    <button class="tab-button" :class="{ 'active': activeTab === 'changes' }"
                        @click="activeTab = 'changes'">
                        Changes
                    </button>
                    <button class="tab-button" :class="{ 'active': activeTab === 'teamups' }"
                        @click="activeTab = 'teamups'">
                        Teamups
                    </button>
                </div>

                <!-- Componente de habilidades (mostrado apenas na aba changes) -->
                <HeroAbilitiesContainer v-if="activeTab === 'changes'" :hero="hero" :heroStats="heroStats"
                    :allAbilities="allAbilities" :lastUpdated="lastUpdated" :selectedAbilityProp="selectedAbility"
                    @ability-selected="selectedAbility = $event" @stats-selected="selectedAbility = $event" />

                <!-- Componente de teamups (mostrado apenas na aba teamups) -->
                <HeroTeamups v-if="activeTab === 'teamups' && hero" :hero="hero" />

                <router-link to="/heroes" class="back-button">Back to list</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import HeroAbilitiesContainer from '@/components/HeroAbilitiesContainer.vue'
import HeroTeamups from '@/components/HeroTeamups.vue'
import heroes from '@/assets/heroes.json'

export default {
    name: 'HeroDetail',
    components: {
        HeroAbilitiesContainer,
        HeroTeamups
    },
    props: ['id'],
    data() {
        return {
            allAbilities: [],
            selectedAbility: null,
            activeTab: 'changes', // 'changes' ou 'teamups'
            heroStats: {
                name: "",
                details: [],
                changes: [],
                icon: ""
            },
            lastUpdated: ""
        }
    },
    computed: {
        hero() {
            return heroes.find(h => h.id === parseInt(this.id))
        },
        heroBackgroundStyle() {
            if (!this.hero) return {}
            return {
                backgroundImage: `url(${require(`@/assets/images/heroes/${this.hero.folder}/character_background.png`)})`
            }
        }
    },
    methods: {
        getHeroImage(folder) {
            try {
                return require(`@/assets/images/heroes/${folder}/main.png`)
            } catch {
                return require('@/assets/images/placeholder.png')
            }
        },
        async loadAbilities() {
            if (!this.hero) return

            try {
                const abilitiesData = await import(`@/assets/data/heroes/${this.hero.folder}/${this.hero.folder}_habilidades.json`)
                const data = abilitiesData.default || abilitiesData

                this.heroStats = data.heroStats || {
                    name: `${this.hero.name} Stats`,
                    details: [],
                    changes: [],
                    icon: "main.png"
                }

                this.allAbilities = data.abilities || []
                this.lastUpdated = data.lastUpdated || "Unknown date"

                if (this.heroStats) {
                    this.selectedAbility = this.heroStats
                }
            } catch (error) {
                console.error('Error loading abilities:', error)
                this.allAbilities = []
            }
        }
    },
    created() {
        this.loadAbilities()
    }
}
</script>

<style scoped>
.tabs-container {
    display: flex;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
}

.tab-button {
    padding: 0.8rem 1.5rem;
    background: transparent;
    color: #FFD700;
    border: none;
    border-bottom: 3px solid transparent;
    font-family: 'RefrigeratorBold', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 0.5rem;
}

.tab-button:hover {
    background: rgba(255, 215, 0, 0.1);
}

.tab-button.active {
    border-bottom: 3px solid #FFD700;
    background: rgba(255, 215, 0, 0.1);
}

/* Manter apenas os estilos específicos da página */
.hero-detail-page {
    position: relative;
    min-height: 100vh;
    padding: 2rem;
    color: white;
}

.hero-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -2;
    filter: brightness(0.4);
}

.hero-content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
    border: 1px solid rgba(255, 215, 0, 0.5);
}

.hero-title {
    font-size: 2.5rem;
    color: #FFD700;
    text-align: center;
    margin-bottom: 2rem;
    font-family: 'RefrigeratorBold', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.back-button {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background: rgba(255, 215, 0, 0.2);
    color: #FFD700;
    border: 1px solid #FFD700;
    border-radius: 4px;
    text-decoration: none;
    font-family: 'RefrigeratorBold', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

.back-button:hover {
    background: rgba(255, 215, 0, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
}
</style>