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
.form-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
}

input[type='checkbox'] {
   position: absolute;
   left: 10px;
}

.form-group input {
    margin-right: 0.5rem;
}
</style>
