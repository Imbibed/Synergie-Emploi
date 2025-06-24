export interface JobSeeker {
  id: number;
  gender: string;
  nom: string;
  prenom: string;
  qpv: string;
  activity: string;
  dernierRdv: Date | null;
  licence: string;
  status: number;
}

export class JobSeekerModel implements JobSeeker {
  constructor(
    public id = 0,
    public gender = '',
    public nom = '',
    public prenom = '',
    public qpv = '',
    public activity = '',
    public dernierRdv: Date | null = null,
    public licence = '',
    public status = 0
  ) {}
}