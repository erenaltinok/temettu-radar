import React, { useState, useMemo, useEffect } from 'react';
import { 
  Crown, 
  Flame, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ArrowDownToLine,
  Wallet,
  ChevronDown,
  Search,
  ArrowUpDown,
  Briefcase,
  Eye,
  X,
  Calculator,
  Save,
  Star
} from 'lucide-react';
const lastUpdated = '24.06.2026 20:02'; // Bot burayı otomatik değiştirecek
// ============================================================================
// 📁 src/utils/dateUtils.js
// ============================================================================

export const getDaysRemaining = (targetDateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDateString);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getStatusTheme = (days) => {
  if (days <= 3) {
    return {
      border: 'border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
      text: 'text-red-400',
      bg: 'bg-red-950/20',
      badgeBg: 'bg-red-500/20 text-red-400 border-red-500/30',
      icon: AlertCircle,
      label: 'Acil'
    };
  }
  if (days <= 7) {
    return {
      border: 'border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)]',
      text: 'text-orange-400',
      bg: 'bg-orange-950/20',
      badgeBg: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      icon: Flame,
      label: 'Yakın Takip'
    };
  }
  return {
    border: 'border-emerald-500/30 hover:border-emerald-500/50',
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/10',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle2,
    label: 'Güvenli'
  };
};

export const calculateYield = (netDividend, price) => {
  return ((netDividend / price) * 100).toFixed(2);
};

// ============================================================================
// 📁 src/data/realData.js 
// ============================================================================

export const REAL_STOCKS = [
  // --- MAYIS 2026 ---
  { id: '1', ticker: 'ECILC', name: 'Eczacıbaşı İlaç', currentPrice: 79.95, netDividend: 1.4885, grossDividend: 1.6538, exDividendDate: '2026-05-06', hasStableDividendHistory: true },
  { id: '2', ticker: 'ECZYT', name: 'Eczacıbaşı Yatırım', currentPrice: 328.75, netDividend: 4.8571, grossDividend: 5.3967, exDividendDate: '2026-05-06', hasStableDividendHistory: true },
  { id: '3', ticker: 'LIDER', name: 'Lider Filo', currentPrice: 97.4, netDividend: 0.0303, grossDividend: 0.0336, exDividendDate: '2026-05-06', hasStableDividendHistory: false },
  { id: '4', ticker: 'MAVI', name: 'Mavi Giyim', currentPrice: 39.62, netDividend: 1.4221, grossDividend: 1.5801, exDividendDate: '2026-05-06', hasStableDividendHistory: false },
  { id: '5', ticker: 'NTGAZ', name: 'Naturelgaz', currentPrice: 11.12, netDividend: 0.7391, grossDividend: 0.8212, exDividendDate: '2026-05-06', hasStableDividendHistory: false },
  { id: '6', ticker: 'OYYAT', name: 'Oyak Yatırım', currentPrice: 43.14, netDividend: 3.2081, grossDividend: 3.5645, exDividendDate: '2026-05-06', hasStableDividendHistory: true },
  { id: '7', ticker: 'KLKIM', name: 'Kalekim', currentPrice: 30.7, netDividend: 0.5543, grossDividend: 0.6158, exDividendDate: '2026-05-08', hasStableDividendHistory: false },
  { id: '8', ticker: 'PAGYO', name: 'Panora GYO', currentPrice: 139.9, netDividend: 5.7545, grossDividend: 5.7545, exDividendDate: '2026-05-11', hasStableDividendHistory: true },
  { id: '9', ticker: 'ALGYO', name: 'Alarko GYO', currentPrice: 3.99, netDividend: 0.0500, grossDividend: 0.0500, exDividendDate: '2026-05-12', hasStableDividendHistory: true },
  { id: '10', ticker: 'ASUZU', name: 'Anadolu Isuzu', currentPrice: 58.45, netDividend: 2.0238, grossDividend: 2.2486, exDividendDate: '2026-05-12', hasStableDividendHistory: false },
  { id: '11', ticker: 'CCOLA', name: 'Coca-Cola İçecek', currentPrice: 76.95, netDividend: 1.2155, grossDividend: 1.3505, exDividendDate: '2026-05-12', hasStableDividendHistory: true },
  { id: '12', ticker: 'GIPTA', name: 'Gıpta Ofis Kırtasiye', currentPrice: 72.3, netDividend: 1.3003, grossDividend: 1.4447, exDividendDate: '2026-05-12', hasStableDividendHistory: false },
  { id: '13', ticker: 'OZGYO', name: 'Özderici GYO', currentPrice: 2.13, netDividend: 0.0168, grossDividend: 0.0168, exDividendDate: '2026-05-12', hasStableDividendHistory: false },
  { id: '14', ticker: 'AEFES', name: 'Anadolu Efes', currentPrice: 20.64, netDividend: 0.1443, grossDividend: 0.1603, exDividendDate: '2026-05-13', hasStableDividendHistory: true },
  { id: '15', ticker: 'BEYAZ', name: 'Beyaz Filo', currentPrice: 26.58, netDividend: 0.2558, grossDividend: 0.2842, exDividendDate: '2026-05-13', hasStableDividendHistory: false },
  { id: '16', ticker: 'BRKVY', name: 'Birikim Varlık Yönetim', currentPrice: 91.95, netDividend: 0.4486, grossDividend: 0.4984, exDividendDate: '2026-05-13', hasStableDividendHistory: false },
  { id: '17', ticker: 'MCARD', name: 'MCARD', currentPrice: 169.5, netDividend: 4.5896, grossDividend: 5.0995, exDividendDate: '2026-05-13', hasStableDividendHistory: false },
  { id: '18', ticker: 'MGROS', name: 'Migros', currentPrice: 697.5, netDividend: 3.8731, grossDividend: 4.3034, exDividendDate: '2026-05-13', hasStableDividendHistory: false },
  { id: '19', ticker: 'TRCAS', name: 'Turcas Petrol', currentPrice: 42.16, netDividend: 1.9953, grossDividend: 2.2170, exDividendDate: '2026-05-13', hasStableDividendHistory: false },
  { id: '20', ticker: 'EGPRO', name: 'Ege Profil', currentPrice: 41.46, netDividend: 0.5459, grossDividend: 0.6065, exDividendDate: '2026-05-14', hasStableDividendHistory: false },
  { id: '21', ticker: 'KRGYO', name: 'Körfez GYO', currentPrice: 2.66, netDividend: 0.0384, grossDividend: 0.0384, exDividendDate: '2026-05-15', hasStableDividendHistory: false },
  { id: '22', ticker: 'SARKY', name: 'Sarkuysan', currentPrice: 28.08, netDividend: 0.3000, grossDividend: 0.3333, exDividendDate: '2026-05-18', hasStableDividendHistory: true },
  { id: '23', ticker: 'AGHOL', name: 'AG Anadolu Grubu', currentPrice: 32.78, netDividend: 0.5933, grossDividend: 0.6592, exDividendDate: '2026-05-20', hasStableDividendHistory: false },
  { id: '24', ticker: 'ERBOS', name: 'Erbosan', currentPrice: 176.3, netDividend: 2.2950, grossDividend: 2.5500, exDividendDate: '2026-05-20', hasStableDividendHistory: true },
  { id: '25', ticker: 'GENTS', name: 'Gentaş', currentPrice: 6.64, netDividend: 0.1333, grossDividend: 0.1481, exDividendDate: '2026-05-20', hasStableDividendHistory: false },
  { id: '26', ticker: 'KTLEV', name: 'Katılımevim', currentPrice: 178.3, netDividend: 0.0821, grossDividend: 0.0912, exDividendDate: '2026-05-20', hasStableDividendHistory: false },
  { id: '27', ticker: 'LKMNH', name: 'Lokman Hekim', currentPrice: 15.01, netDividend: 0.1968, grossDividend: 0.2186, exDividendDate: '2026-05-20', hasStableDividendHistory: false },
  { id: '28', ticker: 'PETUN', name: 'Pınar Et', currentPrice: 12.15, netDividend: 0.2083, grossDividend: 0.2314, exDividendDate: '2026-05-20', hasStableDividendHistory: true },
  { id: '29', ticker: 'LIDFA', name: 'Lider Faktoring', currentPrice: 3.19, netDividend: 0.1329, grossDividend: 0.1476, exDividendDate: '2026-05-21', hasStableDividendHistory: false },
  { id: '30', ticker: 'TRGYO', name: 'Torunlar GYO', currentPrice: 98.0, netDividend: 5.0000, grossDividend: 5.0000, exDividendDate: '2026-05-21', hasStableDividendHistory: true },
  { id: '31', ticker: 'GRTHO', name: 'GRTHO', currentPrice: 251.0, netDividend: 0.3817, grossDividend: 0.4241, exDividendDate: '2026-05-22', hasStableDividendHistory: false },

  // --- HAZİRAN 2026 ---
  { id: '32', ticker: 'AKCNS', name: 'Akçansa', currentPrice: 194.6, netDividend: 1.5984, grossDividend: 1.7760, exDividendDate: '2026-06-01', hasStableDividendHistory: true },
  { id: '33', ticker: 'AYES', name: 'Ayes Çelik', currentPrice: 31.84, netDividend: 0.3000, grossDividend: 0.3333, exDividendDate: '2026-06-01', hasStableDividendHistory: false },
  { id: '34', ticker: 'MACKO', name: 'Maçkolik', currentPrice: 35.94, netDividend: 2.2975, grossDividend: 2.5527, exDividendDate: '2026-06-01', hasStableDividendHistory: false },
  { id: '35', ticker: 'SISE', name: 'Şişecam', currentPrice: 45.1, netDividend: 0.4995, grossDividend: 0.5550, exDividendDate: '2026-06-01', hasStableDividendHistory: true },
  { id: '36', ticker: 'AVPGY', name: 'Avrupakent GYO', currentPrice: 58.25, netDividend: 2.5000, grossDividend: 2.5000, exDividendDate: '2026-06-03', hasStableDividendHistory: false },
  { id: '37', ticker: 'EREGL', name: 'Erdemir', currentPrice: 39.94, netDividend: 0.4675, grossDividend: 0.5194, exDividendDate: '2026-06-03', hasStableDividendHistory: true },
  { id: '38', ticker: 'ISDMR', name: 'İsdemir', currentPrice: 59.9, netDividend: 3.8250, grossDividend: 4.2500, exDividendDate: '2026-06-03', hasStableDividendHistory: true },
  { id: '39', ticker: 'SMRVA', name: 'SMRVA', currentPrice: 15.44, netDividend: 0.1600, grossDividend: 0.1777, exDividendDate: '2026-06-08', hasStableDividendHistory: false },
  { id: '40', ticker: 'ATATP', name: 'ATP Yazılım', currentPrice: 211.3, netDividend: 0.8500, grossDividend: 0.9444, exDividendDate: '2026-06-10', hasStableDividendHistory: false },
  { id: '41', ticker: 'YAPRK', name: 'Yaprak Süt ve Besi', currentPrice: 12.36, netDividend: 0.0213, grossDividend: 0.0236, exDividendDate: '2026-06-10', hasStableDividendHistory: false },
  { id: '42', ticker: 'INDES', name: 'İndeks Bilgisayar', currentPrice: 11.34, netDividend: 0.1847, grossDividend: 0.2052, exDividendDate: '2026-06-15', hasStableDividendHistory: true },
  { id: '43', ticker: 'BIMAS', name: 'BİM Birleşik Mağazalar', currentPrice: 374.0, netDividend: 3.4000, grossDividend: 3.7777, exDividendDate: '2026-06-17', hasStableDividendHistory: true },
  { id: '44', ticker: 'EMPAE', name: 'EMPAE', currentPrice: 87.3, netDividend: 0.0850, grossDividend: 0.0944, exDividendDate: '2026-06-18', hasStableDividendHistory: false },
  { id: '45', ticker: 'KTLEV', name: 'Katılımevim (Taksit 2)', currentPrice: 178.3, netDividend: 0.0821, grossDividend: 0.0912, exDividendDate: '2026-06-23', hasStableDividendHistory: false },
  { id: '46', ticker: 'AVPGY', name: 'Avrupakent GYO (Taksit 2)', currentPrice: 58.25, netDividend: 2.5000, grossDividend: 2.5000, exDividendDate: '2026-06-24', hasStableDividendHistory: false },
  { id: '47', ticker: 'CEMTS', name: 'Çemtaş', currentPrice: 10.0, netDividend: 0.2550, grossDividend: 0.2833, exDividendDate: '2026-06-24', hasStableDividendHistory: true },
  { id: '48', ticker: 'EKGYO', name: 'Emlak Konut GYO', currentPrice: 20.86, netDividend: 0.6000, grossDividend: 0.6000, exDividendDate: '2026-06-24', hasStableDividendHistory: true },
  { id: '49', ticker: 'VKGYO', name: 'Vakıf GYO', currentPrice: 2.7, netDividend: 0.1020, grossDividend: 0.1020, exDividendDate: '2026-06-24', hasStableDividendHistory: false },
  { id: '50', ticker: 'HLGYO', name: 'Halk GYO', currentPrice: 6.52, netDividend: 0.5755, grossDividend: 0.5755, exDividendDate: '2026-06-26', hasStableDividendHistory: false },
  { id: '51', ticker: 'KIMMR', name: 'Kimteks', currentPrice: 16.5, netDividend: 0.1771, grossDividend: 0.1967, exDividendDate: '2026-06-30', hasStableDividendHistory: false },
  { id: '52', ticker: 'LOGO', name: 'Logo Yazılım', currentPrice: 138.0, netDividend: 4.4737, grossDividend: 4.9707, exDividendDate: '2026-06-30', hasStableDividendHistory: true },

  // --- TEMMUZ 2026 ---
  { id: '53', ticker: 'DOFER', name: 'Dofer Yapı', currentPrice: 32.76, netDividend: 0.1614, grossDividend: 0.1793, exDividendDate: '2026-07-02', hasStableDividendHistory: false },
  { id: '54', ticker: 'LILAK', name: 'Lila Kağıt', currentPrice: 36.0, netDividend: 1.2966, grossDividend: 1.4406, exDividendDate: '2026-07-06', hasStableDividendHistory: false },
  { id: '55', ticker: 'OZSUB', name: 'Özsu Balık', currentPrice: 32.7, netDividend: 0.5242, grossDividend: 0.5824, exDividendDate: '2026-07-06', hasStableDividendHistory: false },
  { id: '56', ticker: 'LIDER', name: 'Lider Filo (Taksit 2)', currentPrice: 97.4, netDividend: 0.0303, grossDividend: 0.0336, exDividendDate: '2026-07-08', hasStableDividendHistory: false },
  { id: '57', ticker: 'PNLSN', name: 'Panelsan', currentPrice: 44.36, netDividend: 0.5848, grossDividend: 0.6497, exDividendDate: '2026-07-08', hasStableDividendHistory: false },
  { id: '58', ticker: 'GIPTA', name: 'Gıpta (Taksit 2)', currentPrice: 72.3, netDividend: 0.0066, grossDividend: 0.0073, exDividendDate: '2026-07-14', hasStableDividendHistory: false },
  { id: '59', ticker: 'EGPRO', name: 'Ege Profil (Taksit 2)', currentPrice: 41.46, netDividend: 0.5459, grossDividend: 0.6065, exDividendDate: '2026-07-16', hasStableDividendHistory: false },
  { id: '60', ticker: 'KTLEV', name: 'Katılımevim (Taksit 3)', currentPrice: 178.3, netDividend: 0.0821, grossDividend: 0.0912, exDividendDate: '2026-07-21', hasStableDividendHistory: false },
  { id: '61', ticker: 'TAVHL', name: 'TAV Havalimanları', currentPrice: 286.5, netDividend: 1.5342, grossDividend: 1.7046, exDividendDate: '2026-07-21', hasStableDividendHistory: false },
  { id: '62', ticker: 'GRTHO', name: 'GRTHO (Taksit 2)', currentPrice: 251.0, netDividend: 0.3817, grossDividend: 0.4241, exDividendDate: '2026-07-22', hasStableDividendHistory: false },
  { id: '63', ticker: 'OSMEN', name: 'Osmanlı Yatırım', currentPrice: 8.76, netDividend: 0.0424, grossDividend: 0.0471, exDividendDate: '2026-07-29', hasStableDividendHistory: true },

  // --- AĞUSTOS 2026 ---
  { id: '64', ticker: 'DOAS', name: 'Doğuş Otomotiv', currentPrice: 186.6, netDividend: 12.7500, grossDividend: 14.1666, exDividendDate: '2026-08-13', hasStableDividendHistory: true },
  { id: '65', ticker: 'TURSG', name: 'Türkiye Sigorta', currentPrice: 6.36, netDividend: 0.2550, grossDividend: 0.2833, exDividendDate: '2026-08-27', hasStableDividendHistory: true },
  { id: '66', ticker: 'SUWEN', name: 'Suwen Tekstil', currentPrice: 7.18, netDividend: 0.1518, grossDividend: 0.1686, exDividendDate: '2026-08-31', hasStableDividendHistory: false },

  // --- EYLÜL 2026 ---
  { id: '67', ticker: 'LIDER', name: 'Lider Filo (Taksit 3)', currentPrice: 97.4, netDividend: 0.0303, grossDividend: 0.0336, exDividendDate: '2026-09-08', hasStableDividendHistory: false },
  { id: '68', ticker: 'BIMAS', name: 'BİM (Taksit 2)', currentPrice: 374.0, netDividend: 4.2500, grossDividend: 4.7222, exDividendDate: '2026-09-16', hasStableDividendHistory: true },
  { id: '69', ticker: 'BIGCH', name: 'Big Chefs', currentPrice: 7.39, netDividend: 0.0850, grossDividend: 0.0944, exDividendDate: '2026-09-18', hasStableDividendHistory: false },
  { id: '70', ticker: 'PETUN', name: 'Pınar Et (Taksit 2)', currentPrice: 12.15, netDividend: 0.2083, grossDividend: 0.2314, exDividendDate: '2026-09-21', hasStableDividendHistory: true },
  { id: '71', ticker: 'GIPTA', name: 'Gıpta (Taksit 3)', currentPrice: 72.3, netDividend: 0.0066, grossDividend: 0.0073, exDividendDate: '2026-09-22', hasStableDividendHistory: false },
  { id: '72', ticker: 'MACKO', name: 'Maçkolik (Taksit 2)', currentPrice: 35.94, netDividend: 1.5300, grossDividend: 1.7000, exDividendDate: '2026-09-22', hasStableDividendHistory: false },
  { id: '73', ticker: 'TAVHL', name: 'TAV Havalimanları (Taksit 2)', currentPrice: 286.5, netDividend: 1.5342, grossDividend: 1.7046, exDividendDate: '2026-09-22', hasStableDividendHistory: false },
  { id: '74', ticker: 'LKMNH', name: 'Lokman Hekim (Taksit 2)', currentPrice: 15.01, netDividend: 0.1968, grossDividend: 0.2186, exDividendDate: '2026-09-28', hasStableDividendHistory: false },
  { id: '75', ticker: 'DESA', name: 'Desa Deri', currentPrice: 11.67, netDividend: 0.0714, grossDividend: 0.0793, exDividendDate: '2026-09-30', hasStableDividendHistory: false },
  { id: '76', ticker: 'KIMMR', name: 'Kimteks (Taksit 2)', currentPrice: 16.5, netDividend: 0.1771, grossDividend: 0.1967, exDividendDate: '2026-09-30', hasStableDividendHistory: false },
  { id: '77', ticker: 'TUPRS', name: 'Tüpraş', currentPrice: 216.8, netDividend: 5.7349, grossDividend: 6.3721, exDividendDate: '2026-09-30', hasStableDividendHistory: true },

  // --- EKİM 2026 ---
  { id: '78', ticker: 'AEFES', name: 'Anadolu Efes (Taksit 2)', currentPrice: 20.64, netDividend: 0.1443, grossDividend: 0.1603, exDividendDate: '2026-10-05', hasStableDividendHistory: true },
  { id: '79', ticker: 'EBEBK', name: 'Ebebek', currentPrice: 76.35, netDividend: 0.5313, grossDividend: 0.5903, exDividendDate: '2026-10-15', hasStableDividendHistory: false },
  { id: '80', ticker: 'BASCM', name: 'Baştaş Başkent Çimento', currentPrice: 14.28, netDividend: 0.9015, grossDividend: 1.0016, exDividendDate: '2026-10-21', hasStableDividendHistory: false },
  { id: '81', ticker: 'OSMEN', name: 'Osmanlı Yatırım (Taksit 2)', currentPrice: 8.76, netDividend: 0.0424, grossDividend: 0.0471, exDividendDate: '2026-10-26', hasStableDividendHistory: true },
  { id: '82', ticker: 'DESA', name: 'Desa Deri (Taksit 2)', currentPrice: 11.67, netDividend: 0.0816, grossDividend: 0.0906, exDividendDate: '2026-10-30', hasStableDividendHistory: false },

  // --- KASIM 2026 ---
  { id: '83', ticker: 'LIDER', name: 'Lider Filo (Taksit 4)', currentPrice: 97.4, netDividend: 0.0303, grossDividend: 0.0336, exDividendDate: '2026-11-06', hasStableDividendHistory: false },
  { id: '84', ticker: 'KBORU', name: 'Kuzey Boru', currentPrice: 25.94, netDividend: 0.0177, grossDividend: 0.0196, exDividendDate: '2026-11-10', hasStableDividendHistory: false },
  { id: '85', ticker: 'GIPTA', name: 'Gıpta (Taksit 4)', currentPrice: 72.3, netDividend: 0.0066, grossDividend: 0.0073, exDividendDate: '2026-11-17', hasStableDividendHistory: false },
  { id: '86', ticker: 'ASELS', name: 'Aselsan', currentPrice: 367.5, netDividend: 0.3635, grossDividend: 0.4038, exDividendDate: '2026-11-24', hasStableDividendHistory: true },
  { id: '87', ticker: 'DESA', name: 'Desa Deri (Taksit 3)', currentPrice: 11.67, netDividend: 0.0816, grossDividend: 0.0906, exDividendDate: '2026-11-30', hasStableDividendHistory: false },

  // --- ARALIK 2026 ---
  { id: '88', ticker: 'TCELL', name: 'Turkcell', currentPrice: 110.4, netDividend: 3.4000, grossDividend: 3.7777, exDividendDate: '2026-12-09', hasStableDividendHistory: true },
  { id: '89', ticker: 'EBEBK', name: 'Ebebek (Taksit 2)', currentPrice: 76.35, netDividend: 0.5313, grossDividend: 0.5903, exDividendDate: '2026-12-15', hasStableDividendHistory: false },
  { id: '90', ticker: 'BIMAS', name: 'BİM (Taksit 3)', currentPrice: 374.0, netDividend: 4.2500, grossDividend: 4.7222, exDividendDate: '2026-12-16', hasStableDividendHistory: true }
];

// ============================================================================
// 📁 src/components/StockModal.jsx
// ============================================================================

const StockModal = ({ stock, initialLots, onClose, onSavePortfolio }) => {
  const yieldPct = calculateYield(stock.netDividend, stock.currentPrice);
  const formattedDate = new Date(stock.exDividendDate).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const [calcMode, setCalcMode] = useState('lot');
  const [calcValue, setCalcValue] = useState('');
  const [lots, setLots] = useState(initialLots > 0 ? initialLots.toString() : '');

  const handleSave = () => {
    onSavePortfolio(stock.id, parseInt(lots, 10) || 0);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-800/50">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              {stock.ticker}
              {stock.hasStableDividendHistory && (
                <div title="Temettü Aristokratı" className="flex bg-amber-500/20 text-amber-400 rounded-full p-1 border border-amber-500/30">
                  <Crown size={16} className="fill-amber-400/50" />
                </div>
              )}
            </h3>
            <p className="text-sm text-slate-400">{stock.name}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-3 gap-3 bg-slate-950/30">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Fiyat</p>
            <p className="font-semibold text-slate-200">₺{stock.currentPrice.toFixed(2)}</p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-emerald-500/70 mb-1">Net Temettü</p>
            <p className="font-bold text-emerald-400">₺{stock.netDividend.toFixed(2)}</p>
          </div>
          <div className="bg-cyan-950/20 border border-cyan-900/30 rounded-xl p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-cyan-500/70 mb-1">Verim</p>
            <p className="font-bold text-cyan-400">%{yieldPct}</p>
          </div>
        </div>

        <div className="p-5 border-t border-slate-800/50">
          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
            <Briefcase size={16} className="text-blue-400" /> Portföy Yönetimi
          </h4>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              value={lots}
              onChange={(e) => setLots(e.target.value)}
              placeholder="Sahip olduğunuz lot"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-5 rounded-xl transition-colors"
            >
              <Save size={18} /> Kaydet
            </button>
          </div>
          
          {parseInt(lots, 10) > 0 && (
            <div className="mt-3 text-sm text-slate-400 flex justify-between items-center bg-blue-950/20 p-3 rounded-lg border border-blue-900/30">
              <span>{formattedDate} geliriniz:</span>
              <span className="font-bold text-blue-400 text-lg">
                ₺{(parseInt(lots, 10) * stock.netDividend).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-slate-800/50 bg-slate-900/80">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Calculator size={16} className="text-emerald-400" /> Hızlı Hesapla
            </h4>
            <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setCalcMode('lot')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${calcMode === 'lot' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Lot
              </button>
              <button
                onClick={() => setCalcMode('cash')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${calcMode === 'cash' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Tutar (₺)
              </button>
            </div>
          </div>
          
          <input
            type="number"
            min="0"
            value={calcValue}
            onChange={(e) => setCalcValue(e.target.value)}
            placeholder={calcMode === 'lot' ? 'Alınacak lot sayısı...' : 'Yatırılacak tutar (₺)...'}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors mb-4"
          />
          
          {parseFloat(calcValue) > 0 && (
            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4 flex justify-between items-center">
               <div className="flex flex-col">
                 <span className="text-xs text-slate-500">Net Nakit Getiri</span>
                 <span className="text-xl font-bold text-emerald-400">
                   ₺{calcMode === 'lot' 
                      ? (parseFloat(calcValue) * stock.netDividend).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : (Math.floor(parseFloat(calcValue) / stock.currentPrice) * stock.netDividend).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </span>
               </div>
               {calcMode === 'cash' && (
                 <div className="flex flex-col items-end">
                   <span className="text-xs text-slate-500">Alınabilir Lot</span>
                   <span className="text-sm font-medium text-slate-300">
                     {Math.floor(parseFloat(calcValue) / stock.currentPrice).toLocaleString('tr-TR')} Adet
                   </span>
                 </div>
               )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 📁 src/components/StockCard.jsx
// ============================================================================

const StockCard = ({ stock, portfolioLots, isFavorite, onToggleFavorite, onOpenModal }) => {
  const daysRemaining = getDaysRemaining(stock.exDividendDate);
  const theme = getStatusTheme(daysRemaining);
  const StatusIcon = theme.icon;
  const yieldPct = calculateYield(stock.netDividend, stock.currentPrice);

  const formattedDate = new Date(stock.exDividendDate).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl ${theme.border} ${theme.bg}
      `}
    >
      <div className="p-5 border-b border-slate-800/50">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center flex-wrap gap-2">
              {stock.ticker}
              {stock.hasStableDividendHistory && (
                <div title="Temettü Aristokratı (Kesintisiz 5+ Yıl)" className="flex items-center justify-center bg-amber-500/20 text-amber-400 rounded-full p-1 border border-amber-500/30">
                  <Crown size={14} className="fill-amber-400/50" />
                </div>
              )}
              {portfolioLots > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-medium bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/30">
                  <Briefcase size={10} /> {portfolioLots} Lot
                </span>
              )}
            </h3>
            <p className="text-sm text-slate-400 truncate max-w-[200px]">{stock.name}</p>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${theme.badgeBg}`}>
              <StatusIcon size={14} />
              <span className="hidden sm:inline">{daysRemaining === 0 ? 'Bugün!' : `${daysRemaining} Gün Kaldı`}</span>
              <span className="sm:hidden">{daysRemaining === 0 ? 'Bugün!' : `${daysRemaining} Gün`}</span>
            </div>

            <button 
              onClick={() => onOpenModal(stock)}
              className="p-1.5 bg-slate-800/50 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/30 rounded-full transition-all duration-300"
              title="Detay & Hesapla"
            >
              <Eye size={18} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(stock.id); }}
              className="p-1.5 bg-slate-800/50 hover:bg-amber-500/20 rounded-full transition-all duration-300"
              title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            >
              <Star size={18} className={`transition-all duration-300 ${isFavorite ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-400 hover:text-amber-400'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Wallet size={12}/> Anlık Fiyat</p>
          <p className="text-lg font-semibold text-slate-200">₺{stock.currentPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><ArrowDownToLine size={12}/> Net Temettü</p>
          <div className="flex items-end gap-2">
            <p className="text-lg font-bold text-emerald-400">₺{stock.netDividend.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mb-1 line-through" title="Brüt Tutar">₺{stock.grossDividend.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 bg-slate-900/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-slate-500" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-500">Hak Ediş Tarihi</span>
            <span className="text-sm font-medium text-slate-300">
              {formattedDate}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <span className="text-xs text-slate-500">Net Verim</span>
            <Info size={12} className="text-slate-600" title="(Net Temettü / Anlık Fiyat) * 100" />
          </div>
          <p className="text-xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center justify-end gap-1">
            %{yieldPct} <TrendingUp size={16} className="text-cyan-400" />
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 📁 src/components/StockGroup.jsx
// ============================================================================

const StockGroup = ({ title, icon: Icon, themeColors, stocks, isCollapsible = true, defaultOpen = false, portfolio, favorites, onToggleFavorite, onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (stocks.length === 0) return null;

  return (
    <div className={`mb-6 border rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${themeColors.border} ${themeColors.bg}`}>
      <div
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-5 transition-colors ${isCollapsible ? 'cursor-pointer hover:bg-slate-800/40' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${themeColors.iconBg}`}>
            <Icon className={themeColors.text} size={24} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            {title} <span className={`text-sm font-medium ml-2 px-2 py-0.5 rounded-full ${themeColors.iconBg} ${themeColors.text}`}>{stocks.length} Hisse</span>
          </h2>
        </div>
        {isCollapsible && (
          <div className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${themeColors.text}`}>
            <ChevronDown size={24} />
          </div>
        )}
      </div>

      <div 
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 border-t transition-all duration-300
          ${themeColors.borderInner} ${themeColors.bgInner} 
          ${isOpen ? 'p-6 opacity-100 max-h-[5000px]' : 'max-h-0 opacity-0 overflow-hidden border-t-0 p-0'}
        `}
      >
        {stocks.map(stock => (
          <StockCard 
            key={stock.id} 
            stock={stock} 
            portfolioLots={portfolio[stock.id]}
            isFavorite={favorites.includes(stock.id)}
            onToggleFavorite={onToggleFavorite}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 📁 src/components/Dashboard.jsx
// ============================================================================

const Dashboard = () => {
  const [stocks, setStocks] = useState(REAL_STOCKS);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('all'); 
  const [selectedStock, setSelectedStock] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('dividendFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [portfolio, setPortfolio] = useState(() => {
    try {
      const saved = localStorage.getItem('dividendPortfolio');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => { localStorage.setItem('dividendFavorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('dividendPortfolio', JSON.stringify(portfolio)); }, [portfolio]);

  // YENİ: YAHOO YFINANCE BENZERİ CANLI FİYAT ÇEKİCİ (PROXY İLE)
  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const symbols = REAL_STOCKS.map(s => `${s.ticker}.IS`).join(',');
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`
        )}`;

        const response = await fetch(proxyUrl);
        const wrapper = await response.json();
        const data = JSON.parse(wrapper.contents);

        if (data.quoteResponse && data.quoteResponse.result) {
          const liveQuotes = data.quoteResponse.result;

          const updatedStocks = REAL_STOCKS.map(stock => {
            const liveData = liveQuotes.find(q => q.symbol === `${stock.ticker}.IS`);
            if (liveData) {
              return {
                ...stock,
                currentPrice: liveData.regularMarketPrice || stock.currentPrice,
              };
            }
            return stock;
          });

          setStocks(updatedStocks);
        }
      } catch (error) {
        console.warn("⚠️ Canlı veri çekme hatası (Muhtemelen Proxy yoğunluğu). Mevcut verilerle devam ediliyor.");
      }
    };

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 900000); // 15 dakikada bir güncelle
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleSavePortfolio = (id, lots) => {
    setPortfolio(prev => {
      const newPortfolio = { ...prev };
      if (lots <= 0) {
        delete newPortfolio[id];
      } else {
        newPortfolio[id] = lots;
      }
      return newPortfolio;
    });
  };

  const activeStocks = stocks.filter(s => getDaysRemaining(s.exDividendDate) >= 0);

  const totalExpectedCash = useMemo(() => {
    return activeStocks.reduce((total, stock) => {
      const lots = portfolio[stock.id] || 0;
      return total + (stock.netDividend * lots);
    }, 0);
  }, [activeStocks, portfolio]);

  const processedStocks = useMemo(() => {
    let result = [...activeStocks];

    if (viewMode === 'favorites') {
      result = result.filter(s => favorites.includes(s.id));
    } else if (viewMode === 'portfolio') {
      result = result.filter(s => portfolio[s.id] > 0);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
    }
    
    if (activeFilter === 'aristocrat') {
      result = result.filter(s => s.hasStableDividendHistory);
    } else if (activeFilter === 'highYield') {
      result = result.filter(s => parseFloat(calculateYield(s.netDividend, s.currentPrice)) >= 5);
    }

    if (sortBy === 'date') {
      result.sort((a, b) => getDaysRemaining(a.exDividendDate) - getDaysRemaining(b.exDividendDate));
    } else if (sortBy === 'yield') {
      result.sort((a, b) => parseFloat(calculateYield(b.netDividend, b.currentPrice)) - parseFloat(calculateYield(a.netDividend, a.currentPrice)));
    }

    return result;
  }, [activeStocks, searchQuery, activeFilter, sortBy, viewMode, portfolio, favorites]);

  const urgentStocks = processedStocks.filter(s => getDaysRemaining(s.exDividendDate) <= 3);
  const warningStocks = processedStocks.filter(s => {
    const days = getDaysRemaining(s.exDividendDate);
    return days > 3 && days <= 7;
  });
  const safeStocks = processedStocks.filter(s => getDaysRemaining(s.exDividendDate) > 7);

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      
      {/* İstatistik Paneli */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={18} className="text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wider">Bekleyen Temettü</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeStocks.length} <span className="text-sm font-normal text-slate-500">Adet</span></p>
        </div>
        
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Crown size={18} className="text-amber-500" />
            <span className="text-xs font-medium uppercase tracking-wider">Aristokratlar</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeStocks.filter(s => s.hasStableDividendHistory).length} <span className="text-sm font-normal text-slate-500">Hisse</span></p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Briefcase size={18} className="text-blue-500" />
            <span className="text-xs font-medium uppercase tracking-wider">Portföyümdeki</span>
          </div>
          <p className="text-2xl font-bold text-white">{Object.values(portfolio).filter(lots => lots > 0).length} <span className="text-sm font-normal text-slate-500">Hisse</span></p>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-sm flex flex-col gap-2 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="flex items-center gap-2 text-emerald-400">
            <Wallet size={18} />
            <span className="text-xs font-medium uppercase tracking-wider">Portföy Net Getiri</span>
          </div>
          <p className="text-2xl font-black text-emerald-400 truncate">
            ₺{totalExpectedCash.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Alt Menü ve Kontrol Çubuğu */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-4 backdrop-blur-sm">
        
        {/* Alt Menü (Sekmeler) */}
        <div className="flex bg-slate-950/50 border border-slate-700/50 rounded-xl p-1 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setViewMode('all')}
            className={`flex-1 min-w-[120px] py-2 px-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${viewMode === 'all' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
          >
            Tüm Piyasa
          </button>
          <button
            onClick={() => setViewMode('favorites')}
            className={`flex-1 min-w-[120px] py-2 px-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${viewMode === 'favorites' ? 'bg-amber-500/20 text-amber-400 shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
          >
            <Star size={16} className={viewMode === 'favorites' ? 'fill-amber-400' : ''} /> Favorilerim
          </button>
          <button
            onClick={() => setViewMode('portfolio')}
            className={`flex-1 min-w-[120px] py-2 px-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${viewMode === 'portfolio' ? 'bg-blue-500/20 text-blue-400 shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
          >
            <Briefcase size={16} /> Portföyüm
          </button>
        </div>

        {/* Arama ve Filtreler */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center border-t border-slate-800/50 pt-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
               type="text"
               placeholder="Hisse ara..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button onClick={() => setActiveFilter('all')} className={`px-4 py-1.5 rounded-lg text-sm border font-medium whitespace-nowrap transition-colors ${activeFilter === 'all' ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-700 text-slate-400 hover:bg-slate-800/80'}`}>
              Tümü
            </button>
            <button onClick={() => setActiveFilter('aristocrat')} className={`px-4 py-1.5 rounded-lg text-sm border font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${activeFilter === 'aristocrat' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'border-slate-700 text-slate-400 hover:bg-slate-800/80'}`}>
              <Crown size={16}/> Aristokratlar
            </button>
            <button onClick={() => setActiveFilter('highYield')} className={`px-4 py-1.5 rounded-lg text-sm border font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${activeFilter === 'highYield' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'border-slate-700 text-slate-400 hover:bg-slate-800/80'}`}>
              <TrendingUp size={16}/> %5+ Verim
            </button>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto bg-slate-950/50 border border-slate-700 rounded-xl px-3 py-1.5 focus-within:border-emerald-500 transition-colors">
            <ArrowUpDown size={16} className="text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-300 focus:outline-none w-full md:w-auto cursor-pointer"
            >
              <option value="date" className="bg-slate-900">Yaklaşan Tarihe Göre</option>
              <option value="yield" className="bg-slate-900">En Yüksek Verime Göre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kart Listesi */}
      <div className="space-y-2 mt-6">
        {processedStocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 bg-slate-900/20 rounded-2xl border border-slate-800/50 border-dashed">
            {viewMode === 'favorites' ? <Star size={48} className="mb-4 text-slate-600" /> : 
             viewMode === 'portfolio' ? <Briefcase size={48} className="mb-4 text-slate-600" /> : 
             <Search size={48} className="mb-4 text-slate-600" />}
             
            <p className="text-lg font-medium text-center">
              {viewMode === 'favorites' ? 'Henüz favorilerinize hisse eklemediniz.' : 
               viewMode === 'portfolio' ? 'Portföyünüzde henüz hisse bulunmuyor.' : 
               'Aramanızla eşleşen hisse bulunamadı.'}
            </p>
            <p className="text-sm mt-1 text-center">
              {viewMode === 'all' ? 'Filtreleri temizlemeyi deneyin.' : 'Tüm Piyasa sekmesinden hisse ekleyebilirsiniz.'}
            </p>
          </div>
        ) : sortBy === 'yield' ? (
          <StockGroup 
            title="Verime Göre Sıralı Hisseler"
            icon={TrendingUp}
            stocks={processedStocks}
            isCollapsible={false}
            defaultOpen={true}
            portfolio={portfolio}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenModal={setSelectedStock}
            themeColors={{
              border: 'border-blue-900/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]',
              bg: 'bg-blue-950/20',
              borderInner: 'border-blue-900/30',
              bgInner: 'bg-blue-950/10',
              iconBg: 'bg-blue-500/20 border border-blue-500/30',
              text: 'text-blue-400'
            }}
          />
        ) : (
          <>
            <StockGroup 
              title="Acil Aksiyon (0-3 Gün İçinde)"
              icon={AlertCircle}
              stocks={urgentStocks}
              isCollapsible={false}
              defaultOpen={true}
              portfolio={portfolio}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onOpenModal={setSelectedStock}
              themeColors={{
                border: 'border-red-900/40 shadow-[0_0_20px_rgba(239,68,68,0.1)]',
                bg: 'bg-red-950/20',
                borderInner: 'border-red-900/30',
                bgInner: 'bg-red-950/10',
                iconBg: 'bg-red-500/20 border border-red-500/30',
                text: 'text-red-400'
              }}
            />
            <StockGroup 
              title="Yakın Takip (4-7 Gün Sonra)"
              icon={Flame}
              stocks={warningStocks}
              isCollapsible={true}
              defaultOpen={false}
              portfolio={portfolio}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onOpenModal={setSelectedStock}
              themeColors={{
                border: 'border-orange-900/40 hover:border-orange-700/50',
                bg: 'bg-orange-950/20 hover:bg-orange-950/30',
                borderInner: 'border-orange-900/30',
                bgInner: 'bg-orange-950/10',
                iconBg: 'bg-orange-500/20 border border-orange-500/30',
                text: 'text-orange-400'
              }}
            />
            <StockGroup 
              title="Güvenli Bölge (1 Haftadan Fazla Var)"
              icon={CheckCircle2}
              stocks={safeStocks}
              isCollapsible={true}
              defaultOpen={false}
              portfolio={portfolio}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onOpenModal={setSelectedStock}
              themeColors={{
                border: 'border-emerald-900/40 hover:border-emerald-700/50',
                bg: 'bg-emerald-950/20 hover:bg-emerald-950/30',
                borderInner: 'border-emerald-900/30',
                bgInner: 'bg-emerald-950/10',
                iconBg: 'bg-emerald-500/20 border border-emerald-500/30',
                text: 'text-emerald-400'
              }}
            />
          </>
        )}
      </div>

      {selectedStock && (
        <StockModal 
          stock={selectedStock}
          initialLots={portfolio[selectedStock.id] || 0}
          onClose={() => setSelectedStock(null)}
          onSavePortfolio={handleSavePortfolio}
        />
      )}

    </div>
  );
};

// ============================================================================
// 📁 src/App.jsx (Root Component)
// ============================================================================

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 font-sans pb-12">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <TrendingUp size={20} className="text-slate-950" strokeWidth={3} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Temettü<span className="font-light">Radar</span>
            </h1>
          </div>
          <div className="text-xs text-emerald-500 font-medium tracking-wider uppercase border border-emerald-900 bg-emerald-950/50 px-3 py-1 rounded-full flex items-center gap-1">
            <Briefcase size={12} /> PRO Sürüm
          </div>
          <p className="text-xs text-slate-500 mt-1">
  Son Güncelleme: {lastUpdated} (Otomatik)
</p>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Dashboard />
      </main>
    </div>
  );
}