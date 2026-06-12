import {
  AlertTriangle,
  Briefcase,
  Calculator,
  ImagePlus,
  Images,
  LayoutDashboard,
  List,
  MessageSquare,
  PlusCircle,
  Trophy,
} from "lucide-react";

export const navGroups = [
  {
    label: "대시보드",
    items: [
      {
        label: "홈",
        href: "/admin",
        icon: <LayoutDashboard size={16} />,
        exact: true,
      },
    ],
  },
  {
    label: "공지사항",
    items: [
      {
        label: "전체 목록",
        href: "/admin/notices",
        icon: <List size={16} />,
        exact: true,
      },
      {
        label: "새 공지 작성",
        href: "/admin/notices/new",
        icon: <PlusCircle size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "사진 게시판",
    items: [
      {
        label: "카테고리 목록",
        href: "/admin/photos",
        icon: <Images size={16} />,
        exact: true,
      },
      {
        label: "새 카테고리 만들기",
        href: "/admin/photos/new",
        icon: <PlusCircle size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "문의 관리",
    items: [
      {
        label: "문의 목록",
        href: "/admin/inquiries",
        icon: <MessageSquare size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "구인 관리",
    items: [
      {
        label: "지원자 목록",
        href: "/admin/recruits",
        icon: <Briefcase size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "계산기 설정",
    items: [
      {
        label: "수가 · 한도액 관리",
        href: "/admin/calculator",
        icon: <Calculator size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "수상·기관선정",
    items: [
      {
        label: "수상 관리",
        href: "/admin/awards",
        icon: <Trophy size={16} />,
        exact: true,
      },
    ],
  },
  {
    label: "메인 페이지",
    items: [
      {
        label: "메인 사진 관리",
        href: "/admin/hero",
        icon: <ImagePlus size={16} />,
        exact: true,
      },
    ],
  },
  {
    label: "시스템",
    items: [
      {
        label: "오류 로그",
        href: "/admin/logs",
        icon: <AlertTriangle size={16} />,
        exact: true,
      },
    ],
  },
];
