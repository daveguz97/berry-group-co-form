import { useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import {v4 as id} from 'uuid';
let checked = false;
let gf = true;
let nf = true;

export const useCustomBowls = defineStore('setCustomBowls', () => {
    const size = [
        {
            id: id(),
            name: '12 OZ',
			price: 10.0.toFixed(2),
        },
        {
            id: id(),
            name: '16 OZ',
			price: 13.0.toFixed(2),
        },
        {
            id: id(),
            name: '24 OZ',
			price: 16.0.toFixed(2),
        }
    ];
    const base = [
        {
			id: id(),
            name: 'Acai',
            checked,
        },
        {
			id: id(),
            name: 'Pitaya',
            checked,
        },
        {
			id: id(),
            name: 'Blue Majik',
            checked,
        },
        {
			id: id(),
            name: 'Mango',
            checked,
        },
        {
			id: id(),
            name: 'Coconut Heaven',
            checked,
        },
        {
			id: id(),
            name: 'Vanilla Chia Pudding',
            checked,
        },
        {
			id: id(),
            name: 'Coconut Chia Pudding',
            checked,
        },
        {
			id: id(),
            name: 'Matcha Chia Pudding',
            checked,
        }
    ];

    const fruits = [
        {
            id: id(),
            name: 'Strawberries',
            checked,
        },
        {
            id: id(),
            name: 'Blueberries',
            checked,
        },
        {
            id: id(),
            name: 'Banana',
            checked,
        },
        {
            id: id(),
            name: 'Mango',
            checked,
        },
        {
            id: id(),
            name: 'Golden Kiwi',
            checked,
        },
        {
            id: id(),
            name: 'Raspberries',
            checked,
        }
    ];

    const toppings = [
        {
            id: id(),
            name: 'Hemp Granola',
            gf,
            nf,
            checked,
        },
        {
            id: id(),
            name: 'Original Granola',
            gf,
            nf,
            checked,
        },
        {
            id: id(),
            name: 'Rasberry Granola',
            gf,
            nf,
            checked,
        },
        {
            id: id(),
            name: 'Coconut Chia Pudding',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Vanilla Chia Pudding',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Matcha Chia Pudding',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Sliced Almonds',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Sunflower Seeds',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Coconut Flakes',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Toasted Coconuts',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Almond Butter',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Peanut Butter',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'goji Berries',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'HEMP Seeds',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Cacao Nibs',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Chia Seeds',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Chopped Almonds',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Sliced Coconuts',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Flax Meal Seeds',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Matcha Powder',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Cinnamon',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Honey',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Agave',
            gf: false,
            nf: false,
            checked,
        },
        {
            id: id(),
            name: 'Date Syrup',
            gf: false,
            nf: false,
            checked,
        }
    ];

    let showErrorMessage = ref(false);

let selectedCustomBowl = useSessionStorage('selectedCustomBowl', []);

let selectedSizeState = useSessionStorage('selectedSize', []);
	

	let selectedSize = ref();

	let customBowl = ref([
		{
			id: id(),
			base: base,
			fruits: fruits,
			toppings: toppings,
			size: selectedSize
		}
	]);

    return {
        base,
        size,
        fruits,
        toppings,
        customBowl,
		selectedCustomBowl,
		selectedSizeState,
		selectedSize,
        showErrorMessage,
    };
});
