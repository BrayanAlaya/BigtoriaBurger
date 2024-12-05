import { Component, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-form-dash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-form-dash.component.html',
  styleUrl: './update-form-dash.component.scss'
})
export class UpdateFormDashComponent {
  public burgerForm!: FormGroup;
  public imagePreview: string | null = null;
  public buttonValid: boolean = false
  public responseValid: boolean | undefined
  public message: string = ""
  public lastImage: string = ""
  public product_id: string = ""

  private imageFileNew!: string
  private token!: any

  constructor(
    private fb: FormBuilder,
    private _productService: ProductsService,
    private _Aroute: ActivatedRoute,
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
    });
    this._Aroute.queryParams.subscribe(params => {
      if (params["id"]) {

        this._productService.get(params["id"]).subscribe({
          next: (response: any) => {
            if (parseInt(response.status) == 200) {
              
              this.product_id = response.data[0].id
              this.burgerForm.get("name")?.setValue(response.data[0].name)
              this.burgerForm.get("description")?.setValue(response.data[0].description)
              this.burgerForm.get("price")?.setValue(response.data[0].price)
              this.burgerForm.get("discount")?.setValue(response.data[0].discount)
              this.lastImage = environment.s3url + response.data[0].image
              this.imagePreview = environment.s3url + response.data[0].image

            }
            
          }
        })
      } 
    })

    // this._productService.get()

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

    
    
    if (this.imageFileNew != undefined) {
      // console.log(this.imageFileNew);
      product.append("image", this.imageFileNew)
    }

    this._productService.update(product, this.product_id, this.token).subscribe({
      next: (response: any) => {

        if (parseInt(response.status) == 200) {

          this.message = "Hamburguesa actualizada exitosamente"
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
