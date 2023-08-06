<script setup>
</script>

<template>
    <header>
        <div class="logo-div">
            <router-link to="/"><img class="logo" src="../assets/berry-bar-co-logo.png" alt="Berry Bar Co. Logo" /></router-link>
        </div>
        <div class="title"><slot></slot></div>
    </header>
</template>

<style scoped>
@import url('../assets/base.css');
header {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90%;
    margin: 0 auto;
    justify-content: space-around;
}
.logo {
	max-width: 200px;
}
</style>
