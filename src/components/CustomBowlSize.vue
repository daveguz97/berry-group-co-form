<script setup>
import { useCustomBowls } from '../store/customBowls';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const store = useCustomBowls();

const {selectedSize} = storeToRefs(store);

const route = useRouter();

const routeToPath = (item) => {
	selectedSize.value = item.name;
	route.push(`customBowls/${item.id}`);
}
const handleClick = (item) => {
	routeToPath(item);
	console.log(item, item);
};

</script>
<template>
    <div class="customBowlChoices">
        <div class="container">
                <div class="card"  v-for="item in store.size" :key="item.id" @click="handleClick(item)" >
                    <div class="content"><h4>{{ item.name}}</h4></div>
                </div>
        </div>
    </div>
</template>

<style scoped>
.customBowlChoices {
	text-align: center;
}
.customBowlChoices .container {
	display: flex;
	flex-direction: row;
	align-items: center;

}

@media screen and (max-width: 768px) {
    .customBowlChoices .container {
        flex-direction: column;
    }
}
</style>
