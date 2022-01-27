import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: '',
    price: Number()
  }

  buttonSubmit: string = "";
  buttonColor: string = "primary";
  action: boolean = false;
  funcSubmit: () => void = () => {};

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (window.location.href.includes("delete")) {
      const id = this.route.snapshot.paramMap.get('id') || '';
      this.productService.readById(id).subscribe(product => {
        this.product = product;
      })
      this.action = true;
      this.buttonColor = "warn";
      this.buttonSubmit = "Deletar";
      this.funcSubmit = this.deleteProduct;
    }
    if (window.location.href.includes("update")) {
      const id = this.route.snapshot.paramMap.get('id') || '';
      this.productService.readById(id).subscribe(product => {
        this.product = product;
      })
      this.buttonSubmit = "Atualizar"
      this.funcSubmit = this.updateProduct;
    }
    if (window.location.href.includes("create")) {
      this.buttonSubmit = "Salvar";
      this.funcSubmit = this.createProduct;
    }
  }

  createProduct(): void {
    this.product.price = Number(this.product.price);
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado');
      this.router.navigate(['/products']);
    })
  }

  deleteProduct(): void{
    this.productService.delete(this.product.id || 0).subscribe(() => {
      this.productService.showMessage('Produto deletado com sucesso');
      this.router.navigate(['/products']);
    })
  }

  updateProduct(): void{
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso");
      this.router.navigate(['/products']);
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
