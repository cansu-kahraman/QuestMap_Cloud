# Node.js base image kullanımı
FROM node:16

# Çalışma dizini oluşturma
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalama
COPY package*.json ./

# Bağımlılıkların kurulumu
RUN npm install

# Tüm frontend kodunu kopyalama
COPY . .

# Production build oluşturma
RUN npm run build

# Static dosyaları serve etmek için base image olarak nginx kullanma
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Port tanımlama (örnek: 80)
EXPOSE 80

# Nginx'i başlatma
CMD ["nginx", "-g", "daemon off;"]
