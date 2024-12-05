import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-form-dash',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-form-dash.component.html',
  styleUrl: './create-form-dash.component.scss'
})
export class CreateFormDashComponent {
  burgerForm!: FormGroup;
  imagePreview: string | null = null;

  buttonValid: boolean = false
  responseValid: boolean | undefined

  message: string = ""

  private imageFileNew: string = ""
  private token: any

  constructor(
    private fb: FormBuilder,
    private _productService: ProductsService,
    private _userService: UserService

  ) { 

    this.token = _userService.getLocalToken()

  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.burgerForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      price: ["", [Validators.required, Validators.min(0.01)]],
      discount: ["", [Validators.max(100)]],
      image: [null]
    });
  }

  onImageChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      this.imageFileNew = event.target.files[0];
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.burgerForm.valid) {
      return
    }

    this.buttonValid = true
    this.message = ""
    this.responseValid = undefined
    
    const product: FormData = new FormData()
    product.append("name", this.burgerForm.get("name")?.value)
    product.append("description", this.burgerForm.get("description")?.value)
    product.append("price", this.burgerForm.get("price")?.value)
    product.append("discount", this.burgerForm.get("discount")?.value)
    product.append("image", this.imageFileNew)
    
    this._productService.create(product, this.token).subscribe({
      next: (response: any) => {

        if (parseInt(response.status) == 200) {

          this.message = "Hamburguesa creada exitosamente"
          this.responseValid = true

        } else {
          this.buttonValid = false
          this.message = "Hubo un error! Vuelve a intentarlo"
          this.responseValid = false
        }

      }
    })

  }

  onCancel() {
    this.initForm();
  }
}
