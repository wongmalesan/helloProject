import React from 'react';
import { SafeAreaView, StyleSheet, Text, useColorScheme, } from 'react-native';
import { Colors, } from 'react-native/Libraries/NewAppScreen';
import dayjs from 'dayjs'

import codePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true, // Menambahkan deskripsi pembaruan jika tersedia
    descriptionPrefix: 'Pembaruan aplikasi:', // Teks yang ditampilkan sebelum deskripsi pembaruan
    title: 'Update Tersedia', // Judul dialog peringatan
    optionalUpdateMessage: 'Ada pembaruan tersedia. Apakah Anda ingin menginstal sekarang?', // Pesan opsional untuk pembaruan wajib
    optionalIgnoreButtonLabel: 'Nanti', // Label tombol untuk menolak pembaruan opsional
    optionalInstallButtonLabel: 'Instal', // Label tombol untuk menginstal pembaruan opsional
  },
};

function App() {
  const [message, setMessage] = React.useState('selamat datang di aplikasiku')

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const checkForUpdate = async () => {
    try {
      var message = ''
      const update = await codePush.sync({
        updateDialog: { title: "ada update terbaru !!!" },
        installMode: codePush.InstallMode.IMMEDIATE,
        // deploymentKey,
        // mandatoryInstallMode,
        // minimumBackgroundDuration,
        // rollbackRetryOptions,
      })

      if (update) {
        message += '\n ada update == ' + JSON.stringify(update) + ' =='
      } else {
        message += '\n tidak ada update'
      }
      setMessage((msg) => msg += message)
    } catch (error) {
      console.log("error checking for update", error)
      setMessage((msg) => msg += '\nerror boskue == ' + JSON.stringify(error) + ' ==')
    }
  }

  React.useEffect(() => {
    checkForUpdate()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, backgroundColor: "#EADBC8" }}>
      <Text style={{ color: 'black' }}>{dayjs().format('DD MMMM YYYY HH:mm')}</Text>
      <Text style={{ color: 'black', fontSize: 20 }}>COBA DIALOG UPDATE</Text>
      <Text style={{ color: 'black' }}>Aku Belajar CodePush</Text>
      <Text style={{ color: 'black' }}>===========</Text>
      <Text style={{ color: 'black' }}>{message}</Text>
      <Text style={{ color: 'black' }}>===========</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default codePush(codePushOptions)(App);
