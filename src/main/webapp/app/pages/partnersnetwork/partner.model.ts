export interface Partner {
    id: number;
    entreprise: string;
    nomContact: string;
    prenomContact: string;
    activity: string,
    tel: string;
    adresse: string;
    dernierRdv: Date | null;
    prochainRdv: Date | null;
    status: string;
}

export class PartnerModel implements Partner {
    constructor(
        public id = 0,
        public entreprise = '',
        public nomContact = '',
        public prenomContact = '',
        public activity='',
        public tel = '',
        public adresse = '',
        public dernierRdv: Date | null = null,
        public prochainRdv: Date | null = null,
        public status = ''
    ) { }
}