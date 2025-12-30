#    Proyek TRO
# Optimasi Jadwal Shift Karyawan Restoran 24 Jam

Proyek ini bertujuan untuk menganalisis dan mengoptimalkan pembagian shift karyawan menggunakan metode riset operasional guna meminimalkan biaya operasional harian di sebuah restoran yang beroperasi 24 jam.

1. Penjelasan Konteks Kasus

Restoran ini membagi waktu kerja menjadi empat shift dengan kebutuhan minimal karyawan dan tingkat upah yang berbeda:

Shift Pagi (P1): Kebutuhan minimal 4 orang.

Shift Siang (S1): Kebutuhan minimal 6 orang.

Shift Sore (S2): Kebutuhan minimal 5 orang.

Shift Malam (M1): Kebutuhan minimal 3 orang.

Total ketersediaan staf tetap: 18 karyawan.

2. Formulasi Matematika

A. Variabel Keputusan

$x_1$ = jumlah karyawan shift pagi (P1)

$x_2$ = jumlah karyawan shift siang (S1)

$x_3$ = jumlah karyawan shift sore (S2)

$x_4$ = jumlah karyawan shift malam (M1)

B. Fungsi Tujuan (Minimasi Biaya)

$$Min Z = 800.000x_1 + 1.200.000x_2 + 1.200.000x_3 + 840.000x_4$$

C. Kendala (Constraints)

Kebutuhan Minimum: $x_1 \ge 4, x_2 \ge 6, x_3 \ge 5, x_4 \ge 3$

Kapasitas SDM: $x_1 + x_2 + x_3 + x_4 = 18$

Non-negativitas: $x_j \ge 0$

3. Hasil Optimasi & Perbandingan Software

Fitur
Excel Solver
Python (SciPy/PuLP)

Hasil Optimal
$x_1=4, x_2=6, x_3=5, x_4=3$
$x_1=4, x_2=6, x_3=5, x_4=3$

Total Biaya (Z)
Rp18.920.000
Rp18.920.000

Interpretasi: Hasil dari kedua tools menunjukkan angka yang identik, memvalidasi bahwa titik optimal berada pada batas minimum kebutuhan setiap shift.

4. Analisis Eksploratif (Skenario)

Upah Malam +20%: Jika upah naik jadi Rp1.008.000, biaya total menjadi Rp19.424.000.

Lonjakan Siang: Menambah 2 karyawan di siang hari akan membengkakkan biaya karena upah siang tertinggi.

Kelebihan Staf: Jika staf jadi 20 orang, model menyarankan tambah di shift Pagi ($x_1$) karena termurah.

5. Rekomendasi Strategis

Efisiensi: Jangan tambah personil di shift Siang/Sore jika tidak mendesak.

Persiapan: Lakukan persiapan bahan makanan di shift malam untuk menghemat biaya tenaga kerja.

Otomasi: Gunakan script Python untuk penyesuaian jadwal jika ada perubahan upah di masa depan.
