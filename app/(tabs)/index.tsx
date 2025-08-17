import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [startTime, setStartTime] = useState('오전 10:00');
  const [endTime, setEndTime] = useState('오후 01:00');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    { key: 'study', label: '스터디', emoji: '📚' },
    { key: 'career', label: '커리어', emoji: '💼' },
    { key: 'rest', label: '휴식', emoji: '😌' },
    { key: 'networking', label: '네트워킹', emoji: '🤝' },
    { key: 'selfdev', label: '자기계발', emoji: '🚀' },
    { key: 'sports', label: '스포츠', emoji: '⚽' }
  ];

  const handleInterestToggle = (interestKey: string) => {
    if (selectedInterests.includes(interestKey)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interestKey));
    } else {
      setSelectedInterests([...selectedInterests, interestKey]);
    }
  };

  const handleGetRecommendations = () => {
    // AI 추천 로직
    console.log('AI 추천 요청');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>홈</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.bellIcon}>
              <Text>🔔</Text>
            </TouchableOpacity>
            <View style={styles.profilePic}>
              <Text style={styles.profileText}>👩</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeText}>
              안녕하세요, <Text style={styles.userName}>김민준</Text>!
            </Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>현재 위치: 공대 5관</Text>
            </View>
          </View>

          {/* Chacha's Advice */}
          <View style={styles.chachaSection}>
            <View style={styles.chachaMascot}>
              <Text style={styles.chachaEmoji}>🤖</Text>
            </View>
            <View style={styles.questionField}>
              <Text style={styles.questionText}>오늘 공강을 어떻게 활용할까요?</Text>
            </View>
          </View>

          {/* Free Time Setting */}
          <View style={styles.timeSection}>
            <Text style={styles.sectionTitle}>공강 시간 설정</Text>
            <View style={styles.timeInputs}>
              <View style={styles.timeInput}>
                <Text style={styles.timeLabel}>시작 시간</Text>
                <TextInput
                  style={styles.timeField}
                  value={startTime}
                  onChangeText={setStartTime}
                  placeholder="시작 시간"
                />
              </View>
              <View style={styles.timeInput}>
                <Text style={styles.timeLabel}>종료 시간</Text>
                <TextInput
                  style={styles.timeField}
                  value={endTime}
                  onChangeText={setEndTime}
                  placeholder="종료 시간"
                />
              </View>
            </View>
          </View>

          {/* Select Interests */}
          <View style={styles.interestsSection}>
            <Text style={styles.sectionTitle}>관심사 선택</Text>
            <View style={styles.interestsContainer}>
              {interests.map((interest) => (
                <TouchableOpacity
                  key={interest.key}
                  style={[
                    styles.interestChip,
                    selectedInterests.includes(interest.key) && styles.interestChipSelected
                  ]}
                  onPress={() => handleInterestToggle(interest.key)}
                >
                  <Text style={styles.interestText}>
                    {interest.emoji} {interest.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* AI Recommendation Button */}
          <TouchableOpacity
            style={styles.aiButton}
            onPress={handleGetRecommendations}
          >
            <Text style={styles.aiButtonText}>AI 추천 받기</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  bellIcon: {
    padding: 5,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeCard: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 10,
  },
  userName: {
    color: '#2151FF',
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationIcon: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  chachaSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  chachaMascot: {
    width: 50,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chachaEmoji: {
    fontSize: 24,
  },
  questionField: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 15,
  },
  questionText: {
    fontSize: 16,
    color: '#374151',
  },
  timeSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  timeInputs: {
    flexDirection: 'row',
    gap: 15,
  },
  timeInput: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  timeField: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
  },
  interestsSection: {
    marginBottom: 30,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestChip: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  interestChipSelected: {
    backgroundColor: '#059669',
  },
  interestText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  aiButton: {
    backgroundColor: '#2151FF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  aiButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
