import { Avatar, Button, Divider, Spacer } from '@nextui-org/react';
import React from 'react';

import type { ReviewWithPlaceAndUser } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '@/apis/reviews';
import { toastError, toastSuccess } from '@/libs/toastifyAlert';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  review: ReviewWithPlaceAndUser;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewUpperSection = ({ review, setIsEditing, isEditing }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const reviewDelteMutate = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toastSuccess('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['reviews', review.place_id] });
      router.back();
    },
    onError: () => {
      toastError('문제가 발생하여 삭제하지 못했습니다');
      return;
    },
  });
  const reviewDelete = () => {
    console.log('하이');
    reviewDelteMutate.mutate(review.id);
  };

  return (
    <>
      <Spacer y={10} />
      <Link href={`/place/${review.place_id}`}>
        <strong className='text-2xl'>{review.places.place_name}</strong>
      </Link>
      <Spacer y={5} />

      <div className='flex justify-between items-center gap-4 border-t-3 border-primary py-5'>
        <div className='flex  items-center gap-4'>
          <Avatar
            className='w-[88px] h-[88px]'
            showFallback
            src={review.users.avatar_url || undefined}
          />
          <p className='text-[25px]'>{review.users.user_name}</p>
        </div>
        <div className='flex gap-5'>
          <Button size='sm' color='primary' onClick={reviewDelete}>
            삭제
          </Button>
          <Button
            size='sm'
            color='primary'
            onClick={() => {
              setIsEditing((prev) => !prev);
            }}
          >
            {isEditing ? '취소' : '수정'}
          </Button>
        </div>
      </div>
      <Spacer y={10} />
    </>
  );
};

export default ReviewUpperSection;
