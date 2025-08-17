import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>캘린더</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>📅 공강 일정 관리</Text>
            <Text style={styles.placeholderText}>
              공강 시간을 체계적으로 관리하고 효율적으로 활용할 수 있습니다.
            </Text>
          </View>
          
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>🗓️ 주요 기능</Text>
            <Text style={styles.placeholderText}>
              • 공강 시간 등록 및 수정{'\n'}
              • 추천 활동 일정 관리{'\n'}
              • 주간/월간 뷰{'\n'}
              • 알림 설정
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
