import yfinance as yf
import re
import os
import datetime # Hata buradaydı, bu satır çok önemli!

def update_app_jsx():
    # Dosya yolunu belirle
    base_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_path, 'src', 'App.jsx')
    
    if not os.path.exists(file_path):
        print(f"❌ Hata: {file_path} bulunamadı!")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ticker'ları bul
    tickers = re.findall(r"ticker:\s*'([^']+)'", content)
    tickers = list(set(tickers))
    
    print(f"🔄 {len(tickers)} adet hisse güncelleniyor...")

    for ticker in tickers:
        try:
            stock = yf.Ticker(f"{ticker}.IS")
            price = stock.history(period="1d")['Close'].iloc[-1]
            
            # Fiyatı güncelle
            pattern = rf"(ticker:\s*'{ticker}'.*?currentPrice:\s*)[\d\.]+"
            replacement = rf"\g<1>{round(price, 2)}"
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        except Exception:
            continue

    # Zaman damgasını Türkiye saati (UTC+3) olarak ayarla
    now = datetime.datetime.utcnow() + datetime.timedelta(hours=3)
    timestamp = now.strftime("%d.%m.%Y %H:%M")
    
    # App.jsx içindeki lastUpdated değişkenini güncelle
    content = re.sub(r"const lastUpdated = '[^']*'", f"const lastUpdated = '{timestamp}'", content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ İşlem tamamlandı. Son Güncelleme: {timestamp}")

if __name__ == "__main__":
    update_app_jsx()