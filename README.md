# KUSYS-Demo

## Servisler Nasıl Çalıştırılır
Aşağıdaki komut satırlarını sıra ile yazarak servisleri çalıştırabilirsiniz.

``` git clone https://github.com/SirmaXX/KUSYS-Demo.git ```

cd KUSYS-Demo

sudo docker-compose build

sudo docker-compose up


## Backend tarafındai unit testler nasıl çalıştırabilirsiniz.
Aşağıdaki komut satırlarını sıra ile yazarak,backend servisi containerına erişerek unit testleri çalıştırabilirsiniz.


sudo docker exec -it backend /bin/bash


pytest

## Backend için endpointlere nasıl erişebilirsiniz
FastApi içerisinde swagger api ile otomatik oluşturulmuş dökümantasyona erişebilir ve endpointleri kendiniz manuel olarak test edebilirsiniz.
Bu linke tıkladığınız vakit otomatik oluşturulmuş döküman karşınıza çıkacaktır.http://localhost:8000/docs#/



## Proje testi için default kullanıcılar 
### Admin paneline erişmek istiyorsanız.
http://localhost:3000/admin/login  urline tıklayarak

Username:admin,password:admin olarak yazdığınız vakit admin paneline erişebileceksiniz veya backend servisine ait endpointleri kullanarak admin oluşturabilirsiniz.

### Kullanıcı paneline erişmek istiyorsanız.
http://localhost:3000/login  urline tıklayarak

Username:string,password:string yazarak veya kayıt olarak yazdığınız vakit kullanarak paneline erişebileceksiniz veya signup üzerinden kayıt olarak kullanıcı paneline erişebilirsiniz.


