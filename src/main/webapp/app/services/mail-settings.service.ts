import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailSettingsService {
  subject: string = 'Bonjour';
  body: string = 'Dans le cadre de votre accompagnement au sein de notre centre d\'insertion professionnelle,nous souhaitons vous proposer un rendez-vous de suivi afin de faire le point sur votre situation et vos démarches en cours. Merci de bien vouloir nous indiquer vos disponibilités pour convenir d’un créneau dans les prochains jours. Nous restons à votre disposition pour toute question. Cordialement,  ';
  signature:string= 'Cordialement, l\'équipe Emploi Insertion de :';

  constructor() {}
}