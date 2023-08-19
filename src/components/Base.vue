<script setup>
import { onMounted, ref } from 'vue';
import { useCustomBowls } from '../store/customBowls';
import Form from './Form.vue';

const store = useCustomBowls();
</script>

<template>
    <Form>
        <div class="heading">
            <h5>1. Choose your base</h5>
        </div>
        <div class="base-container">
            <div class="form-group" v-for="base in store.base" :key="base.name">
                <input type="checkbox" :name="base.name" v-model="base.checked" />
                <label :for="base.name">&nbsp;{{ base.name }}</label>
            </div>
        </div>
        <p class="error-message" v-if="store.showErrorMessage">Please select a base.</p>
    </Form>
</template>

<style scoped>
.heading {
    margin: 0.5rem 1rem;
}

.base-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    justify-items: center;
	margin: 1.5rem 0;
}

.form-group {
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-group input {
    margin-right: 0.5rem;
}

@media screen and (max-width: 768px) {
    .base-container {
        flex-direction: row;
    }

    .base-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
}
</style>
