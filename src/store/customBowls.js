import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSessionStorage } from '@vueuse/core';

let id = 0;
let checked = false;
let gf = true;
let nf = true;

export const useCustomBowls = defineStore('setCustomBowls', () => {

	const base = ref([
		{
			id: id++,
			name: 'Acai',
			checked
		},
		{
			id: id++,
			name: 'Pitaya',
			checked
		},

		{
			id: id++,
			name: 'Blue Majik',
			checked
		},
		{
			id: id++,
			name: 'Mango',
			checked
		},
		{
			id: id++,
			name: 'Coconut Heaven',
			checked
		},
		{
			id: id++,
			name: 'Vanilla Chia Pudding',
			checked
		},
		{
			id: id++,
			name: 'Coconut Chia Pudding',
			checked
		},
		{
			id: id++,
			name: 'Matcha Chia Pudding',
			checked
		}
	]);

	const fruits = ref([
		{
			id: id++,
			name: 'Strawberries',
			checked
		},
		{
			id: id++,
			name: 'Blueberries',
			checked
		},
		{
			id: id++,
			name: 'Banana',
			checked
		},
		{
			id: id++,
			name: 'Mango',
			checked
		},
		{
			id: id++,
			name: 'Golden Kiwi',
			checked
		},
		{
			id: id++,
			name: 'Raspberries',
			checked
		}
	]);

	const toppings = ref([
		{
			id: id++,
			name: 'Hemp Granola',
			gf: true,
			nf: true,
			checked
		},
		{
			id: id++,
			name: 'Original Granola',
			gf: true,
			nf: true,
			checked
		},
		{
			id: id++,
			name: 'Rasberry Granola',
			gf: true,
			nf: true,
			checked
		},
		{
			id: id++,
			name: 'Coconut Chia Pudding',
			gf: true,
			nf: true,


});