import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Pressable,
  Alert
} from 'react-native';

import COLORS from '../constants/colors';

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

const Messages = () => {
    
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState({speaking: false, messageId: null});
  const [recognizedText, setRecognizedText] = useState('');

  const disabled = isListening || isSpeaking.speaking

  async function requestMicrophonePermission() {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: "Microphone Permission",
                    message: "This app needs access to your microphone to record audio.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Microphone permission granted");
            } else {
                console.log("Microphone permission denied");
            }
        }
    } catch (err) {
        console.warn(err);
    }
}

  useEffect(() => {

    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en-US');
    })

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    requestMicrophonePermission();
    Tts.addEventListener('tts-finish', (event) => setIsSpeaking({speaking: false, messageId: null}))

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const onSpeechStart = (e) => {
    console.log('Recording started', e);
    setIsListening(true); // Start loading GIF here
  };

  const onSpeechEnd = async (e) => {
    console.log('Recording stopped', e);
    setIsListening(false); // Stop loading GIF here
  };

  const onSpeechResults = event => {
    console.log('Speech Results: ', event);
    const text = event.value[0];
    setRecognizedText(text);
  };

  const onSpeechError = error => {
    Alert.alert(
        "Alert",
        "No speech detected!",
        [{ text: "Dismiss" }]
    );
    setIsListening(false); // Ensure loading GIF stops even on error
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
      setMessages([...messages, {text: recognizedText.trim(), sender: 'user', id: messages.length + 1 }]);
      setRecognizedText('');
    }
  };

  const speak = (text, id) => {
    setIsSpeaking({speaking: true, messageId: id ? id : null});
    Tts.speak(text, {
      iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
      rate: 0.5,
    });
  };


return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/advantaged.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Tap on mic and start recording..
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages && messages.length > 0 ? (
            messages.map((message, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignSelf:
                    message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}>
                {(isSpeaking.speaking && isSpeaking.messageId === message.id)
                    ?  <Text style={styles.speakingDots}>...</Text>
                    :
                    <Pressable disabled={disabled} onPress={() => speak(message.text, message.id)} style={styles.soundIconContainer} >
                        <Image
                            source={require('../assets/soundIcon.png')}
                            style={{...styles.soundIcon, opacity: disabled ? 0.3 : 1}}
                        />
                    </Pressable>
                }
                <View
                  style={[
                    styles.messageBubble,
                    {
                      alignSelf:
                        message.sender === 'user' ? 'flex-end' : 'flex-start',
                      backgroundColor:
                        message.sender === 'user'
                          ? COLORS.primary
                          : COLORS.midnightBlue,
                    },
                  ]}>
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>No messages yet...</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
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
              ) : <View style={styles.microphoneContainer}>
                  <Image
                    source={require('../assets/micro.png')}
                    style={{...styles.microphone, opacity: disabled ? 0.3 : 1}}
                  />
                </View>
              }
            </TouchableOpacity>
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                ...styles.sendButton,
                backgroundColor: isListening || !recognizedText ? COLORS.cornflowerBlue : COLORS.secondary,
              }}
              disabled={isListening || !recognizedText}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeAreaView: {
    flex: 1,
  },
  banner: {
    backgroundColor: COLORS.themeColor,
  },
  bannerText: {
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
    color: COLORS.white,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  logoContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 80,
    objectFit: 'contain',
    borderRadius: 10,
  },
  messageBubble: {
    maxWidth: '70%',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  messageText: {
    color: COLORS.white,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    color: COLORS.primary,
    backgroundColor: COLORS.veryLightGray,
  },
  iconsContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
  },
  voiceButtonText: {
    fontSize: 24,
    height: 45,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: 16
  },
  soundIconContainer: {
    alignSelf: 'flex-end',
  },
  speakingDots: {
    fontSize: 40,
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
  soundIcon: {
    height: 20,
    width: 20,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  anime: {
    height: 20,
    width: 45,
  },
  stopIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  microphoneContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 50, 
    backgroundColor: COLORS.violetBlue, 
    padding: 8
  },
  microphone: {
    objectFit: 'contain',
    height: 25,
    width: 25,
    borderRadius: 50
},
  emptyMessageContainer: {
    alignItems: 'center',
  },
  emptyMessageText: {
    padding: 10,
    backgroundColor: COLORS.violetBlue,
    borderRadius: 10,
    color: COLORS.white,
    boxShadow: '0 0 10px rgba(0 0 0 0 rgb(255, 255, 255)',
  }
});

export default Messages