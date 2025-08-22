// app/(tabs)/two.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

type RecItem = {
  id?: string;
  title?: string;
  desc?: string;
  tags?: string[];
  dateText?: string;   // 예: 2025-09-01
  placeText?: string;  // 예: 도서관 401호
  // ▼ LLM이 생성해 주는 필드
  reason?: string;     // “왜 맞는지” 한두 문장
  fitScore?: number;   // 0~100
};

const WEBHOOK_TEST_URL =
  'https://panho.app.n8n.cloud/webhook-test/gapgenie/recommend';

export default function RecommendScreen() {
  const params = useLocalSearchParams<{
    start?: string;
    end?: string;
    interests?: string; // "study,career"
    lat?: string;
    lng?: string;
  }>();

  // 홈에서 넘어온 쿼리(or 기본값)
  const timeWindow = useMemo(
    () => ({
      start: params.start ?? '오전 10:00',
      end: params.end ?? '오후 01:00',
    }),
    [params.start, params.end]
  );

  const interests = useMemo<string[]>(
    () =>
      (params.interests ? String(params.interests).split(',') : []) as string[],
    [params.interests]
  );

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<RecItem[] | null>(null);
  const [raw, setRaw] = useState<any>(null);       // 디버그용
  const [summary, setSummary] = useState<string>(''); // LLM 요약

  const onCallWebhook = async () => {
    try {
      setLoading(true);
      setItems(null);
      setRaw(null);
      setSummary('');

      // n8n으로 보낼 페이로드
      const payload = {
        source: 'gapgenie-app',
        sentAt: new Date().toISOString(),
        timeWindow,               // { start, end }
        interests,                // ["study","career"]
        location:
          params.lat && params.lng
            ? { lat: Number(params.lat), lng: Number(params.lng) }
            : null,
      };

      const res = await fetch(WEBHOOK_TEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // n8n의 Respond 노드가 JSON을 반환한다고 가정
      const data = await res.json().catch(async () => {
        const txt = await res.text();
        return { _text: txt };
      });

      setRaw(data);

      // 권장: { ok, items: [...], summary }
      // 호환: 배열 그대로 오거나 results/items 키로 올 수도 있으니 안전하게 처리
      const list: RecItem[] =
        Array.isArray(data) ? data :
        Array.isArray(data?.items) ? data.items :
        Array.isArray(data?.results) ? data.results :
        [];

      setItems(list);
      if (typeof data?.summary === 'string') setSummary(data.summary);
    } catch (e: any) {
      console.error(e);
      Alert.alert('요청 실패', e?.message ?? '네트워크 오류');
    } finally {
      setLoading(false);
    }
  };

  const renderCard = ({ item }: { item: RecItem }) => (
    <View style={styles.card}>
      {!!item.title && <Text style={styles.cardTitle}>{item.title}</Text>}
      {!!item.desc && <Text style={styles.cardBody}>{item.desc}</Text>}

      {/* LLM 생성 근거/점수 */}
      {!!item.reason && (
        <Text style={styles.cardReason}>🤖 {item.reason}</Text>
      )}
      {typeof item.fitScore === 'number' && (
        <Text style={styles.cardScore}>적합도 {item.fitScore}%</Text>
      )}

      {(item.dateText || item.placeText) && (
        <Text style={styles.cardMeta}>
          {item.dateText ?? ''}{item.placeText ? ` · ${item.placeText}` : ''}
        </Text>
      )}
      {!!item.tags?.length && (
        <View style={styles.tagRow}>
          {item.tags!.map((t, i) => (
            <View key={`${t}-${i}`} style={styles.tagChip}>
              <Text style={styles.tagText}>#{t}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>추천</Text>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 24 }}>
          {/* 안내 카드 */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 AI 추천 시스템</Text>
            <Text style={styles.infoText}>
              선택한 관심사와 공강 시간을 바탕으로 맞춤형 활동을 추천해드립니다.
            </Text>

            <View style={styles.kv}>
              <Text style={styles.k}>공강</Text>
              <Text style={styles.v}>{timeWindow.start} ~ {timeWindow.end}</Text>
            </View>
            <View style={styles.kv}>
              <Text style={styles.k}>관심사</Text>
              <Text style={styles.v}>{interests.length ? interests.join(', ') : '전체'}</Text>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={onCallWebhook} disabled={loading}>
              <Text style={styles.primaryBtnText}>
                {loading ? '요청 중…' : 'AI 추천 받기 (n8n)'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.helperUrl} numberOfLines={1}>
              {WEBHOOK_TEST_URL}
            </Text>
            <Text style={styles.helperNote}>※ n8n에서 “Listen for test event”를 켠 뒤 버튼을 누르세요.</Text>

            {/* LLM 요약 */}
            {summary ? (
              <Text style={styles.summaryText}>🤖 요약: {summary}</Text>
            ) : null}
          </View>

          {/* 로딩 */}
          {loading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator />
              <Text style={{ color: '#6B7280', marginTop: 8 }}>추천 불러오는 중…</Text>
            </View>
          )}

          {/* 결과 카드 리스트 */}
          {!!items?.length && (
            <FlatList
              scrollEnabled={false}
              data={items}
              keyExtractor={(_, idx) => String(idx)}
              renderItem={renderCard}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
          )}

          {/* 결과가 배열이 아닌 기타 JSON일 때 raw 표시(디버그용) */}
          {!loading && !items?.length && raw && (
            <View style={styles.rawBox}>
              <Text style={styles.rawTitle}>응답 원본(JSON)</Text>
              <Text style={styles.rawText}>
                {JSON.stringify(raw, null, 2)}
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#000' },
  content: { flex: 1, padding: 20 },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: { fontSize: 18, fontWeight: '600', color: '#374151', marginBottom: 8 },
  infoText: { fontSize: 16, color: '#6B7280', lineHeight: 24, marginBottom: 12 },
  kv: { flexDirection: 'row', marginTop: 4 },
  k: { width: 48, color: '#6B7280' },
  v: { color: '#111827' },

  primaryBtn: {
    backgroundColor: '#2151FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  helperUrl: { marginTop: 10, color: '#9CA3AF', fontSize: 12 },
  helperNote: { marginTop: 2, color: '#9CA3AF', fontSize: 12 },
  summaryText: { marginTop: 10, color: '#374151' },

  loadingBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#111827', marginBottom: 6 },
  cardBody: { fontSize: 15, color: '#374151', lineHeight: 22 },
  cardReason: { marginTop: 8, color: '#374151' },
  cardScore: { marginTop: 4, color: '#2151FF', fontWeight: '700' },
  cardMeta: { marginTop: 8, color: '#6B7280' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 6 },
  tagChip: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: { color: '#2151FF', fontSize: 12, fontWeight: '600' },

  rawBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rawTitle: { fontWeight: '700', marginBottom: 8, color: '#111827' },
  rawText: { color: '#111827', fontFamily: 'Courier', fontSize: 12 },
});