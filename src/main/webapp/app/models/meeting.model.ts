export interface Meeting {
  id: number | null;
  jobseekerId: number;
  date: Date;
  type: 'Physique' | 'Téléphone' | 'Visio' | 'Autre';
  location?: string;
  note: string;
  tasks: Task[];
}

export interface Task {
  id: number | null;
  meetingId: number | null;
  description: string;
  content?: string;
  isCompleted: boolean;
  dueDate?: Date | null;
  status?: 'en attente' | 'en cours' | 'realise' | 'abandonne';
}
