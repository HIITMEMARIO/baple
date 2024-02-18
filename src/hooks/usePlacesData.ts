import { getDatafromServer } from '@/apis/mapData';
import { placesData } from '@/redux/modules/placesDataSlice';
import { Maplocation } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface regionDataProps {
  location: Maplocation;
  regionName: string;
  cityName: string;
}

export const usePlacesData = ({
  location,
  regionName,
  cityName,
}: regionDataProps) => {
  const dispatch = useDispatch();

  const { data, isError } = useQuery({
    queryKey: ['PlacesData', regionName, cityName],
    enabled: location !== null,
    queryFn: () => getDatafromServer({ regionName, cityName }),
  });
  useEffect(() => {
    if (data) {
      if (data !== null) dispatch(placesData(data.locationAdress));
      if (isError) throw 'error';
    }
  }, [data]);

  return data;
};
