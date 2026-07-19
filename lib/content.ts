import { SITE } from "./constants";

export const homeContent = {
  hero: {
    headline: "Two Threads, One Beautiful Story",
    subheadline:
      "A halal marriage app for Muslims seeking nikah with sincerity, respect, and intention — not casual dating.",
    primaryCta: "Download Ghazl App",
    secondaryCta: "Learn More",
  },
  purpose: {
    title: "Built with Intention, Woven with Faith",
    subtitle: "Ghazl is not a dating app. It is a dedicated space designed for Muslims seeking a sincere path to nikah.",
    items: [
      {
        title: "Islamic Integrity",
        description: "Our features are designed to preserve Islamic values. We facilitate dignified connections without the superficial swiping game.",
        icon: "shield" as const,
      },
      {
        title: "Absolute Privacy Control",
        description: "Your information is sacred. Complete control over photo visibility and personal details keeps you safe and secure.",
        icon: "lock" as const,
      },
      {
        title: "Sincere Intentions Only",
        description: "We verify and moderate our community to ensure every user is serious about marriage, removing anyone looking for casual dating.",
        icon: "checkCircle" as const,
      },
    ],
  },
  features: {
    title: "Built for Marriage, Not Moments",
    subtitle:
      "Every feature is designed to help you discover compatible matches with dignity and purpose.",
    items: [
      {
        title: "Discover",
        description:
          "Browse profiles with respect and intention. Halal matching starts here.",
        icon: "compass" as const,
      },
      {
        title: "Matches",
        description:
          "View mutual interests and connections made with purpose.",
        icon: "heart" as const,
      },
      {
        title: "Messages",
        description:
          "Chat respectfully with your matches in a safe, moderated space.",
        icon: "message" as const,
      },
      {
        title: "Profile",
        description:
          "Present yourself sincerely. Your story, shared with intention.",
        icon: "user" as const,
      },
    ],
  },
  howItWorks: {
    title: "Your Journey, Step by Step",
    subtitle: "A calm, intentional path from profile to connection.",
    steps: [
      {
        number: "01",
        title: "Create Your Profile",
        description:
          "Share who you are with sincerity. Build a profile that reflects your values and marriage intentions.",
      },
      {
        number: "02",
        title: "Discover with Intention",
        description:
          "Browse compatible profiles respectfully. Every interaction is guided by halal principles.",
      },
      {
        number: "03",
        title: "Connect Respectfully",
        description:
          "When interest is mutual, begin a conversation in a safe, moderated environment.",
      },
    ],
  },
  cta: {
    title: "Begin Your Story Today",
    description:
      "Join Muslims who believe that the most beautiful connections are woven with patience, respect, and faith.",
    button: "Download Ghazl",
  },
};

export const aboutContent = {
  title: "About Ghazl",
  subtitle: "Where two paths become one beautiful story.",
  mission: {
    title: "Our Mission",
    paragraphs: [
      "Ghazl was created for Muslims who seek marriage — not entertainment, not casual connection, but a sincere step toward nikah.",
      "We believe that finding a life partner should be approached with the same grace and intention as the bond itself. Two threads, woven together with patience, respect, and faith.",
      "Our name, Ghazl (غَزْل), evokes the delicate art of weaving — each thread distinct, yet together forming something beautiful and enduring.",
    ],
  },
  story: {
    title: "The Story Behind the Logo",
    paragraphs: [
      "Our mark represents two paths gracefully intersecting — two souls whose journeys converge in a unified, elegant bond.",
      "The flowing ribbons mirror calligraphic strokes, honoring the beauty of Arabic tradition while speaking a modern language of connection.",
      "The gradient from deep purple to warm rose gold reflects dedication and approachable warmth — the balance we strive for in every interaction on Ghazl.",
    ],
  },
  values: {
    title: "What We Stand For",
    items: [
      {
        title: "Sincerity",
        description:
          "Every profile, every message, every match is rooted in genuine marriage intent.",
      },
      {
        title: "Privacy",
        description:
          "Your personal information is protected. You control what you share and with whom.",
      },
      {
        title: "Moderation",
        description:
          "Our platform maintains a respectful environment through thoughtful oversight.",
      },
      {
        title: "Islamic Principles",
        description:
          "Ghazl is built on halal values — no casual dating, no inappropriate content.",
      },
    ],
  },
  publisher: {
    eyebrow: "Developed by",
    description: `Ghazl is published by ${SITE.publisher} (${SITE.bundleId}). We are committed to building technology that serves the Muslim community with integrity.`,
  },
};

export const downloadContent = {
  title: "Download Ghazl",
  subtitle: "Available on iOS and Android. Your journey begins with a single tap.",
  comingSoon: "App store links coming soon",
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Can I use Ghazl for free?",
        answer:
          "Yes. The Free tier includes profile creation, limited daily discovers, basic matching, and respectful messaging. Premium unlocks additional features when you're ready.",
      },
      {
        question: "How do I cancel Premium?",
        answer:
          "You can cancel your subscription at any time through your App Store or Google Play account settings. Your Premium features remain active until the end of the billing period.",
      },
      {
        question: "Is Ghazl halal?",
        answer:
          "Ghazl is designed exclusively for Muslims seeking marriage. We do not support casual dating, and our community guidelines enforce respectful, intentional interactions.",
      },
      {
        question: "When will the app be available?",
        answer:
          "Ghazl is launching soon on iOS and Android. Check back here for store links, or contact us at info@intellibud.org for updates.",
      },
    ],
  },
};

export const supportContent = {
  title: "We're Here to Help",
  subtitle:
    "Questions about your account, matching, or privacy? Reach out — we respond with care.",
  contact: {
    title: "Contact Us",
    email: SITE.supportEmail,
    responseTime: "We aim to respond within 48 hours.",
  },
  faq: {
    title: "Help Topics",
    categories: [
      {
        name: "Account",
        items: [
          {
            question: "How do I create an account?",
            answer:
              "Download Ghazl and sign up with Google or email. Complete your profile with sincerity to begin discovering matches.",
          },
          {
            question: "How do I delete my account?",
            answer:
              "Go to Profile > Settings > Delete Account, or email us at info@intellibud.org and we will process your request.",
          },
        ],
      },
      {
        name: "Matching",
        items: [
          {
            question: "How does matching work?",
            answer:
              "When you and another user express mutual interest, you become a match and can begin messaging respectfully.",
          },
          {
            question: "Can I filter who I see?",
            answer:
              "Premium members have access to advanced filters. Free members browse profiles within their discover limits.",
          },
        ],
      },
      {
        name: "Privacy",
        items: [
          {
            question: "Who can see my photos?",
            answer:
              "You control your privacy settings. Photos are only visible to users you interact with, according to your preferences.",
          },
          {
            question: "Is my data secure?",
            answer:
              "Yes. We use industry-standard encryption and secure cloud infrastructure. See our Privacy Policy for details.",
          },
        ],
      },
      {
        name: "Billing",
        items: [
          {
            question: "How does Premium billing work?",
            answer:
              "Premium is billed monthly through your App Store or Google Play account. You can manage or cancel anytime in your device settings.",
          },
        ],
      },
    ],
  },
};

export const privacyContent = {
  title: "Privacy Policy",
  lastUpdated: "July 17, 2026",
  sections: [
    {
      title: "Introduction",
      content: `This Privacy Policy describes how ${SITE.publisher} ("we," "us," or "our") collects, uses, and protects your information when you use the Ghazl mobile application and website.`,
    },
    {
      title: "Information We Collect",
      content: `We collect information you provide directly:
• Account information (name, email address)
• Profile information (photos, bio, preferences)
• Messages exchanged with matches
• Authentication data when you sign in via Google or email

We also collect limited technical data (device type, app version) to improve our service.`,
    },
    {
      title: "How We Use Your Information",
      content: `We use your information to:
• Provide and improve the Ghazl service
• Facilitate matching and messaging between users
• Maintain platform safety through moderation
• Communicate important updates about your account
• Comply with legal obligations`,
    },
    {
      title: "Data Storage & Security",
      content: `Your data is stored on secure cloud infrastructure (Supabase) with encryption in transit. We implement Row Level Security to ensure users can only access data they are authorized to view. We never log passwords, authentication tokens, or sensitive profile fields.`,
    },
    {
      title: "Photo & Privacy Controls",
      content: `You control what you share on your profile. Privacy settings allow you to manage photo visibility and personal information exposure. We apply the principle of least privilege — your data is accessible only as needed for the service to function.`,
    },
    {
      title: "Third-Party Services",
      content: `We use Google Sign-In for authentication and cloud hosting providers for data storage. These services have their own privacy policies. We do not sell your personal information to third parties.`,
    },
    {
      title: "Your Rights",
      content: `You have the right to:
• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your account and associated data
• Export your data in a portable format

Contact us at ${SITE.supportEmail} to exercise these rights.`,
    },
    {
      title: "Data Retention",
      content: `We retain your data while your account is active. Upon account deletion, we remove your personal information within 30 days, except where retention is required by law.`,
    },
    {
      title: "Children",
      content: `Ghazl is intended for users 18 years and older. We do not knowingly collect information from anyone under 18.`,
    },
    {
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of significant changes through the app or via email.`,
    },
    {
      title: "Contact",
      content: `For privacy-related questions, contact us at ${SITE.supportEmail}.`,
    },
  ],
};

export const termsContent = {
  title: "Terms of Service",
  lastUpdated: "July 17, 2026",
  sections: [
    {
      title: "Acceptance of Terms",
      content: `By accessing or using Ghazl, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.`,
    },
    {
      title: "Eligibility",
      content: `You must be at least 18 years old to use Ghazl. By creating an account, you confirm that you are of legal age and seeking marriage — not casual dating or entertainment.`,
    },
    {
      title: "Account Responsibilities",
      content: `You are responsible for:
• Providing accurate information on your profile
• Maintaining the security of your account credentials
• All activity that occurs under your account
• Notifying us immediately of any unauthorized use`,
    },
    {
      title: "Acceptable Use",
      content: `You agree to use Ghazl respectfully and in accordance with Islamic principles. Prohibited conduct includes:
• Harassment, abuse, or inappropriate language
• Sharing explicit or inappropriate content
• Misrepresenting your identity or intentions
• Using the platform for non-marriage purposes
• Attempting to circumvent moderation or security measures`,
    },
    {
      title: "Content & Moderation",
      content: `We reserve the right to review, remove, or restrict content that violates these terms. We may suspend or terminate accounts that engage in prohibited conduct without prior notice.`,
    },
    {
      title: "Subscriptions & Billing",
      content: `Premium subscriptions are billed monthly through your App Store or Google Play account. Prices may change with notice. Refunds are handled according to the policies of the respective app store. You may cancel your subscription at any time through your device settings.`,
    },
    {
      title: "Intellectual Property",
      content: `All content, branding, and technology associated with Ghazl are owned by ${SITE.publisher}. You may not copy, modify, or distribute our materials without written permission.`,
    },
    {
      title: "Disclaimer",
      content: `Ghazl is a platform to facilitate connections. We do not guarantee matches, compatibility, or marriage outcomes. Users interact at their own discretion and responsibility.`,
    },
    {
      title: "Limitation of Liability",
      content: `To the fullest extent permitted by law, ${SITE.publisher} shall not be liable for any indirect, incidental, or consequential damages arising from your use of Ghazl.`,
    },
    {
      title: "Termination",
      content: `We may terminate or suspend your account at any time for violations of these terms. You may delete your account at any time through the app or by contacting ${SITE.supportEmail}.`,
    },
    {
      title: "Governing Law",
      content: `These terms shall be governed by applicable law. Any disputes shall be resolved through good-faith negotiation before pursuing formal proceedings.`,
    },
    {
      title: "Contact",
      content: `For questions about these terms, contact us at ${SITE.supportEmail}.`,
    },
  ],
};
