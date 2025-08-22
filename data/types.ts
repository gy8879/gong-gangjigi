//기본 스키마 작성

export interface Program {
  id: string;            // 프로그램 고유 ID
  title: string;         // 프로그램 제목
  category: string;      // 분류 (예: 봉사, 취업, 비교과)
  location?: string;     // 장소 (옵션)
  date: string;          // 일정 (YYYY-MM-DD)
  description: string;   // 간단한 설명
  link?: string;         // 상세보기 링크 (옵션)
}
