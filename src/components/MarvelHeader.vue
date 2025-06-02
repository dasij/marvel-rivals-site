<template>
    <header class="marvel-header" :class="{ sticky: isSticky }">
        <div class="header-container">
            <!-- Logo à esquerda -->
            <div class="logo-container">
                <img src="@/assets/images/header/logo_header.png" alt="Marvel Rivals" class="logo">
            </div>

            <!-- Itens do menu -->
            <nav class="menu">
                <ul class="menu-list">
                    <li class="menu-item"><router-link to="/heroes" class="menu-link">HEROIS</router-link></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isSticky = ref(false)

const handleScroll = () => {
    isSticky.value = window.scrollY > 50
}

onMounted(() => {
    // Inicializa o estado sticky baseado na posição atual de scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.marvel-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #000;
    color: #fff;
    padding: 1.5rem 2rem;
    text-transform: uppercase;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    z-index: 1000;
    transform: translateY(0);
    font-family: 'RefrigeratorBold', 'RefrigeratorHeavy', 'Roboto Condensed', sans-serif;

}

/* Estado sticky (durante scroll) */
.marvel-header.sticky {
    padding: 0.8rem 2rem;
}

.header-container {
    display: flex;
    align-items: center;

    margin: 0 auto;
    padding-left: 50px;
}

.logo-container {
    margin-right: 3rem;
}

.logo {
    height: 60px;
    width: auto;
    transition: all 0.3s ease;
}

.marvel-header.sticky .logo {
    height: 50px;
}

.menu-list {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 1.1rem;
    transition: color 0.3s ease;
    position: relative;
    padding: 0 1.5rem;
}

.menu-item:hover {
    color: #e62429;
}

.menu-item:not(:last-child)::after {
    content: "/";
    position: absolute;
    right: 0;
    color: #383838;
    font-weight: 600;
    font-size: 1.6em;
    line-height: 1;
    transform: translateY(-50%);
    top: 50%;
    margin-right: -0.25rem;
}
</style>