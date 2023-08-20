<script setup>
import { useCustomBowls } from '../store/customBowls';
import Form from './Form.vue';

const store = useCustomBowls();
</script>

<template>
    <Form>
            <div class="heading">
                <h5>2. Choose your Fruit</h5>
            </div>
            <div class="fruits-container">
                <div class="form-group" v-for="fruit in store.fruits" :key="fruit.name">
                    <input type="checkbox" :name="fruit.name" v-model="fruit.checked" />
                    <label :for="fruit.name">&nbsp;{{ fruit.name }}</label>
                </div>
            </div>
        <p class="error-message" v-if="store.showErrorMessage">Please select a Fruit.</p>
    </Form>
</template>

<style scoped>


.fruits-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	justify-items: center;
	margin-bottom: 1rem;
}

.form-group {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-group input {
	margin-right: .5rem;
}

@media screen and (max-width: 768px) {
    .fruits-container {
        flex-direction: row;
    }

	.fruits-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
}
</style>
