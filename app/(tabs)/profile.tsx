import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>프로필</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>👩</Text>
            </View>
            <Text style={styles.userName}>김민준</Text>
            <Text style={styles.userInfo}>충남대학교 컴퓨터융합학부</Text>
          </View>
          
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>⚙️ 설정</Text>
            <Text style={styles.placeholderText}>
              • 개인정보 관리{'\n'}
              • 알림 설정{'\n'}
              • 테마 설정{'\n'}
              • 언어 설정
            </Text>
          </View>
          
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>📊 통계</Text>
            <Text style={styles.placeholderText}>
              • 총 공강 시간{'\n'}
              • 추천 활동 참여율{'\n'}
              • 선호 관심사{'\n'}
              • 활동 히스토리
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 16,
    color: '#6B7280',
  },
  placeholderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
});
