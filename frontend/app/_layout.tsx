import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const VidyutrenzWebView = () => {
  useEffect(() => {
    // Show the status bar when this screen is active
    StatusBar.setHidden(false); 
    StatusBar.setBarStyle('dark-content'); // Optionally set the status bar content style

    return () => {
      // Optionally reset the status bar when leaving the screen
      StatusBar.setHidden(false); 
    };
  }, []);

  return (
    <View style={styles.container}>
     
      <WebView
        source={{ uri: 'https://go-digital-ten.vercel.app/' }} 
        style={styles.webview}
        startInLoadingState={true} 
        renderLoading={() => (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#0000ff"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VidyutrenzWebView;
