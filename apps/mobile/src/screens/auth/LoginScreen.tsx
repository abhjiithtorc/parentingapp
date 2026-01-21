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
import { login, clearError } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Min 8 characters').required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function LoginScreen() {
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
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(clearError());
    dispatch(login(data));
  };

  const EyeIcon = ({ visible }: { visible: boolean }) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {visible ? (
        <>
          <Path
            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
            stroke={colors.neutral[500]}
            strokeWidth={2}
          />
          <Path
            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
            stroke={colors.neutral[500]}
            strokeWidth={2}
          />
        </>
      ) : (
        <>
          <Path
            d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
            stroke={colors.neutral[500]}
            strokeWidth={2}
          />
          <Path d="M1 1l22 22" stroke={colors.neutral[500]} strokeWidth={2} />
        </>
      )}
    </Svg>
  );

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
          <Steppie mood="happy" size="md" animated />
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
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
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                rightIcon={<EyeIcon visible={showPassword} />}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />
            )}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </Animated.View>

        {/* Register link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Sign up</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing[4],
  },
  forgotPasswordText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.primary[600],
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: spacing[6],
  },
  registerText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    color: colors.neutral[600],
  },
  registerLink: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.primary[600],
  },
});
