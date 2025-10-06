---
description: การใช้งาน db.collection.deleteMany()
title: db.collection.deleteMany()
---

คำสั่ง `db.collection.deleteMany()` เป็นคำสั่งสำหรับ ลบข้อมูลทั้งหมด ที่เงื่อนไขที่กำหนด 
อ้างอิงจาก [ลิงค์นี้](https://www.mongodb.com/docs/manual/reference/method/db.collection.deletemany/)

## ข้อมูลที่ Return

เมื่อใช้คำสั่งนี้จะข้อมูลที่ Return มาจะมี

```js
{ 
  "acknowledged" : boolean, 
  "deletedCount": number 
}
```

- `acknowledged` มีค่าเป็น Boolean
- `deletedCount` มีค่าเป็น `number` ระบุว่าค้นหาข้อมูลที่เจอทั้งหมดเท่าไหร่

## Syntax

```js
db.collection.deleteMany(
   <filter>,
   {
      writeConcern: <document>,
      collation: <document>,
      hint: <document>|<string>
   }
)
```

| Parameter      | ชนิดข้อมูล     | คำอธิบาย               |
| -------------- | ----------- | --------------------- |
| filter         | document    | กำหนดเงื่อนไขว่า จะให้อ่าน document ที่ตรงกับเงื่อนไข มาลบ                                                            |
| writeConcern   | document          | (Optional) - สามารถดูการตั้งค่า [เพิ่มเติมในนี้ได้ครับ](https://www.mongodb.com/docs/manual/reference/write-concern/) |
| collation      | document          | (Optional) - ระบุข้อมูลที่เกี่ยวข้องทางภาษา เพื่อใช้ในการเปรียบเทียบข้อมูลในขณะค้นหาเช่นภาษาไทย ตัวเล็กตัวใหญ่                   |
| hint           | document/string   | (Optional) - ระบุชื่อของ index ว่าตอน filter ข้อมูลมา update นั้นให้เรียกใช้ index นี้                            |

## Example

เพื่อความเข้าใจเรามาดูการใช้งานกันดีกว่าครับ

มีข้อมูลใน collection ดังนี้

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

ต้องการลบข้อมูลที่ `age` มากกว่า `27`

```js
db.collection.deleteMany({"age": { "$gte": 27 }})
```

จะได้ response กลับมา

```js
{
  acknowledged: true,
  deletedCount: 1
}
```
