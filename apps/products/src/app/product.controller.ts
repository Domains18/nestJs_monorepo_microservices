import { Controller } from '@nestjs/common';
import { ProductRequest, ProductResponse, ProductsServiceController, ProductsServiceControllerMethods } from '../../../../types/proto/products';
import { Observable } from 'rxjs';


@Controller('product')
@ProductsServiceControllerMethods()
export class ProductController implements ProductsServiceController{
    getProduct(request: ProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
        return {
            productId: 2,
            name: "textbook",
            price: 123
        }
    }
}
