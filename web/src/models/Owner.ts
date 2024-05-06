import type { Locality } from './Locality';
import type { Mail } from './Mail';
import type { Phone } from './Phone';

export interface Owner {
    _id: string;
    adresse: string;
    certificatDelivre: Date | null;
    dateNaissance: Date;
    nom: string;
    origine: string;
    prenom: string;
    localite: Locality;
    mails: Mail[];
    telephones: Phone[];
}
