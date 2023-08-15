import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';
import { ref } from 'vue';
import { v4 as id } from 'uuid';
let checked = false;

export const useSignatureBowlStore = defineStore('setSignatureBowls', () => {
    const signatureBowls = ref([
        {
            id: id(),
            name: 'Berry Bar Bowl',
            base: 'Acai and coconut heaven',
            toppings:
                'banana, strawberries, blueberries, original granola, vanilla chia pudding, chopped almond, coconut flakes, goji berries, almond butter, cinnamon powder'.split(
                    ','
                ),
            collapsed: true,
            sizes: ref([
                {
                    id: id(),
                    size: '12 OZ',
                    price: (10.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '16 OZ',
                    price: (13.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '24 OZ',
                    price: (16.0).toFixed(2),
                    checked
                }
            ])
        },
        {
            id: id(),
            name: 'Blueberrry yum yum',
            base: 'blue majik AND coconut heaven',
            toppings:
                'original granola, vanilla chia pudding, bananaS, blueberries, coconut flakes, almonds, hemp seeds, agave'.split(
                    ','
                ),
            collapsed: true,
            sizes: ref([
                {
                    id: id(),
                    size: '12 OZ',
                    price: (10.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '16 OZ',
                    price: (13.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '24 OZ',
                    price: (16.0).toFixed(2),
                    checked
                }
            ])
        },
        {
            id: id(),
            name: 'Coco dream',
            base: 'coconut heaven',
            toppings:
                'hemp vegan granola, coconut chia pudding, raspberries, blueberries, sunflower seeds, toasted coconut, agave'.split(
                    ','
                ),
            collapsed: true,
            sizes: ref([
                {
                    id: id(),
                    size: '12 OZ',
                    price: (10.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '16 OZ',
                    price: (13.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '24 OZ',
                    price: (16.0).toFixed(2),
                    checked
                }
            ])
        },
        {
            id: id(),
            name: 'MANGO MAUI',
            base: 'Mango',
            toppings:
                'Original granola, vanilla chia pudding, mangos, raspberries, golden kiwi, coconut flakes, sliced almonds, chia seeds, agave'.split(
                    ','
                ),
            collapsed: true,
            sizes: ref([
                {
                    id: id(),
                    size: '12 OZ',
                    price: (10.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '16 OZ',
                    price: (13.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '24 OZ',
                    price: (16.0).toFixed(2),
                    checked
                }
            ])
        },
        {
            id: id(),
            name: 'fresh N fruity',
            base: 'Acai and Pitaya',
            toppings:
                'origINal granola, vanilla chia pudding, strawberries blueberries, raspberries, sliced almonds, coconut flakes, goji berries, honey'.split(
                    ','
                ),
            collapsed: true,
            sizes: ref([
                {
                    id: id(),
                    size: '12 OZ',
                    price: (10.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '16 OZ',
                    price: (13.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '24 OZ',
                    price: (16.0).toFixed(2),
                    checked
                }
            ])
        },
        {
            id: id(),
            name: 'Vanilla Chia',
            base: 'Vanilla Chia Pudding',
            toppings:
                'Original Granola, Mango, Rasberries, Chopped Coconuts, Chopped Almonds, Cacao Nibs, Option Honey or Agave'.split(
                    ','
                ),
            collapsed: true,
            sizes: ref([
                {
                    id: id(),
                    size: '12 OZ',
                    price: (10.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '16 OZ',
                    price: (13.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '24 OZ',
                    price: (16.0).toFixed(2),
                    checked
                }
            ])
        },
        {
            id: id(),
            name: `Mom's Special`,
            base: 'Mango and Coconut Heaven',
            toppings:
                'Rasberry Granola, Vanilla Chia Pudding, All Fruits, Goji berry, chopped almond, toasted coconut, almond butter'.split(
                    ','
                ),
            collapsed: true,
            sizes: ref([
                {
                    id: id(),
                    size: '12 OZ',
                    price: (10.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '16 OZ',
                    price: (13.0).toFixed(2),
                    checked
                },
                {
                    id: id(),
                    size: '24 OZ',
                    price: (16.0).toFixed(2),
                    checked
                }
            ])
        }
    ]);

    let showErrorMessage = ref(false);
    const selectedSignatureBowl = ref([]);
    const selectedSignatureBowlState = useSessionStorage('selectedBowlState', []);

    const saveSelectedBowls = useSessionStorage('savedBowls', []);

    const toggleCollapse = (bowl) => {
        bowl.collapsed = !bowl.collapsed;
    };

    return {
        signatureBowls,
        selectedSignatureBowlState,
        showErrorMessage,
        selectedSignatureBowl,
        saveSelectedBowls,
        toggleCollapse
    };
});
