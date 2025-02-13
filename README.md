# Numbers Game

Sayıları belirli kurallara göre yerleştirerek en yüksek skoru elde etmeye çalıştığınız bir strateji oyunu.

## Oyun Kuralları

1. Oyun 10x10'luk bir ızgarada oynanır
2. Her hamle, bir önceki hamlenin konumuna göre şu kurallara uygun olmalıdır:
   - Yatay veya dikey olarak 3 kare uzağa
   - Çapraz olarak 2 kare uzağa
3. Sayılar 1'den başlayarak sırayla yerleştirilir
4. Bir kare seçildikten sonra tekrar seçilemez
5. Sağ tık ile son hamlenizi geri alabilirsiniz:
   - Son hamleden bir önceki hamleye kadar olan tüm hamleler silinir
   - Birden fazla hamle geri alınacaksa onay gerekir

## Geliştirme Ortamı

### Normal Kurulum

Öncelikle gerekli bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

[http://localhost:3000](http://localhost:3000) adresini tarayıcınızda açarak uygulamayı görebilirsiniz.

### Docker ile Kurulum

1. Ortam değişkenlerini ayarlayın:
   ```bash
   cp .env.example .env
   ```
   `.env` dosyasını kendi ortamınıza göre düzenleyin.

2. Docker konteynerini build edin ve başlatın:
   ```bash
   docker compose up --build
   ```

3. Uygulamaya [http://localhost:3000](http://localhost:3000) adresinden erişebilirsiniz.

Docker konteynerini durdurmak için:
```bash
docker compose down
```

## Teknolojiler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Docker](https://www.docker.com/) - Konteynerizasyon

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.
