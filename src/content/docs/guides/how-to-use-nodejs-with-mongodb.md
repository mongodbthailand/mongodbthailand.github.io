---
title: เริ่มต้นใช้งาน NodeJS กับ MongoDB
description: สำหรับบทความนี้ เราจะมาเรียนรู้การใช้งาน MongoDB NodeJS driver เพื่อเชื่อมต่อไปยัง MongoDB กัน
---

## ก่อนที่คุณจะเริ่มใช้งาน สิ่งที่คุณต้องทำคือ

1. สมัครใช้งาน MongoDB Atlas หรือทำการติดตั้ง MongoDB เรียบร้อยแล้ว
2. ตั้งค่า IP Access List ให้เป็นแบบ Allow Access from Anywhere หรือเพิ่ม IP Address ของคุณลงใน IP Access List ของ Atlas ก่อน
3. ทำการ Copy ค่า Connection String จากหน้าเวบ Database Deployments ของ Atlas ส่วนของ Connect your application มาไว้ หรือถ้าคุณใช้ MongoDB ที่ติดตั้งในเครื่องของคุณ ก็สามารถใช้ connection string uri ของ localhost ได้เลย

## การเชื่อมต่อ MongoDB ด้วย NodeJS

MongoDB NodeJS drivers จะทำหน้าที่สร้างการเชื่อมต่อที่ปลอดภัยไปยัง MongoDB cluster และรันคำสั่ง database operations จากโปรแกรมของผู้ใช้
ซึ่ง official MongoDB drivers นั้นจะยึดรูปแบบการเขียนโปรแกรมให้ตรงตาม Best practice ของภาษานั้นๆ

1. ก่อนอื่นเครื่องของคุณต้องทำการติดตั้ง Node.js เวอร์ชั่น 16 ขึ้นไป รวมถึงมี npm ลงอยู่เรียบร้อยแล้ว

2. สร้างโปรเจคสำหรับใช้งาน NodeJS และ MongoDB

เราจะเริ่มจากการสร้างโฟลเดอร์สำหรับโปรเจคของเรา และเข้าสู่โฟลเดอร์

```bash
mkdir node_quickstart
cd node_quickstart
```

จากนั้นทำการสร้างไฟล์ package.json ขึ้นมา

```bash
npm init -y
```

3. จากนั้นเราจะทำการติดตั้ง MongoDB Node.js Driver กัน

```bash
npm install mongodb
```

โดยการพิมพ์คำสั่งต่อไปนี้ เพื่อทำการดาวโหลด mongodb และติดตั้งไว้ในโฟลเดอร์ node_modules ในโปรเจคของเรา และบันทึกลงในไฟล์ package.json ในส่วนของ dependencies ด้วย

4. เริ่มเขียนโปรแกรม Node.js เชื่อมต่อ MongoDB กัน

ในตัวอย่างนี้เราจะสร้างไฟล์ index.js ขึ้นมาในโปรเจค เพื่อทำการเชื่อมต่อกับ MongoDB
อย่าลืมเปลี่ยน connection string uri เป็นของตัวเองกันด้วยนะ 

```jsx
// Require MongoDB language driver
const { MongoClient } = require("mongodb");

// ตั้งค่า connection string uri สำหรับ Atlas cluster ของคุณ
const uri = "<connection string uri>";

// สร้าง MongoClient instance
const client = new MongoClient(uri);

// ทำการเชื่อมต่อไปยังฐานข้อมูล MongoDB โดยใช้ MongoClient instance

async function run() {
  try {
    // ในตัวอย่างโปรแกรมนี้ เราจะทำการเชื่อมต่อกับ Database ชื่อ Sample_mflix และ Collection ชื่อ movies
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query หา document ที่มี title ว่า Back to the Future
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // อย่าลืมปิดการเชื่อมต่อ ไม่ว่าเราจะทำงานสำเร็จหรือเกิด Error ขึ้นก็ตาม
    await client.close();
  }
}
// รันโปรแกรม และดักกรณีที่เกิด errors และทำการพิมพืค่าออกมา
run().catch(console.dir);
```
ในโปรแกรมของคุณ ควรจะมีเพียงแค่หนึ่ง `MongoClient` instance ต่อ Atlas cluster เพราะถ้ามี `MongoClient` instance มากเกินไปสำหรับเพียงแค่หนึ่ง Atlas cluster จะทำให้สิ้นเปลืองค่าใช้จ่าย และส่งผลเสียต่อประสิทธิภาพการทำงานใน database ของคุณได้ เพราะการสร้าง `MongoClient` ใช้ทรัพยากรค่อนข้างมาก และคุณสามารถใช้ `MongoClient` เดียว ในการเชื่อมต่อไปยัง database ทั้งหมดใน application ของคุณได้

5. เสร็จแล้ว! มาลองรันโปรแกรม Node.js ของเรากันด้วยคำสั่ง
    
```bash
node index.js
```

ผลลัพธ์ของโปรแกรม ก็จะออกมาหน้าตาแบบนี้เลย

```jsx
{
  _id: ...,
  plot: 'A young man is accidentally sent 30 years into the past...',
  genres: [ 'Adventure', 'Comedy', 'Sci-Fi' ],
  ...
  title: 'Back to the Future',
  ...
}
```
ถ้าลองแล้ว พบปัญหา หรือไม่มีผลลัพธ์ออกมา ลองเช็คดูว่าเราได้ระบุ connection string ให้ถูกต้องหรือไม่ และใน database เราได้โหลดข้อมูลตัวอย่างหรือข้อมูลที่ต้องการเก็บไว้ใช้หรือยัง

# ปัญหาที่พบบ่อยในการเชื่อมต่อกับ MongoDB

-   `Connection closed` เกิดจาก IP Address ของคุณไม่ได้อยู่ใน IP Access List ของ Atlas
-   `Authentication failed` เกิดจาก username หรือ password ใน connection string ไม่ถูกต้อง

มาถึงตรงนี้แล้ว ถ้าคุณยังติดปัญหา หรือมีข้อสงสัยเพิ่มเติม ก็สามารถไปพูดคุยกันได้ที่ MongoDB Community Forums หรือ MongoDB User Group Thailand ได้เลย

## แหล่งข้อมูลเพิ่มเติม

-   [MongoDB Drivers](https://www.mongodb.com/docs/drivers/)
-   [MongoDB Node.js Driver Docs](https://www.mongodb.com/docs/drivers/node/current/)
-   [MongoDB Docs: Get Connection String](https://www.mongodb.com/docs/guides/atlas/connection-string/)
-   [MongoDB Docs: Connection String Format](https://www.mongodb.com/docs/manual/reference/connection-string/)
-   [MongoDB Node.js Connection to Atlas](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-connect-to-mongodb)
-   [MongoDB Docs: Troubleshoot Connection Issues](https://www.mongodb.com/docs/atlas/troubleshoot-connection/)
