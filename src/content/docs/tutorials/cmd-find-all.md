---
description: การใช้งาน db.collection.find()
title: db.collection.find()
---
คำสั่ง `db.collection.find()` เป็นคำสั่งสำหรับ เรียกดูข้อมูลใน `collection` นั้นๆ
อ้างอิงจาก [ลิงค์นี้](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/)

## ตัวอย่างแรก

หากต้องการเรียกดูข้อมูลทั้งหมดจะใช้คำสั่งดังนี้

```js
db.collection.find({})
```

## ตัวอย่างที่สอง

จากชุดข้อมูลด้านล่างนี้ ถ้าต้องการค้นหาข้อมูลทั้งหมดที่ `education` เป็น `Bachelor` เราจะเขียนคำสั่ง MongoDB Query API ได้อย่างไร

```javascript
[
  {
    "name": "Person name 1",
    "position": "Developer",
    "age": 25,
    "education": [
      {
        2021: "Diploma"
      },
      {
        2022: "Bachelor"
      }
    ],
    "createdby": ISODate("2023-01-01")
  },
  {
    "name": "Person name 2",
    "position": "Developer",
    "age": 26,
    "education": [
      {
        2021: "Vocational school"
      },
      {
        2022: "Bachelor"
      }
    ],
    "createdby": ISODate("2023-02-01")
  },
  {
    "name": "Person name 3",
    "position": "Senior Developer",
    "age": 30,
    "education": [
      {
        2021: "Bachelor"
      },
      {
        2022: "Master"
      }
    ],
    "createdby": ISODate("2023-02-03")
  }
]
```

## คำตอบ

```javascript
db.collection.find({
  $or: [
    { "education.2021": "Bachelor" },
    { "education.2022": "Bachelor" }
  ]
})
```
