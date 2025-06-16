# --- AŞAMA 1: Derleme Ortamı (Builder) ---
# Node.js'in daha güncel ve güvenli bir LTS versiyonunu kullanıyoruz.
# 'alpine' versiyonları daha küçüktür.
FROM node:18-alpine AS builder

# Konteyner içindeki çalışma dizinini oluştur
WORKDIR /app

# Önce sadece package.json dosyalarını kopyala
COPY package*.json ./

# TÜM bağımlılıkları yükle (geliştirme için gerekenler dahil)
RUN npm install

# Şimdi geri kalan tüm kodları kopyala
COPY . .


# --- AŞAMA 2: Üretim Ortamı (Production) ---
# Tekrar küçük bir temel imajdan başlıyoruz.
FROM node:18-alpine

# Çalışma dizinini oluştur
WORKDIR /app

# Sadece üretim için gerekli olan dosyaları 'builder' aşamasından kopyala
COPY --from=builder /app/package*.json ./

# SADECE üretim bağımlılıklarını yükle. devDependencies atlanacak.
RUN npm install --omit=dev

# Geri kalan tüm uygulama kodunu 'builder' aşamasından kopyala
COPY --from=builder /app .

# Uygulamanın dinleyeceği portu aç
EXPOSE 5001

# Uygulamayı başlat
# "npm start" komutu genellikle "node server.js" gibi bir betiği çalıştırır.
# package.json dosyanızdaki "start" script'inin doğru olduğundan emin olun.
CMD ["npm", "start"]