import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { CampusLocation, UserLocation } from '../types/location';

const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: '1',
    title: '중앙도서관',
    description: '24시간 열람실, 조용한 학습 공간',
    coordinate: { latitude: 36.3741, longitude: 127.3615 },
    type: 'library'
  },
  {
    id: '2',
    title: '학생회관',
    description: '스터디룸, 휴게실, 동아리실',
    coordinate: { latitude: 36.3735, longitude: 127.3618 },
    type: 'activity'
  },
  {
    id: '3',
    title: '공학관',
    description: '컴퓨터실, 스터디룸',
    coordinate: { latitude: 36.3728, longitude: 127.3621 },
    type: 'study'
  },
  {
    id: '4',
    title: '카페테리아',
    description: '조용한 학습과 휴식 공간',
    coordinate: { latitude: 36.3732, longitude: 127.3612 },
    type: 'cafe'
  },
  {
    id: '5',
    title: '체육관',
    description: '운동, 휴식 공간',
    coordinate: { latitude: 36.3745, longitude: 127.3608 },
    type: 'rest'
  }
];

const INITIAL_REGION: Region = {
  latitude: 36.3735,
  longitude: 127.3615,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function CampusMap() {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setHasLocationPermission(true);
        getCurrentLocation();
      } else {
        Alert.alert(
          '위치 권한 필요',
          '현재 위치 기반 추천을 위해 위치 권한이 필요합니다.',
          [{ text: '확인' }]
        );
      }
    } catch (error) {
      console.error('위치 권한 요청 실패:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      const userLoc: UserLocation = {
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
          altitude: location.coords.altitude,
          heading: location.coords.heading,
          speed: location.coords.speed,
        },
        timestamp: location.timestamp,
      };
      
      setUserLocation(userLoc);
      
      // 사용자 위치로 지도 중심 이동
      setRegion({
        latitude: userLoc.coords.latitude,
        longitude: userLoc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.error('현재 위치 가져오기 실패:', error);
    }
  };

  const handleMarkerPress = (location: CampusLocation) => {
    Alert.alert(
      location.title,
      location.description,
      [
        { text: '길찾기', onPress: () => openDirections(location) },
        { text: '닫기', style: 'cancel' }
      ]
    );
  };

  const openDirections = (location: CampusLocation) => {
    // 길찾기 기능 구현 (나중에 확장)
    Alert.alert('길찾기', `${location.title}로 가는 길을 안내합니다.`);
  };

  const getMarkerColor = (type: CampusLocation['type']) => {
    switch (type) {
      case 'library': return '#3B82F6'; // 파란색
      case 'study': return '#10B981';   // 초록색
      case 'cafe': return '#F59E0B';    // 주황색
      case 'rest': return '#8B5CF6';    // 보라색
      case 'activity': return '#EF4444'; // 빨간색
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={hasLocationPermission}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {/* 캠퍼스 주요 장소 마커 */}
        {CAMPUS_LOCATIONS.map((location) => (
          <Marker
            key={location.id}
            coordinate={location.coordinate}
            title={location.title}
            description={location.description}
            onPress={() => handleMarkerPress(location)}
            pinColor={getMarkerColor(location.type)}
          />
        ))}
      </MapView>

      {/* 지도 컨트롤 패널 */}
      <View style={styles.controlPanel}>
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>장소 유형</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={styles.legendText}>도서관</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>학습</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendText}>카페</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  controlPanel: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 150,
  },
  legend: {
    alignItems: 'flex-start',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  legendItems: {
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
