export type MappingFunction = (item: any) => { label: any; value: any };

export function createOptions(arr: any, mapFunction?: MappingFunction) {
  if (Array.isArray(arr) && !!arr.length) {
    if (mapFunction) {
      return arr.map(mapFunction);
    }

    return arr.map((item) => ({ label: item, value: item }));
  } else {
    throw new Error("Input harus berupa array");
  }
}

export function validatePhoneNumber(phoneNumber:string) {
  console.log("__PHONE",phoneNumber);
  
  // Menghapus spasi atau tanda baca lainnya
  phoneNumber = phoneNumber.replace(/\D/g, '');

  // Menghapus angka 0 di awal jika ada
  if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.substring(1);
  }

  // Memastikan nomor telepon memiliki panjang antara 4 hingga 12 digit
  const isValid = /^\d{4,12}$/.test(phoneNumber);
  return isValid ? phoneNumber : null;
}
