<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
const leftLogo = ref(null)
const rightLogo = ref(null)
const displaySplashScreen = ref(true)

onMounted(() => {
    const tl = gsap.timeline({ onComplete: hideSplashScreen, delay: 1 })
    tl.add('start').to(leftLogo.value, { x: -300, opacity: 0, duration: 2 }, 'start').to(
        rightLogo.value,
        {
            x: 300,
            opacity: 0,
            duration: 2
        },
        'start'
    )
})

const hideSplashScreen = () => {
    displaySplashScreen.value = false
}
</script>

<template>
    <div v-if="displaySplashScreen" class="SplashScreen">
        <img ref="leftLogo" src="../assets/left-berry.png" alt="left berry group logo" />
        <img ref="rightLogo" src="../assets/right-berry.png" alt="right berry group logo" />
    </div>
</template>

<style scoped>
.SplashScreen {
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}
</style>
