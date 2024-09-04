import { getURLbyEndPointV2 } from '@/store/api';
import axios from 'axios';

export async function getBppEnrollData(
  offset: number,
  pageLimit: number,
  country: string
) {
  try {
    const url = `${getURLbyEndPointV2('getBppMember')}?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : '');
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
