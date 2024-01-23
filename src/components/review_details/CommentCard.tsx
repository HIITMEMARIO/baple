import React from 'react';
import { Avatar } from '@nextui-org/react';
import { formatDate } from '@/utils/dateFormatter';

import type { CommentsWithUser } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import Image from 'next/image';
import { useDeleteCommentMutation } from '@/hooks/commentQueries';

interface Props {
  comment: CommentsWithUser;
}

const CommentCard = ({ comment }: Props) => {
  const placeId = comment.reviews.place_id;
  const { userId: currentUserId } = useSelector(
    (state: RootState) => state.auth,
  );

  // const queryClient = useQueryClient();

  // const deleteMutate = useMutation({
  //   mutationFn: deleteComment,
  //   onSuccess: () => {
  //     toastSuccess('삭제 완료');
  //     queryClient.invalidateQueries({ queryKey: ['comments'] });
  //     queryClient.invalidateQueries({
  //       queryKey: ['likes', currentUserId],
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ['reviews', currentUserId],
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ['reviews', placeId],
  //     });
  //   },
  // });
  const deleteComment = useDeleteCommentMutation({ currentUserId, placeId });
  const showDelBtn = comment.user_id == currentUserId ? true : false;

  const deleteBtnHandler = (commentId: string) => {
    deleteComment.mutate(commentId);
  };

  return (
    <div className='py-3 border-b-2  border-t-2 min-h-[90px] '>
      <div>
        <div className='flex gap-4 items-center'>
          <Avatar
            src={comment.users?.avatar_url}
            showFallback
            className='h-100px h-[60px] w-[60px]'
            radius='full'
            // size='lg'
          />
          <div className='w-full flex justify-between'>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-x-6'>
                <strong className='text-md text-lg'>
                  {comment.users?.user_name}
                </strong>
                <span>{formatDate(comment.created_at)}</span>
              </div>

              <span>{comment.content}</span>
            </div>

            <div
              className={`flex flex-col gap-3 items-end mr-6  ${
                showDelBtn ? '' : 'hidden'
              }`}
            >
              <button
                className={` w-7 `}
                onClick={deleteBtnHandler.bind(null, comment.id)}
              >
                <Image
                  src='/images/icons/delete.svg'
                  width={30}
                  height={30}
                  alt='delete button icon'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
