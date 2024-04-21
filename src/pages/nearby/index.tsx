import Seo from '@/components/layout/Seo';
import MarkerContainer from '@/components/map/MarkerContainer';
import MylocationButton from '@/components/map/MylocationButton';
import MylocationOverlayMap from '@/components/map/MylocationOverlayMap';
import PlacesModal from '@/components/map/PlacesModal';
import { useViewport } from '@/hooks/useViewport';
import { RootState } from '@/redux/config/configStore';
import { Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import { setMyPosition } from '@/apis/mapData';
import { useMap } from '@/hooks/useMap';
import { usePlacesData } from '@/hooks/usePlacesData';

import type { Maplocation } from '@/types/types';

const NearByPage = () => {
  const [location, setLocation] = useState<Maplocation>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [mylocation, setMyLocation] = useState<Maplocation>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const { isMobile } = useViewport();
  const [regionName, setRegionName] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const places = useSelector((state: RootState) => state.placesData);
  useMap({ location, setCityName, setRegionName });
  usePlacesData({ location, regionName, cityName });

  useEffect(() => {
    if (isMobile) {
      setIsModalVisible(false);
    } else {
      setIsModalVisible(true);
    }
  }, [isMobile]);

  useEffect(() => {
    setMyPosition({ setLocation, setMyLocation });
  }, []);

  return (
    <div className='overflow-hidden flex relative'>
      <Seo />
      {!mylocation.isLoading ? (
        <Map
          center={location.center}
          style={{
            width: '100%',
            height: '93vh',
          }}
          level={8}
          minLevel={11}
          draggable={true}
          zoomable={true}
          keyboardShortcuts={true}
          scrollwheel={true}
          onDragEnd={(map) =>
            setLocation({
              center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
              },
              errMsg: null,
              isLoading: false,
            })
          }
        >
          <MapMarker
            position={mylocation.center}
            image={{
              src: '/images/icons/character.svg',
              size: {
                width: 44,
                height: 40,
              },
            }}
          />
          <MylocationOverlayMap mylocation={mylocation} />

          {/* 커스텀 오버레이를 뿌려줌 */}
          {places?.map((place) => (
            <MarkerContainer key={place.id} place={place} />
          ))}
          {places?.length !== 0 ? (
            <PlacesModal
              cityName={cityName}
              regionName={regionName}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          ) : null}

          <MylocationButton mylocation={mylocation} setLocation={setLocation} />
          <MapTypeControl position={'TOPLEFT'} />
          <ZoomControl position={'LEFT'} />
        </Map>
      ) : (
        <div className='w-[100%] h-[90vh] flex items-center justify-center'>
          <Spinner
            label='로딩이 계속 된다면 새로고침 후 위치 접근 권한을 허용해 주세요!'
            color='primary'
            size='lg'
            labelColor='primary'
          />
        </div>
      )}
    </div>
  );
};

export default NearByPage;
