import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#2151FF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: Platform.OS === 'android' ? 25 : 10,
          paddingTop: 8,
          height: Platform.OS === 'android' ? 85 : 65,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: Platform.OS === 'android' ? 10 : 0,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'android' ? 8 : 0,
        }
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: '홈',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: '추천',
            tabBarIcon: ({ color }) => <TabBarIcon name="lightbulb-o" color={color} />,
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: '캘린더',
            tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '프로필',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: '맵',
            tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
