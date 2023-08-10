<script setup></script>

<template>
</template>

<style scoped>
.logo-div,
.info {
    margin: 2rem 0;
}
.logo {
    max-width: 250px;
}

.title,
.description h6 {
    color: var(--periwinkle);
}
.title {
    letter-spacing: 10px;
    font-weight: 800;
}

.pricing {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.pricing ul {
    display: flex;
}

.pricing ul li {
    margin: 0 0.5rem;
    font-weight: 600;
}

.pricing ul li:not(:last-child) {
    border-right: 3px var(--border-color) solid;
    padding: 0 1rem;
}
.description {
	position: relative;
	width: 100%;
}
.description h6 {
    letter-spacing: 3px;
    font-family: heavyFont, sans-serif;
    font-weight: 600;
}

.organic-info {color: var(--dark-green-color)}
</style>