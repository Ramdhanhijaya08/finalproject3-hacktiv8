import {ScrollView} from 'react-native';
import DestinationsCard from './card/DestinationCard';

const IndonesianCiteis = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginLeft: 20, paddingVertical: 20}}>
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
        name="Batam"
        image={require('../assets/img/indonesia/batam.png')}
      />
    </ScrollView>
  );
};

export default IndonesianCiteis;
