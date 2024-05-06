import { API_URL } from '$env/static/private';
import type { Dog } from '$models/Dog';
import type { Owner } from '$models/Owner';
import type { PageServerLoad } from './$types';

async function getOwner(id: string) {
    const response = await fetch(`${API_URL}/owners/${id}`);
    const result = await response.json();
    return result.data as Owner;
}

async function getDog(id: string) {
    const response = await fetch(`${API_URL}/dogs/${id}`);
    const result = await response.json();
    return result.data as Dog;
}

export const load: PageServerLoad = async ({ params }) => {
    const dog = await getDog(params.id);
    const owner = await getOwner(dog.proprietaireId);

    return { dog, owner };
};
