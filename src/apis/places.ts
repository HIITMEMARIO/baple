import { supabase } from '@/libs/supabase';

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
