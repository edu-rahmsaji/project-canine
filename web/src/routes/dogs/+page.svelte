<script lang="ts">
    import type { PageServerData } from './$types';
    import { IconGenderMale, IconGenderFemale, IconPaw } from '@tabler/icons-svelte';
    import { goto } from "$app/navigation";

    export let data: PageServerData;

    function sexIcon(male: boolean) {
        return male ? IconGenderMale : IconGenderFemale;
    }

    function age(dob: string | Date) {
        dob = typeof dob === "string" ? new Date(dob) : dob;
        const diff = Date.now() - dob.getTime();
        const years = new Date(diff).getFullYear() - 1970;

        if (years === 0) {
            return `${new Date(diff).getMonth()} months old`;
        } else {
            const yearsWithMonths = (years + new Date(diff).getMonth() / 12).toFixed(1);
            return `${yearsWithMonths} years old`;
        }
    }
</script>

<main class="relative w-full h-full flex flex-col px-5">
    <h1>All registered dogs :</h1>
    {#if data.dogs}
        <div class="flex flex-col gap-5">
            {#each data.dogs as dog}
                <button on:click={() => goto(`/dogs/${dog._id}`)} class="relative w-full sm:w-60 p-5 flex flex-col gap-3 rounded-lg border border-gray-700">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between gap-5">
                            <h2 class="text-xl">{dog.nom}</h2>
                            <svelte:component this={sexIcon(dog.male)} />
                        </div>
                        <span class="text-sm text-gray-500">{age(dog.dateNaissance)}</span>
                    </div>
                    <div class="text-gray-500 flex gap-[10px]">
                        <IconPaw class="size-6" />
                        <span>{dog.race}</span>
                    </div>
                </button>
            {:else}
                <p>You don't have any dogs...</p>
            {/each}
        </div>
    {:else}
        <p>Something went wrong.</p>
    {/if}
</main>
