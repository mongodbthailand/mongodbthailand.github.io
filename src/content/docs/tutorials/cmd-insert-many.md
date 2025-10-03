---
description: การใช้งาน db.collection.insertMany()
title: db.collection.insertMany()
---

คำสั่ง `db.collection.insertMany()` เป็นคำสั่งสำหรับ เพิ่มข้อมูลหลาย ๆ ข้อมูล เข้าไปใน collection

## ข้อมูลที่ Return

เมื่อใช้คำสั่งนี้จะข้อมูลที่ Return มาจะมี

- `acknowledged` มีค่าเป็น Boolean
- `insertedIds` ซึ่งจะมีค่าเป็น array ที่มีค่าเป็นรายการ `_id` ของข้อมูลที่เราเพิ่มเข้าไป

## Syntax

```javascript
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

| Parameter      | ชนิดข้อมูล     | คำอธิบาย                            |
| -------------- | ----------- | ---------------------------------- |
| document       | document    | เป็น array ของข้อมูลที่ต้องการเพิ่มเข้าไป   |
| writeConcern   | document    | ไม่จำเป็นต้องระบุ (Optional) - สามารถดูการตั้งค่า[เพิ่มเติมในนี้ได้ครับ](https://www.mongodb.com/docs/manual/reference/write-concern/)     |
| ordered        | boolean     | ไม่จำเป็นต้องระบุ (Optional) - มีไว้เพื่อระบุว่าการแทรกข้อมูลจะถูกดำเนินการตามลำดับหรือไม่ (ค่าเริ่มต้นเป็น true) |

> collection จะถูกสร้างมาให้โดยอัตโนมัติ ถ้าหากเราใช้คำสั่งนี้โดยที่ยังไม่ได้สร้าง collection

โดยทั่วไปการเพิ่มข้อมูลจะถูกแทรกตามลำดับที่กำหนดไว้ สิ่งที่ควรรู้เพิ่มเติมคือ

ถ้าหากเรากำหนด ordered เป็น `true` แล้วเกิดข้อผิดพลาดขณะที่เพิ่มข้อมูล **ข้อมูลที่อยู่หลังจากข้อมูลที่ผิดพลาดจะไม่ถูกเพิ่มเข้าไป**

แต่ถ้าหากเรากำหนด ordered เป็น `false` แล้วเกิดข้อผิดพลาดขณะที่เพิ่มข้อมูล **ข้อมูลที่ไม่ได้เกิดปัญหาจะถูกเพิ่มเข้าไปปกติ แต่ข้อมูลที่เกิดปัญหาจะไม่ถูกเพิ่มเข้าไป**

> **Note เพิ่มเติม**
>
> จำนวนของข้อมูลจะต้องไม่เกินค่า `maxWriteBatchSize` ซึ่งเราสามารถดูค่านี้โดยการใช้คำสั่ง `db.hello()` ซึ่งจะมีคีย์ `maxWriteBatchSize` แสดงอยู่ โดยปกติแล้วค่าจะอยู่ที่ 100,000 (จำนวน array ของข้อมูลต่อการเขียน 1 ครั้ง)

เพื่อความเข้าใจมากยิ่งขึ้น เรามาดูตัวอย่างกันครับ

## Example

### เพิ่มข้อมูลโดยที่ไม่ได้ระบุ `_id`

```javascript
db.users.insertMany([
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
]);
```

จะได้ response กลับมา

```javascript
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("653390650e1875da811cc783"),
    '1': ObjectId("653390650e1875da811cc784"),
    '2': ObjectId("653390650e1875da811cc785")
  }
}
```

> เนื่องจากเราไม่ได้ระบุ `_id` ทำให้ mongod สร้าง `_id` ให้อัตโนมัติซึ่งจะเป็นค่า `ObjectId()` ที่มีค่าไม่ซ้ำกับตัวอื่นขึ้นมาครับ ถ้าหากคุณผู้อ่านได้ `_id` ไม่ตรงกับตัวอย่างในนี้ก็ไม่ต้องตกใจนะครับ เพราะระบบจะสร้างให้มาแบบไม่ซ้ำ

### เพิ่มข้อมูลโดยระบุ _id

```javascript
db.users.insertMany([
  {
    "_id": 1,
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
    "_id": 2,
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
    "_id": 3,
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
]);
```

จะได้ response กลับมา

```javascript
{
    acknowledged: true,
    insertedIds: {
        '0': 1,
        '1': 2,
        '2': 3
    }
}
```

### เพิ่มข้อมูลโดยระบุ _id ซ้ำ โดยกำหนดค่า ordered เป็น true

ในที่นี้จะกำหนดค่า `_id` __เป็น 11 ซ้ำกัน 2 อันเน้อครับ__ และเราจะไม่ตั้งค่า ordered เพราะ __ค่าเริ่มต้นของ__ `ordered` __มีค่าเป็น true อยู่แล้ว__

```javascript
db.users.insertMany([
  {
    "_id": 11,
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
    "_id": 11,
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
    "_id": 12,
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
]);
```

เมื่อลองใช้คำสั่งข้างต้น จะพบว่าเกิด Error แบบนี้ครับ

```javascript
MongoBulkWriteError: E11000 duplicate key error collection: example.users index: _id_ dup key: { _id: 11 }
Result: BulkWriteResult {
  insertedCount: 1,
  matchedCount: 0,
  modifiedCount: 0,
  deletedCount: 0,
  upsertedCount: 0,
  upsertedIds: {},
  insertedIds: { '0': 11, '1': 11, '2': 12 }
}
Write Errors: [
  WriteError {
    err: {
      index: 1,
      code: 11000,
      errmsg: 'E11000 duplicate key error collection: example.users index: _id_ dup key: { _id: 11 }',
      errInfo: undefined,
      op: {
        _id: 11,
        name: 'Person name 2',
        position: 'Developer',
        age: 26,
        education: [ { '2021': 'Vocational school' }, { '2022': 'Bachelor' } ],
        createdby: ISODate("2023-02-01T00:00:00.000Z")
      }
    }
  }
]
```

และจะพบว่าข้อมูลที่ถูกเพิ่มเข้าไปจะมีแค่ `_id: 11` อันเดียว ซึ่งคือข้อมูลแรกที่เพิ่มเข้าไป และยังไม่ได้เกิดปัญหาอะไร แต่เนื่องจากข้อมูลถัดมาคือเกิดข้อผิดพลาด คือ `_id: 11` ตัวถัดมาไม่สามารถเพิ่มได้ ทำให้ `_id: 12` จะไม่ถูกเพิ่มต่อแล้ว

### เพิ่มข้อมูลโดยระบุ `_id` ซ้ำ โดยกำหนดค่า ordered เป็น false

ในที่นี้เราจะลองกำหนดค่าให้คล่้าย ๆ กับก่อนหน้านี้ โดยจะมี `_id: 21` ซ้ำกัน โดยกำหนดค่า `ordered` เป็น __false__

```javascript
db.users.insertMany([
  {
    "_id": 21,
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
    "_id": 21,
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
    "_id": 22,
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
], { ordered: false });
```

เมื่อลองใช้คำสั่งข้างต้นจะพบว่าแสดง error กลับมาดังนี้ครับ

```javascript
MongoBulkWriteError: E11000 duplicate key error collection: example.users index: _id_ dup key: { _id: 21 }
Result: BulkWriteResult {
  insertedCount: 2,
  matchedCount: 0,
  modifiedCount: 0,
  deletedCount: 0,
  upsertedCount: 0,
  upsertedIds: {},
  insertedIds: { '0': 21, '1': 21, '2': 22 }
}
Write Errors: [
  WriteError {
    err: {
      index: 1,
      code: 11000,
      errmsg: 'E11000 duplicate key error collection: example.users index: _id_ dup key: { _id: 21 }',
      errInfo: undefined,
      op: {
        _id: 21,
        name: 'Person name 2',
        position: 'Developer',
        age: 26,
        education: [ { '2021': 'Vocational school' }, { '2022': 'Bachelor' } ],
        createdby: ISODate("2023-02-01T00:00:00.000Z")
      }
    }
  }
]
```

หากเราดูข้อมูลที่ถูกเพิ่มเข้าไปแล้ว จะพบว่า `_id: 21` (Person name 1) และ `_id: 22` (Person name 3) จะถูกเพิ่มเข้าไป
