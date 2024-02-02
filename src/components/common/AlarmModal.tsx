import { useAlarm } from '@/hooks/useAlarm';
import { RootState } from '@/redux/config/configStore';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

interface Props {
  alarmState: boolean;
}

interface CombinedDataType {
  id: string;
  created_at: string;
  received_id: string;
  sender_id: string;
  type: string;
  read: boolean;
  review_id: string;
  like_id: string;
}

const AlarmModal = ({ alarmState }: Props) => {
  const {
    alarmData,
    // likeAlarmData,
    updateAlarm,
    updateAllAlarm,
  } = useAlarm();
  const router = useRouter();
  const { userId } = useSelector((state: RootState) => state.auth);

  // 읽음 처리
  const readAlarm = (AlarmId: string, reviewId: string) => {
    updateAlarm(AlarmId);
    router.push(`/review/${reviewId}`);
  };

  // 모두 읽음 처리
  const readAllAlarm = (userId: string) => {
    updateAllAlarm(userId);
  };

  return (
    <>
      <Popover showArrow placement='bottom'>
        <PopoverTrigger>
          <Button variant='light'>
            {alarmState ? (
              <VscBellDot size={25} className='cursor-pointer' />
            ) : (
              <VscBell size={25} className='cursor-pointer' />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-4 flex gap-2'>
          <Button
            size='sm'
            isDisabled={alarmData?.length === 0 ? true : false}
            onClick={() => readAllAlarm(userId)}
          >
            모두 읽음
          </Button>
          {alarmData?.map((item) => (
            <div
              key={item.id}
              className='w-[200px] h-auto bg-white p-2 rounded-lg cursor-pointer hover:bg-slate-200 transition-background'
              onClick={() => readAlarm(item.id, item.review_id)}
            >
              {item.type === 'comment'
                ? '💬 새로운 댓글이 있습니다.'
                : '❤ 새로운 좋아요가 있습니다.'}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AlarmModal;
