export interface Experience {
  company: string;
  startDate: string; // Ou Date si tu préfères manipuler des objets Date
  endDate: string;   // Ou Date
  skills: string; // Si c'est une chaîne de caractères de compétences séparées, sinon string[] pour un tableau
  description: string;
  endFor?: string; // Optionnel si ce n'est pas toujours présent
}

// Interface pour les informations sur un enfant
export interface ChildInformation {
  id?:number;
  recordDate? : Date;
  name: string;
  surname: string;
  guardStatus: boolean;
  visitRight: boolean;
  presence: boolean;
}

export interface ParcoursEmploi {
  unemployedDate: Date;
  FranceTravailDate: Date;
  dernierRdv: Date,
  prochainRdv: Date,  
}

// Interface principale pour le demandeur d'emploi
export interface Jobseeker {
  id: number;
  urlPhoto?: string; // Optionnel
  entreprise?: string; // Optionnel si ce n'est pas toujours le cas
  descriptif?: string; // Optionnel
  urlAttachement?: string; // Optionnel
  nom: string;
  prenom: string;
  tel: string;
  portable?: string; // Optionnel
  email: string;
  jobTitle?: string; // Optionnel
  skills?: string[]; // Tableau de chaînes de caractères (si plusieurs compétences)
  experiences: Experience[]; // <-- Ici, c'est un tableau d'objets de type Experience
  famillySituation?: string; // Optionnel
  childrenInformations?: ChildInformation[]; // Optionnel, tableau d'objets ChildInformation
}
