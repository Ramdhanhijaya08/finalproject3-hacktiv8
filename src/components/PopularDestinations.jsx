import {ScrollView} from 'react-native';
import DestinationsCard from './card/DestinationCard';

const PopularDestinations = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginLeft: 20, marginTop: 20, marginBottom: 50}}>
      <DestinationsCard
        name="Tokyo"
        image={require('../assets/img/inter/tokyo.png')}
      />
      <DestinationsCard
        name="London"
        image={require('../assets/img/inter/london.png')}
      />
      <DestinationsCard
        name="New York"
        image={require('../assets/img/inter/new-york.png')}
      />
      <DestinationsCard
        name="Berlin"
        image={require('../assets/img/inter/berlin.png')}
      />
      <DestinationsCard
        name="Sydney"
        image={require('../assets/img/inter/sydney.png')}
      />
    </ScrollView>
  );
};

export default PopularDestinations;
