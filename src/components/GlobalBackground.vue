<template>
    <div class="global-background">
        <div class="background-image"></div>
        <div class="decor decor-top-left">
            <img src="@/assets/images/generic/left_side_decor.png" alt="Decoração topo esquerdo" class="decor-image">
        </div>
        <div class="decor decor-bottom-right">
            <img src="@/assets/images/generic/right_side_decor.png" alt="Decoração canto inferior direito"
                class="decor-image">
        </div>
    </div>
</template>

<script setup>
// Lógica pode ser adicionada aqui se necessário
</script>

<style scoped>
.global-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -3;
    overflow: hidden;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/generic/background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
    animation: zoomEffect 20s infinite alternate;
}

.decor {
    position: absolute;
    pointer-events: none;
    width: auto;
    height: auto;
    z-index: 1;
}

.decor-top-left {
    top: 0;
    left: 0;
}

.decor-bottom-right {
    bottom: 0;
    right: 0;
}

.decor-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

@keyframes zoomEffect {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.05);
    }
}

/* Responsividade */
@media (max-width: 1024px) {
    .decor {
        width: 200px;
        height: 200px;
    }
}

@media (max-width: 768px) {
    .decor {
        width: 150px;
        height: 150px;
    }
}

@media (max-width: 480px) {
    .decor {
        width: 100px;
        height: 100px;
    }
}
</style>