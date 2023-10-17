---
title: Backup ข้อมูล MongoDB โดยใช้ Docker Image ของ MongoDB
description: การ Backup ข้อมูลใน MongoDB โดยใช้ Docker Image ของ MongoDB
---

บทความนี้จะมาเขียนเกี่ยวกับวิธี Backup ข้อมูลใน MongoDB แต่เราไม่อยากติดตั้ง mongo cli ในเครื่อง แต่เราอยาก Backup ข้อมูลของ MongoDB เราจะทำยังไงดี ?

ถ้าหากเรามี Docker อยู่แล้ว เราสามารถใช้ mongo ที่อยู่ใน docker จัดการได้ครับ

# มาเริ่มกันเลย

ขั้นตอนแรกให้เราเปิด Terminal ขึ้นมาครับ แล้วใช้คำสั่ง

```sh
docker run --name example-mongo-backup -d mongo:4.4
```

ในส่วนบนนี้จะเป็นคำสั่งสร้าง container ชื่อ **example-mongo-backup**

โดยใช้ Docker image **mongo version 4.4** ซึ่ง Run แบบเป็น background ไว้ (ด้วย tag -d)

เมื่อเราลองใช้คำสั่ง `docker ps` จะพบว่ามี container run อยู่ 1 อัน

![เมื่อใช้คำสั่ง docker ps ดู container ที่ run จะพบว่ามีอยู่ 1 อัน](../../../assets/guides/mongodb-backup-with-docker/002-show-list-container.webp)

จากนั้นให้เราใช้คำสั่ง

```sh
docker exec -i ชื่อcontainerMongoDBที่สร้าง /usr/bin/mongodump --uri="mongodb://username:password@address:port/database" --out dump
```

**username\:password@address\:port\/database**

จะแทนด้วยข้อมูลของ mongoDB ที่เราจะ backup เช่น ของเจมส์อาจจะเป็น

```sh
docker exec -i example-mongo-backup /usr/bin/mongodump --uri="mongodb://root:111111@ex.me-idea.in.th:27017/example" --out dump
```

ในส่วนนี้ข้อมูลใน database ชื่อ example บน ex.me-idea.in.th ถูก dump มาอยู่ใน container ในเครื่องเรียบร้อยแล้ว

ในส่วนถัดมาเราจะไฟล์ที่ถูก dump ที่อยู่ใน container มาใส่ไว้ใน folder ที่เราต้องการ เช่น เจมส์อยากเอามาใส่ไว้ที่ ~/Workspace/digitalocean/backup

เจมส์จะใช้คำสั่งดังนี้ครับ

```sh
docker cp example-mongo-backup:/dump ~/Workspace/digitalocean/backup
```

ก็คือ copy directory ชื่อ dump ที่อยู่ใน container example-mongo-backup ให้ copy ไปใส่ ~/Workspace/digitalocean และเปลี่ยนชื่อเป็น backup

เมื่อเราลองดูจะพบว่ามีไฟล์ที่ backup ออกมาแล้ว

![copy dump ใน container example-mongo-backup ไปไว้ที่ ~/Workspace/digitalocean เปลี่ยนชื่อเป็น backup](../../../assets/guides/mongodb-backup-with-docker/003-copy-data-from-container.webp)

เพียงเท่านี้เราก็สามารถ backup ข้อมูลจาก mongoDB ได้โดยที่ไม่ต้องลง mongo cli ในเครื่องของเราแล้ว ^^

