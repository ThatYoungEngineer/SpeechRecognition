import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

import COLORS from '../constants/colors';
import endpoints from '../constants/endpoints';

import Language from '../components/Language';
import Dropdown from '../components/Dropdown';

import {useGlobal} from '../context/GlobalContext';

import useAPIResolver from '../helpers/useApiResolver';
import requestMicrophonePermission from '../helpers/requestMicrophonePermission';

import { styles } from '../styles/messages';

const Messages = () => {
  const {globalLanguage} = useGlobal();
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState({
    speaking: false,
    messageId: null,
  });
  const [recognizedText, setRecognizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {APIRequest: CHAT_API_RESQUEST} = useAPIResolver();

  const scrollViewRef = useRef(null);

  const disabled = isListening || isSpeaking.speaking || isLoading;

  const language = Language(globalLanguage);

  useEffect(() => {
    requestMicrophonePermission();

    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en-US');
    });

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    Tts.addEventListener('tts-finish', event => {
      setIsSpeaking({speaking: false, messageId: null});
      Tts.stop();
    });

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    console.log('Recording started', e);
    setIsListening(true);
  };

  const onSpeechEnd = async e => {
    console.log('Recording stopped', e);
    setIsListening(false);
  };

  const onSpeechResults = event => {
    console.log('Speech Results: ', event);
    const text = event.value[0];
    setRecognizedText(text);
  };

  const onSpeechError = error => {
    Alert.alert('Alert', 'No speech detected!', [{text: 'Dismiss'}]);
    setIsListening(false);
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Start Listening error:', error);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error while stop listening:', error);
    } finally {
      setIsListening(false);
    }
  };

  const sendMessage = () => {
    if (recognizedText) {
      setMessages([
        ...messages,
        {role: 'user', content: recognizedText.trim(), id: messages.length + 1},
      ]);
      postUserMessage(recognizedText);
      setRecognizedText('');
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }
  };

  const speak = (text, id) => {
    setIsSpeaking({speaking: true, messageId: id ? id : null});
    Tts.speak(text, {
      iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
      rate: 0.5,
    });
  };

  const stop = () => {
    Tts.stop();
    setIsSpeaking({speaking: false, messageId: null});
  };

  const postUserMessage = async message => {
    setIsLoading(true);
    try {
      const body = {
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      };
      const res = await CHAT_API_RESQUEST(endpoints.chatApi, 'POST', {}, body);
      if (res.ok) {
        setMessages(prev => [
          ...prev,
          {
            role: 'admin',
            content: res?.data?.responses[0].trim(),
            id: messages.length + 10,
          },
        ]);
      }
    } catch (error) {
      console.error('Error while sending message: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View>
          <View style={styles.logoAndDropdownContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/advantaged.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Dropdown />
            </View>
          </View>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              {language.messageScreenHeader}
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.messagesContainer}
          ref={scrollViewRef}>
          {messages && messages.length > 0 ? (
            messages.map((message, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignSelf:
                    message.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                {isSpeaking.speaking && isSpeaking.messageId === message.id ? (
                  <Pressable
                    onPress={stop}
                    style={styles.speakStopIconContainer}>
                    <Image
                      source={require('../assets/stop.png')}
                      style={styles.speakStopIcon}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    disabled={disabled}
                    onPress={() => speak(message.content, message.id)}
                    style={styles.soundIconContainer}>
                    <Image
                      source={require('../assets/volume.png')}
                      style={{...styles.soundIcon, opacity: disabled ? 0.3 : 1}}
                    />
                  </Pressable>
                )}
                <View
                  style={{
                    ...styles.messageBubble,
                    alignSelf:
                      message.role === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor:
                      message.role === 'user'
                        ? COLORS.primary
                        : COLORS.midnightBlue,
                  }}>
                  <Text style={styles.messageText}> {message.content} </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>
                {language.emptyMessageText}
              </Text>
            </View>
          )}
          {isLoading && (
            <View style={styles.activityIndicatorView}>
              <ActivityIndicator size="small" />
            </View>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            disabled={isListening}
            placeholder={language.messageInputPlaceholder}
            placeholderTextColor={COLORS.placeholder}
            value={recognizedText}
            multiline
            onChangeText={text => setRecognizedText(text)}
          />
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              onPress={isListening ? stopListening : startListening}
              disabled={isSpeaking.speaking}
              style={styles.voiceButton}>
              {isListening ? (
                <View style={styles.stopBtn}>
                  <Image
                    source={require('../assets/anime.gif')}
                    style={styles.anime}
                  />
                  <Image
                    source={require('../assets/stop-button.png')}
                    style={styles.stopIcon}
                  />
                </View>
              ) : (
                <View
                  style={{
                    ...styles.microphoneContainer,
                    opacity: disabled ? 0.3 : 1,
                  }}>
                  <Image
                    source={require('../assets/micro.png')}
                    style={styles.microphone}
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                ...styles.sendButton,
                backgroundColor:
                  isListening || !recognizedText
                    ? COLORS.cornflowerBlue
                    : COLORS.secondary,
              }}
              disabled={isListening || isLoading || !recognizedText}>
              <Text style={styles.sendButtonText}>{language.send}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Messages;
