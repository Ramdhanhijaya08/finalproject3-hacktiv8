import {Text, TouchableOpacity} from 'react-native';

const PrimaryButton = ({children, style, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#4C4DDC',
        borderRadius: 13,
        paddingVertical: 15,
        ...style,
      }}
      activeOpacity={0.8}
      {...props}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#fff',
          textAlign: 'center',
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
