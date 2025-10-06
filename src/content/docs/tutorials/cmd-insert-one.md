---
description: การใช้งาน db.collection.insertOne()
title: db.collection.insertOne()
---

คำสั่ง `db.collection.insertOne()` เป็นคำสั่งสำหรับ เพิ่มข้อมูลเข้าไปใน `collection` เพียง 1 `document`
อ้างอิงจาก [ลิงค์นี้](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertone/)

## ข้อมูลที่ Return

เมื่อใช้คำสั่งนี้จะข้อมูลที่ Return มาจะมี

- `acknowledged` มีค่าเป็น Boolean
- `insertedId` ซึ่งจะมีค่า `_id` ของข้อมูลที่เราเพิ่มเข้าไป

## Syntax

```javascript
db.collection.insertOne(
    <document>,
    {
      writeConcern: <document>
    }
)
```

| Parameter      | ชนิดข้อมูล     | คำอธิบาย               |
| -------------- | ----------- | --------------------- |
| document       | document    | ข้อมูลที่ต้องการเพิ่มเข้าไป   |
| writeConcern   | document    | ไม่จำเป็น (Optional) - สามารถดูการตั้งค่า[เพิ่มเติมในนี้ได้ครับ](https://www.mongodb.com/docs/manual/reference/write-concern/)     |

> collection จะถูกสร้างมาให้โดยอัตโนมัติ ถ้าหากเราใช้คำสั่งนี้โดยที่ยังไม่ได้สร้าง collection

## Example

เพื่อความเข้าใจเรามาดูการใช้งานกันดีกว่าครับ

### เพิ่มข้อมูลโดยที่ไม่ได้ระบุ _id

```javascript
db.users.insertOne({
    "name": "Person name 1",
    "position": "Developer",
    "age": 25,
    "education": [
        { 2021: "Diploma" },
        { 2022: "Bachelor" }
    ],
    "createdby": ISODate("2023-01-01")
});
```

จะได้ response กลับมา

```javascript
{
   "acknowledged" : true,
   "insertedId" : ObjectId("6531dc55156e498421faa729")
}
```

> เนื่องจากเราไม่ได้ระบุ `_id` ทำให้ mongod สร้าง `_id` ให้อัตโนมัติซึ่งจะเป็นค่า `ObjectId()` ที่มีค่าไม่ซ้ำกับตัวอื่นขึ้นมาครับ ถ้าหากคุณผู้อ่านได้ `_id` ไม่ตรงกับตัวอย่างในนี้ก็ไม่ต้องตกใจนะครับ เพราะระบบจะสร้างให้มาแบบไม่ซ้ำ

### เพิ่มข้อมูลโดยระบุ _id

```javascript
db.users.insertOne({
    "_id": ObjectId("56fc40f9d735c28df206d078"),
    "name": "Person name 2",
    "position": "Developer",
    "age": 26,
    "education": [
        { 2021: "Vocational school" },
        { 2022: "Bachelor" }
    ],
    "createdby": ISODate("2023-02-01")
});
```

จะได้ response กลับมา

```javascript
{ "acknowledged" : true, "insertedId" : ObjectId("56fc40f9d735c28df206d078") }
```

ถ้าหากลองเพิ่มข้อมูลอีกครั้งโดยที่ใส่ `_id` ซ้ำกับที่มีอยู่ เช่น

```javascript
db.users.insertOne({
    "_id": ObjectId("56fc40f9d735c28df206d078"),
    "name": "Person name 3",
    "position": "Senior Developer",
    "age": 30,
    "education": [
        { 2021: "Bachelor" },
        { 2022: "Master" }
    ],
    "createdby": ISODate("2023-02-03")
});
```

จะแสดง error กลับมาดังนี้ครับ

```html
MongoServerError: E11000 duplicate key error collection: example.users index: _id_ dup key: { _id: ObjectId('56fc40f9d735c28df206d078') }
```
