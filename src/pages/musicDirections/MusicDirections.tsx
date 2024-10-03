import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Skeleton } from 'antd';
import MusicCard from '../../components/musicCard/MusicCard';
import MusicModal from '../../components/ui/modal/MusicModal';
import { useStores } from '../../services/root-store-context';

const mocData = [
  {
    id: 1,
    title: 'Барабаны',
    description: 'Научитесь управлять ритмом и играть на ударных под руководством опытных наставников.',
    image: 'https://example.com/images/drums.jpg',
    details: 'Курс охватывает основы игры на барабанах, развитие чувства ритма, создание композиций и импровизацию.',
  },
  {
    id: 2,
    title: 'Гитара (бас, акустическая, электрогитара)',
    description: 'Освойте игру на разных типах гитар. От аккордов акустики до соло на электрогитаре.',
    image: 'https://example.com/images/guitar.jpg',
    details: 'Курс для начинающих и опытных. Научитесь играть на гитаре в различных стилях, включая рок, поп и джаз.',
  },
  {
    id: 3,
    title: 'Вокал',
    description: 'Научитесь контролировать голос и петь уверенно, работая над техникой и дыханием.',
    image: 'https://example.com/images/vocal.jpg',
    details: 'Курс включает развитие вокальной техники, постановку голоса и работу с микрофоном.',
  },
  {
    id: 4,
    title: 'Клавишные',
    description: 'Узнайте основы игры на фортепиано и синтезаторе с возможностью импровизации.',
    image: 'https://example.com/images/piano.jpg',
    details: 'Курс подходит как для начинающих, так и для тех, кто хочет развить свои навыки игры на клавишных инструментах.',
  },
  {
    id: 5,
    title: 'Звукоинженеринг и создание музыки на ПК',
    description: 'Овладейте навыками звукорежиссера и научитесь создавать качественные треки на компьютере.',
    image: 'https://example.com/images/sound_engineer.jpg',
    details: 'На курсе вы освоите программы для создания музыки, микширование и мастеринг аудиозаписей.',
  },
];


export const MusicDirections: React.FC = observer(() => {
  const { musicStore } = useStores();

  useEffect(() => {
    musicStore.fetchDirections();
  }, []);

  if (musicStore.isLoading) {
    return (
      <div className="container">
        <h1>Музыкальные направления</h1>
        <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Skeleton active />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (musicStore.error) {
    return ( <div className='container'>
      <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
          {mocData.map((direction) => (
            <Col key={direction.id} xs={24} sm={12} md={8}>
              <MusicCard {...direction} />
            </Col>
          ))}
        </Row>
      <MusicModal />
        <p className='text-aling'>Не удалось загрузить остальные музыкальные направления</p>
      </div>);
  }

  return (
    <div className="container">
      <h1>Музыкальные направления</h1>
      {musicStore.directions.length <= 0 ? (
        <p>Ничего нет</p>
      ) : (
        <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
          {musicStore.directions.map((direction) => (
            <Col key={direction.id} xs={24} sm={12} md={8}>
              <MusicCard {...direction} />
            </Col>
          ))}
        </Row>
      )}
      <MusicModal />
    </div>
  );
});

export default MusicDirections;
