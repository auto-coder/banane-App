export default function (errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Geçersiz E-posta Adresi';
    case 'auth/email-already-exists':
      return 'E-posta Adresi Kayıtlı';
    case 'auth/user-not-found':
      return 'Kullanıcı Bulunamadı';
    case 'auth/weak-password':
      return 'Şifre Zayıf';
    case 'auth/email-already-in-use':
      return 'Kullanıcı Zaten Kayıtlı';
      case 'auth/wrong-password':
        return 'Yanlış Şifre';
    default:
      return errorCode;
  }
}
