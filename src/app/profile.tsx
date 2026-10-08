import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(false);

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        {/* Profile Header */}
        <ThemedView style={styles.headerContainer}>
          <ThemedView style={styles.avatarWrapper}>
            <ThemedView type="backgroundSelected" style={styles.avatarCircle}>
              <ThemedText type="title" style={styles.avatarText}>
                AM
              </ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.onlineBadge} />
          </ThemedView>

          <ThemedText type="subtitle" style={styles.nameText}>
            Alex Morgan
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.roleText}>
            Mobile Developer &amp; Explorer
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.badgeContainer}>
            <SymbolView
              name={{ ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' }}
              size={14}
              tintColor="#3c87f7"
            />
            <ThemedText type="smallBold" themeColor="text">
              Pro Member
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Quick Stats Grid */}
        <ThemedView style={styles.statsContainer}>
          <ThemedView type="backgroundElement" style={styles.statCard}>
            <ThemedText type="subtitle" style={styles.statNumber}>
              12
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Projects
            </ThemedText>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.statCard}>
            <ThemedText type="subtitle" style={styles.statNumber}>
              48
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Completed
            </ThemedText>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.statCard}>
            <ThemedText type="subtitle" style={styles.statNumber}>
              14d
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Streak
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Preferences & Settings */}
        <ThemedView style={styles.sectionWrapper}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionHeader}>
            APP PREFERENCES
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.cardGroup}>
            <ThemedView style={styles.preferenceRow}>
              <ThemedView style={styles.rowLabelContainer}>
                <SymbolView
                  name={{ ios: 'bell.fill', android: 'notifications', web: 'notifications' }}
                  size={18}
                  tintColor={theme.text}
                />
                <ThemedText type="default">Push Notifications</ThemedText>
              </ThemedView>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: theme.backgroundElement, true: '#3c87f7' }}
              />
            </ThemedView>

            <ThemedView style={styles.divider} />

            <ThemedView style={styles.preferenceRow}>
              <ThemedView style={styles.rowLabelContainer}>
                <SymbolView
                  name={{ ios: 'arrow.clockwise', android: 'sync', web: 'sync' }}
                  size={18}
                  tintColor={theme.text}
                />
                <ThemedText type="default">Offline Cloud Sync</ThemedText>
              </ThemedView>
              <Switch
                value={offlineSync}
                onValueChange={setOfflineSync}
                trackColor={{ false: theme.backgroundElement, true: '#3c87f7' }}
              />
            </ThemedView>

            <ThemedView style={styles.divider} />

            <ThemedView style={styles.preferenceRow}>
              <ThemedView style={styles.rowLabelContainer}>
                <SymbolView
                  name={{ ios: 'waveform', android: 'vibration', web: 'vibration' }}
                  size={18}
                  tintColor={theme.text}
                />
                <ThemedText type="default">Haptic Feedback</ThemedText>
              </ThemedView>
              <Switch
                value={hapticsEnabled}
                onValueChange={setHapticsEnabled}
                trackColor={{ false: theme.backgroundElement, true: '#3c87f7' }}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Account Details */}
        <ThemedView style={styles.sectionWrapper}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionHeader}>
            ACCOUNT &amp; SECURITY
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.cardGroup}>
            <Pressable style={({ pressed }) => [styles.actionRow, pressed && styles.pressed]}>
              <ThemedView style={styles.rowLabelContainer}>
                <SymbolView
                  name={{ ios: 'person.fill', android: 'person', web: 'person' }}
                  size={18}
                  tintColor={theme.text}
                />
                <ThemedText type="default">Personal Information</ThemedText>
              </ThemedView>
              <SymbolView
                name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                size={14}
                tintColor={theme.text}
              />
            </Pressable>

            <ThemedView style={styles.divider} />

            <Pressable style={({ pressed }) => [styles.actionRow, pressed && styles.pressed]}>
              <ThemedView style={styles.rowLabelContainer}>
                <SymbolView
                  name={{ ios: 'lock.fill', android: 'lock', web: 'lock' }}
                  size={18}
                  tintColor={theme.text}
                />
                <ThemedText type="default">Security &amp; 2-Factor Auth</ThemedText>
              </ThemedView>
              <SymbolView
                name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                size={14}
                tintColor={theme.text}
              />
            </Pressable>

            <ThemedView style={styles.divider} />

            <Pressable style={({ pressed }) => [styles.actionRow, pressed && styles.pressed]}>
              <ThemedView style={styles.rowLabelContainer}>
                <SymbolView
                  name={{ ios: 'shield.fill', android: 'security', web: 'security' }}
                  size={18}
                  tintColor={theme.text}
                />
                <ThemedText type="default">Privacy &amp; Data Rights</ThemedText>
              </ThemedView>
              <SymbolView
                name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                size={14}
                tintColor={theme.text}
              />
            </Pressable>
          </ThemedView>
        </ThemedView>

        {/* System & Build Info */}
        <ThemedView style={styles.sectionWrapper}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionHeader}>
            SYSTEM INFORMATION
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.cardGroup}>
            <ThemedView style={styles.infoRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Application
              </ThemedText>
              <ThemedText type="code">Lumina Mobile App</ThemedText>
            </ThemedView>

            <ThemedView style={styles.divider} />

            <ThemedView style={styles.infoRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Framework
              </ThemedText>
              <ThemedText type="code">Expo SDK 57</ThemedText>
            </ThemedView>

            <ThemedView style={styles.divider} />

            <ThemedView style={styles.infoRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Architecture
              </ThemedText>
              <ThemedText type="code">React Native 0.86 + Reanimated 4</ThemedText>
            </ThemedView>

            <ThemedView style={styles.divider} />

            <ThemedView style={styles.infoRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Router
              </ThemedText>
              <ThemedText type="code">Expo Router (File-based)</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Action Button */}
        <ThemedView style={styles.sectionWrapper}>
          <Pressable style={({ pressed }) => [styles.dangerButton, pressed && styles.pressed]}>
            <ThemedText type="smallBold" style={styles.dangerButtonText}>
              Sign Out
            </ThemedText>
          </Pressable>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.five,
    gap: Spacing.two,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: Spacing.two,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#22c55e',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  nameText: {
    textAlign: 'center',
  },
  roleText: {
    textAlign: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.four,
    marginTop: Spacing.one,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.three,
    alignItems: 'center',
    gap: Spacing.half,
  },
  statNumber: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  sectionWrapper: {
    gap: Spacing.two,
  },
  sectionHeader: {
    letterSpacing: 1,
    fontSize: 12,
  },
  cardGroup: {
    borderRadius: Spacing.four,
    overflow: 'hidden',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: 'transparent',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: 'transparent',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: 'transparent',
  },
  rowLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: 'transparent',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    opacity: 0.15,
    backgroundColor: '#888888',
    marginHorizontal: Spacing.four,
  },
  pressed: {
    opacity: 0.7,
  },
  dangerButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
  },
  dangerButtonText: {
    color: '#ef4444',
  },
});
