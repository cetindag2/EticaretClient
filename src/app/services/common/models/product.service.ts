import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(products: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, products)
      .subscribe({
        next : (product)=> successCallBack(),
        error: (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      },
  });
}

async read (page: number= 0 , size: number=5 ,successCallBack?:() => void, errorCallBack?:(errorMessage: string) =>void): 
Promise<{totalCount:number; products: List_Product[]}> {
  const observable:  Observable<{totalCount:number; products: List_Product[]}> = this.httpClientService.get<{totalCount:
    number; products: List_Product[]}> ({
    controller: "products",
    queryString: `page=${page}&size=${size}`
  });
  
  const promiseData = firstValueFrom(observable);
  promiseData.then(value => successCallBack())
  .catch(error => errorCallBack(error));
  return await promiseData;
}

async delete(id: string) {
  const deleteObservable: Observable<any> =this.httpClientService.delete<any>({
    controller: "products"
  }, id);
  await firstValueFrom(deleteObservable);
}

async readImages (id:string, successCallBack?:() => void) :Promise<List_Product_Image[]> {
  const getObservable: Observable<List_Product_Image[]>= this.httpClientService.get<List_Product_Image[]>({
    action: "GetProductImages",
    controller:"products"
  }, id);
  
  
  const images :  List_Product_Image[]= await firstValueFrom(getObservable);
  successCallBack();
  return images
}
async deleteImage (id : string , imageId: string, successCallBack?:() => void) {

 const deleteObservable= this.httpClientService.delete({
  action :"deleteproductimage",
  controller:"products",
  queryString:  `imageId=${imageId}`
},id)

await firstValueFrom(deleteObservable);
successCallBack();
}

}
