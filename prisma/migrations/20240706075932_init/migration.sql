/*
  Warnings:

  - Changed the type of `genre` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "bookGenre" AS ENUM ('ilmuUmumDanKomputer', 'bibliografi', 'perpustakaanDanIlmuInformasi', 'ensiklopediaUmum', 'terbitanBerseriDanBerkala', 'organisasiUmumDanMuseum', 'jurnalismeAtauMediaBerita', 'kumpulanKaryaUmum', 'manuskripDanNaskahNaskah', 'filsafat', 'metafisika', 'epistemologi', 'fenomenaParanormal', 'pandanganFilsafatKhusus', 'psikologi', 'logika', 'etikaDanMoral', 'filsafatKuno', 'filsafatBaratModern', 'mitosKeagamaanDanTeologiSosial', 'filsafatDanTeoriAgama', 'alkitab', 'teologiKristen', 'moralKristen', 'ordeKeagamaanDanGerejaSetempat', 'eklesiastikKristen', 'sejarahGereja', 'denominasiDanSekteSekteKristen', 'agamaSelainKristen', 'agamaIslam', 'sosiologiDanAntropologi', 'statistikUmum', 'ilmuPolitikDanPemerintahan', 'ekonomi', 'hukum', 'administrasiNegaraDanIlmuKemiliteran', 'permasalahanDanKesejahteraanSosial', 'pendidikan', 'perdaganganDanKomunikasiDanTransportasi', 'adatIstiadat', 'terminologiDanBilingual', 'linguistikdanBahasaIndonesia', 'bahasaInggris', 'bahasaJerman', 'bahasaPerancis', 'bahasaItalia', 'bahasaSpanyolDanPortugis', 'bahasaLatin', 'bahasaYunani', 'bahasaBahasaLain', 'anekaRagamTentangIlmuPengetahuanAlam', 'matematika', 'astronomi', 'fisika', 'kimia', 'ilmuBumi', 'paleontologiDanPaleozoologi', 'biologi', 'ilmuTumbuhanDanIlmuTanaman', 'ilmuHewanDanIlmuBinatang', 'anekaRagamTeknologiDanIlmuTerapan', 'ilmuKedokteranDanIlmuPengobatan', 'ilmuTeknik', 'pertanian', 'kehidupanKeluarga', 'manajemen', 'teknologiKimia', 'pabrikDanManufaktur', 'produksiUntukKeperluanKhusus', 'teknikBangunan', 'teoriKesenian', 'seniPerkotaanDanPertanaman', 'arsitektur', 'seniPlastikDanSeniPatung', 'menggambarDanSeniDekorasi', 'seniLukisdanLukisan', 'seniGrafika', 'seniFotografiDanFoto', 'seniMusik', 'olahragaDanSeniPertunjukan', 'teoriKesusastraanDanRetorika', 'kesusastraanIndonesia', 'kesusastraanInggris', 'kesusastraanJerman', 'kesusastraanPerancis', 'kesusastraanItalia', 'kesusastraanSpanyolDanPortugis', 'kesusastraanLatin', 'kesusastraanYunaniKuno', 'kesusastraanLainLain', 'teoriIlmuSejarah', 'geografiDanPerjalanan', 'biografiDanSilsilah', 'sejarahDuniaKuno', 'sejarahUmumEropa', 'sejarahUmumAsia', 'sejarahUmumAfrika', 'sejarahUmumAmerikaUtara', 'sejarahUmumAmerikaSelatanAtauAmerikaLatin', 'sejarahUmumBagianDuniaLainnya');

-- CreateEnum
CREATE TYPE "notificationType" AS ENUM ('updatePassword', 'successfulDonation', 'bookArrivedAtAgency', 'commentOnOwnPost', 'newNews', 'giftArrivedHome');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genre",
ADD COLUMN     "genre" "bookGenre" NOT NULL;

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "notificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
