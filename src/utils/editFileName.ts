import { uid } from 'uid';
import slugify from 'slugify';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const myFileImage = file.originalname.split('.');
  const fileTypeImage = file.originalname.split('.')[myFileImage.length - 1];
  callback(null, `${uid(8)}-${slugify(name.toLowerCase())}.${fileTypeImage}`);
};