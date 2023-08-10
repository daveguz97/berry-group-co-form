
import { defineStore } from "pinia";
import { ref } from "vue";
import { useSessionStorage } from "@vueuse/core";

let id= 0;

export const useSmoothieStore = defineStore('setSmoothies', () => {
	const allSmoothies = ref([
		{
			id: id++,
			name: 'Matcha Green',
			price: (10.0).toFixed(2),
			ingredients: ['Almond Milk', 'Baby Spinach', 'Blueberries', 'Match', 'Spirulina'],
			collapsed: true,
			checked: false
		},
		{
			id: id++,
			name: 'Trippy mango',
			price: (10.0).toFixed(2),
			ingredients: ['Mango', 'Banana', 'Clementine', 'Pineapple', 'Coconut Milk', 'Flax Seed'],
			collapsed: true,
			checked: false
		},
		{
			id: id++,
			name: 'Almond Date',
			price: (11.0).toFixed(2),
			ingredients: [
				'Almond Butter',
				'Dates',
				'Banana',
				'Almond Milk',
				'Honey',
				'Cinnamon',
				'Tumeric'
			],
			collapsed: true,
			checked: false
		},
		{
			id: id++,
			name: 'Glow Me',
			price: (11.0).toFixed(2),
			ingredients: ['banana', 'pear', 'romaine lettuce', 'kale', 'lemon juice', 'honey'],
			collapsed: true,
			checked: false
		},
		{
			id: id++,
			name: 'Kale Lina',
			price: (12.0).toFixed(2),
			ingredients: ['Coconut Milk', 'kale', 'cucumber', 'banana', 'hemp seed', 'spirulina'],
			collapsed: true,
			checked: false
		},
		{
			id: id++,
			name: 'Merry Berry',
			price: (10.0).toFixed(2),
			ingredients: ['Strawberries', 'blueberries', 'banana', 'ground cinnamon', 'coconut mill'],
			collapsed: true,
			checked: false
		}])
		let showErrorMessage = ref(false)
		let selectedSmoothie = ref([]);
		const smoothieState = useSessionStorage('save smoothies', allSmoothies.value)
		const toggleCollapse = (smoothie) => {
			smoothie.collapsed = !smoothie.collapsed
		}

		return {allSmoothies, showErrorMessage, selectedSmoothie, name, smoothieState,  toggleCollapse}
})