import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent} from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService,
    private httpClientService: HttpClientService,
    // private dialogService: DialogService
    ) {
    super(spinner)
   }

  ngOnInit(): void {

  }
  
  @ViewChild(ListComponent) listComponents : ListComponent;

  createdProduct(createdProduct : Create_Product) {
    this.listComponents.getProducts();
  }
}