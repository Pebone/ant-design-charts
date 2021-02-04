import React, { useEffect, useState } from 'react';
import { Scene, ISceneConfig } from '@antv/l7';
import { SceneContext } from './context';
import SceneComponent from './components/scene';
import { CreateDistrict, CreateMapBox, CreateAttachContainer } from './util';

// form L7
interface IMapOptions {}

interface ILayerOptions {}

interface IMapSceneConig {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  option?: Partial<ISceneConfig>;
  mapConfig: IMapOptions;
  layerConfig?: ILayerOptions;
  attachMap?: Omit<IMapSceneConig, 'attachMap'>;
  data: any[];
  onSceneLoaded?: (scene: Scene) => void;
}

const ATTACHMAPBOX = 'attachContainer';

const Map = (props: IMapSceneConig) => {
  const { mapConfig, option, attachMap } = props;
  const [scene, setScene] = useState<Scene>();
  const [attachContainer, setAttachContainer] = useState<HTMLElement | null>();
  useEffect(() => {
    if (attachContainer && attachMap) {
      // const { style } = attachMap;
      // CreateAttachContainer(attachContainer, ATTACHMAPBOX, {
      //   position: 'absolute',
      //   width: '98px',
      //   height: '125px',
      //   right: '50px',
      //   bottom: '25px',
      //   border: '1px solid #333',
      // });
    }
  }, [attachContainer]);
  return (
    <SceneContext.Provider value={scene}>
      <SceneComponent
        {...props}
        option={{
          logoVisible: false,
          ...option,
        }}
        map={CreateMapBox(mapConfig)}
        onSceneLoaded={(scene, container) => {
          setScene(scene);
          setAttachContainer(container);
          CreateDistrict({ ...props, scene });
        }}
      />
      {attachContainer && attachMap && (
        <SceneComponent
          {...attachMap}
          option={{
            logoVisible: false,
            ...attachMap.option,
          }}
          map={CreateMapBox(attachMap.mapConfig)}
          parentBox={attachContainer}
          onSceneLoaded={(scene) => {
            CreateDistrict({ ...attachMap, scene });
          }}
        />
      )}
    </SceneContext.Provider>
  );
};

export default Map;
