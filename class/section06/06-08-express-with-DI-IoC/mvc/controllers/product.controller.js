// product.controller.js

export class ProductController {
  constructor(cashService, productService) {
    this.cashService = cashService;
    this.productService = productService;
  }

  buyProduct = (req, res) => {
    // 1. 가진돈 검증하는 코드(10줄 => 2줄 => 1줄)
    // const cashService = new CashService()
    const hasMoney = this.cashService.checkValue();

    // 2. 판매여부 검증하는 코드(10줄 => 2줄 => 1줄)
    // const productService = new ProductService()
    const isSoldout = this.productService.checkSoldout();

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품을 구매합니다.");
    }
  };

  refundProduct = (req, res) => {
    // 1. 판매여부 검증하는 코드(10줄 => 2줄 => 1줄)
    // const productService = new ProductService()
    const isSoldout = this.productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send("상품을 환불합니다.");
    }
  };
}