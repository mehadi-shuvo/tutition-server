import { District } from './districts.model';

const getThannasFromDB = async (dis: string) => {
  const district = dis.toLowerCase();
  const result = await District.findOne({ district });
  if (!result) {
    return null;
  }
  return result;
};

export const districtServices = {
  getThannasFromDB,
};
