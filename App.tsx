/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Container,
  ConversationDetail,
  TextInput,
  useChatContext,
} from 'react-native-chat-uikit';

const appKey = 'easemob#easeim';
const userId = 'du004';
const userPs = '1';
const peerId = 'du005';

function SendMessage() {
  const [page, setPage] = React.useState(0);
  const [appkey, setAppkey] = React.useState(appKey);
  const [id, setId] = React.useState(userId);
  const [ps, setPs] = React.useState(userPs);
  const [peer, setPeer] = React.useState(peerId);
  const im = useChatContext();
  const {top} = useSafeAreaInsets();

  if (page === 0) {
    return (
      // 登录页面
      <SafeAreaView style={styles.common}>
        <TextInput
          placeholder="Please App Key."
          value={appkey}
          onChangeText={setAppkey}
        />
        <TextInput
          placeholder="Please Login ID."
          value={id}
          onChangeText={setId}
        />
        <TextInput
          placeholder="Please Login token or password."
          value={ps}
          onChangeText={setPs}
        />
        <TextInput
          placeholder="Please peer ID."
          value={peer}
          onChangeText={setPeer}
        />
        <Pressable
          style={styles.login}
          onPress={() => {
            console.log('test:zuoyu:login', id, ps);
            im.login({
              userId: id,
              userToken: ps,
              usePassword: true,
              result: res => {
                console.log('login result', res);
                console.log('test:zuoyu:error', res);
                if (res.isOk === true) {
                  setPage(1);
                }
              },
            });
          }}>
          <Text>{'Login'}</Text>
        </Pressable>
        <Pressable
          style={styles.login}
          onPress={() => {
            im.logout({
              result: () => {},
            });
          }}>
          <Text>{'Logout'}</Text>
        </Pressable>
      </SafeAreaView>
    );
  } else if (page === 1) {
    // 聊天页面
    return (
      <SafeAreaView style={styles.common}>
        <ConversationDetail
          convId={peer}
          convType={0}
          onBack={() => {
            setPage(0);
            im.logout({
              result: () => {},
            });
          }}
          type={'chat'}
          input={{props: {top: top}}}
        />
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

function App(): React.JSX.Element {
  // 初始化 UIKit
  return (
    <Container options={{appKey: appKey, autoLogin: false}}>
      <SendMessage />
    </Container>
  );
}

const styles = StyleSheet.create({
  common: {
    flex: 1,
  },
  login: {
    height: 40,
    backgroundColor: 'darkseagreen',
    borderColor: 'floralwhite',
    borderWidth: 1,
  },
});

export default App;
