import { useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

let id = 0;
let checked = false;
let gf = true;
let nf = true;

export const useCustomBowls = defineStore('setCustomBowls', () => {
    const size = [
        {
            id: id++,
            name: '12 OZ'
        },
        {
            id: id++,
            name: '16 OZ'
        },
        {
            id: id++,
            name: '24 OZ'
        }
    ];
    const base = [
        {
            name: 'Acai',
            checked
        },
        {
            name: 'Pitaya',
            checked
        },
        {
            name: 'Blue Majik',
            checked
        },
        {
            name: 'Mango',
            checked
        },
        {
            name: 'Coconut Heaven',
            checked
        },
        {
            name: 'Vanilla Chia Pudding',
            checked
        },
        {
            name: 'Coconut Chia Pudding',
            checked
        },
        {
            name: 'Matcha Chia Pudding',
            checked
        }
    ];

    const fruits = [
        {
            id: id++,
            name: 'Strawberries',
            checked,
            size
        },
        {
            id: id++,
            name: 'Blueberries',
            checked,
            size
        },
        {
            id: id++,
            name: 'Banana',
            checked,
            size
        },
        {
            id: id++,
            name: 'Mango',
            checked,
            size
        },
        {
            id: id++,
            name: 'Golden Kiwi',
            checked,
            size
        },
        {
            id: id++,
            name: 'Raspberries',
            checked,
            size
        }
    ];

    const toppings = [
        {
            id: id++,
            name: 'Hemp Granola',
            gf,
            nf,
            checked,
            size
        },
        {
            id: id++,
            name: 'Original Granola',
            gf,
            nf,
            checked,
            size
        },
        {
            id: id++,
            name: 'Rasberry Granola',
            gf,
            nf,
            checked,
            size
        },
        {
            id: id++,
            name: 'Coconut Chia Pudding',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Vanilla Chia Pudding',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Matcha Chia Pudding',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Sliced Almonds',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Sunflower Seeds',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Coconut Flakes',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Toasted Coconuts',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Almond Butter',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Peanut Butter',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'goji Berries',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'HEMP Seeds',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Cacao Nibs',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Chia Seeds',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Chopped Almonds',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Sliced Coconuts',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Flax Meal Seeds',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Matcha Powder',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Cinnamon',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Honey',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Agave',
            gf: false,
            nf: false,
            checked,
            size
        },
        {
            id: id++,
            name: 'Date Syrup',
            gf: false,
            nf: false,
            checked,
            size
        }
    ];

    let showErrorMessage = ref(false);

	let customBowl = ref([
		{
			id: id++,
			base: JSON.parse(JSON.stringify(base)),
			fruits: ref(JSON.parse(JSON.stringify(fruits))),
			toppings: ref(JSON.parse(JSON.stringify(toppings))),
			size: size[0].name
		},
		{
			id: id++,
			base: ref(JSON.parse(JSON.stringify(base))),
			fruits: ref(JSON.parse(JSON.stringify(fruits))),
			toppings: ref(JSON.parse(JSON.stringify(toppings))),
			size: size[1].name
		},
		{
			id: id++,
			base: ref(JSON.parse(JSON.stringify(base))),
			fruits: ref(JSON.parse(JSON.stringify(fruits))),
			toppings: ref(JSON.parse(JSON.stringify(toppings))),
			size: size[2].name
		}
	]);

	let selectedCustomBowlBy12Oz = useSessionStorage('selectedCustomBowlBy12Oz', []);
	let selectedCustomBowlBy16Oz = useSessionStorage('selectedCustomBowlBy16Oz', []);
	let selectedCustomBowlBy24Oz = useSessionStorage('selectedCustomBowlBy24Oz', []);

	const saveSelectedCustomBowlBy12Oz = useSessionStorage('savedCustomBowlBy12Oz', []);

	const saveSelectedCustomBowlBy16Oz = useSessionStorage('savedCustomBowlBy16Oz', []);

	const saveSelectedCustomBowlBy24Oz = useSessionStorage('savedCustomBowlBy24Oz', []);
	

	let selectedSize = ref();

    return {
        base,
        size,
        fruits,
        toppings,
        customBowl,
		selectedCustomBowlBy12Oz,
		selectedCustomBowlBy16Oz,
		selectedCustomBowlBy24Oz,
		selectedSize,
        showErrorMessage,
		saveSelectedCustomBowlBy12Oz,
		saveSelectedCustomBowlBy16Oz,
		saveSelectedCustomBowlBy24Oz
    };
});
