import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { PRODUCTS_PACKAGE_NAME, PRODUCTS_SERVICE_NAME, ProductsServiceClient } from '../../../../../types/proto/products';
import type { ClientGrpc } from '@nestjs/microservices';

@Controller('product')
export class ProductController implements OnModuleInit {
    
    private productsService!: ProductsServiceClient;

    constructor(@Inject(PRODUCTS_PACKAGE_NAME) private client: ClientGrpc) { }
    
    onModuleInit() {
        this.productsService = this.client.getService<ProductsServiceClient>(PRODUCTS_SERVICE_NAME)
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct({ productId: Number(id) });
    }
}
