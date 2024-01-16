import { supabase } from '@/libs/supabase';

import type { Tables } from '@/types/supabase';
import type { ReviewUpdateParams } from '@/types/types';

// 리뷰 가져오기 (by Id)
export const getReviewById = async (id: string) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }
  return review as Tables<'reviews'>;
};

// 리뷰 정보 (by placeId)
export const getReviewsByPlaceId = async (placeId: string) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('place_id', placeId);
  if (error) {
    throw error;
  }
  return review;
};

export const getLikesWithCommentsByPlaceId = async (placeId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
    *,
    likes(*),
    comments(*),
    users (
      user_name
    )
  `,
    )
    .eq('place_id', placeId);

  if (error) {
    throw error;
  }
  console.log('여기!!!!!!!!!', data);
  return data;
};

export const updateReviewContent = async ({
  id,
  editValue,
}: ReviewUpdateParams) => {
  const { data, error } = await supabase
    .from('reviews')
    .update({ content: editValue })
    .eq('id', id)
    .select();
};

interface InsertReviewParams {
  content: string;
  placeId: string;
  userId: string;
  publicUrlList: string[];
}

export const insertNewReview = async ({
  content,
  placeId,
  userId,
  publicUrlList,
}: InsertReviewParams) => {
  const { data, error } = await supabase.from('reviews').insert([
    {
      content: content,
      place_id: placeId,
      user_id: userId,
      images_url: publicUrlList,
    },
  ]);
  // .select();
  console.log('리뷰 삽입 데이터 > ', data);
  if (error) throw error;
};

//리뷰가 많은 상위 8개 장소의 place_id 조회(remote procedure call)
export const getPlacesByReviewCount = async () => {
  let { data, error } = await supabase.rpc('get_top_place_ids');
  if (error) console.error(error);
  else {
    console.log(data);
    return data;
  }
};

// 유저가 작성한 리뷰 (by userId)
export const getReviewsByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select()
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
