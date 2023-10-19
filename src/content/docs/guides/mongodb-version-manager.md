---
title: MongoDB Version Manager
description: การติดตั้ง MongoDB Version Manager และการใช้งานเบื้องต้น
---

[m - MongoDB Version Manager](https://github.com/aheckmann/m#m---mongodb-version-manager) เป็น Library ตัวนึงช่วยจัดการ Version ของ MongoDB คือสามารถเปลี่ยนเวอร์ชั่นต่าง ๆ ได้ง่ายยิ่งขึ้น (เหมาะกับการใช้สำหรับ dev เท่านั้นเน้อครับ)

## การติดตั้ง

เราสามารถติดตั้ง `m` ได้ 3 วิธี (เลือกอย่างใดอย่างหนึ่ง)

### การติดตั้งผ่าน npm (สะดวกที่สุด)

```sh
npm install -g m
```

### การติดตั้งโดยการ clone จาก project จาก Github

```sh
git clone https://github.com/aheckmann/m.git && cd m && make install
```

### ติดตั้งโดยการใช้ wget ดึงมา

```sh
wget https://raw.githubusercontent.com/aheckmann/m/master/bin/m && chmod +x ./m
```

เราลองทดสอบว่าติดตั้งเรียบร้อยแล้ว โดยการพิมพ์ `m --version` หากไม่มีปัญหาจะแสดง version ที่เราลง

## การดาวน์โหลด MongoDB Binaries

เราสามารถติดตั้ง MongoDB Version ต่าง ๆ ได้อย่างง่าย โดยการพิมพ์ version ที่ต้องการติดตั้งไปเลย เช่น

```sh
m 4.4.16
m 5.0.9
```

หรือสามารถพิมพ์แบบ release series ก็ได้เช่นกัน

```sh
m 4.4
m 5.0
```

หากต้องการดาวน์โหลด version ล่าสุด

```sh
m latest
```

หากต้องการดาวน์โหลด version ที่ stable แล้ว

```sh
m stable
```

## แก้ปัญหาเมื่อดาวน์โหลด MongoDB Binaries แล้วขึ้น Warning $PATH does not include

ถ้าหากคุณผู้อ่านเจอ  `==> WARNING: $PATH does not include /xxx/xxx/.local/bin` แบบนี้ไม่ต้องตกใจไปครับ เรามาแก้ปัญหากันดังนี้ครับ ลองพิมพ์ใน Terminal ก่อนว่าเราใช้อะไร

```sh
echo $0
```

เช่น ถ้าของเจมส์ใช้ zsh ในการใช้งาน ก็จะขึ้นว่า `-zsh` แต่ถ้าไม่ได้ติดตั้ง `zsh` น่าจะขึ้น `-bash` ครับ

จากนั้นให้แก้ไขไฟล์ด้วยคำสั่ง `vi ~/.zshrc` สำหรับคนที่ใช้ `zsh`

หรือแก้ไขไฟล์ด้วยคำสั่ง `vi ~/.bashrc` สำหรับคนที่ใช้ `bash`

โดยการเข้าไปเพิ่มคำสั่ง ที่ด้านท้ายของไฟล์ดังนี้

```sh
export PATH=$PATH:/path/to/your/directory
```

เช่นของเจมส์ถูกแจ้ง `==> WARNING: $PATH does not include /Users/kajame/.local/bin` ก็จะเพิ่มว่า

```sh
export PATH=$PATH:/Users/kajame/.local/bin
```

จากนั้นให้บันทึกให้เรียบร้อย จากนั้นใช้คำสั่ง `source ~/.bashrc` (หรือ `source ~/.zshrc` สำหรับ Zsh) เพื่อรีโหลดไฟล์กำหนดค่า

## แสดงรายการ MongoDB Binaries ที่เราติดตั้ง

```sh
m
```

ซึ่งหาก version ไหนที่ถูกใช้งานอยู่จะมีเครื่องหมายดอกจันทร์ (*) แสดงอยู่ด้านหน้าของ version

## ลองใช้งาน

### เรียกใช้งาน MongoDB version 4.4.16

มาลองใช้งานกันครับ เดี๋ยวในตัวอย่างนี้เจมส์จะลองเรียกใช้งาน MongoDB version 4.4.16 เน้อครับ โดยการพิมพ์

```sh
m 4.4.16
```

เพื่อบอกว่าเราจะใช้งาน version นี้ 

> ถ้าหากยังไม่เคยติดตั้ง version นี้ จะมีข้อความบอกว่ายังไม่ได้ติดตั้ง หากต้องการดำเนินการต่อให้พิมพ์ y แล้ว enter

จากนั้นให้เราสร้าง Directory ชื่อ `data` ขึ้นมาก่อนครับ แล้วใช้คำสั่ง

```sh
m use 4.4.16 --port 29000 --dbpath ./data
```

> หมายเลข port เราสามารถเปลี่ยนได้เน้อครับ แต่สำหรับบทความนี้ขอใช้ port 29000

### เรียกใช้ mongoDB cli เพื่อใช้งาน connection ที่สร้างขึ้น

ให้เปิด Terminal อีกอันขึ้นมาครับ แล้วลองใช้คำสั่ง

```sh
m shell 4.4.16 --port 29000 --norc
```

> `--norc` เป็นการปิดการโหลดไฟล์ configuration ตอนที่เปิดใช้งาน MongoDB shell

## คำสั่งที่ใช้ใน mongoDB cli เบื้องต้น

### แสดงรายชื่อ Database

เมื่ออยู่ใน mongoDB cli แล้ว คำสั่งสำหรับแสดงรายชื่อ Database สามารถใช้คำสั่ง

```sh
show dbs
```

### switch ไปยัง database

ในการย้ายไปยัง database อื่นเราสามารถใช้คำสั่ง `use [ชื่อ database ที่ต้องการไป]` เช่น

```sh
use mongodb-thailand
```

### การสร้างข้อมูลใส่ใน collection

เราจะมาลองสร้างข้อมูลใส่ใน collection ชื่อ example กันครับ โดยใส่ข้อมูลให้มี field ชื่อ name ให้มี value เป็น "kajame"

```sh
db.example.insertOne({ name: "kajame" })
```

### แสดงรายชื่อ collection

```sh
show collections
```

### แสดงข้อมูลใน collection

เราสามารถใช้คำสั่ง `db.ชื่อ collection.find({})` เช่น

```sh
db.example.find({})
```

ก็จะพบข้อมูลที่เราสร้างไปก่อนหน้านี้ครับ

## เพิ่มเติมนิดนึงครับ

เพิ่มเติมให้นิดนึงครับ ตั้งแต่ version 6 ขึ้นไป จากที่ลองเล่นมา เราจะไม่สามารถใช้คำสั่ง `m shell [เวอร์ชั่น] --port 29000 --norc` แบบนี้ได้ เราต้องไปลง `mongosh` เพิ่มเติมเอง

จากนั้นให้ใช้ `mongosh` ในการ connect เข้ามาแทนครับ เช่น ถ้าเราใช้  `m use 6.0.2 --port 29000 --dbpath ./data`

เราจะต้อง connect โดยใช้คำสั่ง

```sh
mongosh "mongodb://localhost:29000"
```

ใน Macbook เราสามารถใช้คำสั่งในการ install `mongosh` ได้โดยใช้คำสั่ง

```sh
brew install mongosh
```
