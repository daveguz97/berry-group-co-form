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
    margin: 0.5rem 1rem;
}



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
