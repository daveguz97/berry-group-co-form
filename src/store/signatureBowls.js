import { defineStore } from 'pinia'
import { useSessionStorage } from '@vueuse/core'
import { ref } from 'vue'
import router from '../router'

let id = 0
let checked = false

export const useSignatureBowlStore = defineStore('setSignatureBowls', () => {

    const signatureBowls = ref([
        {
            id: id++,
            name: 'Berry Bar Bowl',
            base: 'Acai and coconut heaven',
            toppings:
                'banana, strawberries, blueberries, original granola, vanilla chia pudding, chopped almond, coconut flakes, goji berries, almond butter, cinnamon powder'
                    .replace(/\s*,\s*/g, ',')
                    .split(','),
            collapsed: true,
			sizes: ref([
				{
					size: '12 OZ',
					checked
				},
				{
					size: '16 OZ',
					checked
				},
				{
					size: '24 OZ',
					checked
				}
			])
        },
        {
            id: id++,
            name: 'Blueberrry yum yum',
            base: 'blue majik AND coconut heaven',
            toppings:
                'origINal granola, vanilla chia pudding, bananaS, blueberries, coconut flakes, almonds, hemp seeds, agave'
                    .replace(/\s*,\s*/g, ',')
                    .split(','),
            collapsed: true,
			sizes: ref([
				{
					size: '12 OZ',
					checked
				},
				{
					size: '16 OZ',
					checked
				},
				{
					size: '24 OZ',
					checked
				}
			])
	
        },
        {
            id: id++,
            name: 'Coco dream',
            base: 'coconut heaven',
            toppings:
                'hemp vegan granola, coconut chia pudding, raspberries, blueberries, sunflower seeds, toasted coconut, agave'
                    .replace(/\s*,\s*/g, ',')
                    .split(''),
            collapsed: true,
			sizes: ref([
				{
					size: '12 OZ',
					checked
				},
				{
					size: '16 OZ',
					checked
				},
				{
					size: '24 OZ',
					checked
				}
			])
        },
        {
            id: id++,
            name: 'MANGO MAUI',
            base: 'Mango',
            toppings:
                'Original granola, vanilla chia pudding, mangos, raspberries, golden kiwi, coconut flakes, sliced almonds, chia seeds, agave'
                    .replace(/\s*,\s*/g, ',')
                    .split(''),
            collapsed: true,
			sizes: ref([
				{
					size: '12 OZ',
					checked
				},
				{
					size: '16 OZ',
					checked
				},
				{
					size: '24 OZ',
					checked
				}
			])
        },
        {
            id: id++,
            name: 'fresh N fruity',
            base: 'Acai and Pitaya',
            toppings:
                'origINal granola, vanilla chia pudding, strawberries blueberries, raspberries, sliced almonds, coconut flakes, goji berries, honey'
                    .replace(/\s*,\s*/g, ',')
                    .split(''),
            collapsed: true,
			sizes: ref([
				{
					size: '12 OZ',
					checked
				},
				{
					size: '16 OZ',
					checked
				},
				{
					size: '24 OZ',
					checked
				}
			])
        }
    ])

    let showErrorMessage = ref(false)
    const selectedBowl = ref([])
    const bowlState = useSessionStorage('save bowls', signatureBowls.value)

    const handleDisplayCheckout = () => {
        bowlState.value.some((bowl) => {
            if (bowl.checked) {
                selectedBowl.value.push(bowl.name)
                router.push('/checkout')
                showErrorMessage.value = false
            } else {
                showErrorMessage.value = true
            }
        })
    }

    const toggleCollapse = (bowl) => {
        bowl.collapsed = !bowl.collapsed
    }

    return {
        signatureBowls,
        bowlState,
        showErrorMessage,
        selectedBowl,
        toggleCollapse,
        handleDisplayCheckout,
    }
})
