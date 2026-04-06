---
description: เรียนรู้การใช้ db.collection.updateOne() เพื่อแก้ไขเอกสารหนึ่งรายการใน MongoDB collection พร้อมตัวอย่าง syntax และผลลัพธ์
title: db.collection.updateOne()
keywords: [updateone, mongodb, update, document, tutorial]
meta:
  author: MongoDB Thailand Community
  language: th
---

คำสั่ง `db.collection.updateOne()` เป็นคำสั่งสำหรับ แก้ไขข้อมูลเข้าไปใน `collection` เพียง 1 `document`
อ้างอิงจาก [ลิงค์นี้](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateone/)

## ข้อมูลที่ Return

เมื่อใช้คำสั่งนี้จะข้อมูลที่ Return มาจะมี
`{ "acknowledged" : boolean, "insertedId" ObjectId, "matchedCount" : number, "modifiedCount" : number, "upsertedCount": number }`

- `acknowledged` มีค่าเป็น Boolean
- `insertedId` มีค่าเป็น `ObjectId` ระบุ `_id` หากไม่มีข้อมูล แล้วใส่ `upsert: true`
- `matchedCount` มีค่าเป็น `number` ระบุว่าค้นหาข้อมูลที่เจอทั้งหมดเท่าไหร่
- `modifiedCount` มีค่าเป็น `number` ระบุว่าแก้ไขข้อมูลที่เจอไปทั้งหมดเท่าไหร่
- `upsertedCount` มีค่าเป็น `number` ระบุว่าเพิ่มข้อมูลใหม่เข้าไปทั้งหมดเท่าไหร่

## Syntax

```js
db.collection.updateOne(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>        // Available starting in MongoDB 4.2.1
   }
)
```

| Parameter      | ชนิดข้อมูล     | คำอธิบาย               |
| -------------- | ----------- | --------------------- |
| filter         | document    | กำหนดเงื่อนไขว่า จะให้อ่าน document ที่ตรงกับเงื่อนไข ขึ้นมาแก้ไข                                                             |
| update         | document/pipeline | เป็น document ที่มีค่าที่จะเอาไปแก้ไขใน document ที่ตรงตามเงื่อนไข                                                     |
| upsert         | boolean           | (Optional) - ระบุ true หรือ false ถ้าเป็น true คือถ้าไม่เจอ document ตามเงื่อนไขที่ระบุ ให้ สร้าง document ใหม่ ค่าเริ่มต้นเป็น false  |
| writeConcern   | document          | (Optional) - สามารถดูการตั้งค่า [เพิ่มเติมในนี้ได้ครับ](https://www.mongodb.com/docs/manual/reference/write-concern/) |
| collation      | document          | (Optional) - ระบุข้อมูลที่เกี่ยวข้องทางภาษา เพื่อใช้ในการเปรียบเทียบข้อมูลในขณะค้นหาเช่นภาษาไทย ตัวเล็กตัวใหญ่                   |
| arrayFilters   | filterdocument    | (Optional) - ระบุข้อมูล filter ลงไปในส่วนที่เป็น array เพื่อทำให้ข้อมูลในการค้นหามาแก้ไขนั้นละเอียดขึ้น                        |
| hint           | document/string   | (Optional) - ระบุชื่อของ index ว่าตอน filter ข้อมูลมา update นั้นให้เรียกใช้ index นี้                            |

## Example

เพื่อความเข้าใจเรามาดูการใช้งานกันดีกว่าครับ

ชุดข้อมูลมีดังนี้

```js
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

ให้แก้ไขข้อมูล `age`(อายุ) เพียง 1 `document` ที่มี `position` เป็น `Senior Developer`

```js
db.collection.updateOne({
  "position": "Senior Developer"
},
{
  $set: {
    "age": 30
  }
})
```

จะได้ response กลับมา

```js
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```
