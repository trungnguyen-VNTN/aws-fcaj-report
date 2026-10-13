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
    id: "1-worklog",
    path: "1-worklog",
    pre: "1.",
    title: {
      en: "Worklog (12 Weeks)",
      vi: "Nhật ký công việc (12 Tuần)",
    },
    description: {
      en: "Daily tracking and progress records throughout the 12-week FCAJ journey.",
      vi: "Nhật ký theo dõi công việc hàng ngày qua 12 tuần hành trình FCAJ.",
    },
    iconName: "Calendar",
    templateType: "default",
    suggestedHeadings: {
      en: ["12-Week Overview", "Weekly Progress Summary", "Key Milestones"],
      vi: ["Tổng quan 12 tuần", "Tóm tắt tiến độ hàng tuần", "Các mốc quan trọng"],
    },
    children: Array.from({ length: 12 }, (_, i) => {
      const weekNum = i + 1;
      return {
        id: `1.${weekNum}-week${weekNum}`,
        path: `1-worklog/1.${weekNum}-week${weekNum}`,
        pre: `1.${weekNum}.`,
        title: {
          en: `Week ${weekNum} Worklog`,
          vi: `Nhật ký Tuần ${weekNum}`,
        },
        description: {
          en: `Detailed daily worklog and task references for Week ${weekNum}.`,
          vi: `Nhật ký chi tiết các công việc và tài liệu tham khảo trong Tuần ${weekNum}.`,
        },
        iconName: "CalendarDays",
        templateType: "worklog-week",
        suggestedHeadings: {
          en: ["Weekly Objectives", "Daily Tasks Table", "Weekly Results", "References & Evidence"],
          vi: ["Mục tiêu tuần", "Bảng công việc hàng ngày", "Kết quả đạt được", "Tài liệu & Minh chứng"],
        },
      };
    }),
  },
  {
    id: "2-proposal",
    path: "2-proposal",
    pre: "2.",
    title: {
      en: "Workshop Proposal",
      vi: "Đề xuất Workshop (Proposal)",
    },
    description: {
      en: "Architectural design, scope, problem statement, timeline, and cost estimation for the workshop project.",
      vi: "Thiết kế kiến trúc, phạm vi, vấn đề giải quyết, kế hoạch và ước tính chi phí cho dự án workshop.",
    },
    iconName: "FileSpreadsheet",
    templateType: "proposal",
    suggestedHeadings: {
      en: [
        "Executive Summary",
        "Problem Statement & Objectives",
        "Proposed Solution & Architecture",
        "Work Breakdown & Timeline",
        "Cost Estimation (Demo & Production)",
        "Risk Analysis & Mitigation",
        "Expected Deliverables"
      ],
      vi: [
        "Tổng quan đề xuất",
        "Vấn đề & Mục tiêu giải quyết",
        "Giải pháp & Kiến trúc hệ thống",
        "Kế hoạch triển khai & Timeline",
        "Ước tính Chi phí (Demo & Production)",
        "Phân tích Rủi ro & Giải pháp",
        "Kết quả kỳ vọng"
      ],
    },
  },
  {
    id: "3-blogs",
    path: "3-blogs",
    pre: "3.",
    title: {
      en: "Technical Blogs Posted",
      vi: "Bài viết kỹ thuật (Blogs Posted)",
    },
    description: {
      en: "Technical knowledge sharing articles published on AWS Study Group Vietnam community.",
      vi: "Các bài viết chia sẻ kiến thức kỹ thuật trên cộng đồng AWS Study Group Vietnam.",
    },
    iconName: "BookOpen",
    templateType: "default",
    suggestedHeadings: {
      en: ["Community Sharing Overview", "Published Articles List", "Key Engagement Stats"],
      vi: ["Tổng quan hoạt động chia sẻ", "Danh sách bài viết đã xuất bản", "Thống kê tương tác"],
    },
    children: [
      {
        id: "3.1-blog1",
        path: "3-blogs/3.1-blog1",
        pre: "3.1.",
        title: {
          en: "Blog 1: Cloud & AI Fundamentals",
          vi: "Blog 1: Nền tảng Cloud & Trí tuệ Nhân tạo",
        },
        description: {
          en: "Deep dive into cloud infrastructure and modern AI workload architectures.",
          vi: "Bài viết chuyên sâu về hạ tầng đám mây và kiến trúc ứng dụng AI.",
        },
        iconName: "FileText",
        templateType: "blog",
        suggestedHeadings: {
          en: ["Article Overview", "Key Concepts & Architecture", "Step-by-Step Hands-On", "Community Feedback & Links"],
          vi: ["Tổng quan bài viết", "Khái niệm cốt lõi & Kiến trúc", "Thực hành từng bước", "Phản hồi cộng đồng & Liên kết"],
        },
      },
      {
        id: "3.2-blog2",
        path: "3-blogs/3.2-blog2",
        pre: "3.2.",
        title: {
          en: "Blog 2: Serverless & Event-Driven Systems",
          vi: "Blog 2: Kiến trúc Serverless & Xử lý Hướng sự kiện",
        },
        description: {
          en: "Designing scalable, decoupled serverless systems with AWS Lambda and EventBridge.",
          vi: "Thiết kế hệ thống serverless mở rộng và phân tán với AWS Lambda và EventBridge.",
        },
        iconName: "FileText",
        templateType: "blog",
        suggestedHeadings: {
          en: ["Article Overview", "Architectural Pattern", "Implementation Walkthrough", "Results & Community Link"],
          vi: ["Tổng quan bài viết", "Mô hình kiến trúc", "Hướng dẫn triển khai", "Kết quả & Liên kết cộng đồng"],
        },
      },
      {
        id: "3.3-blog3",
        path: "3-blogs/3.3-blog3",
        pre: "3.3.",
        title: {
          en: "Blog 3: GenAI Agents & Guardrails in Production",
          vi: "Blog 3: Triển khai GenAI Agents & Guardrails thực tế",
        },
        description: {
          en: "Implementing secure Generative AI agents with Amazon Bedrock Guardrails.",
          vi: "Triển khai AI Agent an toàn và kiểm soát rủi ro với Amazon Bedrock Guardrails.",
        },
        iconName: "FileText",
        templateType: "blog",
        suggestedHeadings: {
          en: ["Article Overview", "GenAI Safety Challenges", "Bedrock Guardrails Solution", "Practical Demonstration & Links"],
          vi: ["Tổng quan bài viết", "Thách thức an toàn GenAI", "Giải pháp Bedrock Guardrails", "Minh họa thực tế & Liên kết"],
        },
      },
    ],
  },
  {
    id: "4-events",
    path: "4-events",
    pre: "4.",
    title: {
      en: "Events Participated",
      vi: "Sự kiện đã tham gia (Events)",
    },
    description: {
      en: "AWS community days, technical summits, and FCAJ workshops attended with face check-ins.",
      vi: "Các sự kiện AWS Community Day, Tech Summit và FCAJ Workshop đã tham gia có ảnh check-in rõ mặt.",
    },
    iconName: "Users",
    templateType: "default",
    suggestedHeadings: {
      en: ["Event Participation Summary", "Learnings & Networking", "Photo Evidence"],
      vi: ["Tổng hợp sự kiện tham dự", "Kiến thức thu nhận & Kết nối", "Minh chứng hình ảnh"],
    },
    children: [
      {
        id: "4.1-event1",
        path: "4-events/4.1-event1",
        pre: "4.1.",
        title: {
          en: "Event 1: AWS Community Day Vietnam",
          vi: "Sự kiện 1: AWS Community Day Vietnam",
        },
        description: {
          en: "Participation, learnings, and face check-in at AWS Community Day.",
          vi: "Tham dự, bài học thu nhận và hình ảnh check-in tại AWS Community Day.",
        },
        iconName: "UserCheck",
        templateType: "event",
        suggestedHeadings: {
          en: ["Event Overview & Details", "Key Keynotes & Sessions", "Face Check-in Evidence", "Takeaways & Networking"],
          vi: ["Thông tin sự kiện", "Các phiên chia sẻ chính", "Ảnh check-in rõ mặt", "Bài học rút ra & Kết nối"],
        },
      },
      {
        id: "4.2-event2",
        path: "4-events/4.2-event2",
        pre: "4.2.",
        title: {
          en: "Event 2: AWS GenAI & Cloud Summit",
          vi: "Sự kiện 2: AWS GenAI & Cloud Summit",
        },
        description: {
          en: "Deep dive workshops and face check-in at AWS GenAI Summit.",
          vi: "Hội thảo chuyên sâu và hình ảnh check-in tại AWS GenAI Summit.",
        },
        iconName: "UserCheck",
        templateType: "event",
        suggestedHeadings: {
          en: ["Event Overview & Details", "AI/ML Innovations Learned", "Face Check-in Evidence", "Application to Workshop Project"],
          vi: ["Thông tin sự kiện", "Đột phá AI/ML tiếp thu", "Ảnh check-in rõ mặt", "Ứng dụng vào đề tài Workshop"],
        },
      },
      {
        id: "4.3-event3",
        path: "4-events/4.3-event3",
        pre: "4.3.",
        title: {
          en: "Event 3: FCAJ Technical Mentoring Workshop",
          vi: "Sự kiện 3: FCAJ Technical Mentoring Workshop",
        },
        description: {
          en: "Hands-on architectural review and feedback session with FCAJ mentors.",
          vi: "Buổi phản biện kiến trúc và thực hành cùng đội ngũ Mentors FCAJ.",
        },
        iconName: "UserCheck",
        templateType: "event",
        suggestedHeadings: {
          en: ["Event Overview & Details", "Mentorship Discussion Topics", "Face Check-in Evidence", "Actions Taken"],
          vi: ["Thông tin sự kiện", "Chủ đề thảo luận cùng Mentor", "Ảnh check-in rõ mặt", "Hành động cải thiện"],
        },
      },
    ],
  },
  {
    id: "5-workshop",
    path: "5-workshop",
    pre: "5.",
    title: {
      en: "Workshop Implementation",
      vi: "Triển khai Workshop (Workshop)",
    },
    description: {
      en: "Complete technical hands-on guide for AWS Personalized Nutrition E-Commerce Platform.",
      vi: "Hướng dẫn thực hành kỹ thuật hoàn chỉnh: Nền tảng E-Commerce Dinh dưỡng Cá nhân hóa trên AWS.",
    },
    iconName: "Boxes",
    templateType: "default",
    suggestedHeadings: {
      en: ["Workshop Overview", "High-Level Architecture", "Lab Modules Index"],
      vi: ["Tổng quan Workshop", "Kiến trúc tổng quan", "Mục lục các bài thực hành"],
    },
    children: [
      {
        id: "5.1-overview",
        path: "5-workshop/5.1-overview",
        pre: "5.1.",
        title: {
          en: "Overview & Architecture",
          vi: "Tổng quan & Sơ đồ Kiến trúc",
        },
        description: {
          en: "End-to-end system architecture, technology choices, and architectural diagrams.",
          vi: "Kiến trúc hệ thống tổng thể, lựa chọn công nghệ và sơ đồ kiến trúc tự vẽ.",
        },
        iconName: "Network",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["System Overview", "Architecture Diagram (Custom drawn)", "Component Roles", "Security & Reliability Design"],
          vi: ["Tổng quan hệ thống", "Sơ đồ kiến trúc (Tự vẽ)", "Vai trò các thành phần", "Thiết kế bảo mật & độ tin cậy"],
        },
      },
      {
        id: "5.2-prerequisites",
        path: "5-workshop/5.2-prerequisites",
        pre: "5.2.",
        title: {
          en: "Prerequisites & Environment Setup",
          vi: "Điều kiện tiên quyết & Cài đặt Môi trường",
        },
        description: {
          en: "AWS account configuration, IAM permissions, AWS CLI, and local development tools.",
          vi: "Cấu hình tài khoản AWS, quyền IAM, AWS CLI và công cụ phát triển cần thiết.",
        },
        iconName: "Wrench",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Prerequisites Checklist", "IAM Roles & Permissions", "CLI & SDK Setup", "Verification Steps"],
          vi: ["Danh sách điều kiện tiên quyết", "IAM Roles & Phân quyền", "Cài đặt CLI & SDK", "Các bước xác minh môi trường"],
        },
      },
      {
        id: "5.3-network-security",
        path: "5-workshop/5.3-network-security",
        pre: "5.3.",
        title: {
          en: "Network & Security Infrastructure",
          vi: "Hạ tầng Mạng & Bảo mật",
        },
        description: {
          en: "VPC, public/private subnets, NAT Gateways, Security Groups, and KMS encryption.",
          vi: "VPC, subnet công khai/riêng tư, NAT Gateway, Security Groups và mã hóa KMS.",
        },
        iconName: "ShieldCheck",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Network Design", "VPC & Subnet Provisioning", "Security Groups & NACLs", "Verification Commands"],
          vi: ["Thiết kế mạng", "Khởi tạo VPC & Subnets", "Cấu hình Security Groups", "Lệnh kiểm tra kết nối"],
        },
      },
      {
        id: "5.4-data-pipeline",
        path: "5-workshop/5.4-data-pipeline",
        pre: "5.4.",
        title: {
          en: "Data Pipeline & Storage Layer",
          vi: "Tầng Dữ liệu & Xử lý Pipeline",
        },
        description: {
          en: "Amazon DynamoDB single-table design, S3 bucket storage, and data streaming.",
          vi: "Thiết kế single-table Amazon DynamoDB, lưu trữ S3 và streaming dữ liệu.",
        },
        iconName: "Database",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Data Modeling", "DynamoDB Table Creation", "S3 Storage Configuration", "Data Validation"],
          vi: ["Mô hình hóa dữ liệu", "Tạo bảng DynamoDB", "Cấu hình lưu trữ S3", "Kiểm tra tính hợp lệ dữ liệu"],
        },
      },
      {
        id: "5.5-backend-auth",
        path: "5-workshop/5.5-backend-auth",
        pre: "5.5.",
        title: {
          en: "Backend API & Authentication",
          vi: "API Backend & Xác thực (Auth)",
        },
        description: {
          en: "Amazon Cognito User Pools, API Gateway HTTP APIs, and serverless Lambda controllers.",
          vi: "Amazon Cognito User Pools, API Gateway và các hàm xử lý serverless Lambda.",
        },
        iconName: "KeyRound",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Authentication Strategy", "Cognito User Pool Setup", "API Gateway Endpoints", "Testing Auth Flow"],
          vi: ["Chiến lược xác thực", "Thiết lập Cognito User Pool", "Định nghĩa API Gateway", "Kiểm thử luồng đăng nhập"],
        },
      },
      {
        id: "5.6-ai-agent-guardrails",
        path: "5-workshop/5.6-ai-agent-guardrails",
        pre: "5.6.",
        title: {
          en: "AI Nutrition Agent & Guardrails",
          vi: "AI Agent Dinh dưỡng & Guardrails",
        },
        description: {
          en: "Amazon Bedrock Foundation Models, Agent action groups, and safety guardrails.",
          vi: "Amazon Bedrock Foundation Models, nhóm hành động cho Agent và hàng rào bảo vệ dữ liệu.",
        },
        iconName: "Cpu",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["AI Architecture & Bedrock Setup", "Agent Action Groups", "Guardrail Policies (PII & Medical Safety)", "Prompt Testing & Output Validation"],
          vi: ["Kiến trúc AI & Thiết lập Bedrock", "Action Groups của Agent", "Chính sách Guardrail (PII & An toàn Y tế)", "Kiểm thử Prompt & Kết quả"],
        },
      },
      {
        id: "5.7-event-driven",
        path: "5-workshop/5.7-event-driven",
        pre: "5.7.",
        title: {
          en: "Event-Driven Processing & Messaging",
          vi: "Xử lý Hướng sự kiện & Nhắn tin",
        },
        description: {
          en: "Amazon EventBridge custom event bus, SQS dead-letter queues, and SNS alerts.",
          vi: "Amazon EventBridge custom bus, hàng đợi Dead-letter SQS và thông báo SNS.",
        },
        iconName: "Zap",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Event Schema Definition", "EventBridge Rules Setup", "SQS Dead Letter Queue Handling", "Event Flow Verification"],
          vi: ["Định nghĩa Schema sự kiện", "Cấu hình Rules EventBridge", "Xử lý hàng đợi lỗi SQS", "Kiểm tra luồng sự kiện"],
        },
      },
      {
        id: "5.8-frontend-cloudfront",
        path: "5-workshop/5.8-frontend-cloudfront",
        pre: "5.8.",
        title: {
          en: "Frontend Delivery & CloudFront CDN",
          vi: "Giao diện Frontend & Phân phối CloudFront",
        },
        description: {
          en: "S3 static website hosting, CloudFront distribution with Origin Access Control (OAC), and SSL.",
          vi: "Hosting S3 static website, phân phối CloudFront với Origin Access Control (OAC) và chứng chỉ SSL.",
        },
        iconName: "Globe",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Frontend Build & Packaging", "S3 Bucket & OAC Configuration", "CloudFront Cache Behaviors", "Domain & HTTPS Verification"],
          vi: ["Đóng gói Frontend", "Cấu hình S3 & OAC", "Cấu hình bộ nhớ đệm CloudFront", "Kiểm tra HTTPS & Tên miền"],
        },
      },
      {
        id: "5.9-ci-cd",
        path: "5-workshop/5.9-ci-cd",
        pre: "5.9.",
        title: {
          en: "CI/CD Pipeline & Automation",
          vi: "Quy trình CI/CD & Tự động hóa",
        },
        description: {
          en: "GitHub Actions automated testing, infrastructure as code deployment, and rollback strategy.",
          vi: "GitHub Actions kiểm thử tự động, triển khai hạ tầng IaC và chiến lược khôi phục.",
        },
        iconName: "GitBranch",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["CI/CD Architecture", "GitHub Actions Workflow Setup", "AWS OIDC Authentication", "Pipeline Run Verification"],
          vi: ["Kiến trúc CI/CD", "Thiết lập GitHub Actions Workflow", "Xác thực không mật khẩu AWS OIDC", "Kiểm tra chạy Pipeline"],
        },
      },
      {
        id: "5.10-testing-validation",
        path: "5-workshop/5.10-testing-validation",
        pre: "5.10.",
        title: {
          en: "Testing & Validation",
          vi: "Kiểm thử & Xác minh Toàn diện",
        },
        description: {
          en: "End-to-end integration tests, load testing, latency benchmarking, and security scans.",
          vi: "Kiểm thử tích hợp đầu-cuối, kiểm thử tải, đo độ trễ và quét bảo mật.",
        },
        iconName: "CheckCircle2",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Test Plan Overview", "Integration Test Execution", "Performance & Latency Results", "Security Audit Checklist"],
          vi: ["Kế hoạch kiểm thử", "Thực thi kiểm thử tích hợp", "Đo lường hiệu năng & độ trễ", "Checklist kiểm tra an toàn thông tin"],
        },
      },
      {
        id: "5.11-cost",
        path: "5-workshop/5.11-cost",
        pre: "5.11.",
        title: {
          en: "Cost Estimation & Optimization",
          vi: "Ước tính Chi phí & Tối ưu hóa (Cost)",
        },
        description: {
          en: "Detailed AWS Pricing Calculator breakdown for Demo and Production scale, with Free Tier usage.",
          vi: "Bảng chi tiết chi phí AWS Pricing Calculator cho môi trường Demo và Production, tận dụng Free Tier.",
        },
        iconName: "DollarSign",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Cost Estimation Overview", "Demo Environment Cost Table", "Production Scale Cost Table", "Cost Optimization Strategies", "AWS Free Tier Coverage"],
          vi: ["Tổng quan ước tính Chi phí", "Bảng chi phí Môi trường Demo", "Bảng chi phí Môi trường Production", "Chiến lược tối ưu chi phí", "Tối ưu hóa AWS Free Tier"],
        },
      },
      {
        id: "5.12-demo",
        path: "5-workshop/5.12-demo",
        pre: "5.12.",
        title: {
          en: "Live Demo & Screencast",
          vi: "Demo Trực quan & Video Minh họa",
        },
        description: {
          en: "Recorded video walkthrough, live links, user scenario steps, and test credentials.",
          vi: "Video ghi hình demo, liên kết trực tiếp, các bước kịch bản người dùng và tài khoản kiểm thử.",
        },
        iconName: "PlayCircle",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Demo Video Screencast", "Live Application URLs", "User Journey Scenarios", "Verification Evidence"],
          vi: ["Video ghi hình Demo", "Đường dẫn ứng dụng trực tiếp", "Kịch bản trải nghiệm người dùng", "Minh chứng hoạt động thực tế"],
        },
      },
      {
        id: "5.13-cleanup",
        path: "5-workshop/5.13-cleanup",
        pre: "5.13.",
        title: {
          en: "Resource Clean-up",
          vi: "Dọn dẹp Tài nguyên (Clean-up)",
        },
        description: {
          en: "Step-by-step tear down commands to avoid incurring unexpected AWS charges.",
          vi: "Hướng dẫn hủy tài nguyên từng bước để tránh phát sinh chi phí ngoài ý muốn.",
        },
        iconName: "Trash2",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Clean-up Checklist", "Automated Tear-down Script", "Manual Deletion Verification", "Cost Guard Checks"],
          vi: ["Checklist dọn dẹp tài nguyên", "Lệnh hủy tài nguyên tự động", "Xác minh tài nguyên đã xóa", "Kiểm tra AWS Cost Anomaly"],
        },
      },
      {
        id: "5.14-lessons-future",
        path: "5-workshop/5.14-lessons-future",
        pre: "5.14.",
        title: {
          en: "Lessons Learned & Future Improvements",
          vi: "Bài học Kinh nghiệm & Hướng phát triển",
        },
        description: {
          en: "Technical challenges overcome, architecture trade-offs, and future enhancement roadmap.",
          vi: "Các thách thức kỹ thuật đã vượt qua, sự đánh đổi kiến trúc và lộ trình nâng cấp.",
        },
        iconName: "Sparkles",
        templateType: "workshop-step",
        suggestedHeadings: {
          en: ["Key Technical Takeaways", "Architecture Trade-offs & Reflection", "Roadmap & Future Enhancements"],
          vi: ["Bài học kỹ thuật cốt lõi", "Đánh giá sự đánh đổi kiến trúc", "Lộ trình phát triển tương lai"],
        },
      },
    ],
  },
  {
    id: "6-self-evaluation",
    path: "6-self-evaluation",
    pre: "6.",
    title: {
      en: "Self-Evaluation",
      vi: "Tự đánh giá (Self-Evaluation)",
    },
    description: {
      en: "Self-assessment across 8 FCAJ performance criteria with reflection notes.",
      vi: "Bảng tự đánh giá theo 8 tiêu chí chuẩn FCAJ kèm nhận xét cá nhân.",
    },
    iconName: "Award",
    templateType: "self-evaluation",
    suggestedHeadings: {
      en: ["Evaluation Criteria Matrix (8 Areas)", "Key Strengths Identified", "Areas for Growth", "Overall Internship Reflection"],
      vi: ["Bảng ma trận 8 tiêu chí đánh giá", "Điểm mạnh nổi bật", "Điểm cần tiếp tục cải thiện", "Tổng kết quá trình thực tập"],
    },
  },
  {
    id: "7-feedback",
    path: "7-feedback",
    pre: "7.",
    title: {
      en: "Sharing & Feedback",
      vi: "Chia sẻ & Đóng góp ý kiến (Feedback)",
    },
    description: {
      en: "Honest feedback, suggestions for FCAJ program improvement, and community recommendations.",
      vi: "Cảm nhận chân thực, đề xuất cải tiến chương trình FCAJ và khuyến nghị cho các khóa sau.",
    },
    iconName: "MessageSquareHeart",
    templateType: "feedback",
    suggestedHeadings: {
      en: ["Program Experience & Satisfaction", "What Went Well", "Recommendations for Improvement", "Would You Recommend FCAJ & Why?"],
      vi: ["Trải nghiệm & Mức độ hài lòng", "Những điểm xuất sắc của chương trình", "Đề xuất cải tiến", "Khuyến nghị giới thiệu FCAJ & Lý do"],
    },
  },
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
