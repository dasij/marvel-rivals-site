<template>
    <div class="hero-teamups">
        <h2 class="teamups-title">Teamups with {{ hero.name }}</h2>
        
        <!-- Grid de seleção de heróis -->
        <div class="hero-selection-grid">
<div 
    v-for="otherHero in otherHeroes" 
    :key="otherHero.id"
    class="hero-selector"
    :class="{ 
        'selected': selectedHero && selectedHero.id === otherHero.id,
        'no-teamup': heroesWithoutTeamup.includes(otherHero.id)
    }"
    @click="!heroesWithoutTeamup.includes(otherHero.id) && selectHero(otherHero)"
>
    <img 
        :src="getHeroIcon(otherHero.folder, selectedHero && selectedHero.id === otherHero.id)" 
        :alt="otherHero.name"
        class="hero-icon"
        :class="{ 'grayscale': heroesWithoutTeamup.includes(otherHero.id) }"
        :title="heroesWithoutTeamup.includes(otherHero.id) ? 'No teamup information available' : otherHero.name"
    >
</div>
        </div>

        <!-- Container principal com posição relativa para os portraits absolutos -->
        <div class="teamup-main-container">
            <!-- Herói selecionado (âncora) - esquerda -->
            <transition name="slide" mode="out-in">
                <div 
                    v-if="selectedHero"
                    class="hero-portrait left"
                    :key="'left-'+selectedHero.folder"
                >
                    <img 
                        :src="getHeroPortrait(selectedHero.folder)" 
                        :alt="selectedHero.name" 
                        class="hero-portrait-image"
                    >
                </div>
            </transition>

            <!-- Herói fixo (da página) - direita -->
            <transition name="slide-fade" mode="out-in">
                <div 
                    v-if="heroPortraitRightVisible"
                    class="hero-portrait right"
                    :key="'right-'+hero.folder"
                >
                    <img 
                        :src="getHeroPortrait(hero.folder)" 
                        :alt="hero.name" 
                        class="hero-portrait-image"
                    >
                </div>
            </transition>

            <!-- Área de conteúdo central -->
            <div class="teamup-content-container">
                <div v-if="selectedHero" class="teamup-content">
                    <div class="teamup-heroes">
                        <div class="hero-display">
                            <img 
                                :src="getHeroIcon(selectedHero.folder, 'lord')" 
                                :alt="selectedHero.name" 
                                class="hero-lord-icon"
                            >
                            <span class="hero-name">{{ selectedHero.name }}</span>
                            <div class="hero-label">ANCHOR</div>
                        </div>
                        <span class="teamup-plus">+</span>
                        <div class="hero-display">
                            <img 
                                :src="getHeroIcon(hero.folder, 'lord')" 
                                :alt="hero.name" 
                                class="hero-lord-icon"
                            >
                            <span class="hero-name">{{ hero.name }}</span>
                        </div>
                    </div>

                    <div v-if="currentTeamup" class="teamup-info">
                        <div class="teamup-header">
                            <h3 class="teamup-name">{{ currentTeamup.name }}</h3>
                            <div v-if="currentTeamup.impact" class="teamup-impact" :class="currentTeamup.impact.toLowerCase()" 
                                :title="getImpactTooltip(currentTeamup.impact)">
                                {{ currentTeamup.impact }}
                            </div>
                        </div>
                        <p class="teamup-description" v-html="currentTeamup.description"></p>
                        
                        <!-- Lista de detalhes -->
<ul v-if="currentTeamup.details && currentTeamup.details.length" class="teamup-details">
    <li v-for="(detail, index) in currentTeamup.details" :key="index" v-html="formatDetailText(detail)">
    </li>
</ul>
                        
                        <!-- Imagens do teamup -->
                        <div v-if="currentTeamup.images && currentTeamup.images.length" class="teamup-images">
                            <div 
                                v-for="(image, index) in currentTeamup.images" 
                                :key="index"
                                class="teamup-image-thumbnail"
                                @click="openLightbox(image)"
                            >
                                <img :src="getTeamupImage(image)" :alt="'Teamup image ' + (index + 1)">
                            </div>
                        </div>
                        
                        <!-- Vídeos do teamup -->
                        <div v-if="currentTeamup.videos && currentTeamup.videos.length" class="teamup-videos">
                            <div 
                                v-for="(video, index) in currentTeamup.videos" 
                                :key="index"
                                class="teamup-video-thumbnail"
                                @click="openLightbox(video, 'video')"
                            >
                                <video muted>
                                    <source :src="getTeamupVideo(video)" type="video/mp4">
                                </video>
                                <div class="play-icon">▶</div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="no-teamup-info">
                        No teamup information available for {{ hero.name }} and {{ selectedHero.name }}
                    </div>
                </div>
                <div v-else class="select-hero-prompt">
                    Select a hero to see teamup information
                </div>
            </div>
        </div>

        <!-- Lightbox para mídia -->
        <div v-if="lightboxVisible" class="lightbox" @click.self="closeLightbox">
            <div class="lightbox-content">
                <button class="lightbox-close" @click="closeLightbox">×</button>
                <img 
                    v-if="lightboxType === 'image'" 
                    :src="getTeamupImage(lightboxMedia)" 
                    class="lightbox-media"
                >
                <video 
                    v-else-if="lightboxType === 'video'" 
                    controls 
                    autoplay
                    class="lightbox-media"
                >
                    <source :src="getTeamupVideo(lightboxMedia)" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
</template>

<script>
import heroes from '@/assets/heroes.json'

export default {
    name: 'HeroTeamups',
    props: {
        hero: {
            type: Object,
            required: true
        }
    },
    watch: {
    currentTeamup(newVal) {
        if (newVal && (!newVal.description || newVal.description.trim() === '')) {
            this.markHeroAsNoTeamup(this.selectedHero.id);
            this.currentTeamup = null;
        }
    }
},
    data() {
        return {
            otherHeroes: [],
            selectedHero: null,
            currentTeamup: null,
            lightboxVisible: false,
            lightboxMedia: null,
            lightboxType: 'image',
            heroPortraitRightVisible: true,
            heroesWithoutTeamup: []
        }
    },
async created() {
    await this.loadOtherHeroes();
    for (const hero of this.otherHeroes) {
        try {
            const teamupData = await import(`@/assets/data/heroes/${this.hero.folder}/${this.hero.folder}_teamups.json`);
            const allTeamups = teamupData.default || teamupData;
            const teamup = allTeamups.find(t => t.heroId === hero.id || t.heroName === hero.name);
            
            if (!teamup || !teamup.description || teamup.description.trim() === '') {
                this.heroesWithoutTeamup.push(hero.id);
            }
        } catch {
            this.heroesWithoutTeamup.push(hero.id);
        }
    }
    
    // Seleciona o primeiro herói que tem teamup (se existir)
    const firstHeroWithTeamup = this.otherHeroes.find(h => !this.heroesWithoutTeamup.includes(h.id));
    if (firstHeroWithTeamup) {
        this.selectHero(firstHeroWithTeamup);
    }
},
    
    methods: {
        getHeroIcon(folder, isSelected = false) {
            try {
                const iconType = isSelected ? 'lord_icon' : 'icon';
                return require(`@/assets/images/heroes/${folder}/${iconType}.png`);
            } catch {
                return require('@/assets/images/placeholder.png');
            }
        },
        getHeroPortrait(folder) {
            try {
                const image = require(`@/assets/images/heroes/${folder}/hero_portrait.png`)
                return image
            } catch {
                return null
            }
        },
            formatDetailText(text) {
        // Substitui **texto** por <strong>texto</strong>
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    },
        getTeamupImage(imagePath) {
            try {
                const image = require(`@/assets/data/heroes/${this.hero.folder}/teamup_images/${imagePath}`)
                return image
            } catch {
                return null
            }
        },
        getTeamupVideo(videoPath) {
            try {
                const video = require(`@/assets/data/heroes/${this.hero.folder}/teamup_videos/${videoPath}`)
                return video
            } catch {
                return null
            }
        },
        loadOtherHeroes() {
            this.otherHeroes = heroes.filter(h => h.id !== this.hero.id)
            
            if (this.otherHeroes.length === 0) {
                console.warn('No other heroes available for teamups')
            }
        },
async selectHero(hero) {
        this.selectedHero = hero;
        try {
            const teamupData = await import(`@/assets/data/heroes/${this.hero.folder}/${this.hero.folder}_teamups.json`)
            const allTeamups = teamupData.default || teamupData;
            
            this.currentTeamup = allTeamups.find(t => 
                t.heroId === hero.id || 
                t.heroName === hero.name
            ) || null;
            
            // Verifica se o teamup existe mas tem descrição vazia
            if (this.currentTeamup && (!this.currentTeamup.description || this.currentTeamup.description.trim() === '')) {
                this.markHeroAsNoTeamup(hero.id);
                this.currentTeamup = null;
            }
        } catch (error) {
            console.error('Error loading teamup:', error);
            this.currentTeamup = null;
            this.markHeroAsNoTeamup(hero.id);
        }
    },
    
    markHeroAsNoTeamup(heroId) {
        if (!this.heroesWithoutTeamup.includes(heroId)) {
            this.heroesWithoutTeamup.push(heroId);
        }
    },
        openLightbox(media, type = 'image') {
            const mediaExists = type === 'image' 
                ? this.getTeamupImage(media) !== null
                : this.getTeamupVideo(media) !== null
            
            if (mediaExists) {
                this.lightboxMedia = media
                this.lightboxType = type
                this.lightboxVisible = true
                document.body.style.overflow = 'hidden'
            }
        },
        closeLightbox() {
            this.lightboxVisible = false
            document.body.style.overflow = ''
        },
        getImpactTooltip(impact) {
            const tooltips = {
                'OP': 'This teamup is extremely powerful and can dominate matches',
                'strong': 'This teamup provides significant advantages',
                'balanced': 'This is a fair and balanced teamup in my opinion',
                'weak': 'This teamup has minimal synergy or impact'
            }
            return tooltips[impact] || ''
        }
    }
}
</script>

<style scoped>
.hero-teamups {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
}

.teamups-title {
    color: #FFD700;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.hero-selection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 0.8rem;
    width: calc(100% - 40px);
    max-width: 1800px;
    margin: 0 20px 2rem 20px;
}

/* Adicione isso na seção de estilos */
.hero-selector.no-teamup {
    cursor: not-allowed;
    opacity: 0.7;
}

.hero-selector.no-teamup:hover {
    background: rgba(0, 0, 0, 0.3);
    transform: none;
}

.grayscale {
    filter: grayscale(100%);
    opacity: 0.6;
}

.hero-selector.no-teamup .hero-icon {
    filter: grayscale(100%);
    opacity: 0.6;
}

.hero-selector {
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 4px;
    padding: 0.3rem;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
}

.hero-selector:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: scale(1.05);
}

.hero-selector.selected {
    background: rgba(255, 215, 0, 0.4);
    border: 2px solid #FFD700;
    transform: scale(1.1);
}

.hero-icon {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
}

/* Container principal com posição relativa */
.teamup-main-container {
    position: relative;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    min-height: 500px;
    display: flex;
    justify-content: center;
}

/* Estilos para os portraits absolutos */
.hero-portrait {
    position: absolute;
    top: 0;
    height: 100%;
    width: 25%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    opacity: 0.9;
    z-index: 1;
    transition: opacity 0.3s ease;
}

.hero-portrait:hover {
    opacity: 1;
}

.hero-portrait.left {
    left: 0;
    justify-content: flex-start;
}

.hero-portrait.right {
    right: 0;
    justify-content: flex-end;
}

.hero-portrait-image {
    height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    object-position:top;
}

/* Container de conteúdo central */
.teamup-content-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    padding: 2rem;
    z-index: 0;
    background: rgba(0, 0, 0, 0.7);
}

.teamup-content {
    width: 100%;
}

.teamup-heroes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.hero-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    position: relative;
}

.hero-lord-icon {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 3px solid #FFD700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

.hero-name {
    color: #FFD700;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
}

.teamup-plus {
    color: #FFD700;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 1rem;
}

.teamup-info {
    color: #ddd;
    text-align: center;
}

.teamup-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.teamup-name {
    color: #FFD700;
    font-size: 1.5rem;
    margin-bottom: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.teamup-impact {
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: help;
}

.teamup-impact.op {
    background-color: #FFD700;
    color: #000;
}

.teamup-impact.strong {
    background-color: #FF5555;
    color: #fff;
}

.teamup-impact.balanced {
    background-color: #5555FF;
    color: #fff;
}

.teamup-impact.weak {
    background-color: #55FF55;
    color: #000;
}

.teamup-description {
    line-height: 1.6;
    padding-left: 12rem;
    padding-right: 12rem;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.teamup-details {
    text-align: left;
    padding-left: 3rem;
    padding-right: 3rem;
    list-style-type: disc;
    color: #ccc;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.teamup-details li {
    margin-bottom: 0.8rem;
}

.teamup-images, .teamup-videos {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

.teamup-image-thumbnail, .teamup-video-thumbnail {
    width: 120px;
    height: 120px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    border: 2px solid rgba(255, 215, 0, 0.3);
    transition: all 0.3s ease;
}

.teamup-image-thumbnail:hover, .teamup-video-thumbnail:hover {
    transform: scale(1.05);
    border-color: #FFD700;
}

.teamup-image-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.teamup-video-thumbnail video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.teamup-video-thumbnail .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFD700;
    font-size: 2rem;
    text-shadow: 0 0 10px rgba(0,0,0,0.7);
}

.no-teamup-info, .select-hero-prompt {
    color: #ddd;
    text-align: center;
    padding: 2rem;
    font-style: italic;
    font-size: 1.2rem;
}

/* Lightbox styles */
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
}

.lightbox-media {
    max-width: 80vw;
    max-height: 80vh;
    border: 2px solid #FFD700;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

/* Transições */
.hero-label {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    color: #FFD700;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: rgba(0,0,0,0.7);
    padding: 3px 10px;
    border-radius: 15px;
    border: 1px solid #FFD700;
    white-space: nowrap;
}

/* Animações - Agora o slide aplica-se ao portrait esquerdo (âncora) */
.slide-enter-active {
    transition: all 0.5s ease;
}
.slide-leave-active {
    transition: all 0.3s ease;
}
.slide-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}
.slide-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

/* Animação suave para o portrait direito (fixo) */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(20px);
}
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

/* Tooltip styles */
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