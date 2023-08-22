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

.base-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}


.form-group {
	width: 90%;
	display: flex;
	align-items: center;
}



.form-group label {
	margin: 0 1rem;
}

input[type='checkbox'] {
	align-self: flex-start;
}

@media screen and (min-width: 768px) {
	.form-group {
		width: 100%;
	}

	.base-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 1rem;
	}
}
	
</style>
