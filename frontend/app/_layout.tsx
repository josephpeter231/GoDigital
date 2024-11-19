import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const VidyutrenzWebView = () => {
  return (
    <View style={styles.container}>
      {/* WebView to embed the website */}
      <WebView
        source={{ uri: 'https://go-digital-ten.vercel.app/' }} // Website URL
        style={styles.webview}
        startInLoadingState={true} // Show a loading spinner while the page loads
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
