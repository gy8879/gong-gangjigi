import React from 'react';
import { View, StyleSheet, Text, Platform, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WebViewMap() {
  // Google Maps API 키
  const API_KEY = 'AIzaSyD24ZtowfCHdPCJoGNpkcRN_ixmSm3GMhE';
  
  // 충남대학교 중심 좌표 (3곳이 모두 보이는 위치)
  const CENTER_LAT = 36.3680;
  const CENTER_LNG = 127.3450;
  const ZOOM = 15; // 3곳이 모두 보이는 줌 레벨

  // Google Maps JavaScript API HTML
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://maps.googleapis.com/maps/api/js?key=${API_KEY}"></script>
      <style>
        body { margin: 0; padding: 0; }
        #map { width: 100%; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        function initMap() {
          const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: ${CENTER_LAT}, lng: ${CENTER_LNG} },
            zoom: ${ZOOM},
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          
          // 충남대학교 주요 장소 마커 (효정님 추천 3곳 - 정확한 좌표)
          const locations = [
            { lat: 36.3702, lng: 127.3460, title: '중앙도서관', description: '24시간 열람실' },
            { lat: 36.3678, lng: 127.3431, title: '1학생회관', description: '스터디룸, 휴게실' },
            { lat: 36.3662, lng: 127.3456, title: '인재개발원', description: '학습과 휴식 공간' }
          ];
          
          locations.forEach((location, index) => {
            new google.maps.Marker({
              position: { lat: location.lat, lng: location.lng },
              map: map,
              title: location.title,
              label: {
                text: (index + 1).toString(),
                color: 'white',
                fontWeight: 'bold'
              },
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }
            });
          });
        }
        
        window.onload = initMap;
      </script>
    </body>
    </html>
  `;

  // 웹에서는 Google Maps 직접 표시
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>캠퍼스 맵</Text>
          <Text style={styles.headerSubtitle}>공강 시간 활용 추천 장소</Text>
        </View>
        
        <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
        
        <View style={styles.locationList}>
          <Text style={styles.locationTitle}>📍 주요 장소</Text>
          <Text style={styles.locationItem}>• 중앙도서관 - 24시간 열람실, 조용한 학습 공간</Text>
          <Text style={styles.locationItem}>• 1학생회관 - 스터디룸, 휴게실, 동아리실</Text>
          <Text style={styles.locationItem}>• 인재개발원 - 학습과 휴식 공간</Text>
        </View>
        
        <View style={styles.eventsSection}>
          <Text style={styles.eventsTitle}>⚡ 지금 참여 가능한 활동</Text>
          <Text style={styles.eventItem}>• 🎯 14:00 - 중앙도서관 스터디 그룹 모집</Text>
          <Text style={styles.eventItem}>• 🎭 15:30 - 1학생회관 동아리 체험</Text>
          <Text style={styles.eventItem}>• 🎵 16:00 - 인재개발원 작은 음악회</Text>
          <Text style={styles.eventItem}>• 📚 상시 - 도서관 자유 열람실 이용</Text>
        </View>
      </View>
    );
  }

  // 모바일에서는 WebView로 Google Maps 표시
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>캠퍼스 맵</Text>
        <Text style={styles.headerSubtitle}>공강 시간 활용 추천 장소</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.mapContainer}>
          <WebView
            source={{ html: mapHtml }}
            style={styles.map}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>🗺️ 지도 로딩 중...</Text>
              </View>
            )}
          />
        </View>
        
        <View style={styles.locationList}>
          <Text style={styles.locationTitle}>📍 주요 장소</Text>
          <Text style={styles.locationItem}>• 중앙도서관 - 24시간 열람실, 조용한 학습 공간</Text>
          <Text style={styles.locationItem}>• 1학생회관 - 스터디룸, 휴게실, 동아리실</Text>
          <Text style={styles.locationItem}>• 인재개발원 - 학습과 휴식 공간</Text>
        </View>
        
        <View style={styles.eventsSection}>
          <Text style={styles.eventsTitle}>⚡ 지금 참여 가능한 활동</Text>
          <Text style={styles.eventItem}>• 🎯 14:00 - 중앙도서관 스터디 그룹 모집</Text>
          <Text style={styles.eventItem}>• 🎭 15:30 - 1학생회관 동아리 체험</Text>
          <Text style={styles.eventItem}>• 🎵 16:00 - 인재개발원 작은 음악회</Text>
          <Text style={styles.eventItem}>• 📚 상시 - 도서관 자유 열람실 이용</Text>
        </View>
      </ScrollView>
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
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    height: 400,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  locationList: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  locationItem: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 24,
  },
  eventsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 15,
  },
  eventItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 24,
  },
});
