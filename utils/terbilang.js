export function terbilang(n) {
  const satuan = [
    '', 'satu', 'dua', 'tiga', 'empat', 'lima',
    'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'
  ]

  if (n < 12) return satuan[n]
  if (n < 20) return terbilang(n - 10) + ' belas'
  if (n < 100) return terbilang(Math.floor(n / 10)) + ' puluh ' + terbilang(n % 10)
  if (n < 200) return 'seratus ' + terbilang(n - 100)
  if (n < 1000) return terbilang(Math.floor(n / 100)) + ' ratus ' + terbilang(n % 100)
  if (n < 2000) return 'seribu ' + terbilang(n - 1000)
  if (n < 1000000) return terbilang(Math.floor(n / 1000)) + ' ribu ' + terbilang(n % 1000)
  if (n < 1000000000) return terbilang(Math.floor(n / 1000000)) + ' juta ' + terbilang(n % 1000000)

  return 'angka terlalu besar'
}