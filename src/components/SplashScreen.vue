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
   .to(leftLogo.value, { duration: 1, x: '-100%', opacity: 0 }, 'start')
   .to(rightLogo.value, { duration: 1, x: '100%', opacity: 0 }, 'start')
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
	<template v-else>
		<Home />
	</template>
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
