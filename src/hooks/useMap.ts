import { regionName } from '@/apis/mapData';
import { Maplocation } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface locationDataProps {
  location: Maplocation;
  setRegionName: React.Dispatch<React.SetStateAction<string>>;
  setCityName: React.Dispatch<React.SetStateAction<string>>;
}

export const useMap = ({
  location,
  setCityName,
  setRegionName,
}: locationDataProps) => {
  const { data } = useQuery({
    queryKey: ['regionCity', location],
    enabled:
      location !== null &&
      location.center.lng !== 126.570667 &&
      location.center.lat !== 33.450701,
    queryFn: () => regionName(location),
  });
  useEffect(() => {
    if (data) {
      setRegionName(data.documents[0]?.address.region_2depth_name);
      setCityName(data.documents[0]?.address.region_1depth_name);
    }
  }, [data]);

  return data;
};
