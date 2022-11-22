import {ScrollView} from 'react-native';
import DestinationsCard from './card/DestinationCard';

const PopularDestinations = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginLeft: 20, marginTop: 20, marginBottom: 50}}>
      <DestinationsCard
        name="Bali"
        image={require('../assets/img/indonesia/bali.png')}
      />
      <DestinationsCard
        name="Jakarta"
        image={require('../assets/img/indonesia/jakarta.png')}
      />
      <DestinationsCard
        name="Yogyakarta"
        image={require('../assets/img/indonesia/jogja.png')}
      />
      <DestinationsCard
        name="Bandung"
        image={require('../assets/img/indonesia/bandung.png')}
      />
      <DestinationsCard
        name="Medan"
        image={require('../assets/img/indonesia/medan.png')}
      />
    </ScrollView>
  );
};

export default PopularDestinations;
