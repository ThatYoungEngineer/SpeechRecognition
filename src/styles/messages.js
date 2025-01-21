import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export const styles = StyleSheet.create({
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
      padding: 10,
    },
    logoAndDropdownContainer: {
      position: 'relative',
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dropdownContainer: {
      position: 'absolute',
      top: '30%',
      right: 10,
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
      color: COLORS.black,
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
      fontSize: 16,
    },
    soundIconContainer: {
      alignSelf: 'flex-end',
    },
    speakStopIconContainer: {
      justifyContent: 'flex-end',
      marginBottom: 5,
      marginRight: 5,
    },
    speakStopIcon: {
      height: 20,
      width: 20,
    },
    soundIcon: {
      height: 20,
      width: 20,
      marginBottom: 5,
      alignSelf: 'flex-end',
      marginRight: 5,
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
      padding: 8,
    },
    microphone: {
      objectFit: 'contain',
      height: 25,
      width: 25,
      borderRadius: 50,
    },
    emptyMessageContainer: {
      alignItems: 'center',
    },
    emptyMessageText: {
      padding: 10,
      backgroundColor: COLORS.violetBlue,
      borderRadius: 10,
      color: COLORS.white,
      boxShadow: '0 0 10px rgba(0, 0, 0, .25)',
    },
    activityIndicatorView: {
      width: '100%',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 25,
    },
  });