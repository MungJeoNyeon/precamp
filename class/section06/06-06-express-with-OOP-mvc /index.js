// home.js

// const express = require('express') // 옛날방식 => commonjs
import express from 'express'         // 요즘방식 => module
import { ProductController } from './mvc/controllers/product.controller.js'

const app = express()

// 상품 API
const productController = new ProductController()
app.post("/products/buy", productController.buyProduct) // 상품 구매하기
app.post("/products/refund", productController.refundProduct) // 상품 환불하기


app.listen(3000, () => {
    console.log("백엔드 API 서버거 켜졌어요!!!")
})