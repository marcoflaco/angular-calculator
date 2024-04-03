// app.component.ts
import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator.component'; // Adjust the path as needed

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CalculatorComponent] // Import CalculatorComponent here if it's used in the template
})
export class AppComponent {
  // AppComponent logic here
}
