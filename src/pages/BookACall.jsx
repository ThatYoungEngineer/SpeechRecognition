import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

import Tts from 'react-native-tts';

import COLORS from '../constants/colors';
import Database from '../constants/database';

import { styles } from '../styles/bookACall';
import Language from '../components/Language';
import { useGlobal } from '../context/GlobalContext'


const BookACall = () => {

  const {globalLanguage} = useGlobal()
  const initialFormData = Database.BookACall.initialFormData;

  const [formData, setFormData] = useState(initialFormData);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const language = Language(globalLanguage)

  const disabled = Database.BookACall.disabledFormFields(formData);
  const speakString = language.speakString(
    formData.timeSlot1Date,
    formData.timeSlot1Time,
    formData.timeSlot2Date,
    formData.timeSlot2Time,
    formData.timeSlot3Date,
    formData.timeSlot3Time,
  );
  const timeSlots = Database.BookACall.timeSlots;

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en-US');
      Tts.setDefaultRate(0.53);
    });
    Tts.addEventListener('tts-finish', e => {
      setIsSpeaking(false);
      Tts.stop();
    });
  }, []);

  const handleChangeDate = (event, id) => {
    let value = event.nativeEvent.text;
    setFormData(prevData => ({
      ...prevData,
      [`timeSlot${id}Date`]: value,
    }));
  };
  const handleChangeTime = (event, id) => {
    let value = event.nativeEvent.text;
    setFormData(prevData => ({
      ...prevData,
      [`timeSlot${id}Time`]: value,
    }));
  };
  const handleSubmit = () => {
    Alert.alert(language.success, language.formSubmittedSuccess, [
      {
        text: language.OK,
        onPress: () => setFormData(initialFormData)
      }
    ])
  }

  const speak = async () => {
    if (isSpeaking) {
      return;
    } else {
      setIsSpeaking(true);
      Platform.OS === 'ios'
        ? Tts.speak(speakString, {
            iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
            rate: 0.525,
          })
        : Tts.setDucking(true);
      Tts.setDefaultPitch(1);
      Tts.speak(speakString, {
        androidParams: {
          KEY_PARAM_PAN: 0,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };

  const stop = () => {
    Tts.stop();
    setTimeout(() => {
      setIsSpeaking(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.bodyHeader}>
            <View style={styles.bodyTitle}>
              <Text style={styles.bodyTitleTexts}>
                {language.bookACallHeaderPrimary}
              </Text>
              <Text style={styles.bodyTitleTexts}>
                {language.bookACallHeaderSecondary}
              </Text>
            </View>
            {!isSpeaking ? (
              <TouchableOpacity
                disabled={disabled || isSpeaking}
                style={{opacity: disabled || isSpeaking ? 0.1 : 1}}
                onPress={speak}>
                <Image
                  source={require('../assets/volume.png')}
                  style={styles.soundIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={stop}>
                <Image
                  source={require('../assets/stop.png')}
                  style={styles.stopSoundBtn}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.scrollView}>
            {timeSlots.map((timeSlot, index) => (
              <View key={timeSlot.id || index} style={styles.timeSlot}>
                <Text style={styles.timeSlotTitle}>
                  {timeSlot.title} <Text style={styles.requiredIcon}> *</Text>
                </Text>
                <View style={styles.inputsContainer}>
                  <TextInput
                    placeholderTextColor={COLORS.placeholder}
                    value={formData[`timeSlot${timeSlot.id}Date`]}
                    placeholder={timeSlot.date}
                    style={styles.input}
                    onChange={e => handleChangeDate(e, timeSlot.id)}
                  />
                  <TextInput
                    placeholderTextColor={COLORS.placeholder}
                    value={formData[`timeSlot${timeSlot.id}Time`]}
                    placeholder={timeSlot.time}
                    style={styles.input}
                    onChange={e => handleChangeTime(e, timeSlot.id)}
                  />
                </View>
              </View>
            ))}
            <View style={styles.submitBtnContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={disabled || isSpeaking}
                style={{
                  ...styles.submitBtn,
                  opacity: disabled || isSpeaking ? 0.5 : 1,
                }}>
                <Text style={styles.submit}>{language.submit}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default BookACall;