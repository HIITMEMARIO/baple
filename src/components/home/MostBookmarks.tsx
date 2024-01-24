import { useQuery } from '@tanstack/react-query';
import { getPlaceInfoList, getTopBookmarkedPlaces } from '@/apis/places';
import PlaceCard from '../common/PlaceCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { getPlacesByBookmarkCount } from '@/apis/bookmarks';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Spacer } from '@nextui-org/react';

const MostBookmarks = () => {
  const { data: topBookmarkedPlacesList, isLoading: placesListLoading } =
    useQuery({
      queryKey: ['topBookmarkedPlacesList'],
      queryFn: getTopBookmarkedPlaces,
    });

  if (placesListLoading) {
    return <p>데이터 불러오는중...</p>;
  }

  return (
    <div className='w-[1050px] p-1'>
      <p>가장 많이 북마크 된 장소</p>
      <Spacer y={4} />
      <Swiper
        loop={true} // 슬라이드 루프
        spaceBetween={1}
        slidesPerView={4}
        navigation={true} // prev, next button
        modules={[Navigation, Autoplay]}
        autoplay={true}
        allowTouchMove={false}
      >
        {topBookmarkedPlacesList?.map((place) => {
          return (
            <SwiperSlide key={place.unique_place_id}>
              <PlaceCard key={place.unique_place_id} place={place} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MostBookmarks;
