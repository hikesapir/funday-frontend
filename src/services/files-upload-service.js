import { httpService } from './http.service'

// AXIOS
export const uploadImg = async (file) => {
  //gets the file and upload it to cloudinary
  // Defining our variables
  const UPLOAD_PRESET = 'misterToy'; // Insert yours
  const CLOUD_NAME = 'mistertoysss'; // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const FORM_DATA = new FormData();
  // Building the request body
  FORM_DATA.append('file', file);
  FORM_DATA.append('upload_preset', UPLOAD_PRESET);
  // Sending a post method request to Cloudniarys' API
  try {
    const res = await httpService.post(UPLOAD_URL, FORM_DATA);
    return res;
  } catch (err) {
    console.error('ERROR!', err);
  }
};
