<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import * as echarts from "echarts"
import { UseStore } from "@/store";

const store = UseStore()

//TODO 从后端请求获取
const userBalance = ref(114514)

//TODO 从后端获取
const totalConsumption = ref(1919810)

//TODO 从后端请求获取
const transactions = ref([
  {
    "point": 6,
    "recordId": 1,
    "transactionTime": 1692921600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -8,
    "recordId": 2,
    "transactionTime": 1693008000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 3,
    "transactionTime": 1693094400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 4,
    "transactionTime": 1693180800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 7,
    "recordId": 5,
    "transactionTime": 1693267200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 6,
    "transactionTime": 1693353600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 7,
    "transactionTime": 1693440000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 6,
    "recordId": 8,
    "transactionTime": 1693526400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -8,
    "recordId": 9,
    "transactionTime": 1693612800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 10,
    "transactionTime": 1693699200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 11,
    "transactionTime": 1693785600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 12,
    "transactionTime": 1693872000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 13,
    "transactionTime": 1693958400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 14,
    "transactionTime": 1694044800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 15,
    "transactionTime": 1694131200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 16,
    "transactionTime": 1694217600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 17,
    "transactionTime": 1694304000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 8,
    "recordId": 18,
    "transactionTime": 1694390400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 4,
    "recordId": 19,
    "transactionTime": 1694476800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 20,
    "transactionTime": 1694563200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 21,
    "transactionTime": 1694649600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 6,
    "recordId": 22,
    "transactionTime": 1694736000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -8,
    "recordId": 23,
    "transactionTime": 1694822400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -8,
    "recordId": 24,
    "transactionTime": 1694908800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 25,
    "transactionTime": 1694995200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 26,
    "transactionTime": 1695081600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 1,
    "recordId": 27,
    "transactionTime": 1695168000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -8,
    "recordId": 28,
    "transactionTime": 1695254400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 29,
    "transactionTime": 1695340800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 30,
    "transactionTime": 1695427200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -1,
    "recordId": 31,
    "transactionTime": 1695513600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 32,
    "transactionTime": 1695600000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 33,
    "transactionTime": 1695686400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 34,
    "transactionTime": 1695772800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 35,
    "transactionTime": 1695859200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -8,
    "recordId": 36,
    "transactionTime": 1695945600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 37,
    "transactionTime": 1696032000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 38,
    "transactionTime": 1696118400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -1,
    "recordId": 39,
    "transactionTime": 1692921600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 40,
    "transactionTime": 1693008000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 41,
    "transactionTime": 1693094400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -1,
    "recordId": 42,
    "transactionTime": 1693180800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 43,
    "transactionTime": 1693267200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 4,
    "recordId": 44,
    "transactionTime": 1693353600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 45,
    "transactionTime": 1693440000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -5,
    "recordId": 46,
    "transactionTime": 1693526400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 47,
    "transactionTime": 1693612800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 48,
    "transactionTime": 1693699200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 49,
    "transactionTime": 1693785600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 50,
    "transactionTime": 1693872000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 51,
    "transactionTime": 1693958400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 52,
    "transactionTime": 1694044800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 53,
    "transactionTime": 1694131200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 8,
    "recordId": 54,
    "transactionTime": 1694217600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 55,
    "transactionTime": 1694304000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 56,
    "transactionTime": 1694390400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -5,
    "recordId": 57,
    "transactionTime": 1694476800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 58,
    "transactionTime": 1694563200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 59,
    "transactionTime": 1694649600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 60,
    "transactionTime": 1694736000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 61,
    "transactionTime": 1694822400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 7,
    "recordId": 62,
    "transactionTime": 1694908800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 63,
    "transactionTime": 1694995200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 64,
    "transactionTime": 1695081600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 65,
    "transactionTime": 1695168000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 6,
    "recordId": 66,
    "transactionTime": 1695254400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 67,
    "transactionTime": 1695340800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 7,
    "recordId": 68,
    "transactionTime": 1695427200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 69,
    "transactionTime": 1695513600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 70,
    "transactionTime": 1695600000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 71,
    "transactionTime": 1695686400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 72,
    "transactionTime": 1695772800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 1,
    "recordId": 73,
    "transactionTime": 1695859200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 1,
    "recordId": 74,
    "transactionTime": 1695945600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 75,
    "transactionTime": 1696032000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 6,
    "recordId": 76,
    "transactionTime": 1696118400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 8,
    "recordId": 77,
    "transactionTime": 1692921600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 78,
    "transactionTime": 1693008000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 6,
    "recordId": 79,
    "transactionTime": 1693094400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 80,
    "transactionTime": 1693180800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -1,
    "recordId": 81,
    "transactionTime": 1693267200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 82,
    "transactionTime": 1693353600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -10,
    "recordId": 83,
    "transactionTime": 1693440000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 84,
    "transactionTime": 1693526400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 85,
    "transactionTime": 1693612800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 86,
    "transactionTime": 1693699200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 87,
    "transactionTime": 1693785600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -10,
    "recordId": 88,
    "transactionTime": 1693872000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 89,
    "transactionTime": 1693958400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 4,
    "recordId": 90,
    "transactionTime": 1694044800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 91,
    "transactionTime": 1694131200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 7,
    "recordId": 92,
    "transactionTime": 1694217600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 93,
    "transactionTime": 1694304000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -5,
    "recordId": 94,
    "transactionTime": 1694390400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -8,
    "recordId": 95,
    "transactionTime": 1694476800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 96,
    "transactionTime": 1694563200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 7,
    "recordId": 97,
    "transactionTime": 1694649600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 98,
    "transactionTime": 1694736000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -10,
    "recordId": 99,
    "transactionTime": 1694822400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 100,
    "transactionTime": 1694908800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -5,
    "recordId": 101,
    "transactionTime": 1694995200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 1,
    "recordId": 102,
    "transactionTime": 1695081600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 103,
    "transactionTime": 1695168000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 104,
    "transactionTime": 1695254400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 8,
    "recordId": 105,
    "transactionTime": 1695340800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 106,
    "transactionTime": 1695427200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 8,
    "recordId": 107,
    "transactionTime": 1695513600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 108,
    "transactionTime": 1695600000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 109,
    "transactionTime": 1695686400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 110,
    "transactionTime": 1695772800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 111,
    "transactionTime": 1695859200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 7,
    "recordId": 112,
    "transactionTime": 1695945600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -9,
    "recordId": 113,
    "transactionTime": 1696032000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 114,
    "transactionTime": 1696118400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 115,
    "transactionTime": 1692921600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 1,
    "recordId": 116,
    "transactionTime": 1693008000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 4,
    "recordId": 117,
    "transactionTime": 1693094400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 118,
    "transactionTime": 1693180800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 119,
    "transactionTime": 1693267200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 120,
    "transactionTime": 1693353600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 121,
    "transactionTime": 1693440000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 122,
    "transactionTime": 1693526400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 123,
    "transactionTime": 1693612800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 124,
    "transactionTime": 1693699200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -4,
    "recordId": 125,
    "transactionTime": 1693785600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 2,
    "recordId": 126,
    "transactionTime": 1693872000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 127,
    "transactionTime": 1693958400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 128,
    "transactionTime": 1694044800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -10,
    "recordId": 129,
    "transactionTime": 1694131200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 130,
    "transactionTime": 1694217600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 131,
    "transactionTime": 1694304000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 132,
    "transactionTime": 1694390400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -9,
    "recordId": 133,
    "transactionTime": 1694476800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 134,
    "transactionTime": 1694563200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -10,
    "recordId": 135,
    "transactionTime": 1694649600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 136,
    "transactionTime": 1694736000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 137,
    "transactionTime": 1694822400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 138,
    "transactionTime": 1694908800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -10,
    "recordId": 139,
    "transactionTime": 1694995200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 140,
    "transactionTime": 1695081600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 141,
    "transactionTime": 1695168000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 142,
    "transactionTime": 1695254400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -9,
    "recordId": 143,
    "transactionTime": 1695340800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 144,
    "transactionTime": 1695427200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 8,
    "recordId": 145,
    "transactionTime": 1695513600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 146,
    "transactionTime": 1695600000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 147,
    "transactionTime": 1695686400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 4,
    "recordId": 148,
    "transactionTime": 1695772800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 149,
    "transactionTime": 1695859200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 4,
    "recordId": 150,
    "transactionTime": 1695945600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 151,
    "transactionTime": 1696032000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 152,
    "transactionTime": 1696118400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 153,
    "transactionTime": 1692921600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -9,
    "recordId": 154,
    "transactionTime": 1693008000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 155,
    "transactionTime": 1693094400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 1,
    "recordId": 156,
    "transactionTime": 1693180800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 157,
    "transactionTime": 1693267200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -9,
    "recordId": 158,
    "transactionTime": 1693353600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -6,
    "recordId": 159,
    "transactionTime": 1693440000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 7,
    "recordId": 160,
    "transactionTime": 1693526400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -5,
    "recordId": 161,
    "transactionTime": 1693612800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 162,
    "transactionTime": 1693699200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -5,
    "recordId": 163,
    "transactionTime": 1693785600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 8,
    "recordId": 164,
    "transactionTime": 1693872000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 165,
    "transactionTime": 1693958400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 166,
    "transactionTime": 1694044800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 167,
    "transactionTime": 1694131200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 168,
    "transactionTime": 1694217600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 169,
    "transactionTime": 1694304000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -9,
    "recordId": 170,
    "transactionTime": 1694390400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 171,
    "transactionTime": 1694476800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -5,
    "recordId": 172,
    "transactionTime": 1694563200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 173,
    "transactionTime": 1694649600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 174,
    "transactionTime": 1694736000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -1,
    "recordId": 175,
    "transactionTime": 1694822400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 5,
    "recordId": 176,
    "transactionTime": 1694908800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 1,
    "recordId": 177,
    "transactionTime": 1694995200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 178,
    "transactionTime": 1695081600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 179,
    "transactionTime": 1695168000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 3,
    "recordId": 180,
    "transactionTime": 1695254400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -9,
    "recordId": 181,
    "transactionTime": 1695340800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 10,
    "recordId": 182,
    "transactionTime": 1695427200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -3,
    "recordId": 183,
    "transactionTime": 1695513600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -2,
    "recordId": 184,
    "transactionTime": 1695600000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 185,
    "transactionTime": 1695686400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 9,
    "recordId": 186,
    "transactionTime": 1695772800000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -7,
    "recordId": 187,
    "transactionTime": 1695859200000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 8,
    "recordId": 188,
    "transactionTime": 1695945600000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": -1,
    "recordId": 189,
    "transactionTime": 1696032000000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  },
  {
    "point": 0,
    "recordId": 190,
    "transactionTime": 1696118400000,
    "type": 0,
    "typeString": "\u526a\u8f91\u6d88\u8d39"
  }
])

//当前显示的时间区间中的起始时间
const currentStartTime = ref(getMonthRangeFromTimestamp(new Date().getTime())["start"])

function timestampToDate(timestamp) {
  let date = new Date(timestamp);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return month + "月" + day + "日";
}

function getMonthRangeFromTimestamp(timestamp) {
  // 创建对应日期的Date对象
  let date = new Date(timestamp);
  // 获取年份和月份
  let year = date.getFullYear();
  let month = date.getMonth();
  // 创建这个月的第一天的Date对象
  let startDate = new Date(year, month, 1);
  // 创建下个月的第0天的Date对象，即这个月的最后一天
  let endDate = new Date(year, month + 1, 0);

  return {
    start: startDate.getTime(),
    end: endDate.getTime() + 24 * 60 * 60 * 1000 - 1  // 添加一天的毫秒数-1，以得到该月份最后一天的最后一毫秒
  };
}

function getLastMonthRangeFromTimestamp(timestamp) {
  // 创建对应日期的Date对象
  let date = new Date(timestamp);
  // 获取年份和月份，注意月份是从0开始的，所以实际月份是date.getMonth()+1
  let year = date.getFullYear();
  let month = date.getMonth();

  // 创建上月的第一天的Date对象，如果month为0，即1月份，年份需要减1，月份设置为12月
  let lastMonthStartDate = month === 0 ? new Date(year - 1, 11, 1) : new Date(year, month - 1, 1);
  // 创建这个月的第一天，即上个月最后一天的Date对象
  let lastMonthEndDate = new Date(year, month, 0);

  return {
    start: lastMonthStartDate.getTime(),
    end: lastMonthEndDate.getTime() + 24 * 60 * 60 * 1000 - 1  // 添加一天的毫秒数-1，以得到上个月最后一天的最后一毫秒
  };
}

function getMonthDays(timestamp) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  let dateArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dateArray.push(`${month + 1}月${i}日`);
  }
  return dateArray;
}

function getNextMonthRangeFromTimestamp(timestamp) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  let nextMonthStartDate = new Date(year, month, 1);
  let nextMonthEndDate = new Date(year, month + 1, 0);

  let result = {
    start: nextMonthStartDate.getTime(),
    end: nextMonthEndDate.getTime()
  };
  return result;
}

//当前图表是否是在画daily
const currentChartDaily = ref(true)

const currentYearMonth = computed(() => {
  let date = new Date(currentStartTime.value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  return `${year}年${month}月`;
})

const redrawChart = (daily: boolean) => {
  //根据transactions形成每天的交易额度
  let timeRange = getMonthRangeFromTimestamp(currentStartTime.value)

  let consumptionRecordMap = {}
  //先全部初始化为0
  let dayArray = getMonthDays(currentStartTime.value)
  for (let i = 0; i < dayArray.length; i++) {
    let day = dayArray[i]
    consumptionRecordMap[day] = 0
  }

  for (let i = 0; i < transactions.value.length; i++) {
    let record = transactions.value[i]
    if (record["point"] >= 0)
      continue

    //只保留当月的
    if (record["transactionTime"] < timeRange.start || record["transactionTime"] > timeRange.end)
      continue

    let formattedDate = timestampToDate(record["transactionTime"])
    consumptionRecordMap[formattedDate] += -record["point"]
  }

  //根据其实时间戳形成这个月每天的支出累计
  let cumulativeRecordMap = {}

  let total = 0
  for (let i = 0; i < dayArray.length; i++) {
    let day = dayArray[i]
    total += consumptionRecordMap[day]
    cumulativeRecordMap[day] = total
  }

  //形成indexes 和 values
  let indexes = []
  let values = []

  let option = {}

  if (daily) {
    //展示每天的
    for (let date in consumptionRecordMap) {
      indexes.push(date)
      values.push(consumptionRecordMap[date])
    }

    option = {
      title: {
        text: '每日消费详情'
      },
      xAxis: {
        data: indexes
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: values,
          itemStyle: {
            color: "#7eceba"
          }
        }
      ]
    };
  } else {
    //展示总计的
    for (let date in cumulativeRecordMap) {
      indexes.push(date)
      values.push(cumulativeRecordMap[date])
    }

    option = {
      title: {
        text: '当月累计消费'
      },
      xAxis: {
        data: indexes
      },
      yAxis: {},
      series: [
        {
          type: 'line',
          data: values,
          itemStyle: {
            color: "#7eceba"
          },
          areaStyle: {
            color: '#7eceba',
            opacity: 0.3
          }
        }
      ]
    };
  }

  let chart = echarts.getInstanceByDom(document.getElementById("chart-content"))
  chart.setOption(option);
}

const toNextMonth = () => {
  //TODO 这里重新请求一下后端，更新一下transactions，开始结束时间就是下面timeRange的start和end

  let timeRange = getNextMonthRangeFromTimestamp(currentStartTime.value)
  currentStartTime.value = timeRange["start"]
  redrawChart(currentChartDaily.value)
}

const toPrevMonth = () => {
  //TODO 这里重新请求一下后端，更新一下transactions，开始结束时间就是下面timeRange的start和end

  let timeRange = getLastMonthRangeFromTimestamp(currentStartTime.value)
  currentStartTime.value = timeRange["start"]
  redrawChart(currentChartDaily.value)
}

onMounted(() => {
  store.$state.dark = false
  //TODO 在这里发送请求获取需要的参数，开始结束时间就是下面timeRange的start和end
  let timeRange = getMonthRangeFromTimestamp(currentStartTime.value)

  let chart = echarts.init(document.getElementById('chart-content'));

  window.addEventListener("resize", function () {
    chart.resize()
  })

  redrawChart(true)
})

const transactionTimeTableFormatter = (row, column, cellValue, index) => {
  let time = row.transactionTime
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}年${month}月${day}日`;
}

const pointTableFormatter = (row, column, cellValue, index) => {
  let point = row.point
  if (point < 0)
    return point
  else
    return '+' + point
}

</script>

<template>
  <div class="whole-page">
    <div class="view-content">
      <div class="balance-area">
        <span class="text-title">
          Account Balance
        </span>

        <div class="show-balance">
          <div class="show-balance-frame">
            <a-space>
              <div class="show-balance-icon" style="background-color: #1fb98a">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em"
                  width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                  <path fill-rule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>

              <div class="show-balance-text">
                <div class="card-text">
                  当前余额
                </div>
                <div class="card-number">
                  ￥{{ userBalance }}
                </div>
              </div>
            </a-space>

          </div>

          <div class="show-balance-frame">
            <a-space>
              <div class="show-balance-icon" style="background-color: #f2a741">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em"
                  width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z">
                  </path>
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>

              <div class="show-balance-text">
                <div class="card-text">
                  累计消费
                </div>
                <div class="card-number">
                  ￥{{ totalConsumption }}
                </div>
              </div>
            </a-space>
          </div>
        </div>
      </div>


      <div class="transaction-area">
        <span class="text-title">
          Trading Particulars
        </span>

        <div class="transaction-chart-description">
          下图和下表展示了您的交易记录以及统计信息
        </div>

        <div class="transaction-operate-area" style="position:relative;margin-top: 10px; margin-bottom: 30px">
          <div class="month-select" style="display: inline-block">
            <svg @click="toPrevMonth" style="vertical-align: center;cursor: pointer;display: inline-block"
              stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
              stroke-linejoin="round" class="chevron" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>

            <div class="month"
              style="font-weight: 700;margin-left: 25px;margin-right: 25px;font-size: 20px;text-align: center;vertical-align: center; display: inline-block">
              {{ currentYearMonth }}
            </div>

            <svg @click="toNextMonth" style="vertical-align: center;cursor: pointer;display: inline-block"
              stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
              stroke-linejoin="round" class="chevron" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>

          <div class="data-select" style="display: inline-block; right: 0; position: absolute; height: 32px;">
            <label :class="{ 'data-select-selected': currentChartDaily, 'data-select-unselected': !currentChartDaily }"
              @click="currentChartDaily = true; redrawChart(true)">每日消费</label>
            <label :class="{ 'data-select-selected': !currentChartDaily, 'data-select-unselected': currentChartDaily }"
              @click="currentChartDaily = false; redrawChart(false)">当月总计</label>
          </div>
        </div>

        <div class="show-diagram" style="width: 100%">
          <div id="chart-content" style="width: 100%; height: 300px">

          </div>
        </div>

        <div class="show-table">

          <el-collapse>
            <el-collapse-item class="collapse-item">
              <template #title>
                <el-icon>
                  <icon-list />
                </el-icon>
                &nbsp;展示交易记录
              </template>
              <el-table :data="transactions" style="width: 100%" class="table-item">
                <el-table-column :formatter="transactionTimeTableFormatter" label="时间" />
                <el-table-column :formatter="pointTableFormatter" label="金额" />
                <el-table-column prop="typeString" label="备注" />
              </el-table>
            </el-collapse-item>

          </el-collapse>


        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.whole-page {
  background-color: rgb(241, 245, 249);
  min-height: 100vh;
}

.text-title {
  color: black;
  font-weight: bold;
  font-size: xx-large;
  font-family: 'Times New Roman', Times, serif;
}

.card-text {
  font-family: 黑体;
  font-size: medium;
}

.card-number {
  font-size: 22px;
  font-weight: bold;
}

.show-balance-frame {
  padding: 15px 30px;
  border: 1px solid lightgray;
  border-radius: 4px;
  position: relative;
  margin-right: 30px;
  margin-left: 30px;
  overflow-x: visible;
  display: flex;
  flex-direction: row;
}

.show-balance-frame:hover {
  background-color: #e2e8f0;
}

.show-balance-text {
  margin-left: 25px;
  position: relative;
}

.show-balance-icon {
  border-radius: 4px;
  width: 54px;
  height: 54px;

}

.show-balance-icon svg {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: white;
  width: 24px;
  height: 24px;
}

.transaction-chart-description {
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 18px;
  font-family: 黑体;
}

.data-select-unselected {
  background-color: #ececf1;
  text-align: center;
  border-radius: 1px;
  color: #acacbe;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  padding: 8px;
}

.data-select-selected {
  background-color: #ececf1;
  text-align: center;
  border-radius: 1px;
  color: #353740;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  padding: 8px;
}

.view-content {
  padding-top: 10px;
  margin-left: 20%;
  margin-right: 20%;
  color: #353740;
}

.show-balance {
  display: flex;
  flex-direction: row;
  margin-top: 3%;
  margin-bottom: 3%
}

.collapse-item {
  --el-collapse-header-font-size: 15px;
  --el-collapse-header-bg-color:rgb(241, 245, 249);
  --el-collapse-content-bg-color:rgb(241, 245, 249);
}

.table-item {
  --el-table-tr-bg-color:rgb(241, 245, 249);
  --el-table-header-bg-color:rgb(241, 245, 249);
  --el-table-bg-color:rgb(241,245,249)
  
}
</style>