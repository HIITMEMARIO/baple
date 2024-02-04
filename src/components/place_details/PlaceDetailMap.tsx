import { useCurrentTheme } from '@/hooks/useCurrentTheme';
import { Tables } from '@/types/supabase';
import { Button } from '@nextui-org/react';
import { useRef, useState } from 'react';
import {
  CustomOverlayRoadview,
  Map,
  MapMarker,
  MapTypeControl,
  Roadview,
  ZoomControl,
} from 'react-kakao-maps-sdk';

interface Props {
  placeInfo: Tables<'places'>;
}

const PlaceDetailMap = ({ placeInfo }: Props) => {
  const { baple } = useCurrentTheme();
  const roadviewRef = useRef<kakao.maps.Roadview | null>(null);
  const [toggle, setToggle] = useState('map');

  let placePosition = {
    lat: placeInfo?.lat,
    lng: placeInfo?.lng,
  };

  const Content = () => {
    return (
      <div className='bg-white  text-black w-[250px] h-[100px] rounded-[20px] flex items-center justify-center text-[20px] font-bold text-wrap p-4'>
        <p>{placeInfo.place_name}</p>
        <div className='w-5 h-5 bg-white absolute bottom-[-10px] rotate-45'></div>
      </div>
    );
  };

  return (
    <section className='mb-[30px] relative'>
      {toggle === 'map' && (
        <Map
          center={placePosition}
          draggable={false}
          // zoomable={true}
          scrollwheel={false}
          keyboardShortcuts={true}
          style={{
            // 지도의 크기
            width: '100%',
            height: '300px',
          }}
          level={4}
          minLevel={8}
        >
          <MapMarker
            position={placePosition}
            image={{
              src: `/images/icons/${
                baple ? 'marker.svg' : 'CBicons/CBmarker.svg'
              }`, // 마커이미지의 주소입니다
              size: {
                width: 44,
                height: 40,
              },
            }}
          />
          <Button
            className='absolute flex z-10 top-[3px] left-[130px] w-[90px] h-[32px] justify-center'
            variant='solid'
            color='primary'
            onClick={() => setToggle('roadview')}
            title='지도 보기'
          >
            로드뷰 보기
          </Button>
          <MapTypeControl position={'TOPLEFT'} />
          <ZoomControl position={'LEFT'} />
        </Map>
      )}

      {toggle === 'roadview' && (
        <Roadview
          position={{ ...placePosition, radius: 200 }}
          style={{
            width: '100%',
            height: '300px',
          }}
          ref={roadviewRef}
        >
          {/* <RoadviewMarker position={placePosition} /> */}
          <Button
            className='absolute top-[5px] left-[5px] z-10 flex w-[90px] h-[32px] justify-center'
            variant='solid'
            color='primary'
            onClick={() => setToggle('map')}
            title='지도 보기'
          >
            지도
          </Button>
          <CustomOverlayRoadview
            position={placePosition}
            xAnchor={0.5}
            yAnchor={0.5}
            onCreate={(overlay) => {
              const roadview = roadviewRef.current;

              if (!roadview) {
                return;
              }

              const projection = roadview.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.
              // 커스텀오버레이의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
              console.log(overlay.getPosition());
              const viewpoint = projection.viewpointFromCoords(
                overlay.getPosition(),
                overlay.getAltitude(),
              );
              roadview.setViewpoint(viewpoint); //커스텀 오버레이를 로드뷰의 가운데에 오도록 로드뷰의 시점을 변화 시킵니다.
            }}
          >
            <Content />
          </CustomOverlayRoadview>
        </Roadview>
      )}
    </section>
  );
};

export default PlaceDetailMap;
