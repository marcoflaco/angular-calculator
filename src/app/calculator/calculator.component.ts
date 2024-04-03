import { Component, HostListener } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  standalone: true, // Mark the component as standalone
  imports: [CommonModule]
})
export class CalculatorComponent {
  currentInput: string = '';
  previousInput: string = '';
  operation: string | null = null;
  displayValue: string = '0';
  currentSkin: string = 'calculator'; // Default skin class

  constructor(private calcService: CalculatorService) { }

  onDigit(digit: string) {
    this.currentInput += digit;
    this.updateDisplay();
  }

  performOperation(op: string) {
    if (!this.currentInput) return;

    if (this.operation) {
      this.calculate();
    } else {
      this.previousInput = this.currentInput;
      this.currentInput = '';
    }
    this.operation = op;
  }

  calculate() {
    const current = parseFloat(this.currentInput);
    const previous = parseFloat(this.previousInput);

    if (isNaN(current) || isNaN(previous) || !this.operation) return;

    let result: number;

    switch (this.operation) {
        case '+':
            result = this.calcService.add(previous, current);
            break;
        case '-':
            result = this.calcService.subtract(previous, current);
            break;
        case '*':
            result = this.calcService.multiply(previous, current);
            break;
        case '/':
            result = this.calcService.divide(previous, current);
            break;
        case 'square':
            result = this.calcService.square(previous);
            break;
        case 'sqrt':
            result = this.calcService.sqrt(previous);
            break;
        default:
            return; // If the operation is not recognized, exit without changing the display
    }

    // Update the display with the result
    this.displayValue = result.toString();

    // Reset the currentInput to the result for further calculations, and clear the operation and previousInput
    this.currentInput = result.toString();
    this.previousInput = '';
    this.operation = null;
}


  clear() {
    this.currentInput = '';
    this.previousInput = '';
    this.operation = null;
    this.displayValue = '0';
  }

  updateDisplay() {
    this.displayValue = this.currentInput || this.previousInput || '0';
  }

  changeSkin(skin: string): void {
    this.currentSkin = skin;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key >= '0' && event.key <= '9') {
      this.onDigit(event.key);
    } else {
      switch (event.key) {
        case '+':
        case '-':
        case '*':
        case '/':
          this.performOperation(event.key);
          break;
        case 'Enter':
          this.calculate();
          break;
        case 'Escape':
          this.clear();
          break;
        case 'Backspace':
          this.currentInput = this.currentInput.slice(0, -1);
          break;
      }
    }
    event.preventDefault(); // Prevent default to stop any other behavior triggered by these keys
  }
}
