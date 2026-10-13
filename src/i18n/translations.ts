export interface Translations {
  common: {
    search: string;
    searchPlaceholder: string;
    noResults: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    language: string;
    langEn: string;
    langVi: string;
    prev: string;
    next: string;
    backToHome: string;
    backToTop: string;
    copy: string;
    copied: string;
    skipToContent: string;
    draft: string;
    ready: string;
    skeleton: string;
    lastUpdated: string;
    readingTime: string;
    minutes: string;
    tableOfContents: string;
    onThisPage: string;
    visited: string;
    links: string;
  };
  home: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    viewDocs: string;
    viewWorklog: string;
    studentCardTitle: string;
    studentInfo: {
      fullName: string;
      university: string;
      major: string;
      class: string;
      company: string;
      position: string;
      period: string;
      email: string;
      phone: string;
      mentor: string;
    };
    progressTitle: string;
    progressSubtitle: string;
    pagesCompleted: string;
    sectionsTitle: string;
    sectionsSubtitle: string;
  };
  emptyState: {
    title: string;
    message: string;
    folderHint: string;
    suggestedHeadingsTitle: string;
    copyTemplate: string;
    viewGuide: string;
    badge: string;
  };
  specialized: {
    worklog: {
      week: string;
      timelineTitle: string;
      timelineSubtitle: string;
      statusEmpty: string;
      statusDone: string;
      tableDay: string;
      tableTask: string;
      tableStart: string;
      tableEnd: string;
      tableRef: string;
    };
    cost: {
      title: string;
      service: string;
      spec: string;
      demoCost: string;
      prodCost: string;
      notes: string;
      total: string;
      monthly: string;
      freeTierNote: string;
    };
    selfEval: {
      criteria: string;
      good: string;
      fair: string;
      average: string;
      notes: string;
      score: string;
    };
    event: {
      date: string;
      location: string;
      role: string;
      checkinTitle: string;
      checkinBadge: string;
      viewPost: string;
    };
    blog: {
      date: string;
      readMore: string;
      viewOnCommunity: string;
    };
    architecture: {
      clickToZoom: string;
      customDrawnBadge: string;
      customDrawnNote: string;
      closeZoom: string;
      resetZoom: string;
    };
  };
  notFound: {
    title: string;
    subtitle: string;
    description: string;
    homeButton: string;
  };
}

export const translations: Record<'en' | 'vi', Translations> = {
  vi: {
    common: {
      search: "Tìm kiếm",
      searchPlaceholder: "Tìm kiếm tài liệu... (Ctrl + K)",
      noResults: "Không tìm thấy kết quả phù hợp",
      themeLight: "Sáng",
      themeDark: "Tối",
      themeSystem: "Hệ thống",
      language: "Ngôn ngữ",
      langEn: "English",
      langVi: "Tiếng Việt",
      prev: "Mục trước",
      next: "Mục kế tiếp",
      backToHome: "Về trang chủ",
      backToTop: "Lên đầu trang",
      copy: "Sao chép",
      copied: "Đã chép!",
      skipToContent: "Chuyển thẳng đến nội dung chính",
      draft: "Bản nháp",
      ready: "Hoàn thiện",
      skeleton: "Khung chờ nội dung",
      lastUpdated: "Cập nhật lần cuối",
      readingTime: "Thời gian đọc",
      minutes: "phút",
      tableOfContents: "Mục lục trang",
      onThisPage: "Trong trang này",
      visited: "Đã xem",
      links: "Liên kết quan trọng",
    },
    home: {
      badge: "Báo Cáo Thực Tập FCAJ — AWS Cloud & AI",
      heroTitle: "Hồ Sơ Thực Tập & Workshop FCAJ",
      heroSubtitle: "Tài liệu kỹ thuật tổng hợp 12 tuần hành trình First Cloud AI Journey và Workshop đề tài AI E-Commerce trên AWS.",
      viewDocs: "Bắt đầu xem báo cáo",
      viewWorklog: "Xem Worklog 12 tuần",
      studentCardTitle: "Thông tin Thực tập sinh",
      studentInfo: {
        fullName: "Họ và tên",
        university: "Trường Đại học",
        major: "Chuyên ngành",
        class: "Lớp / Khóa",
        company: "Đơn vị thực tập",
        position: "Vị trí thực tập",
        period: "Thời gian thực tập",
        email: "Email liên hệ",
        phone: "Số điện thoại",
        mentor: "Mentor hướng dẫn",
      },
      progressTitle: "Tiến độ hoàn thiện báo cáo",
      progressSubtitle: "Tỷ lệ các trang đã có nội dung Markdown hoàn chỉnh so với toàn bộ khung báo cáo.",
      pagesCompleted: "trang hoàn thiện",
      sectionsTitle: "Các phần báo cáo chuẩn FCAJ",
      sectionsSubtitle: "Cấu trúc 7 phần bắt buộc theo quy định chấm điểm của AWS First Cloud AI Journey.",
    },
    emptyState: {
      badge: "Trạng thái chờ nội dung",
      title: "Nội dung đang được cập nhật",
      message: "Trang này hiện đang là khung cấu trúc chuẩn. Bạn chỉ cần thả file Markdown vào thư mục tương ứng để nội dung hiển thị tự động.",
      folderHint: "Đường dẫn file Markdown tương ứng:",
      suggestedHeadingsTitle: "Các tiêu đề mục gợi ý cần triển khai (theo chuẩn chấm điểm):",
      copyTemplate: "Sao chép khung mẫu",
      viewGuide: "Xem hướng dẫn thêm nội dung",
    },
    specialized: {
      worklog: {
        week: "Tuần",
        timelineTitle: "Lộ trình 12 tuần thực tập",
        timelineSubtitle: "Theo dõi tiến độ công việc từng tuần trong suốt kỳ thực tập FCAJ.",
        statusEmpty: "Chưa có nội dung",
        statusDone: "Đã hoàn thành",
        tableDay: "Thứ",
        tableTask: "Công việc thực hiện",
        tableStart: "Bắt đầu",
        tableEnd: "Hoàn thành",
        tableRef: "Tài liệu tham khảo",
      },
      cost: {
        title: "Bảng ước tính Chi phí AWS (Cost Estimation)",
        service: "Dịch vụ AWS",
        spec: "Cấu hình / Thông số kỹ thuật",
        demoCost: "Môi trường Demo ($/tháng)",
        prodCost: "Môi trường Production ($/tháng)",
        notes: "Ghi chú & Tối ưu Free Tier",
        total: "TỔNG CỘNG CHI PHÍ ƯỚC TÍNH",
        monthly: "USD / tháng",
        freeTierNote: "* Chi phí môi trường Demo được tối ưu nằm trong gói AWS Free Tier 12 tháng đầu tiên.",
      },
      selfEval: {
        criteria: "Tiêu chí đánh giá kết quả thực tập (8 tiêu chí chuẩn FCAJ)",
        good: "Tốt",
        fair: "Khá",
        average: "Trung bình",
        notes: "Minh chứng & Nhận xét cá nhân",
        score: "Tự đánh giá",
      },
      event: {
        date: "Ngày tham dự",
        location: "Địa điểm",
        role: "Vai trò",
        checkinTitle: "Minh chứng check-in tại sự kiện",
        checkinBadge: "Ảnh check-in rõ mặt bắt buộc",
        viewPost: "Xem bài đăng / thông tin",
      },
      blog: {
        date: "Ngày đăng bài",
        readMore: "Đọc toàn bộ bài viết",
        viewOnCommunity: "Xem trên AWS Study Group",
      },
      architecture: {
        clickToZoom: "Nhấp vào hình để phóng to / tương tác thu phóng",
        customDrawnBadge: "Sơ đồ kiến trúc tự vẽ (Draw.io + AWS Icons)",
        customDrawnNote: "Kiến trúc thiết kế tuân thủ Well-Architected Framework, do tác giả trực tiếp xây dựng.",
        closeZoom: "Đóng",
        resetZoom: "Đặt lại phóng to",
      },
    },
    notFound: {
      title: "404 - Không tìm thấy trang",
      subtitle: "Đường dẫn bạn yêu cầu không tồn tại hoặc đã được di chuyển.",
      description: "Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ để điều hướng qua cây mục lục.",
      homeButton: "Quay về trang chủ",
    },
  },
  en: {
    common: {
      search: "Search",
      searchPlaceholder: "Search documentation... (Ctrl + K)",
      noResults: "No matching results found",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
      language: "Language",
      langEn: "English",
      langVi: "Tiếng Việt",
      prev: "Previous",
      next: "Next",
      backToHome: "Back to Home",
      backToTop: "Back to top",
      copy: "Copy",
      copied: "Copied!",
      skipToContent: "Skip to main content",
      draft: "Draft",
      ready: "Ready",
      skeleton: "Skeleton placeholder",
      lastUpdated: "Last updated",
      readingTime: "Reading time",
      minutes: "min",
      tableOfContents: "Table of Contents",
      onThisPage: "On this page",
      visited: "Visited",
      links: "Important Links",
    },
    home: {
      badge: "FCAJ Internship Report — AWS Cloud & AI",
      heroTitle: "FCAJ Internship Portfolio & Workshop",
      heroSubtitle: "Technical documentation spanning the 12-week First Cloud AI Journey and the AWS AI E-Commerce Workshop project.",
      viewDocs: "Browse Documentation",
      viewWorklog: "View 12-Week Worklog",
      studentCardTitle: "Intern Profile",
      studentInfo: {
        fullName: "Full Name",
        university: "University",
        major: "Major",
        class: "Class / Cohort",
        company: "Host Company",
        position: "Role / Position",
        period: "Internship Period",
        email: "Contact Email",
        phone: "Phone Number",
        mentor: "Mentor / Supervisor",
      },
      progressTitle: "Report Completion Progress",
      progressSubtitle: "Percentage of skeleton pages populated with complete Markdown content.",
      pagesCompleted: "pages completed",
      sectionsTitle: "Standard FCAJ Report Sections",
      sectionsSubtitle: "7 required report sections in compliance with AWS First Cloud AI Journey grading rubric.",
    },
    emptyState: {
      badge: "Content Pending",
      title: "Content Coming Soon",
      message: "This page is currently a structured skeleton. Simply drop a Markdown file into the corresponding content directory to display content automatically.",
      folderHint: "Expected Markdown file path:",
      suggestedHeadingsTitle: "Suggested headings to cover (Rubric-compliant):",
      copyTemplate: "Copy Template",
      viewGuide: "View Authoring Guide",
    },
    specialized: {
      worklog: {
        week: "Week",
        timelineTitle: "12-Week Internship Timeline",
        timelineSubtitle: "Weekly progress tracker across the entire FCAJ internship journey.",
        statusEmpty: "Pending content",
        statusDone: "Completed",
        tableDay: "Day",
        tableTask: "Task Description",
        tableStart: "Start Date",
        tableEnd: "Completion Date",
        tableRef: "Reference / Docs",
      },
      cost: {
        title: "AWS Cost Estimation Matrix",
        service: "AWS Service",
        spec: "Configuration / Tier Spec",
        demoCost: "Demo Environment ($/mo)",
        prodCost: "Production Scale ($/mo)",
        notes: "Notes & Free Tier Coverage",
        total: "TOTAL ESTIMATED COST",
        monthly: "USD / month",
        freeTierNote: "* Demo environment is optimized to stay within the AWS 12-Month Free Tier allowance.",
      },
      selfEval: {
        criteria: "FCAJ 8 Performance Evaluation Criteria",
        good: "Good",
        fair: "Fair",
        average: "Average",
        notes: "Evidence & Self-Reflection",
        score: "Self-Score",
      },
      event: {
        date: "Date Attended",
        location: "Location",
        role: "Role",
        checkinTitle: "Event Check-in Verification",
        checkinBadge: "Face check-in photo required",
        viewPost: "View Post / Details",
      },
      blog: {
        date: "Publish Date",
        readMore: "Read Full Article",
        viewOnCommunity: "View on AWS Study Group",
      },
      architecture: {
        clickToZoom: "Click image to pan and zoom",
        customDrawnBadge: "Custom-Drawn Architecture (Draw.io + AWS Icons)",
        customDrawnNote: "Designed in accordance with the AWS Well-Architected Framework, created personally by the author.",
        closeZoom: "Close",
        resetZoom: "Reset Zoom",
      },
    },
    notFound: {
      title: "404 - Page Not Found",
      subtitle: "The requested document could not be found or has been moved.",
      description: "Please check the URL or return to home to navigate using the sidebar index.",
      homeButton: "Back to Home",
    },
  },
};

export type Language = 'en' | 'vi';
