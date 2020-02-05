import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Brand, ProductGroup, Product, Size, FullSizeId } from './model';
import { produce } from 'immer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private brandsSubject = new BehaviorSubject<Brand[]>([]);
  brands$ = this.brandsSubject.asObservable();

  brands: Brand[] = [];

  constructor() { }

  load() {

    let counter = 0;

    let brands: Array<Brand> = [];

    for (let i=0; i<5; i++) {
      const brand: Brand = {
        id: counter++,
        name: 'Brand #' + i,
        productGroups: []
      };
      brands.push(brand);

      for (let j=0; j<10; j++) {

        const group: ProductGroup = {
          id: counter++,
          name: `Group ${i}-${j} `,
          products: []
        };
        brand.productGroups.push(group);

        for (let k=0; k<35; k++) {
          const prod: Product = {
            id: counter++,
            name: `Prod ${i}-${j}-${k} `,
            sizes: []
          };
          group.products.push(prod);

          for (let l=0; l<100; l++) {
            const size: Size = {
              id: counter++,
              name: `${i}-${j}-${k}-${l} `,
              menge: 0
            };
            prod.sizes.push(size);
  
          }
  
        }

      }


    }

    this.brands = brands;
    this.brandsSubject.next(brands);

  }

  update(id: FullSizeId, menge: number) {
   
    // const newBrands = this.brands.map(b => 
    //   b.id !== id.brandId ?
    //   b :
    //   {
    //     ...b,
    //     productGroups: b.productGroups.map(g => 
    //       g.id   
    //     )
    //   });

    const oldBrands = this.brands;

    this.brands = produce(this.brands, draft => {
      //debugger;
      const brand = draft[id.brandId];
      const group = brand.productGroups[id.productGroupId];
      const prod = group.products[id.productId];
      const size = prod.sizes[id.sizeId];
      size.menge = menge;
    });

    this.brandsSubject.next(this.brands);
  }

}
