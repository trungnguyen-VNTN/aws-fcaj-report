export interface StudentConfig {
  fullName: string;
  phone: string;
  email: string;
  university: string;
  major: string;
  className: string;
  company: string;
  position: string;
  internshipPeriod: string;
  avatar: string;
  mentor?: string;
  github?: string;
  linkedin?: string;
}

export interface SiteConfig {
  title: {
    en: string;
    vi: string;
  };
  subtitle: {
    en: string;
    vi: string;
  };
  workshopProject: {
    en: string;
    vi: string;
  };
  githubUser: string;
  repoName: string;
  baseUrl: string;
  defaultLanguage: 'vi' | 'en';
}

export interface LinksConfig {
  awsStudyGroupBlog: string;
  awsStudyGroupFacebook: string;
  awsCloudJourney: string;
  awsDocumentation: string;
  fcajProgram: string;
}

export interface FullSiteConfig {
  student: StudentConfig;
  site: SiteConfig;
  links: LinksConfig;
}

export const siteConfig: FullSiteConfig = {
  student: {
    fullName: "VŨ NGUYỄN TRUNG NGUYÊN",
    phone: "0377094328",
    email: "vunguyentryng@gmail.com",
    university: "FPT UNIVERSITY",
    major: "SOFTWARE ENGINEERING",
    className: "Tam vị chân hỏa",
    company: "Amazon Web Services (AWS) - First Cloud AI Journey",
    position: "Cloud & AI Solutions Architect Intern",
    internshipPeriod: "09/2026 - 12/2026 (12 Tuần)",
    avatar: "/images/student/avatar.png",
    mentor: "LỮ HOÀN THIỆN",
    github: "https://github.com/trungnguyen-VNTN",
    linkedin: "https://www.linkedin.com/in/trung-nguy%C3%AAn-v%C5%A9-nguy%E1%BB%85n-a08649353/",
  },
  site: {
    title: {
      en: "AWS First Cloud AI Journey — Internship & Workshop Report",
      vi: "Báo Cáo Thực Tập & Workshop — AWS First Cloud AI Journey",
    },
    subtitle: {
      en: "FCAJ Internship Portfolio & Workshop Technical Documentation",
      vi: "Hồ sơ thực tập FCAJ & Tài liệu kỹ thuật Workshop",
    },
    workshopProject: {
      en: "AWS Personalized Nutrition E-Commerce Platform",
      vi: "Nền tảng Thương mại Điện tử Dinh dưỡng Cá nhân hóa trên AWS",
    },
    githubUser: "trungnguyen-VNTN",
    repoName: "aws-fcaj-report",
    baseUrl: "/",
    defaultLanguage: "vi",
  },
  links: {
    awsStudyGroupBlog: "https://cloudjourney.awsfcaj.com/",
    awsStudyGroupFacebook: "https://www.facebook.com/groups/awsstudygroupfcj",
    awsCloudJourney: "https://cloudjourney.awsfcaj.com/",
    awsDocumentation: "https://docs.aws.amazon.com",
    fcajProgram: "https://awsfcaj.com",
  },
};

export default siteConfig;
