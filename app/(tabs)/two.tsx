import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecommendScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>추천</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>💡 AI 추천 시스템</Text>
            <Text style={styles.placeholderText}>
              선택한 관심사와 공강 시간을 바탕으로 맞춤형 활동을 추천해드립니다.
            </Text>
          </View>
          
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>🎯 추천 카테고리</Text>
            <Text style={styles.placeholderText}>
              • 학습 활동 (도서관, 스터디룸){'\n'}
              • 진로 개발 (동아리, 세미나){'\n'}
              • 휴식 공간 (카페, 휴게실){'\n'}
              • 네트워킹 (학생회, 모임)
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
