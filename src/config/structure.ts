export interface NavItem {
  id: string; // e.g. "1-worklog" or "1.1-week1"
  path: string; // e.g. "1-worklog" or "1-worklog/1.1-week1"
  pre: string; // e.g. "1." or "1.1."
  title: {
    en: string;
    vi: string;
  };
  description?: {
    en: string;
    vi: string;
  };
  iconName?: string;
  templateType?: 'worklog-week' | 'proposal' | 'blog' | 'event' | 'workshop-step' | 'self-evaluation' | 'feedback' | 'default';
  suggestedHeadings?: {
    en: string[];
    vi: string[];
  };
  children?: NavItem[];
}

export const reportManifest: NavItem[] = [
  {
    "id": "1-worklog",
    "path": "1-worklog",
    "pre": "1.",
    "title": {
      "vi": "Nhật ký công việc",
      "en": "Worklog"
    },
    "description": {
      "en": "Daily tracking and progress records throughout the 12-week FCAJ journey.",
      "vi": "Nhật ký theo dõi công việc hàng ngày qua 12 tuần hành trình FCAJ."
    },
    "iconName": "Calendar",
    "templateType": "default",
    "suggestedHeadings": {
      "en": [
        "12-Week Overview",
        "Weekly Progress Summary",
        "Key Milestones"
      ],
      "vi": [
        "Tổng quan 12 tuần",
        "Tóm tắt tiến độ hàng tuần",
        "Các mốc quan trọng"
      ]
    },
    "children": [
      {
        "id": "1.1-week1",
        "path": "1-worklog/1.1-week1",
        "pre": "1.1.",
        "title": {
          "vi": "Nhật ký tuần 1",
          "en": "Week 1 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 1.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 1."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.2-week2",
        "path": "1-worklog/1.2-week2",
        "pre": "1.2.",
        "title": {
          "vi": "Nhật ký tuần 2",
          "en": "Week 2 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 2.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 2."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.3-week3",
        "path": "1-worklog/1.3-week3",
        "pre": "1.3.",
        "title": {
          "vi": "Nhật ký tuần 3",
          "en": "Week 3 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 3.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 3."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.4-week4",
        "path": "1-worklog/1.4-week4",
        "pre": "1.4.",
        "title": {
          "vi": "Nhật ký tuần 4",
          "en": "Week 4 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 4.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 4."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.5-week5",
        "path": "1-worklog/1.5-week5",
        "pre": "1.5.",
        "title": {
          "vi": "Nhật ký tuần 5",
          "en": "Week 5 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 5.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 5."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.6-week6",
        "path": "1-worklog/1.6-week6",
        "pre": "1.6.",
        "title": {
          "vi": "Nhật ký tuần 6",
          "en": "Week 6 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 6.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 6."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.7-week7",
        "path": "1-worklog/1.7-week7",
        "pre": "1.7.",
        "title": {
          "vi": "Nhật ký tuần 7",
          "en": "Week 7 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 7.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 7."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.8-week8",
        "path": "1-worklog/1.8-week8",
        "pre": "1.8.",
        "title": {
          "vi": "Nhật ký tuần 8",
          "en": "Week 8 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 8.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 8."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.9-week9",
        "path": "1-worklog/1.9-week9",
        "pre": "1.9.",
        "title": {
          "vi": "Nhật ký tuần 9",
          "en": "Week 9 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 9.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 9."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.10-week10",
        "path": "1-worklog/1.10-week10",
        "pre": "1.10.",
        "title": {
          "vi": "Nhật ký tuần 10",
          "en": "Week 10 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 10.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 10."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.11-week11",
        "path": "1-worklog/1.11-week11",
        "pre": "1.11.",
        "title": {
          "vi": "Nhật ký tuần 11",
          "en": "Week 11 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 11.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 11."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      },
      {
        "id": "1.12-week12",
        "path": "1-worklog/1.12-week12",
        "pre": "1.12.",
        "title": {
          "vi": "Nhật ký tuần 12",
          "en": "Week 12 Worklog"
        },
        "description": {
          "en": "Detailed daily worklog and task references for Week 12.",
          "vi": "Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần 12."
        },
        "iconName": "CalendarDays",
        "templateType": "worklog-week",
        "suggestedHeadings": {
          "en": [
            "Weekly Objectives",
            "Daily Tasks Table",
            "Weekly Results",
            "References & Evidence"
          ],
          "vi": [
            "Mục tiêu tuần",
            "Bảng công việc hàng ngày",
            "Kết quả đạt được",
            "Tài liệu & Minh chứng"
          ]
        }
      }
    ]
  },
  {
    "id": "2-proposal",
    "path": "2-proposal",
    "pre": "2.",
    "title": {
      "vi": "Đề xuất dự án",
      "en": "Proposal"
    },
    "description": {
      "en": "Architectural design, scope, problem statement, timeline, and cost estimation for the workshop project.",
      "vi": "Thiết kế kiến trúc, phạm vi, vấn đề giải quyết, kế hoạch và ước tính chi phí cho dự án workshop."
    },
    "iconName": "FileSpreadsheet",
    "templateType": "proposal",
    "suggestedHeadings": {
      "en": [
        "Executive Summary",
        "Problem Statement & Objectives",
        "Proposed Solution & Architecture",
        "Work Breakdown & Timeline",
        "Cost Estimation (Demo & Production)",
        "Risk Analysis & Mitigation",
        "Expected Deliverables"
      ],
      "vi": [
        "Tổng quan đề xuất",
        "Vấn đề & Mục tiêu giải quyết",
        "Giải pháp & Kiến trúc hệ thống",
        "Kế hoạch triển khai & Timeline",
        "Ước tính Chi phí (Demo & Production)",
        "Phân tích Rủi ro & Giải pháp",
        "Kết quả kỳ vọng"
      ]
    }
  },
  {
    "id": "3-blogs",
    "path": "3-blogs",
    "pre": "3.",
    "title": {
      "vi": "Các bài blog đã đăng",
      "en": "Blogs Posted"
    },
    "description": {
      "en": "Three published AWS Study Group Vietnam articles covering SQS/Lambda, NAT gateway costs, and ALB 502 troubleshooting.",
      "vi": "Ba bài chia sẻ về SQS/Lambda, chi phí NAT Gateway và lỗi ALB 502 đã đăng trên AWS Study Group Vietnam."
    },
    "iconName": "BookOpen",
    "templateType": "default",
    "suggestedHeadings": {
      "en": [
        "Community Sharing Overview",
        "Published Articles List",
        "Key Engagement Stats"
      ],
      "vi": [
        "Tổng quan hoạt động chia sẻ",
        "Danh sách bài viết đã xuất bản",
        "Thống kê tương tác"
      ]
    },
    "children": [
      {
        "id": "3.1-blog1",
        "path": "3-blogs/3.1-blog1",
        "pre": "3.1.",
        "title": {
          "vi": "Blog 1",
          "en": "Blog 1"
        },
        "templateType": "blog",
        "iconName": "FileText"
      },
      {
        "id": "3.2-blog2",
        "path": "3-blogs/3.2-blog2",
        "pre": "3.2.",
        "title": {
          "vi": "Blog 2",
          "en": "Blog 2"
        },
        "templateType": "blog",
        "iconName": "FileText"
      },
      {
        "id": "3.3-blog3",
        "path": "3-blogs/3.3-blog3",
        "pre": "3.3.",
        "title": {
          "vi": "Blog 3",
          "en": "Blog 3"
        },
        "templateType": "blog",
        "iconName": "FileText"
      }
    ]
  },
  {
    "id": "4-events",
    "path": "4-events",
    "pre": "4.",
    "title": {
      "vi": "Các sự kiện đã tham gia",
      "en": "Events Participated"
    },
    "description": {
      "en": "Event report outlines with attendance details and check-in photos pending.",
      "vi": "Khung báo cáo sự kiện, thông tin tham dự và ảnh check-in cần bổ sung."
    },
    "iconName": "Users",
    "templateType": "default",
    "suggestedHeadings": {
      "en": [
        "Event Participation Summary",
        "Learnings & Networking",
        "Photo Evidence"
      ],
      "vi": [
        "Tổng hợp sự kiện tham dự",
        "Kiến thức thu nhận & Kết nối",
        "Minh chứng hình ảnh"
      ]
    },
    "children": [
      {
        "id": "4.1-event1",
        "path": "4-events/4.1-event1",
        "pre": "4.1.",
        "title": {
          "vi": "Sự kiện 1",
          "en": "Event 1"
        },
        "templateType": "event",
        "iconName": "UserCheck"
      },
      {
        "id": "4.2-event2",
        "path": "4-events/4.2-event2",
        "pre": "4.2.",
        "title": {
          "vi": "Sự kiện 2",
          "en": "Event 2"
        },
        "templateType": "event",
        "iconName": "UserCheck"
      },
      {
        "id": "4.3-event3",
        "path": "4-events/4.3-event3",
        "pre": "4.3.",
        "title": {
          "vi": "Sự kiện 3",
          "en": "Event 3"
        },
        "templateType": "event",
        "iconName": "UserCheck"
      }
    ]
  },
  {
    "id": "5-workshop",
    "path": "5-workshop",
    "pre": "5.",
    "title": {
      "vi": "Workshop",
      "en": "Workshop"
    },
    "description": {
      "en": "Complete technical hands-on guide for AWS Personalized Nutrition E-Commerce Platform.",
      "vi": "Hướng dẫn thực hành kỹ thuật hoàn chỉnh: Nền tảng E-Commerce Dinh dưỡng Cá nhân hóa trên AWS."
    },
    "iconName": "Boxes",
    "templateType": "default",
    "suggestedHeadings": {
      "en": [
        "Workshop Overview",
        "High-Level Architecture",
        "Lab Modules Index"
      ],
      "vi": [
        "Tổng quan Workshop",
        "Kiến trúc tổng quan",
        "Mục lục các bài thực hành"
      ]
    },
    "children": [
      {
        "id": "5.1-workshop-overview",
        "path": "5-workshop/5.1-workshop-overview",
        "pre": "5.1.",
        "title": {
          "vi": "Giới thiệu",
          "en": "Introduction"
        },
        "iconName": "Boxes",
        "templateType": "workshop-step"
      },
      {
        "id": "5.2-prerequiste",
        "path": "5-workshop/5.2-prerequiste",
        "pre": "5.2.",
        "title": {
          "vi": "Điều kiện chuẩn bị",
          "en": "Prerequisite"
        },
        "iconName": "Boxes",
        "templateType": "workshop-step"
      },
      {
        "id": "5.3-core-infra",
        "path": "5-workshop/5.3-core-infra",
        "pre": "5.3.",
        "title": {
          "vi": "Hạ tầng cốt lõi",
          "en": "Core infrastructure"
        },
        "iconName": "Boxes",
        "templateType": "workshop-step",
        "children": [
          {
            "id": "5.3.1-network",
            "path": "5-workshop/5.3-core-infra/5.3.1-network",
            "pre": "5.3.1.",
            "title": {
              "vi": "Tạo mạng VPC",
              "en": "Create the VPC network"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.3.2-database",
            "path": "5-workshop/5.3-core-infra/5.3.2-database",
            "pre": "5.3.2.",
            "title": {
              "vi": "Tạo cơ sở dữ liệu RDS",
              "en": "Create the RDS database"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.3.3-cognito",
            "path": "5-workshop/5.3-core-infra/5.3.3-cognito",
            "pre": "5.3.3.",
            "title": {
              "vi": "Cấu hình Cognito",
              "en": "Configure Cognito"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          }
        ]
      },
      {
        "id": "5.4-deploy-app",
        "path": "5-workshop/5.4-deploy-app",
        "pre": "5.4.",
        "title": {
          "vi": "Triển khai ứng dụng",
          "en": "Deploy the application"
        },
        "iconName": "Boxes",
        "templateType": "workshop-step",
        "children": [
          {
            "id": "5.4.1-ecs-alb",
            "path": "5-workshop/5.4-deploy-app/5.4.1-ecs-alb",
            "pre": "5.4.1.",
            "title": {
              "vi": "ECS Fargate và ALB",
              "en": "ECS Fargate and ALB"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.4.2-cloudfront-frontend",
            "path": "5-workshop/5.4-deploy-app/5.4.2-cloudfront-frontend",
            "pre": "5.4.2.",
            "title": {
              "vi": "Frontend trên S3 và CloudFront",
              "en": "Frontend on S3 and CloudFront"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.4.3-cicd",
            "path": "5-workshop/5.4-deploy-app/5.4.3-cicd",
            "pre": "5.4.3.",
            "title": {
              "vi": "CI/CD với GitHub Actions OIDC",
              "en": "CI/CD with GitHub Actions OIDC"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.4.4-payments",
            "path": "5-workshop/5.4-deploy-app/5.4.4-payments",
            "pre": "5.4.4.",
            "title": {
              "vi": "Thanh toán VNPAY sandbox",
              "en": "VNPAY sandbox payments"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          }
        ]
      },
      {
        "id": "5.5-bedrock-ai",
        "path": "5-workshop/5.5-bedrock-ai",
        "pre": "5.5.",
        "title": {
          "vi": "AI tra cứu với Amazon Bedrock",
          "en": "AI lookup with Amazon Bedrock"
        },
        "iconName": "Boxes",
        "templateType": "workshop-step",
        "children": [
          {
            "id": "5.5.1-bedrock-guardrails",
            "path": "5-workshop/5.5-bedrock-ai/5.5.1-bedrock-guardrails",
            "pre": "5.5.1.",
            "title": {
              "vi": "Bật Nova 2 Lite và Guardrails",
              "en": "Enable Nova 2 Lite and Guardrails"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.5.2-ai-evaluation",
            "path": "5-workshop/5.5-bedrock-ai/5.5.2-ai-evaluation",
            "pre": "5.5.2.",
            "title": {
              "vi": "Đánh giá AI",
              "en": "Evaluate the AI"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.5.3-meal-recommendations",
            "path": "5-workshop/5.5-bedrock-ai/5.5.3-meal-recommendations",
            "pre": "5.5.3.",
            "title": {
              "vi": "Gợi ý bữa ăn (Bonus)",
              "en": "Meal recommendations (Bonus)"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          }
        ]
      },
      {
        "id": "5.6-monitoring-cost",
        "path": "5-workshop/5.6-monitoring-cost",
        "pre": "5.6.",
        "title": {
          "vi": "Giám sát, bảo mật và chi phí",
          "en": "Monitoring, security and cost"
        },
        "iconName": "Boxes",
        "templateType": "workshop-step",
        "children": [
          {
            "id": "5.6.1-monitoring",
            "path": "5-workshop/5.6-monitoring-cost/5.6.1-monitoring",
            "pre": "5.6.1.",
            "title": {
              "vi": "Alarm và log CloudWatch",
              "en": "CloudWatch alarms and logs"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.6.2-audit-waf",
            "path": "5-workshop/5.6-monitoring-cost/5.6.2-audit-waf",
            "pre": "5.6.2.",
            "title": {
              "vi": "CloudTrail, ALB logs và WAF",
              "en": "CloudTrail, ALB logs and WAF"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          },
          {
            "id": "5.6.3-cost",
            "path": "5-workshop/5.6-monitoring-cost/5.6.3-cost",
            "pre": "5.6.3.",
            "title": {
              "vi": "Ước tính và tối ưu chi phí",
              "en": "Cost estimation and optimization"
            },
            "iconName": "Boxes",
            "templateType": "workshop-step"
          }
        ]
      },
      {
        "id": "5.7-cleanup",
        "path": "5-workshop/5.7-cleanup",
        "pre": "5.7.",
        "title": {
          "vi": "Dọn tài nguyên",
          "en": "Clean up"
        },
        "iconName": "Boxes",
        "templateType": "workshop-step"
      }
    ]
  },
  {
    "id": "6-self-evaluation",
    "path": "6-self-evaluation",
    "pre": "6.",
    "title": {
      "vi": "Tự đánh giá",
      "en": "Self-Assessment"
    },
    "description": {
      "vi": "Tự đánh giá theo 12 tiêu chí và xác nhận minh chứng cá nhân.",
      "en": "Self-assessment against 12 criteria with personal evidence to confirm."
    },
    "iconName": "Award",
    "templateType": "self-evaluation",
    "suggestedHeadings": {
      "en": [
        "Evaluation Criteria Matrix (12 Areas)",
        "Key Strengths Identified",
        "Areas for Growth",
        "Overall Internship Reflection"
      ],
      "vi": [
        "Bảng ma trận 12 tiêu chí đánh giá",
        "Điểm mạnh nổi bật",
        "Điểm cần tiếp tục cải thiện",
        "Tổng kết quá trình thực tập"
      ]
    }
  },
  {
    "id": "7-feedback",
    "path": "7-feedback",
    "pre": "7.",
    "title": {
      "vi": "Chia sẻ và góp ý",
      "en": "Sharing and Feedback"
    },
    "description": {
      "en": "Honest feedback, suggestions for FCAJ program improvement, and community recommendations.",
      "vi": "Cảm nhận chân thực, đề xuất cải tiến chương trình FCAJ và khuyến nghị cho các khóa sau."
    },
    "iconName": "MessageSquareHeart",
    "templateType": "feedback",
    "suggestedHeadings": {
      "en": [
        "Program Experience & Satisfaction",
        "What Went Well",
        "Recommendations for Improvement",
        "Would You Recommend FCAJ & Why?"
      ],
      "vi": [
        "Trải nghiệm & Mức độ hài lòng",
        "Những điểm xuất sắc của chương trình",
        "Đề xuất cải tiến",
        "Khuyến nghị giới thiệu FCAJ & Lý do"
      ]
    }
  }
];

/**
 * Flatten all items in manifest to an array for easy lookup, breadcrumbs, and prev/next links.
 */
export function flattenManifest(items: NavItem[] = reportManifest): NavItem[] {
  const result: NavItem[] = [];
  function traverse(list: NavItem[]) {
    for (const item of list) {
      result.push(item);
      if (item.children && item.children.length > 0) {
        traverse(item.children);
      }
    }
  }
  traverse(items);
  return result;
}

/**
 * Find prev and next items for a given path.
 */
export function getPrevNextItems(currentPath: string): { prev: NavItem | null; next: NavItem | null } {
  const flat = flattenManifest();
  const normalizedPath = currentPath.replace(/^\//, '').replace(/\/$/, '');
  const index = flat.findIndex(
    (item) => item.path === normalizedPath || item.path === normalizedPath.replace(/^(en|vi)\//, '')
  );

  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index > 0 ? flat[index - 1] : null;
  const next = index < flat.length - 1 ? flat[index + 1] : null;

  return { prev, next };
}

/**
 * Find item by path.
 */
export function findManifestItem(path: string): NavItem | undefined {
  const clean = path.replace(/^\//, '').replace(/\/$/, '').replace(/^(en|vi)\//, '');
  const flat = flattenManifest();
  return flat.find((item) => item.path === clean || item.id === clean);
}
