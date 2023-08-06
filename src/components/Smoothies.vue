<script setup>
import { useRouter } from 'vue-router'
import { useSmoothieStore } from '../store/smoothie'
import Form from './Form.vue'

const store = useSmoothieStore()
const route = useRouter()

const navigatePrevious = () => {
    route.go(-1)
}
</script>

<template>
    <div class="container">
        <div class="smoothies">
            <Form>
                <div class="wrapper">
                    <div v-for="state in store.smoothieState" :key="state.id" class="content">
                        <input v-model="state.checked" type="checkbox" :name="state.name" />
                        <label :for="state.name">&nbsp;{{ state.name }}</label>
                        <sup class="price">&nbsp;${{ state.price }}</sup>
                        <div>
                            <button
                                class="ingredients-button"
                                @click.prevent="store.toggleCollapse(state)"
                            >
                                {{
                                    state.collapsed
                                        ? '&rarr; show ingredients'
                                        : '&darr; Hide Ingredients'
                                }}
                            </button>
                        </div>
                        <ul v-if="!state.collapsed">
                            <li v-for="ingredient in state.ingredients" :key="ingredient">
                                {{ ingredient }}
                            </li>
                        </ul>
                    </div>
                    <button class="prev-button" @click.prevent="navigatePrevious">Previous</button>
                    <button class="next-button" @click.prevent="store.handleDisplayCheckout()">
                        Next
                    </button>
					<p class="error-message" v-if="store.showErrorMessage">Please select a smoothie.</p>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/base.css';
.container {
    text-align: center;
    margin: 1rem 0;
}

.content {
    margin: 1rem 0;
}
.next-button,
.prev-button {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: var(--light-green-color);
    margin: 0 0.5rem;
    width: 150px;
    height: 30px;
    transition: all 0.3s ease-in-out;
}

.next-button:hover,
.prev-button:hover {
    background-color: var(--dark-green-color);
}

input[type='checkbox'] {
    background-color: red;
    accent-color: var(--periwinkle);
    width: var(--checkbox-width-and-height);
    height: var(--checkbox-width-and-height);
}
</style>
