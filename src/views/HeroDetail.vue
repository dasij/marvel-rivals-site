<template>
    <div class="hero-detail-page">
        <!-- Plano de fundo principal -->
        <div class="hero-background" :style="heroBackgroundStyle"></div>

        <div class="hero-content-container">
            <div v-if="hero" class="hero-content">
                <h1 class="hero-title">{{ hero.name }}</h1>

                <div class="hero-abilities-container">
                    <!-- Container da esquerda - Lista de habilidades -->
                    <div class="abilities-list-container">
                        <!-- Mostrar data de atualização -->
                        <div class="last-updated">
                            Details last updated in {{ lastUpdated }}
                        </div>

                        <!-- Categoria: Stats do Herói -->
                        <div class="ability-category">
                            <h3 class="category-title">{{ hero.name.toUpperCase() }} STATS</h3>
                            <ul class="abilities-list">
                                <li @click="selectHeroStats"
                                    :class="{ active: selectedAbility?.name === heroStats.name }">
                                    <div class="ability-line">
                                        <div class="ability-key">★</div>
                                        <div class="ability-icon">
                                            <img :src="getAbilityIcon(heroStats.icon)" :alt="heroStats.name">
                                        </div>
                                        <div class="ability-name">{{ heroStats.name }}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!-- Categoria: Ataque Básico -->
                        <div v-if="primaryAbilities.length > 0" class="ability-category">
                            <h3 class="category-title">PRIMARY ATTACK</h3>
                            <ul class="abilities-list">
                                <li v-for="(ability, index) in primaryAbilities" :key="'primary-' + index"
                                    @click="selectAbility(ability)"
                                    :class="{ active: selectedAbility?.name === ability.name }">
                                    <div class="ability-line">
                                        <div class="ability-key">{{ ability.key }}</div>
                                        <div class="ability-icon">
                                            <img :src="getAbilityIcon(ability.icon)" :alt="ability.name">
                                        </div>
                                        <div class="ability-name">{{ ability.name }}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!-- Categoria: Habilidades -->
                        <div v-if="abilities.length > 0" class="ability-category">
                            <h3 class="category-title">ABILITIES</h3>
                            <ul class="abilities-list">
                                <li v-for="(ability, index) in abilities" :key="'ability-' + index"
                                    @click="selectAbility(ability)"
                                    :class="{ active: selectedAbility?.name === ability.name }">
                                    <div class="ability-line">
                                        <div class="ability-key">{{ ability.key }}</div>
                                        <div class="ability-icon">
                                            <img :src="getAbilityIcon(ability.icon)" :alt="ability.name">
                                        </div>
                                        <div class="ability-name">{{ ability.name }}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Container da direita - Detalhes da habilidade -->
                    <div class="ability-details-container">
                        <div v-if="selectedAbility" class="ability-detail-content">
                            <div class="tabs">
                                <!-- Ordem invertida: Changes primeiro -->
                                <button @click="activeTab = 'changes'" :class="{ active: activeTab === 'changes' }">
                                    CHANGES
                                </button>
                                <button @click="activeTab = 'details'" :class="{ active: activeTab === 'details' }">
                                    DETAILS
                                </button>
                            </div>

                            <div class="tab-content">
                                <div v-if="activeTab === 'details'" class="details-tab">
                                    <div class="ability-header">
                                        <div v-if="selectedAbility.key" class="detail-key">{{ selectedAbility.key }}
                                        </div>
                                        <div class="detail-icon">
                                            <img :src="getAbilityIcon(selectedAbility.icon)"
                                                :alt="selectedAbility.name">
                                        </div>
                                        <h2 class="detail-name">{{ selectedAbility.name }}</h2>
                                    </div>
                                    <ul class="details-list">
                                        <li v-for="(detail, index) in selectedAbility.details" :key="index">
                                            {{ detail }}
                                        </li>
                                    </ul>
                                </div>

                                <div v-if="activeTab === 'changes' && selectedAbility.changes" class="changes-tab">
                                    <div class="ability-header">
                                        <div v-if="selectedAbility.key" class="detail-key">{{ selectedAbility.key }}
                                        </div>
                                        <div class="detail-icon">
                                            <img :src="getAbilityIcon(selectedAbility.icon)"
                                                :alt="selectedAbility.name">
                                        </div>
                                        <h2 class="detail-name">{{ selectedAbility.name }}</h2>
                                    </div>

                                    <div v-if="selectedAbility.changes && selectedAbility.changes.length > 0">
                                        <div v-for="(change, index) in selectedAbility.changes" :key="index"
                                            class="change-item">
                                            <!-- Primeira linha: tags de impacto -->
                                            <div class="change-tags">
                                                <div v-if="change.impact" class="change-impact" :class="change.impact"
                                                    :title="getImpactTooltip(change.impact)">
                                                    {{ change.impact }}
                                                </div>
                                            </div>

                                            <!-- Segunda linha: descrição -->
                                            <div class="change-description">
                                                {{ change.description }}
                                            </div>

                                            <!-- Comentário -->
                                            <div v-if="change.comment" class="change-comment">
                                                {{ change.comment }}
                                            </div>

                                            <!-- Imagem -->
                                            <div v-if="change.image" class="change-image">
                                                <img :src="getChangeImage(change.image)"
                                                    :alt="'Change illustration ' + index">
                                            </div>
                                        </div>
                                    </div>

                                    <div v-else class="no-changes">
                                        No changes suggested yet.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="no-ability-selected">
                            Select an ability to see details
                        </div>
                    </div>
                </div>

                <router-link to="/heroes" class="back-button">Back to list</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import heroes from '@/assets/heroes.json'

export default {
    name: 'HeroDetail',
    props: ['id'],
    data() {
        return {
            allAbilities: [],
            selectedAbility: null,
            activeTab: 'changes', // Aba Changes ativa por padrão
            heroStats: {
                name: "",
                details: [],
                changes: [],
                icon: "" // Adicionado campo de ícone
            },
            lastUpdated: "" // Data de última atualização
        }
    },
    computed: {
        hero() {
            return heroes.find(h => h.id === parseInt(this.id))
        },
        primaryAbilities() {
            return this.allAbilities.filter(a => a.category === 'primary')
        },
        abilities() {
            return this.allAbilities.filter(a => a.category === 'ability' || a.category === 'secondary')
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
        getAbilityIcon(iconPath) {
            try {
                return require(`@/assets/images/heroes/${this.hero.folder}/habilidades/${iconPath}`)
            } catch {
                return require('@/assets/images/placeholder.png')
            }
        },
        selectAbility(ability) {
            this.selectedAbility = ability
            this.activeTab = 'changes' // Sempre muda para Changes
        },
        selectHeroStats() {
            this.selectedAbility = this.heroStats
            this.activeTab = 'changes' // Sempre muda para Changes
        },
        async loadAbilities() {
            if (!this.hero) return

            try {
                const abilitiesData = await import(`@/assets/data/heroes/${this.hero.folder}/${this.hero.folder}_habilidades.json`)
                const data = abilitiesData.default || abilitiesData

                // Carrega os stats do herói e as habilidades
                this.heroStats = data.heroStats || {
                    name: `${this.hero.name} Stats`,
                    details: [],
                    changes: [],
                    icon: "main.png" // Ícone padrão
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
        },
        getChangeImage(imagePath) {
            try {
                return require(`@/assets/images/heroes/${this.hero.folder}/changes/${imagePath}`)
            } catch {
                return require('@/assets/images/placeholder.png')
            }
        },
        getImpactTooltip(impact) {
            const tooltips = {
                'OP': 'This change could make the hero meta-defining in a very favorable way',
                'strong': 'This change would make the hero more present in matches but not necessarily broken',
                'balanced': 'This is a fair change for the hero',
                'weak': 'This change might not even be noticeable in some matches'
            }
            return tooltips[impact] || ''
        }
    },
    created() {
        this.loadAbilities()
    }
}
</script>

<style scoped>
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

.background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 40, 0.8) 100%);
    z-index: -1;
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

.hero-abilities-container {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.abilities-list-container {
    flex: 0 0 350px;
    background: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #FFD700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
    position: relative;
}

.last-updated {
    text-align: center;
    padding: 0.5rem;
    margin-bottom: 1rem;
    background: rgba(255, 215, 0, 0.1);
    color: #FFD700;
    font-size: 0.85rem;
    border-radius: 4px;
    font-style: italic;
}

.ability-details-container {
    flex: 1;
    background: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    border-radius: 8px;
    border: 1px solid #FFD700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
    min-height: 400px;
}

.ability-category {
    padding: 1rem 0;
}

.ability-category:not(:last-child) {
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
}

.category-title {
    color: #FFD700;
    font-family: 'RefrigeratorBold', sans-serif;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #FFD700;
}

.abilities-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.abilities-list li {
    padding: 12px;
    margin-bottom: 0.5rem;
    background: rgba(20, 20, 20, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    border-radius: 4px;
}

.abilities-list li:hover {
    background: rgba(50, 50, 50, 0.8);
    transform: translateX(5px);
}

.abilities-list li.active {
    background: rgba(70, 70, 70, 0.8);
    border-left: 3px solid #FFD700;
    transform: translateX(5px);
}

.ability-line {
    display: flex;
    align-items: center;
    gap: 12px;
}

.ability-key {
    width: 30px;
    height: 30px;
    background: #111;
    border: 1px solid #FFD700;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'RefrigeratorBold', sans-serif;
    color: #FFD700;
    font-size: 0.9rem;
}

.ability-icon {
    width: 30px;
    height: 30px;
}

.ability-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.ability-name {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
}

/* Detalhes da habilidade */
.ability-detail-content {
    height: 100%;
}

.ability-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
}

.detail-key {
    width: 40px;
    height: 40px;
    background: #111;
    border: 1px solid #FFD700;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'RefrigeratorBold', sans-serif;
    color: #FFD700;
    font-size: 1rem;
}

.detail-icon {
    width: 40px;
    height: 40px;
}

.detail-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.detail-name {
    color: #FFD700;
    font-family: 'RefrigeratorBold', sans-serif;
    margin: 0;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.details-list {
    padding-left: 1.5rem;
    list-style-type: disc;
    color: #ccc;
    font-size: 1rem;
    line-height: 1.6;
}

.details-list li {
    margin-bottom: 0.8rem;
}

.no-ability-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #888;
    font-style: italic;
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

.tabs {
    display: flex;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
}

.tabs button {
    padding: 0.5rem 1.5rem;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    color: #888;
    font-family: 'RefrigeratorBold', sans-serif;
    text-transform: uppercase;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tabs button.active {
    color: #FFD700;
    border-bottom: 3px solid #FFD700;
}

.tabs button:hover:not(.active) {
    color: #ccc;
}

.tab-content {
    padding: 0.5rem;
}

.change-item {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(20, 20, 20, 0.8);
    border-radius: 4px;
    text-align: left;
    /* Alinha todo o conteúdo à esquerda */
}

.change-tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
    /* Aumenta o espaçamento abaixo das tags */
}

/* Tags menores */
.change-impact {
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    min-width: 60px;
    text-align: center;
}

.change-impact.OP {
    background-color: #FFD700;
    color: #000;
}

.change-impact.strong {
    background-color: #FF5555;
    color: #fff;
}

.change-impact.balanced {
    background-color: #5555FF;
    color: #fff;
}

.change-impact.weak {
    background-color: #55FF55;
    color: #000;
}

.change-description {
    font-weight: 500;
    font-size: 1.05rem;
    padding: 0.8rem 0;
    /* Aumenta o padding vertical */
    margin-bottom: 0.3rem;
    line-height: 1.5;
}

.change-comment {
    padding: 0.8rem 0 0.8rem 1.2rem;
    /* Aumenta o padding */
    margin: 0.8rem 0 0.8rem 1.2rem;
    /* Aumenta a margem */
    font-size: 0.9rem;
    color: #ddd;
    text-align: left;
    position: relative;
    border-left: 2px solid rgba(255, 215, 0, 0.3);
    /* Adiciona uma borda lateral */
}

.change-comment::before {
    content: "";
    position: absolute;
    left: -0.8rem;
    top: 1.2rem;
    /* Ajusta a posição vertical */
    width: 0.5rem;
    height: 0.5rem;
    background-color: #FFD700;
    border-radius: 50%;
}

.change-image {
    margin-top: 0.5rem;
    max-width: 100%;
}

.change-image img {
    max-width: 100%;
    border: 1px solid #444;
    border-radius: 4px;
}

.no-changes {
    padding: 2rem;
    text-align: center;
    color: #888;
    font-style: italic;
}

.add-change-button {
    display: block;
    width: 100%;
    padding: 0.8rem;
    margin-top: 1rem;
    background: rgba(255, 215, 0, 0.1);
    color: #FFD700;
    border: 1px dashed #FFD700;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-change-button:hover {
    background: rgba(255, 215, 0, 0.2);
}

.change-category {
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    min-width: 80px;
    text-align: center;
}

.change-category.necessary {
    background-color: #8A2BE2;
    color: #fff;
}

.change-category.approved {
    background-color: #4682B4;
    color: #fff;
}

.change-category.Questionable {
    background-color: #DAA520;
    color: #000;
}

/* Ajuste no cabeçalho das mudanças */
.change-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.change-impact,
.change-category {
    cursor: help;
    /* Muda o cursor para indicar tooltip */
}

/* Ajuste para a categoria PENNI */
.abilities-list li .ability-icon img {
    border-radius: 50%;
}

/* Estilo para categoria Passive */
.change-category.passive {
    background-color: #888;
    color: #fff;
}

/* Melhor espaçamento para múltiplas tags */
.change-header {
    gap: 0.5rem;
    row-gap: 0.3rem;
}

/* Estilo para tooltips mais bonitos */
[title] {
    position: relative;
}

[title]:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 10;
    pointer-events: none;
}
</style>