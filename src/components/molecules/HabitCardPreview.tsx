import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Habit } from '../../types/index';
import HabitCard from './HabitCard';
import HabitCardVertical from './HabitCardVertical';
import HabitCardWithIcon from './HabitCardWithIcon';
import HabitCardCompact from './HabitCardCompact';
import { COLORS } from '../../styles/colors';
import { SPACING } from '../../styles/spacing';
import { TYPOGRAPHY } from '../../styles/typography';

interface HabitCardPreviewProps {
  habit: Habit;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

type CardLayout = 'default' | 'vertical' | 'withIcon' | 'compact';

const HabitCardPreview: React.FC<HabitCardPreviewProps> = ({ 
  habit, 
  onComplete, 
  onEdit, 
  onDelete 
}) => {
  const [selectedLayout, setSelectedLayout] = useState<CardLayout>('default');

  const layouts = [
    { key: 'default', label: 'A: Frecuencia antes del ícono' },
    { key: 'vertical', label: 'B: Layout vertical' },
    { key: 'withIcon', label: 'C: Con ícono grande' },
    { key: 'compact', label: 'D: Compacto con racha' },
  ] as const;

  const renderCard = () => {
    const props = { habit, onComplete, onEdit, onDelete };
    
    switch (selectedLayout) {
      case 'vertical':
        return <HabitCardVertical {...props} />;
      case 'withIcon':
        return <HabitCardWithIcon {...props} />;
      case 'compact':
        return <HabitCardCompact {...props} />;
      default:
        return <HabitCard {...props} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Selector de layout */}
      <Text style={styles.title}>Prueba los diferentes diseños:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorContainer}>
        {layouts.map((layout) => (
          <TouchableOpacity
            key={layout.key}
            style={[
              styles.layoutButton,
              selectedLayout === layout.key && styles.selectedLayoutButton
            ]}
            onPress={() => setSelectedLayout(layout.key as CardLayout)}
          >
            <Text style={[
              styles.layoutButtonText,
              selectedLayout === layout.key && styles.selectedLayoutButtonText
            ]}>
              {layout.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Preview del card */}
      <View style={styles.previewContainer}>
        {renderCard()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    margin: SPACING.large,
    textAlign: 'center',
  },
  selectorContainer: {
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.large,
  },
  layoutButton: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  selectedLayoutButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  layoutButtonText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text,
    textAlign: 'center',
  },
  selectedLayoutButtonText: {
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  previewContainer: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
});

export default HabitCardPreview;
