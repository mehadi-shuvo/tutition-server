import { District } from './districts.model';

const getThannasFromDB = async (dis: string) => {
  const result = await District.findOne({ district: dis }).collation({
    locale: 'en',
    strength: 2,
  });

  if (!result) {
    return null;
  }
  return result;
};

export const districtServices = {
  getThannasFromDB,
};
