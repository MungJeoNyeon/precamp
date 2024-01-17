//import { CashService } from './services/cash.service.js'

export class CouponController {
  constructor(cashService) {
    this.cashService = cashService;
  }

  buyCoupon = (req, res) => {
    // 1. 가진돈 검증하는 코드(10줄 => 2줄 => 1줄)
    // const cashService = new CashService()
    const hasMoney = this.cashService.checkValue();

    // 2. 쿠폰 구매하는 코드(10줄)
    if (hasMoney) {
      res.send("쿠폰을 구매합니다.");
    }
  };
}