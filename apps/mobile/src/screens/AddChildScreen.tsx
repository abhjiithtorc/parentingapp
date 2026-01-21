import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, Card } from '@/components/ui';
import { Steppie, SpeechBubble } from '@/components/characters';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';
import { addChild } from '@/store/slices/childrenSlice';
import { AppDispatch, RootState } from '@/store';
import { format, differenceInMonths } from 'date-fns';

const schema = yup.object({
  name: yup.string().min(1, 'Name is required').required('Name is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  gender: yup.string().oneOf(['MALE', 'FEMALE', 'OTHER']).optional(),
});

type FormData = {
  name: string;
  dateOfBirth: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
};

const genderOptions = [
  { value: 'MALE', label: 'Boy', emoji: '👦' },
  { value: 'FEMALE', label: 'Girl', emoji: '👧' },
  { value: 'OTHER', label: 'Other', emoji: '👶' },
];

const colorOptions = [
  colors.primary[500],
  colors.secondary.pink,
  colors.secondary.blue,
  colors.secondary.green,
  colors.secondary.orange,
  colors.secondary.yellow,
];

export default function AddChildScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.children);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors.primary[500]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: '',
      dateOfBirth: new Date(),
      gender: undefined,
    },
  });

  const watchedDate = watch('dateOfBirth');
  const watchedGender = watch('gender');
  const ageInMonths = differenceInMonths(new Date(), watchedDate);

  const onSubmit = (data: FormData) => {
    dispatch(
      addChild({
        name: data.name,
        dateOfBirth: data.dateOfBirth.toISOString(),
        gender: data.gender,
        color: selectedColor,
      })
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[colors.primary[100], colors.background.primary]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Mascot with speech bubble */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={styles.mascotSection}
          >
            <SpeechBubble
              message="Tell me about your little one! I can't wait to help you track their journey!"
              position="bottom"
              variant="tip"
              animated
              delay={300}
            />
            <Steppie mood="excited" size="lg" animated />
          </Animated.View>

          {/* Title */}
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            <Text style={styles.title}>Add Your Child</Text>
            <Text style={styles.subtitle}>
              Let's set up a profile for your little one
            </Text>
          </Animated.View>

          {/* Form */}
          <Animated.View
            entering={FadeInUp.delay(300).springify()}
            style={styles.form}
          >
            {/* Name Input */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="Child's Name"
                  placeholder="What's your child's name?"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                />
              )}
            />

            {/* Date of Birth */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {format(watchedDate, 'MMMM d, yyyy')}
                </Text>
                <Text style={styles.ageText}>
                  {ageInMonths < 1
                    ? 'Newborn'
                    : ageInMonths < 12
                      ? `${ageInMonths} month${ageInMonths > 1 ? 's' : ''} old`
                      : `${Math.floor(ageInMonths / 12)} year${Math.floor(ageInMonths / 12) > 1 ? 's' : ''} old`}
                </Text>
              </TouchableOpacity>
              {showDatePicker && Platform.OS === 'web' && (
                <View style={styles.webDatePicker}>
                  <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={watchedDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue('dateOfBirth', date);
                      setShowDatePicker(false);
                    }}
                    style={{ fontSize: 16, padding: 12, borderRadius: 12, border: '1px solid #E5E7EB', width: '100%' }}
                  />
                </View>
              )}
            </View>

            {/* Gender Selection */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Gender (optional)</Text>
              <View style={styles.genderOptions}>
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.genderOption,
                      watchedGender === option.value && styles.genderOptionSelected,
                    ]}
                    onPress={() =>
                      setValue('gender', option.value as 'MALE' | 'FEMALE' | 'OTHER')
                    }
                  >
                    <Text style={styles.genderEmoji}>{option.emoji}</Text>
                    <Text
                      style={[
                        styles.genderLabel,
                        watchedGender === option.value && styles.genderLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Color Selection */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Theme Color</Text>
              <View style={styles.colorOptions}>
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      selectedColor === color && styles.colorOptionSelected,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <Text style={styles.colorCheck}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Submit Button */}
            <Button
              title="Let's Get Started!"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            />
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[12],
    paddingBottom: spacing[8],
  },
  mascotSection: {
    alignItems: 'center',
    marginBottom: spacing[6],
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
  form: {
    gap: spacing[2],
  },
  fieldContainer: {
    marginBottom: spacing[4],
  },
  label: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[700],
    marginBottom: spacing[2],
  },
  dateButton: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: colors.neutral[300],
    padding: spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  ageText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.primary[600],
  },
  genderOptions: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  genderOption: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    padding: spacing[4],
    alignItems: 'center',
  },
  genderOptionSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  genderEmoji: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  genderLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  genderLabelSelected: {
    color: colors.primary[700],
  },
  colorOptions: {
    flexDirection: 'row',
    gap: spacing[3],
    justifyContent: 'center',
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: colors.neutral.white,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  colorCheck: {
    color: colors.neutral.white,
    fontFamily: typography.fontFamily.bold,
    fontSize: 18,
  },
  submitButton: {
    marginTop: spacing[6],
  },
  webDatePicker: {
    marginTop: spacing[2],
  },
});
