import axios from 'axios';

import type { Maplocation } from '@/types/types';
import { supabase } from '@/libs/supabase';

interface setMylocationProps {
  setLocation: React.Dispatch<React.SetStateAction<Maplocation>>;
  setMyLocation: React.Dispatch<React.SetStateAction<Maplocation>>;
}

export const regionName = async (location: Maplocation) => {
  const { data: cityRegionName } = await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.center.lng}&y=${location.center.lat}&input_coord=WGS84`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    },
  );
  console.log('🚀 ~ regionName ~ cityRegionName:', cityRegionName);

  return cityRegionName;
};

export const setMyPosition = ({
  setLocation,
  setMyLocation,
}: setMylocationProps) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          isLoading: false,
        }));
        setMyLocation((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          isLoading: false,
        }));
      },
      (err) => {
        setLocation((prev) => ({
          ...prev,
          errMsg: err.message,
        }));
      },
    );
  } else {
    setLocation((prev) => ({
      ...prev,
      errMsg: 'geolocation을 사용할수 없어요..',
      isLoading: false,
    }));
  }
};

export const getDatafromServer = async ({
  regionName,
  cityName,
}: {
  regionName: string;
  cityName: string;
}) => {
  const { data: locationAdress, error } = await supabase
    .from('places')
    .select('*')
    .eq('district', regionName)
    .eq('city', cityName);
  return { locationAdress, error };
};
