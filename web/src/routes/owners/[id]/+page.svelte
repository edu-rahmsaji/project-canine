<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageServerData } from './$types';
    import { IconMap, IconOld, IconCertificate, IconCertificateOff, IconMail, IconPhone, IconChevronLeft, IconDog, IconExternalLink } from '@tabler/icons-svelte';

    export let data: PageServerData;
    $: ({ owner, dogs } = data);

    function age(dob: string | Date) {
        dob = typeof dob === 'string' ? new Date(dob) : dob;
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
    <h1 class="text-xl">{owner.prenom} {owner.nom}</h1>
    <div class="text-gray-500 flex gap-5">
        <IconOld class="size-6" />
        <span>Currently {age(owner.dateNaissance)}</span>
    </div>
    <div class="text-gray-500 flex gap-5">
        <IconMap class="size-6" />
        <span>{owner.adresse}, {owner.localite.npa} {owner.localite.localite}</span>
    </div>
    <div class="text-gray-500 flex gap-5">
        {#if owner.certificatDelivre}
            <IconCertificate class="size-6" />
            <span>Certifié le {new Date(owner.certificatDelivre).toLocaleDateString('fr-CH')}</span>
        {:else}
            <IconCertificateOff class="size-6" />
            <span>Non certifié</span>
        {/if}
    </div>
    <div class="flex flex-col gap-5">
        Contact
        <div class="text-gray-500 flex flex-col gap-5">
            {#each owner.mails as mail}
                <div class="flex gap-5">
                    <IconMail class="size-6" />
                    <a href="mailto:{mail.mail}">{mail.mail} ({mail.type})</a>
                </div>
            {/each}
            {#each owner.telephones as telephone}
                <div class="flex gap-5">
                    <IconPhone class="size-6" />
                    <a href="tel:{telephone.numero.replaceAll(" ", "")}">{telephone.numero} ({telephone.type})</a>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex flex-col gap-5">
        Pets
        <div class="text-gray-500 flex flex-col gap-5">
            {#each dogs as dog}
                <button on:click={() => goto(`/dogs/${dog._id}`)} class="flex gap-5">
                    <IconDog />
                    <span>{dog.nom}</span>
                    <IconExternalLink />
                </button>
            {/each}
        </div>
    </div>
</main>
