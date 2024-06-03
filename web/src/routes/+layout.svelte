<script lang="ts">
    import '../app.css';
    import { fly } from 'svelte/transition';
    import IconMenu from '@tabler/icons-svelte/IconMenu.svelte';
    import IconX from '@tabler/icons-svelte/IconX.svelte';
    import IconDog from '@tabler/icons-svelte/IconDog.svelte';
    import IconHome from '@tabler/icons-svelte/IconHome.svelte';
    import Container from '../lib/components/Toast/Container.svelte';

    let showMenu = false;
</script>

<Container />
<nav class="relative px-5 w-full h-20 flex justify-between items-center">
    <button on:click={() => (showMenu = true)}>
        <IconMenu />
    </button>
</nav>
{#if showMenu}
    <menu class="fixed top-0 left-0 w-full h-full flex flex-col bg-white z-50" transition:fly={{ x: -50 }}>
        <nav class="relative px-5 w-full h-20 flex justify-between items-center">
            <button on:click={() => (showMenu = false)}>
                <IconX />
            </button>
        </nav>
        <ul class="relative w-full h-[calc(100%-80px)] px-5 flex flex-col justify-start items-start divide-y divide-zinc-300">
            <li class="relative w-full">
                <a href="/" on:click={() => (showMenu = false)} class="relative flex gap-10 p-5 w-full">
                    <IconHome />
                    <span>Home</span>
                </a>
            </li>
            <li class="relative w-full">
                <a href="/dogs" on:click={() => (showMenu = false)} class="relative flex gap-10 p-5 w-full">
                    <IconDog />
                    <span>Dogs</span>
                </a>
            </li>
        </ul>
    </menu>
{/if}
<slot />
