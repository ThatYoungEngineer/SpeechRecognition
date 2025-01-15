import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';

const App = () => {
  const [text, setText] = useState('');

  //Daniel, Rishi (male voice)

  const speak = () => {
    Tts.speak(text, {
      iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
      rate: 0.5,
    });
  };

  const getVoices = async () => {
    try {
      const voices = await Tts.voices(); // Fetch voices
      const englishVoices = voices.filter(entry => entry.language.includes("en")).map(entry => entry.name)
      console.log(voices)
    } catch (error) {
      console.error("Error fetching voices:", error); // Handle errors
    }
  }

  return (
    <SafeAreaView style={{flex: 1}} >
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20 }}>Enter text to speak:</Text>
        <TextInput  
          multiline
          style={{
            borderWidth: 1,
            borderColor: '#000',
            marginVertical: 10,
            padding: 20,
            fontSize: 20
          }}
          onChangeText={setText}
          value={text}
          placeholder="Type something..."
        />
        <View>
          <TouchableOpacity onPress={speak} style={{alignItems: 'center', padding: 10, backgroundColor: '#ddd', borderRadius: 5}} >
            <Text style={{fontSize: 20}}>
              Speak
            </Text>      
          </TouchableOpacity>
          <TouchableOpacity onPress={getVoices} style={{alignItems: 'center', padding: 10, backgroundColor: '#261ba1', marginTop: 10}} >
            <Text style={{fontSize: 20, color:'#fff', fontWeight: 600}}>Get Voices</Text> 
          </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default App;
