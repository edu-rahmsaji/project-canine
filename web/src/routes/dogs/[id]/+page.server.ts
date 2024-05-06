import { API_URL } from '$env/static/private';
import type { Dog } from '$models/Dog';
import type { PageServerLoad } from './$types';

async function getDog(id: string) {
    const response = await fetch(`${API_URL}/dogs/${id}`);
    const result = await response.json();
    return result.data as Dog;
}

export const load: PageServerLoad = async ({ params }) => {
    return {
        dog: await getDog(params.id)
    };
};
