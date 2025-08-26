// app/(tabs)/calendar.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RecItem = {
  id?: string;
  title?: string;
  reason?: string;
  fitScore?: number;
  locationName?: string;
  time?: { startISO?: string; endISO?: string } | null;
};

const STORAGE_KEY = 'GG_LAST_RECS';

function fmtKTime(isoStart?: string, isoEnd?: string): string {
  if (!isoStart) return '';
  const s = new Date(isoStart);
  const e = isoEnd ? new Date(isoEnd) : null;

  const wday = ['일','월','화','수','목','금','토'][s.getDay()];
  const pad = (n:number)=>String(n).padStart(2,'0');

  const sDate = `${s.getMonth()+1}/${s.getDate()}(${wday})`;
  const sTime = `${pad(s.getHours())}:${pad(s.getMinutes())}`;

  if (!e) return `${sDate} ${sTime}`;
  const same = s.toDateString() === e.toDateString();
  const eTime = `${pad(e.getHours())}:${pad(e.getMinutes())}`;
  return same ? `${sDate} ${sTime}–${eTime}`
              : `${sDate} ${sTime} ~ ${e.getMonth()+1}/${e.getDate()} ${eTime}`;
}

function getStartOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function getEndOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

/** 달력 매트릭스(6x7) 생성: 각 셀에 날짜와 현재월여부 포함 */
function buildMonthMatrix(viewDate: Date) {
  const first = getStartOfMonth(viewDate); // 1일
  const last = getEndOfMonth(viewDate);    // 말일
  const firstWeekday = first.getDay();     // 0=일, 6=토

  // 매트릭스 시작을 전월로 당겨서 주의 첫날(일요일)부터 채우기
  const start = new Date(first);
  start.setDate(first.getDate() - firstWeekday);

  const matrix: { date: Date; inMonth: boolean }[][] = [];
  let cursor = new Date(start);

  for (let row = 0; row < 6; row++) {
    const week: { date: Date; inMonth: boolean }[] = [];
    for (let col = 0; col < 7; col++) {
      week.push({
        date: new Date(cursor),
        inMonth:
          cursor.getMonth() === viewDate.getMonth() &&
          cursor.getFullYear() === viewDate.getFullYear(),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    matrix.push(week);
  }
  return matrix;
}

export default function CalendarScreen() {
  const [loading, setLoading] = useState(false);
  const [allItems, setAllItems] = useState<RecItem[]>([]);
  const [viewDate, setViewDate] = useState(getStartOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setAllItems([]);
        return;
      }
      const arr: RecItem[] = JSON.parse(raw) ?? [];
      setAllItems(arr);
    } catch (e:any) {
      console.error(e);
      Alert.alert('불러오기 실패', e?.message ?? '저장된 추천이 없습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // 날짜별 일정 개수 맵 { 'YYYY-MM-DD': count }
  const countsByDay = useMemo(() => {
    const map: Record<string, number> = {};
    for (const it of allItems) {
      const iso = it?.time?.startISO;
      if (!iso) continue;
      const d = new Date(iso);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      map[key] = (map[key] ?? 0) + 1;
    }
    return map;
  }, [allItems]);

  // 선택 날짜의 일정 리스트
  const selectedItems = useMemo(() => {
    if (!selectedDate) return [];
    const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2,'0')}-${String(selectedDate.getDate()).padStart(2,'0')}`;
    return allItems
      .filter(it => {
        const iso = it?.time?.startISO;
        if (!iso) return false;
        const d = new Date(iso);
        const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        return k === key;
      })
      .sort((a, b) => {
        const as = a?.time?.startISO ? new Date(a.time!.startISO!).getTime() : 0;
        const bs = b?.time?.startISO ? new Date(b.time!.startISO!).getTime() : 0;
        return as - bs;
      });
  }, [selectedDate, allItems]);

  const matrix = useMemo(() => buildMonthMatrix(viewDate), [viewDate]);

  // 헤더용 YYYY.MM
  const titleYM = `${viewDate.getFullYear()}.${String(viewDate.getMonth()+1).padStart(2,'0')}`;

  const onSelectCell = (date: Date, inMonth: boolean) => {
    if (!inMonth) {
      // 셀 터치로 월 전환 UX
      if (date < viewDate) setViewDate(addMonths(viewDate, -1));
      else setViewDate(addMonths(viewDate, +1));
      setSelectedDate(new Date(date));
      return;
    }
    setSelectedDate(new Date(date));
  };

  const isSameDay = (a: Date | null, b: Date) =>
    !!a &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>캘린더</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerBtn} onPress={() => { setViewDate(addMonths(viewDate, -1)); }}>
              <Text style={styles.headerBtnText}>〈</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>{titleYM}</Text>
            <TouchableOpacity style={styles.headerBtn} onPress={() => { setViewDate(addMonths(viewDate, +1)); }}>
              <Text style={styles.headerBtnText}>〉</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBtn, styles.primaryBtn]} onPress={load}>
              <Text style={[styles.headerBtnText, { color: '#fff' }]}>새로고침</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 24 }}>
          {/* 요일 헤더 */}
          <View style={styles.weekHeader}>
            {['일','월','화','수','목','금','토'].map((w) => (
              <Text key={w} style={styles.weekHeaderText}>{w}</Text>
            ))}
          </View>

          {/* 달력 매트릭스 */}
          <View style={styles.monthGrid}>
            {matrix.map((week, i) => (
              <View key={i} style={styles.weekRow}>
                {week.map(({ date, inMonth }) => {
                  const key = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
                  const count = countsByDay[key] ?? 0;
                  const selected = isSameDay(selectedDate, date);

                  return (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.dayCell,
                        !inMonth && styles.dayCellDim,
                        selected && styles.dayCellSelected,
                      ]}
                      onPress={() => onSelectCell(date, inMonth)}
                      activeOpacity={0.8}
                    >
                      <Text style={[
                        styles.dayNumber,
                        !inMonth && styles.dayNumberDim,
                        selected && styles.dayNumberSelected,
                      ]}>
                        {date.getDate()}
                      </Text>

                      {/* 점/배지로 일정 개수 표시 */}
                      {count > 0 && (
                        <View style={styles.dotWrap}>
                          <View style={styles.dot} />
                          {count > 1 && <Text style={styles.dotCount}>x{count}</Text>}
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* 로딩 */}
          {loading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator />
              <Text style={{ color: '#6B7280', marginTop: 8 }}>불러오는 중…</Text>
            </View>
          )}

          {/* 선택 날짜의 일정 목록 */}
          {!!selectedDate && (
            <View style={styles.listWrap}>
              <Text style={styles.listTitle}>
                {selectedDate.getMonth()+1}/{selectedDate.getDate()} 일정
              </Text>

              {selectedItems.length === 0 ? (
                <Text style={styles.emptyText}>이 날짜에는 저장된 추천 일정이 없어요.</Text>
              ) : (
                selectedItems.map((it, idx) => (
                  <View key={`${it.id ?? idx}`} style={styles.eventCard}>
                    <Text style={styles.eventTitle}>{it.title ?? '추천 항목'}</Text>
                    {!!it?.time?.startISO && (
                      <Text style={styles.eventMeta}>🕒 {fmtKTime(it.time.startISO, it.time.endISO)}</Text>
                    )}
                    {!!it?.locationName && (
                      <Text style={styles.eventMeta}>📍 {it.locationName}</Text>
                    )}
                    {!!it?.reason && (
                      <Text style={styles.eventReason}>🤖 {it.reason}</Text>
                    )}
                    {(typeof it?.fitScore === 'number') && (
                      <Text style={styles.score}>적합도 {it.fitScore}%</Text>
                    )}
                  </View>
                ))
              )}
            </View>
          )}

          {/* 안내 */}
          {!selectedDate && allItems.length === 0 && !loading && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                “추천” 탭에서 AI 추천을 받은 뒤 자동 저장됩니다.{'\n'}달력에 점(•)으로 표시돼요.
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#000' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  primaryBtn: { backgroundColor: '#2151FF', borderColor: '#2151FF' },
  headerBtnText: { color: '#111827', fontWeight: '600' },
  monthTitle: { marginHorizontal: 6, fontSize: 16, fontWeight: '700', color: '#111827' },

  content: { flex: 1, padding: 16 },

  weekHeader: { flexDirection: 'row', marginBottom: 8, paddingHorizontal: 4 },
  weekHeaderText: { flex: 1, textAlign: 'center', color: '#6B7280', fontWeight: '600' },

  monthGrid: {},
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },

  dayCell: {
    flex: 1,                 // 7칸 균등 분배
    marginHorizontal: 3,     // 칸 사이 여백
    aspectRatio: 1,          // 정사각형 유지
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellDim: { backgroundColor: '#F3F4F6' },
  dayCellSelected: { borderColor: '#2151FF', borderWidth: 2 },

  dayNumber: { color: '#111827', fontWeight: '600' },
  dayNumberDim: { color: '#9CA3AF' },
  dayNumberSelected: { color: '#2151FF' },

  dotWrap: { position: 'absolute', bottom: 6, flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#2151FF', marginRight: 2 },
  dotCount: { fontSize: 10, color: '#2151FF', fontWeight: '700' },

  loadingBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  listWrap: { marginTop: 16 },
  listTitle: { fontWeight: '700', color: '#111827', marginBottom: 8, fontSize: 16 },

  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 12,
  },
  emptyText: { color: '#6B7280', textAlign: 'center', lineHeight: 22 },

  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  eventTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 },
  eventMeta: { color: '#374151', marginTop: 2 },
  eventReason: { color: '#374151', marginTop: 8 },
  score: { marginTop: 6, color: '#2151FF', fontWeight: '700' },
});