
# Library Management System

---

## Gereksinimler

- **Node.js**: v16 veya üzeri
- **npm**: v8 veya üzeri
- **PostgreSQL**: v14 veya üzeri

---

## Kurulum Adımları

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/smutluuuu/library_management.git
cd library-management
```

### 2. Gerekli Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Veritabanını Oluşturun
- PostgreSQL sunucunuzda `library_management` adında bir veritabanı oluşturun:
  ```sql
  CREATE DATABASE library_management;
  ```

### 4. Veritabanı Şemasını İçeri Aktarın
- Proje dizininde bulunan `database_schema.sql` dosyasını kullanarak veritabanı tablolarını oluşturun:
  ```bash
  psql -U postgres -d library_management -f database_schema.sql
  ```

### 5. Ortam Değişkenlerini Ayarlayın
- Projenin kök dizininde `.env` adında bir dosya oluşturun ve aşağıdaki içerikleri ekleyin:
  ```env
  DATABASE_URL=postgres://postgres:password@localhost:5432/library_management
  PORT=3000
  ```

### 6. Projeyi Çalıştırın
- Uygulamayı çalıştırmak için aşağıdaki komutu kullanın:
  ```bash
  npm run dev
  ```

## Önemli Notlar

- **PostgreSQL Kullanıcı Adı ve Şifresi**: `.env` dosyasındaki `DATABASE_URL` değişkenine uygun şekilde PostgreSQL kullanıcı adınızı ve şifrenizi girin.
- **Port Değişikliği**: Varsayılan port `3000` olarak ayarlanmıştır. Farklı bir port kullanmak isterseniz `.env` dosyasındaki `PORT` değişkenini güncelleyebilirsiniz.

---