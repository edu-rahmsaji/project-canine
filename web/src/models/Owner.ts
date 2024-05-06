import type { Locality } from './Locality';
import type { Mail } from './Mail';
import type { Phone } from './Phone';

export interface Owner {
    _id: string;
    adresse: string;
    /** A parsable date. */
    certificatDelivre: string | null;
    /** A parsable date. */
    dateNaissance: string;
    nom: string;
    origine: string;
    prenom: string;
    localite: Locality;
    mails: Mail[];
    telephones: Phone[];
}
