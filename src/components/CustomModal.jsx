import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CloseIcon from '../assets/svg/close.svg';

const CustomModal = ({toggle, title, children, onClose}) => {
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={toggle}>
        <View style={styles.overlay}></View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={toggle}>
        <View style={styles.wrapperModalView}>
          <View style={styles.modalView}>
            <View style={styles.headerModal}>
              <Text style={styles.headerModalText}>{title}</Text>
              <View style={styles.wrapperIconClose}>
                <TouchableOpacity onPress={onClose}>
                  <CloseIcon width={20} height={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.contentModal}>{children}</View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(10, 10, 10, 1)',
    opacity: 0.2,
  },
  wrapperModalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  headerModal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingTop: 21,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    borderStyle: 'solid',

    alignSelf: 'center',
    width: '90%',
  },
  headerModalText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },
  wrapperIconClose: {
    justifyContent: 'center',
  },
  contentModal: {
    paddingTop: 28,
    paddingBottom: 60,
    alignSelf: 'center',
    width: '90%',
  },
});

export default CustomModal;
