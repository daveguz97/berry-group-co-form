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
    </Form>
</template>

<style scoped>
.heading {
	width: 100%;
    margin: 0.5rem auto;
	text-align: center;
	display: flex;
	justify-content: center;
}

.fruits-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.form-group {
    width: 80%;
    display: flex;
    align-items: center;
}

.form-group input {
    margin-right: 0.5rem;
}

input[type='checkbox'] {
    margin-right: 0.5rem;
    align-self: flex-start;
}

@media screen and (min-width: 768px) {
	.form-group {
		width: 100%;
	}
	
	.fruits-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	
	.form-group {
		width: 30%;
	}
}
</style>
