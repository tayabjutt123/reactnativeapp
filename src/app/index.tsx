import { SymbolView } from 'expo-symbols';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <ThemedView style={styles.heroSection}>
            <AnimatedIcon />
            <ThemedText type="title" style={styles.title}>
              Hy! I am Tayyab
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Mobile Application Developer
            </ThemedText>
            <ThemedView type="backgroundElement" style={styles.badgePill}>
              <ThemedText type="code" style={styles.code}>
                ASSIGNMENT 02 &bull; REACT NATIVE EXPO
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Highlights Card Section */}
          <ThemedView type="backgroundElement" style={styles.cardSection}>
            <ThemedView style={styles.cardHeader}>
              <SymbolView
                name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
                size={18}
                tintColor={theme.text}
              />
              <ThemedText type="smallBold">Implemented Features</ThemedText>
            </ThemedView>

            <ThemedView type="backgroundSelected" style={styles.featureItem}>
              <ThemedText type="smallBold">1. Bottom Tab Navigation</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Added a brand new Profile screen with full bottom tab integration.
              </ThemedText>
            </ThemedView>

            <ThemedView type="backgroundSelected" style={styles.featureItem}>
              <ThemedText type="smallBold">2. Custom Splash &amp; App Icon</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Designed a custom app icon and matching startup splash screen.
              </ThemedText>
            </ThemedView>

            <ThemedView type="backgroundSelected" style={styles.featureItem}>
              <ThemedText type="smallBold">3. Themed Components</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Strictly implemented ThemedView and ThemedText with dark/light mode support.
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Quick Guide */}
          <ThemedView type="backgroundElement" style={styles.guideContainer}>
            <ThemedText type="smallBold" style={styles.guideTitle}>
              Navigate Tabs:
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Use the bottom bar to switch between <ThemedText type="smallBold">Home</ThemedText>,{' '}
              <ThemedText type="smallBold">Explore</ThemedText>, and the newly added{' '}
              <ThemedText type="smallBold">Profile</ThemedText> screen.
            </ThemedText>
          </ThemedView>

          {Platform.OS === 'web' && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.five,
    alignItems: 'center',
    gap: Spacing.four,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  title: {
    textAlign: 'center',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
  },
  badgePill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.four,
    marginTop: Spacing.one,
  },
  code: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  cardSection: {
    alignSelf: 'stretch',
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: 'transparent',
    marginBottom: Spacing.one,
  },
  featureItem: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.half,
  },
  guideContainer: {
    alignSelf: 'stretch',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  guideTitle: {
    marginBottom: Spacing.half,
  },
});
