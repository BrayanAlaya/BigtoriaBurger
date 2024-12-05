import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})

export class PayComponent {
  public totalAmount: number = 19.99;
  public selectedMethod: string = '';
  public paymentForm: FormGroup;
  public paymentMessage: string = '';
  public isProcessing: boolean = false;
  public disableButton: boolean = false;
  public paymentStatus: string = '';

  constructor(
    public dialogRef: MatDialogRef<PayComponent>,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      yapeId: ['', [Validators.pattern('^[0-9]{9}$')]]
    });
  }

  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  resetForm() {
    this.selectedMethod = '';
    this.paymentForm.reset();
    this.paymentMessage = '';
  }

  onNoClick(): void {
    this.dialogRef.close({
      state: false,
      message: "Didn't accepted"
    }); 
  }

  onYesClick(): void {
    this.dialogRef.close({
      state: true,
      message: this.selectedMethod
    }); 
  }

  
}
