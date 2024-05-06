import { API_URL } from '$env/static/private';
import type { Dog } from '$models/Dog';
import type { PageServerLoad } from './$types';

async function getDogs() {
    const response = await fetch(`${API_URL}/dogs`);
    const result = await response.json();
    return result.data as Dog[];
}

export const load: PageServerLoad = async () => {
    return {
        dogs: await getDogs()
    };
};
