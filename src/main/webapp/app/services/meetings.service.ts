import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Meeting } from '../../../webapp/app/models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private apiUrl = 'api/meetings'; // Adaptez à l'URL de votre API
  private mockMeetings: Meeting[] = [
    {
      id: 1,
      jobseekerId: 101, // L'ID d'un jobseeker existant
      date: new Date('2025-07-05T10:00:00'),
      type: 'Physique',
      location: 'Bureau de consultation',
      note: 'Premier contact, discussion des attentes.',
      tasks: [
        { id: 1, meetingId: 1, description: 'Envoyer documentation', isCompleted: false },
        { id: 2, meetingId: 1, description: 'Fixer prochain RDV', isCompleted: true },
      ]
    },
    {
      id: 2,
      jobseekerId: 102,
      date: new Date('2025-07-15T14:30:00'),
      type: 'Visio',
      location: 'Google Meet',
      note: 'Suivi CV et lettre de motivation.',
      tasks: [
        { id: 3, meetingId: 2, description: 'Réviser le CV', isCompleted: false },
      ]
    },
    {
      id: 3,
      jobseekerId: 101, // Même jobseeker que l'ID 1
      date: new Date('2025-07-20T09:00:00'),
      type: 'Téléphone',
      location: 'N/A',
      note: 'Point rapide sur les candidatures.',
      tasks: [
        { id: 4, meetingId: 3, description: 'Vérifier les retours d\'entretien', isCompleted: false },
      ]
    }
    // Ajoutez d'autres meetings factices si nécessaire
  ];

  constructor(private http: HttpClient) { }

  getMeetingsByJobseekerId(jobseekerId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}?jobseekerId=${jobseekerId}`);
  }

  /*en attente de l'API BackEnd
  getMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/${id}`);
  }*/


  createMeeting(meetings: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, meetings);
  }

  updateMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.apiUrl}/${meeting.id}`, meeting);
  }

  deleteMeeting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /*USAGE DE METHODE TEST*/

  getMeetingById(id: number): Observable<Meeting> {
    const foundMeeting = this.mockMeetings.find(m => m.id === id);
    if (foundMeeting) {
      console.log(`[MeetingsService Mock] Retourne le rendez-vous factice avec l'ID: ${id}`);
      return of(foundMeeting); // 'of' convertit l'objet en Observable
    } else {
      // Si l'ID n'est pas trouvé dans les mocks, simulez une erreur 404
      console.warn(`[MeetingsService Mock] Rendez-vous avec l'ID ${id} non trouvé. Simule une erreur.`);
      // Vous pouvez renvoyer un Observable.throw() pour simuler une erreur réelle si vous voulez tester le bloc 'error'
      // return throwError(() => new Error(`Rendez-vous avec l'ID ${id} non trouvé.`));
      return of(null as any); // Retourne null ou un objet Meeting par défaut pour éviter des erreurs de type dans le subscribe si vous ne gérez pas l'erreur.
      // L'idéal est de gérer la recherche non fructueuse avec un "throwError" comme commenté ci-dessus.
    }
  }
}