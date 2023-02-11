/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';

import {Auth, Amplify} from 'aws-amplify';

Amplify.Logger.LOG_LEVEL = 'DEBUG';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  async function signUp() {
    try {
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async function retrieveCurrentUser() {
    Auth.currentAuthenticatedUser({bypassCache: true})
      .then(async user => {
        console.log(user);
        console.log(user.signInUserSession.accessToken.payload);
        // setStoredUser(user);
        // setUserAttributes(user.attributes);
      })
      .catch(err => console.log(err));
  }

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password);
      // setChallengeName(user.challengeName);
      // if (
      //   user.challengeName === 'SMS_MFA' ||
      //   user.challengeName === 'SOFTWARE_TOKEN_MFA'
      // ) {
      //   const loggedUser = await Auth.confirmSignIn(
      //     user,
      //     totpChallengeAnswer,
      //     challengeName,
      //   );
      //   console.log(loggedUser);
      //   setStoredUser(loggedUser);
      //   recordPersonalizeIdentifyEvent(loggedUser);
      // } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      //   const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
      //   console.log({requiredAttributes});
      //   // You need to get the new password and required attributes from the UI inputs
      //   // and then trigger the following function with a button click
      //   // For example, the email and phone_number are required attributes
      //   const loggedUser = await Auth.completeNewPassword(
      //     user, // the Cognito User Object
      //     newPassword, // the new password
      //     // OPTIONAL, the required attributes
      //     {
      //       email,
      //       phone_number,
      //     },
      //   );
      //   setStoredUser(loggedUser);
      // } else if (user.challengeName === 'MFA_SETUP') {
      //   // This happens when the MFA method is TOTP
      //   // The user needs to setup the TOTP before using it
      //   // More info please check the Enabling MFA part
      //   setupTOTP(user);
      // } else {
      //   // The user directly signs in
      //   console.log(user);
      //   setStoredUser(user);
      // }
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Sign Up">
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
            />

            <Button onPress={signUp} title="Sign Up" />
            <Button onPress={signIn} title="Sign In" />
            <Button onPress={signOut} title="Sign Out" />
          </Section>
          <Section title="Sign In">
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
          </Section>
          <Section title="Confirm Sign Up">
            <TextInput
              style={styles.input}
              onChangeText={setCode}
              value={code}
              placeholder="Confirmation Code"
            />
            <Button onPress={confirmSignUp} title="Confirm Sign Up" />
            {/* <Button
              onPress={resendConfirmationCode}
              title="Resend Confirmation"
            /> */}
          </Section>
          <Section title="Sign Out / Get Current User">
            <Button onPress={signOut} title="Sign Out" />
            <Button onPress={retrieveCurrentUser} title="Current User" />
          </Section>
        </View>
      </ScrollView>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
