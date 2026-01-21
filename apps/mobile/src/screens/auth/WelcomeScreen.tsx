import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Steppie, SpeechBubble } from '@/components/characters';
import { Button } from '@/components/ui';
import { colors, typography, spacing } from '@/utils/theme';
import { AuthStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary[100], colors.background.primary]}
        style={styles.gradient}
      >
        {/* Character and speech bubble */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.characterSection}
        >
          <View style={styles.speechBubbleContainer}>
            <SpeechBubble
              message="Ready to start your parenting adventure? Let's do this together!"
              position="bottom"
              variant="default"
              animated
              delay={400}
            />
          </View>
          <Steppie mood="excited" size="xl" animated />
        </Animated.View>

        {/* Welcome text */}
        <Animated.View
          entering={FadeInUp.delay(300).springify()}
          style={styles.textSection}
        >
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue tracking your little one's journey
          </Text>
        </Animated.View>

        {/* Auth buttons */}
        <Animated.View
          entering={FadeInUp.delay(400).springify()}
          style={styles.buttonSection}
        >
          <Button
            title="Create Account"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('Register')}
          />

          <Button
            title="I already have an account"
            variant="outline"
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          />

          {/* Social login divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons */}
          <View style={styles.socialButtons}>
            <Button
              title="Google"
              variant="outline"
              onPress={() => {}}
              style={styles.socialButton}
            />
            <Button
              title="Apple"
              variant="outline"
              onPress={() => {}}
              style={styles.socialButton}
            />
          </View>
        </Animated.View>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
  characterSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  speechBubbleContainer: {
    marginBottom: spacing[4],
  },
  textSection: {
    alignItems: 'center',
    marginTop: spacing[6],
    marginBottom: spacing[8],
  },
  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['3xl'],
    color: colors.neutral[900],
    marginBottom: spacing[2],
  },
  subtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    color: colors.neutral[600],
    textAlign: 'center',
  },
  buttonSection: {
    gap: spacing[3],
  },
  loginButton: {
    marginTop: spacing[1],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[300],
  },
  dividerText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginHorizontal: spacing[3],
  },
  socialButtons: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  socialButton: {
    flex: 1,
  },
  terms: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: spacing[8],
  },
  link: {
    color: colors.primary[600],
    fontFamily: typography.fontFamily.semiBold,
  },
});
