import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [NgChartsModule, MatCardModule, CommonModule],
})
export class DashboardComponent {

  // Données du camembert
  pieChartLabels = ['Actif', 'Inactif', 'Nouveau partenaire'];
  pieChartData: ChartData<'pie', number[], string> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [45, 25, 30],
      backgroundColor: ['#84d1c7', '#247f9a', '#d184c7'],
      hoverBackgroundColor: ['#a0e0d8', '#3a9cc1', '#d5a9d3'],
    }],
  };

  // Données de la courbe
  lineChartLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'];
  lineChartData: ChartData<'line', number[], string> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        label: 'Rendez-vous Dernier RDV',
        data: [12, 19, 15, 25, 22, 30, 35],
        fill: false,
        borderColor: '#247f9a',
        backgroundColor: '#84d1c7',
        tension: 0.3,
      },
      {
        label: 'Rendez-vous Prochain RDV',
        data: [8, 12, 10, 18, 15, 20, 25],
        fill: false,
        borderColor: '#9a247f',
        backgroundColor: '#d184c7',
        tension: 0.3,
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

/*Gestion de l'impression PDF */
   printStats(sectionId: string) {
    const section = document.querySelector(`.kpi-section.${sectionId}`);
    if (!section) {
      console.warn('Section non trouvée:', sectionId);
      return;
    }

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      alert('Impossible d’ouvrir la fenêtre d’impression');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Impression des statistiques</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { color: #247f9a; }
            canvas { max-width: 100%; height: auto !important; }
          </style>
        </head>
        <body>
          ${section.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  }

}

