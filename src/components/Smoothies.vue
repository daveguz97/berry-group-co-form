<script setup>
import { useRouter } from 'vue-router'
import { useSmoothieStore } from '../store/smoothie'
import Form from './Form.vue'
import FormButtons from './FormButtons.vue';

const store = useSmoothieStore()

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
					<FormButtons/>
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
</style>
