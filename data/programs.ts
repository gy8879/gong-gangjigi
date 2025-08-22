// data/programs.ts
// 더미 데이터 추가 
import { Program } from "./types";

export const programs: Program[] = [
  {
    id: "1",
    title: "AI 취업 역량 프로그램",
    category: "취업",
    location: "도서관 401호",
    date: "2025-09-01",
    description: "AI를 활용한 이력서·자소서 작성 및 모의 면접",
    link: "https://withu.cnu.ac.kr/program/1"
  },
  {
    id: "2",
    title: "캠퍼스 환경 봉사",
    category: "봉사",
    location: "정심화홀 앞",
    date: "2025-09-05",
    description: "캠퍼스 내 환경 미화 봉사활동",
    link: "https://withu.cnu.ac.kr/program/2"
  }
];