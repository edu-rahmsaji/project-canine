import { API_URL } from '$env/static/private';
import type { Dog } from '$models/Dog';
import type { Owner } from '$models/Owner';
import type { PageServerLoad } from './$types';

async function getPets(id: string) {
    const response = await fetch(`${API_URL}/owners/${id}/dogs`);
    const result = await response.json();
    return result.data as Dog[];
}

async function getOwner(id: string) {
    const response = await fetch(`${API_URL}/owners/${id}`);
    const result = await response.json();
    return result.data as Owner;
}

export const load: PageServerLoad = async ({ params }) => {
    const owner = await getOwner(params.id);
    const dogs = await getPets(params.id);

    return { owner, dogs };
};
