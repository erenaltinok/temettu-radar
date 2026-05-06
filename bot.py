import yfinance as yf
import re
import os

def update_app_jsx():
    file_path = 'src/App.jsx'
    # Türkiye saatini baz alarak zaman damgası oluştur
    now = datetime.datetime.now()
    # App.jsx içinde "lastUpdated: '...'" şeklinde bir yer arayıp günceller
    timestamp = now.strftime("%d.%m.%Y %H:%M")
    pattern_time = r"(lastUpdated:\s*')[^']*"
    content = re.sub(pattern_time, r"\g<1>" + timestamp, content)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # App.jsx içindeki tüm ticker'ları bul (Örn: ticker: 'THYAO')
    tickers = re.findall(r"ticker:\s*'([^']+)'", content)
    tickers = list(set(tickers)) # Tekrar edenleri temizle
    
    print(f"{len(tickers)} adet hisse güncelleniyor...")

    for ticker in tickers:
        try:
            # BIST hisseleri için .IS ekle, endeks hisseleri değilse hata payını düşür
            stock = yf.Ticker(f"{ticker}.IS")
            # En son kapanış fiyatını al
            price = stock.history(period="1d")['Close'].iloc[-1]
            
            # App.jsx içindeki ilgili fiyatı bul ve değiştir
            # Regex ile o hisseye ait currentPrice satırını hedefliyoruz
            pattern = rf"(ticker:\s*'{ticker}'.*?currentPrice:\s*)[\d\.]+"
            replacement = rf"\g<1>{round(price, 2)}"
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            
            print(f"✅ {ticker}: {round(price, 2)} TL")
        except Exception as e:
            print(f"❌ {ticker} güncellenemedi: {e}")

    # Güncellenmiş içeriği dosyaya geri yaz
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("\n🚀 Tüm fiyatlar App.jsx içinde güncellendi!")

if __name__ == "__main__":
    update_app_jsx()