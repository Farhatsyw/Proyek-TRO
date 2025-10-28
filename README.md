# Proyek-TRO
# Optimasi Jadwal Shift Karyawan pada Restoran 24 Jam

Restoran ini beroperasi selama 24 jam setiap hari dan membagi waktu kerja menjadi empat shift, yaitu shift pagi (P1), shift siang (S1), shift sore (S2), dan shift malam (M1). Setiap shift memiliki kebutuhan minimal jumlah karyawan serta tingkat upah per jam yang berbeda. Tujuan dari model ini adalah menentukan jumlah optimal karyawan yang bekerja pada setiap shift agar total biaya gaji harian menjadi minimum, dengan tetap memenuhi kebutuhan operasional restoran selama 24 jam.

Untuk membangun model matematis, didefinisikan variabel keputusan sebagai berikut:
- x₁ = jumlah karyawan yang bekerja pada shift pagi (P1)
- x₂ = jumlah karyawan yang bekerja pada shift siang (S1)
- x₃ = jumlah karyawan yang bekerja pada shift sore (S2)
- x₄ = jumlah karyawan yang bekerja pada shift malam (M1)

Fungsi tujuan dari model ini adalah untuk meminimalkan total biaya tenaga kerja per hari:
Min Z = 800.000x₁ + 1.200.000x₂ + 1.200.000x₃ + 840.000x₄

dengan keterangan:
- x₁: jumlah tenaga kerja shift pagi  
- x₂: jumlah tenaga kerja shift siang  
- x₃: jumlah tenaga kerja shift sore  
- x₄: jumlah tenaga kerja shift malam  

Tujuan dari fungsi ini adalah untuk mendapatkan kombinasi jumlah tenaga kerja pada setiap shift yang menghasilkan biaya total paling rendah tanpa mengganggu kebutuhan operasional harian.

Agar solusi yang diperoleh realistis dan sesuai kebutuhan, ditetapkan beberapa kendala sebagai berikut:
1. Kebutuhan minimum karyawan per shift  
   x₁ ≥ 4, x₂ ≥ 6, x₃ ≥ 5, x₄ ≥ 3  
2. Total jumlah karyawan yang tersedia per hari  
   x₁ + x₂ + x₃ + x₄ = 18  
3. Non-negativitas variabel keputusan  
   xⱼ ≥ 0 untuk j = 1, 2, 3, 4  

Repository ini berisi hasil pembuatan model optimasi untuk menentukan jadwal shift karyawan restoran 24 jam. File yang terdapat dalam repository ini meliputi:
- Model_Optimasi_Shift_Karyawan.docx : berisi penjelasan lengkap studi kasus dan formulasi model.  
- TRO.FAR.xlsx : berisi data kebutuhan karyawan dan biaya per shift yang digunakan dalam model.  

Penyelesaian model (pencarian solusi optimal dan analisis hasil) akan ditambahkan pada tahap berikutnya.

