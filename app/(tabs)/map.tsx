import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>맵</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapTitle}>충남대학교 캠퍼스 맵</Text>
            <Text style={styles.mapDescription}>
              공강 시간 활용을 위한 추천 장소들을 지도에서 확인할 수 있습니다.
            </Text>
          </View>
          
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>📍 주요 장소</Text>
            <Text style={styles.placeholderText}>
              • 도서관 (24시간 열람실){'\n'}
              • 스터디룸 (예약 시스템){'\n'}
              • 카페 (조용한 학습 공간){'\n'}
              • 휴게실 (편안한 휴식){'\n'}
              • 동아리실 (활동 공간)
            </Text>
          </View>
          
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>🎯 맵 기능</Text>
            <Text style={styles.placeholderText}>
              • 현재 위치 기반 추천{'\n'}
              • 거리별 정렬{'\n'}
              • 실시간 혼잡도{'\n'}
              • 길찾기 안내
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
  mapPlaceholder: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    padding: 40,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  mapDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
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
