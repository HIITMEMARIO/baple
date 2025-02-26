import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { useRouter } from 'next/router';
import type { PlacesForSearch } from '@/types/types';
import NextImage from 'next/image'; // 모듈명 변경
import Image from 'next/image';
import { useCurrentTheme } from '@/hooks/useCurrentTheme';

interface Props {
  place: PlacesForSearch;
}

const PlaceCard3 = ({ place }: Props) => {
  const router = useRouter();
  const {
    bookmarks_count,
    reviews_count,
    city,
    image_url,
    place_name,
    unique_place_id,
  } = place;

  const { baple } = useCurrentTheme();
  const defaultImage = baple
    ? '/images/default.png'
    : '/images/default_blue.png';

  const imgURL = image_url !== '' ? image_url : defaultImage;

  return (
    <div className='m-1 flex'>
      <Card
        shadow='sm'
        isPressable
        isHoverable
        onPress={() => router.push(`/place/${unique_place_id}`)}
        className='w-full h-auto sm:w-full sm:h-auto flex flex-col items-center rounded-3xl aspect-auto'
      >
        <CardBody className='overflow-visible rounded-3xl w-full flex items-center'>
          <Image
            width={300}
            height={300}
            alt={place_name}
            className='object-cover object-center rounded-3xl shadow-xl w-full h-[8.25rem] sm:w-full sm:h-[16.5rem]'
            src={imgURL}
          />
        </CardBody>
        <CardFooter className='flex flex-col w-full'>
          <div className='flex flex-col items-start w-full'>
            <span className='text-xs sm:text-sm'>{city}</span>
            <span className='text-sm sm:text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden'>
              {place_name}
            </span>
          </div>
          <div className='flex gap-2 w-full justify-end'>
            <span className='flex gap-1 items-center justify-center'>
              <NextImage
                src={`/images/icons/${
                  baple ? 'write_select.svg' : 'CBicons/CBwrite_select.svg'
                }`}
                width={20}
                height={20}
                alt='write_icon'
              />
              {reviews_count}
            </span>
            <span className='flex gap-2 items-center justify-center'>
              <NextImage
                src={`/images/icons/${
                  baple
                    ? 'bookmark_select.svg'
                    : 'CBicons/CBbookmark_select.svg'
                }`}
                width={20}
                height={20}
                alt='bookmark_icon'
                className='object-cover'
              />
              {bookmarks_count}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlaceCard3;
