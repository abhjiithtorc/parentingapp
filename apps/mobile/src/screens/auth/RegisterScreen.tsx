import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Input } from '@/components/ui';
import { Steppie } from '@/components/characters';
import { colors, typography, spacing } from '@/utils/theme';
import { AuthStackParamList } from '@/navigation/types';
import { register as registerUser, clearError } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const schema = yup.object({
  name: yup.string().min(2, 'Min 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Min 8 characters')
    .matches(/[a-z]/, 'Must include lowercase letter')
    .matches(/[A-Z]/, 'Must include uppercase letter')
    .matches(/[0-9]/, 'Must include number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

type FormData = yup.InferType<typeof schema>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(clearError());
    dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke={colors.neutral[700]}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Mascot */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.mascotContainer}
        >
          <Steppie mood="celebrating" size="md" animated />
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={styles.title}>Join LittleSteps!</Text>
          <Text style={styles.subtitle}>Create your account to get started</Text>
        </Animated.View>

        {/* Error message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Form */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={styles.form}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Your Name"
                placeholder="What should we call you?"
                autoCapitalize="words"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Email"
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Password"
                placeholder="Create a strong password"
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                hint="8+ chars with upper, lower & number"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Confirm Password"
                placeholder="Enter password again"
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            title="Create Account"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          />
        </Animated.View>

        {/* Login link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[12],
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    color: colors.neutral[600],
    textAlign: 'center',
    marginTop: spacing[1],
    marginBottom: spacing[6],
  },
  errorContainer: {
    backgroundColor: colors.secondary.redLight,
    padding: spacing[3],
    borderRadius: 12,
    marginBottom: spacing[4],
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.error,
    textAlign: 'center',
  },
  form: {
    gap: spacing[1],
  },
  submitButton: {
    marginTop: spacing[4],
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: spacing[6],
  },
  loginText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    color: colors.neutral[600],
  },
  loginLink: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.primary[600],
  },
});
