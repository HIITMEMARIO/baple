import { supabase } from '@/libs/supabase';
import { QueryFunction } from '@tanstack/react-query';

export const getPlaceInfo = async (id: string) => {
  const { data: placeInfo, error } = await supabase
    .from('places')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }
  // console.log('placeInfo', placeInfo);
  return placeInfo;
};

export const getPlaceInfoList = async (ids: string[]) => {
  const { data: placeInfoList, error } = await supabase
    .from('places')
    .select(
      `
    *,
    bookmarks(*),
    reviews(*)

  `,
    )
    .in('id', ids);

  if (error) {
    throw error;
  }

  return placeInfoList;
};

type Params = {
  id: string;
  imageUrl: string;
};

export const updatePlaceImage = async ({ id, imageUrl }: Params) => {
  const { error } = await supabase
    .from('places')
    .update({ image_url: imageUrl })
    .eq('id', id);

  if (error) throw error;
};
/*
export const fetchPlacesData = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  console.log('fetchPlacesData호출');
  const pageSize = 20;
  // const searchValue = queryKey[1] || ''; // queryKey에서 검색어를 추출합니다.
  console.log('페이지파람!!', pageParam);
  const [_, searchValue] = queryKey;
  const { data, error } = await supabase
    .from('places')
    .select()
    .ilike('place_name', `%${searchValue}%`)
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1); // 페이징

  if (error) throw error;
  return data;
};
*/
