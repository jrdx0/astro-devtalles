<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <button v-else-if="likeCount === 0" @click="likePost">
        Like this post
    </button>
    <button v-else @click="likePost">
        Likes <span>{{ likeCount }}</span>
    </button>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';
import { actions } from 'astro:actions';

interface Props {
    postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(likeCount, debounce(() => {
    actions.updatePostLikes({
        postId: props.postId,
        increment: likeClicks.value
    });

    likeClicks.value = 0;
}, 500));

async function likePost() {
    likeCount.value++;
    likeClicks.value++;

    const { data, error } = await actions.getGreeting({
        name: 'Jared',
        age: 24,
        isActive: true
    });

    if (error) return alert('Algo salió mal');

    console.log({ data });

    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: Math.random(),
            y: Math.random() - 0.2
        }
    })
}

async function getCurrentLikes() {
    const { data, error } = await actions.getPostLikes(props.postId);
    if (error) return alert(error);

    likeCount.value = data.likes;
    isLoading.value = false;
}

getCurrentLikes();
</script>

<style scoped>
button {
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background-color: #4a3f9a;
}
</style>