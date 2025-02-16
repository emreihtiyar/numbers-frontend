export const tr = {
  buttons: {
    clear: 'Temizle',
    confirm: 'Evet',
    cancel: 'Hayır',
    close: 'Kapat',
    howToPlay: 'Nasıl Oynanır?',
    share: 'Paylaş',
    topList: 'En İyiler',
  },
  modal: {
    multipleStepsUndo: 'Birden fazla adım geri alınacak. Onaylıyor musunuz?',
    clearConfirm: 'Oyunu sıfırlamak istediğinize emin misiniz?',
    yourTime: 'Süreniz',
    yourLastNumber: 'Son Sayınız',
    share: {
      title: 'Sonucunu Paylaş',
      username: 'Kullanıcı Adı',
      usernameError: 'Kullanıcı adı 3-20 karakter arasında olmalıdır',
      shareButton: 'Paylaş',
      success: 'Sonucunuz başarıyla paylaşıldı!',
      error: 'Sonucunuz paylaşılırken bir hata oluştu'
    },
    topList: {
      title: 'En İyi Sonuçlar',
      username: 'Kullanıcı',
      lastNumber: 'Son Sayı',
      time: 'Süre',
      loading: 'Yükleniyor...',
      error: 'Sonuçlar yüklenirken bir hata oluştu'
    },
    howToPlay: {
      title: 'Nasıl Oynanır?',
      objective: 'Oyunun Amacı',
      objectiveText: 'Sayıları belirli kurallara göre yerleştirerek en yüksek skoru elde etmeye çalışın.',
      rules: 'Oyun Kuralları',
      rulesList: [
        '10x10 ızgarada oynanır',
        'Her hamle, bir önceki hamlenin konumuna göre yapılmalıdır:',
        'Yatay veya dikey olarak 3 kare uzağa',
        'Çapraz olarak 2 kare uzağa',
        'Sayılar 1\'den başlayarak sırayla yerleştirilir',
        'Bir kare seçildikten sonra tekrar seçilemez',
        'Sağ tık ile son hamlenizi geri alabilirsiniz',
        'Oyunun amacı en yüksek skoru elde etmektir'
      ]
    }
  },
  stats: {
    time: 'Süre',
    lastNumber: 'Son Sayı',
  },
} as const; 