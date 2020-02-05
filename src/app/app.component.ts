import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Brand, ProductGroup, Size, Product, FullSizeId } from './model/model';
import { ProductService } from './model/product.service';

const changeDetection = ChangeDetectionStrategy.OnPush;

@Component({
  selector: 'brand',
  template: `
    <h1 (click)="open = !open">Brand {{brand.name}}</h1>
    <ul *ngIf="open">
      <group *ngFor="let g of brand.productGroups" [group]="g"></group>
    </ul>
    {{blink()}}
  `,
  changeDetection
})
export class BrandComponent {
  @Input() brand: Brand;
  open = true;
  blink() {
    console.debug('rendering Brand ', this.brand.id);
  }
}


@Component({
  selector: 'group',
  template: `
      <h2 (click)="open = !open">Group {{group.name}}</h2>
    <ul *ngIf="open">
      <product *ngFor="let p of group.products" [product]="p"></product>
    </ul>
    {{blink()}}
  `,
  changeDetection
})
export class GroupComponent {
  @Input() group: ProductGroup;
  open = true;

  blink() {
    console.debug('rendering Group ', this.group.id);
  }

}

@Component({
  selector: 'product',
  template: `
        <h3 (click)="open = !open">Product {{product.name}}</h3>
    <ul *ngIf="open">
      <size *ngFor="let s of product.sizes" [size]="s"></size>
    </ul>
    {{blink()}}
  `,
  changeDetection
})
export class ProductComponent {
  @Input() product: Product;
  open = false;

  blink() {
    console.debug('rendering product ', this.product.id);
  }

}

@Component({
  selector: 'size',
  template:`
    <table>
      <th>{{size.name}}</th>
      <td><input [value]="size.menge" (change)="change($event.target.value)"></td>
    </table>
    {{blink()}}
  `,
  changeDetection
})
export class SizeComponent {

  constructor(private service: ProductService) {

  }

  @Input() size: Size;
  change(menge) {

    const ids = this.size.name.split('-');
    const id: FullSizeId = {
      brandId: +ids[0],
      productGroupId: +ids[1],
      productId: +ids[2],
      sizeId: +ids[3]
    }

    this.service.update(id, menge);

  }

  blink() {
    console.debug('rendering size ', this.size.id);
  }

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tree-example';

  brands$ = this.service.brands$;

  constructor(private service: ProductService) {
    this.service.load();
  }

}
