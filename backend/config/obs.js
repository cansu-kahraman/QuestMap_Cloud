const ObsClient = require('esdk-obs-nodejs');



const obsClient = new ObsClient({
  access_key_id: 'CANYHGIJXC7VQ3KEVPB5',
  secret_access_key: '9T4qYdrd39Ct5a0HSr8cLJKwyKMiPSqVjXgUY7tJ',
  server: 'obs.ap-southeast-3.myhuaweicloud.com' // Bölgenize uygun endpoint
});

// OBS'ye dosya yükleme fonksiyonu
const uploadImageToOBS = async (filePath, fileName) => {
  try {
    const result = await obsClient.putObject({
      Bucket: 'questions-bucket', // OBS'de oluşturduğunuz bucket adı
      Key: `uploads/images/${fileName}`, // Dosya adı, örneğin: 'images/resim1.jpg'
      SourceFile: `C:/Users/acagr/questmap/backend/${filePath}`, // Yüklemek istediğiniz dosyanın yolunu belirtin
    });
    console.log('Dosya OBS\'ye yüklendi:', result);
    return result;
  } catch (error) {
    console.error('OBS yükleme hatası:', error);
    throw new Error('Yükleme sırasında bir hata oluştu');
  }
};

module.exports = { obsClient, uploadImageToOBS };
