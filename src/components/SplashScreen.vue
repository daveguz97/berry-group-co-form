<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import Home from './Home.vue'
const leftLogo = ref(null)
const rightLogo = ref(null)
const displaySplashScreen = ref(true)

onMounted(() => {
  const tl = gsap.timeline({ onComplete: hideSplashScreen, delay: 1 })
  tl.add('start')
    .to(leftLogo.value, {
      rotation: 360, // Spin 360 degrees clockwise
      duration: 2,
      onUpdate: () => {
        // Continuous rotation until animation completes
        gsap.set(leftLogo.value, { rotation: '+=0.5' });
      },
    }, 'start')
    .to(
      rightLogo.value,
      {
        rotation: -360, // Spin 360 degrees counterclockwise
        duration: 2,
        onUpdate: () => {
          // Continuous rotation until animation completes
          gsap.set(rightLogo.value, { rotation: '-=0.5' });
        },
      },
      'start'
    )
    .to(leftLogo.value, { x: -100, opacity: 0, duration: 0.5, ease: 'ease-out' })
    .to(rightLogo.value, { x: 100, opacity: 0, duration: 0.5, ease: 'ease-out' }, '-=0.5')
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
    <Home v-else />
</template>

<style scoped>
@import url('../assets/base.css');
.SplashScreen {
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background: var(--page-background);
}
</style>
