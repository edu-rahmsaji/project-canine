<script lang="ts">
    import type { PageServerData } from './$types';
    import { IconGenderMale, IconGenderFemale, IconPaw, IconUser, IconExternalLink, IconId, IconOld, IconChevronLeft } from '@tabler/icons-svelte';
    import { goto } from "$app/navigation";

    export let data: PageServerData;
    $: ({ dog, owner } = data);

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

<main class="relative w-full h-full flex flex-col justify-start items-start gap-5 px-5">
    <button on:click={() => history.back()} class="flex gap-5">
        <IconChevronLeft />
        <span>Back</span>
    </button>
    <div class="flex justify-between gap-5">
        <h2 class="text-xl">{dog.nom}</h2>
        <svelte:component this={sexIcon(dog.male)} />
    </div>
    <div class="text-gray-500 flex gap-5">
        <IconOld class="size-6" />
        <span>Currently {age(dog.dateNaissance)}</span>
    </div>
    <div class="text-gray-500 flex gap-5">
        <IconId class="size-6" />
        <span>{dog.identificationAmicus}</span>
    </div>
    <div class="text-gray-500 flex gap-5">
        <IconPaw class="size-6" />
        <span>{dog.race}</span>
    </div>
    <div class="text-gray-500 flex gap-5">
        <IconUser class="size-6" />
        <button on:click={() => goto(`/owners/${owner._id}`)} class="flex justify-between items-center gap-5">
            Owned by {owner.prenom} {owner.nom} <IconExternalLink />
        </button>
    </div>
</main>
