export type WaliField = { label: string; value: string };

export type WaliSection = {
  id: string;
  title: string;
  subtitle: string;
  tone: "sage" | "lavender" | "butter" | "peach" | "periwinkle" | "rose" | "ivory";
  fields: WaliField[];
  chips: string[];
  paragraphs: WaliField[];
  traits: Array<{ label: string; value: number }>;
};

export type WaliDiscoverCard = {
  displayName: string;
  caste: string | null;
  metaLine: string | null;
  careerLine: string | null;
  salahLabel: string | null;
  madhhabLabel: string | null;
  pills: string[];
  photoUrl: string | null;
  galleryUrls: string[];
  verified: boolean;
  initial: string;
};

type ProfileJson = Record<string, unknown>;

const SALAH_LABELS: Record<string, string> = {
  "Five Daily Prayers": "Five daily prayers",
  "Mostly Pray": "Mostly consistent in prayer",
  Occasionally: "Occasional prayer",
  Rarely: "Rare prayer",
  "Never Prays": "Does not pray",
};

const HOUSEHOLD_LABELS: Record<string, string> = {
  "Husband Provides": "Husband provides, wife runs the home",
  Shared: "Shared — both may work",
  Flexible: "Flexible — decide together",
};

const BUSINESS_STATUSES = new Set([
  "Self-employed / Business",
  "Self-employed",
  "Business Owner",
]);

const TRAITS: Array<{ key: string; label: string }> = [
  { key: "personality_calm", label: "Calm" },
  { key: "personality_funny", label: "Funny" },
  { key: "personality_emotional", label: "Emotional" },
  { key: "personality_ambitious", label: "Ambitious" },
  { key: "personality_family_oriented", label: "Family-focused" },
];

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function list(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function joined(value: unknown): string | null {
  const items = list(value);
  return items.length > 0 ? items.join(", ") : null;
}

function orJoined(value: unknown): string | null {
  const items = list(value);
  return items.length > 0 ? items.join(" or ") : null;
}

function yesOnly(value: unknown): string | null {
  return value === true ? "Yes" : null;
}

function ageFromIso(iso: string | null): number | null {
  if (!iso) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return null;
  const birth = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age >= 0 ? age : null;
}

function formatDob(iso: string | null): string | null {
  if (!iso) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatHeight(value: unknown): string | null {
  const cm = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(cm) || cm <= 0) return null;
  const totalInches = Math.round(cm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}′ ${inches}″`;
}

function formatWeight(value: unknown): string | null {
  const kg = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(kg) || kg <= 0) return null;
  return `${kg} kg`;
}

function personalityLabel(value: unknown): string | null {
  const raw = text(value);
  if (!raw) return null;
  if (raw === "Ambivert" || raw === "Both") return "Introvert + Extrovert";
  return raw;
}

export function publicAvatarUrl(
  supabaseUrl: string,
  path: string | null,
): string | null {
  if (!path || !supabaseUrl) return null;
  const base = supabaseUrl.replace(/\/+$/, "");
  const cleaned = path.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/user-avatars/${cleaned}`;
}

function photoUrl(profile: ProfileJson, supabaseUrl: string): string | null {
  const path = text(profile.avatar_path);
  if (path) return publicAvatarUrl(supabaseUrl, path);
  const url = text(profile.avatar_url);
  if (url && url.startsWith("http") && !url.includes("/storage/v1/object/")) return url;
  return null;
}

function fields(
  entries: Array<{ label: string; value: string | null }>,
): WaliField[] {
  return entries.filter((entry): entry is WaliField => Boolean(entry.value));
}

function section(
  input: Omit<WaliSection, "fields" | "chips" | "paragraphs" | "traits"> & {
    fields?: WaliField[];
    chips?: string[];
    paragraphs?: WaliField[];
    traits?: WaliSection["traits"];
  },
): WaliSection | null {
  const fieldsList = input.fields ?? [];
  const chips = input.chips ?? [];
  const paragraphs = input.paragraphs ?? [];
  const traits = input.traits ?? [];
  if (
    fieldsList.length === 0 &&
    chips.length === 0 &&
    paragraphs.length === 0 &&
    traits.length === 0
  ) {
    return null;
  }
  return {
    id: input.id,
    title: input.title,
    subtitle: input.subtitle,
    tone: input.tone,
    fields: fieldsList,
    chips,
    paragraphs,
    traits,
  };
}

export function buildWaliDiscoverCard(
  profile: ProfileJson | null,
  fallbackName: string,
  supabaseUrl: string,
): WaliDiscoverCard {
  const source = profile ?? {};
  const displayName =
    text(source.preferred_display_name) ||
    text(source.first_name) ||
    fallbackName ||
    "Suitor";
  const age = ageFromIso(text(source.date_of_birth));
  const location = [text(source.city), text(source.country)].filter(Boolean);
  const status = text(source.employment_status);
  const occupation = text(source.occupation);
  const business = text(source.business_type);
  const careerLine = status && BUSINESS_STATUSES.has(status)
    ? [business || occupation, status].filter(Boolean).join(" · ")
    : [occupation, status].filter(Boolean).join(" · ") || null;

  const pills = [
    text(source.marital_status),
    text(source.marriage_timeline),
    text(source.muslim_background),
  ].filter((pill): pill is string => Boolean(pill)).slice(0, 3);

  const galleryUrls = list(source.gallery_paths)
    .slice(0, 6)
    .map((path) => publicAvatarUrl(supabaseUrl, path))
    .filter((url): url is string => Boolean(url));

  const salah = text(source.salah);

  return {
    displayName,
    caste: text(source.family_caste),
    metaLine: [age != null ? String(age) : null, ...location]
      .filter(Boolean)
      .join(" · ") || null,
    careerLine,
    salahLabel: salah ? SALAH_LABELS[salah] ?? salah : null,
    madhhabLabel: text(source.madhhab),
    pills,
    photoUrl: photoUrl(source, supabaseUrl),
    galleryUrls,
    verified: source.is_verified === true,
    initial: displayName.slice(0, 1).toUpperCase(),
  };
}

export function buildWaliProfileSections(profile: ProfileJson | null): WaliSection[] {
  if (!profile) return [];
  const isWoman = profile.gender === "woman";
  const pronoun = isWoman ? "Her" : "His";
  const place = isWoman ? "she is" : "he is";

  const about = [
    { label: `${pronoun} Goals`, key: "about_my_goals" },
    { label: `What Makes ${pronoun === "Her" ? "Her" : "Him"} Happy`, key: "about_what_makes_me_happy" },
    { label: "Daily Routine", key: "about_daily_routine" },
    { label: `${pronoun} Strengths`, key: "about_my_strengths" },
    { label: `${pronoun} Weaknesses`, key: "about_my_weaknesses" },
    { label: `${pronoun} Islamic Journey`, key: "about_islamic_journey" },
  ]
    .map((item) => {
      const value = text(profile[item.key]);
      return value ? { label: item.label, value } : null;
    })
    .filter((item): item is WaliField => item !== null);

  const dealBreakers = list(profile.deal_breakers);
  const ideal = text(profile.ideal_spouse_description);

  const built = [
    section({
      id: "location",
      title: "Location",
      subtitle: `Where ${place} based`,
      tone: "periwinkle",
      fields: fields([
        { label: "Nationality", value: text(profile.nationality) },
        { label: "City", value: text(profile.city) },
        { label: "Province / State", value: text(profile.province_state) },
        { label: "Country of Residence", value: text(profile.country) },
        { label: "Willing to Relocate", value: yesOnly(profile.willing_to_relocate) },
      ]),
    }),
    section({
      id: "about",
      title: "About",
      subtitle: `In ${isWoman ? "her" : "his"} own words`,
      tone: "ivory",
      paragraphs: about,
    }),
    section({
      id: "ideal-spouse",
      title: ideal && dealBreakers.length > 0
        ? "Ideal Spouse & Deal Breakers"
        : ideal
          ? "Ideal Spouse"
          : "Deal Breakers",
      subtitle: ideal
        ? `What ${isWoman ? "she" : "he"} seeks`
        : `What ${isWoman ? "she" : "he"} won’t compromise on`,
      tone: "rose",
      paragraphs: ideal ? [{ label: "Ideal Spouse", value: ideal }] : [],
      chips: dealBreakers,
    }),
    section({
      id: "basics",
      title: "Basic Information",
      subtitle: "Identity and personal details",
      tone: "sage",
      fields: fields([
        { label: "First Name", value: text(profile.first_name) },
        { label: "Last Name", value: text(profile.last_name) },
        { label: "Date of Birth", value: formatDob(text(profile.date_of_birth)) },
        { label: "Height", value: formatHeight(profile.height) },
        { label: "Weight", value: formatWeight(profile.weight) },
        { label: "Blood Group", value: text(profile.blood_group) },
        { label: "Ethnicity", value: text(profile.ethnicity) },
        { label: "Caste / Clan", value: text(profile.family_caste) },
        { label: "Native Language", value: text(profile.native_language) },
        { label: "Other Languages", value: joined(profile.other_languages) },
        { label: "Marital Status", value: text(profile.marital_status) },
        { label: "Children", value: text(profile.children) },
      ]),
    }),
    section({
      id: "islamic-practice",
      title: "Islamic Practice",
      subtitle: "Faith and knowledge",
      tone: "butter",
      fields: fields([
        { label: "Background", value: text(profile.muslim_background) },
        { label: "Salah", value: text(profile.salah) },
        { label: "Fajr", value: text(profile.fajr_prayer) },
        ...(isWoman ? [] : [{ label: "Masjid", value: text(profile.masjid_attendance) }]),
        { label: "Knowledge", value: text(profile.islamic_knowledge_level) },
        { label: "Madhhab", value: text(profile.madhhab) },
        { label: "Aqeedah", value: text(profile.aqeedah) },
      ]),
      chips: [...list(profile.quran), ...list(profile.islamic_activities)],
    }),
    section({
      id: "habits",
      title: "Habits",
      subtitle: "Entertainment and daily choices",
      tone: "peach",
      fields: fields([
        { label: "Music", value: text(profile.music) },
        { label: "Movies", value: text(profile.movies) },
        { label: "Smoking", value: text(profile.smoking_vaping) },
        { label: "Alcohol", value: text(profile.alcohol) },
        { label: "Diet", value: text(profile.diet_type) },
      ]),
    }),
    isWoman
      ? section({
          id: "gender-practice",
          title: "Hijab & Guardian",
          subtitle: "Modesty practice and family involvement",
          tone: "rose",
          fields: fields([
            { label: "Hijab", value: joined(profile.hijab_status) },
            { label: "Wali Relationship", value: text(profile.wali_relationship) },
            { label: "Wali Involvement", value: text(profile.wali_involvement_preference) },
          ]),
        })
      : section({
          id: "gender-practice",
          title: "Beard & Masjid",
          subtitle: "Appearance and congregation",
          tone: "periwinkle",
          fields: fields([
            { label: "Beard", value: text(profile.beard_status) },
            { label: "Masjid Attendance", value: text(profile.masjid_attendance) },
          ]),
        }),
    section({
      id: "marriage",
      title: "Marriage Preferences",
      subtitle: "Intentions, timeline, and arrangements",
      tone: "lavender",
      fields: fields([
        { label: "Looking For", value: text(profile.looking_for) },
        { label: "Marriage Timeline", value: text(profile.marriage_timeline) },
        ...(isWoman
          ? [{ label: "Family Involvement", value: text(profile.wali_involvement_preference) }]
          : [{ label: "Hijab Preferences", value: orJoined(profile.hijab_status) }]),
        { label: "Wedding Type", value: text(profile.wedding_type) },
        { label: "Living Arrangement", value: text(profile.living_arrangement) },
        {
          label: "Household Rules",
          value: (() => {
            const raw = text(profile.household_rules);
            return raw ? HOUSEHOLD_LABELS[raw] ?? raw : null;
          })(),
        },
      ]),
    }),
    section({
      id: "education-career",
      title: "Education & Career",
      subtitle: "Academic and professional background",
      tone: "sage",
      fields: fields([
        { label: "Highest Education", value: text(profile.highest_education) },
        { label: "Institute", value: text(profile.education_institute) },
        {
          label: "Graduation Year",
          value: profile.graduation_year != null ? String(profile.graduation_year) : null,
        },
        { label: "Field of Study", value: text(profile.education_field) },
        { label: "Religious Education", value: text(profile.religious_education) },
        { label: "Occupation", value: text(profile.occupation) },
        { label: "Company", value: text(profile.company) },
        { label: "Industry", value: text(profile.industry) },
        { label: "Business Type", value: text(profile.business_type) },
        { label: "Employment Status", value: text(profile.employment_status) },
        { label: "Annual Income", value: text(profile.annual_income_range) },
        { label: "Financial Stability", value: text(profile.financial_stability) },
        { label: "Work Hours", value: text(profile.work_hours) },
      ]),
    }),
    section({
      id: "family",
      title: "Family Background",
      subtitle: "Parents, siblings, and family values",
      tone: "butter",
      fields: fields([
        { label: "Father's Occupation", value: text(profile.father_occupation) },
        { label: "Mother's Occupation", value: text(profile.mother_occupation) },
        {
          label: "Brothers",
          value: profile.siblings_brothers != null ? String(profile.siblings_brothers) : null,
        },
        {
          label: "Sisters",
          value: profile.siblings_sisters != null ? String(profile.siblings_sisters) : null,
        },
        { label: "Birth Order", value: text(profile.birth_order) },
        { label: "Family Religiousness", value: text(profile.family_religiousness) },
        { label: "Family Values", value: text(profile.family_values) },
        { label: "Family Residence", value: text(profile.family_residence) },
      ]),
    }),
    section({
      id: "lifestyle",
      title: "Lifestyle",
      subtitle: "Routine, wellness, and interests",
      tone: "peach",
      fields: fields([
        { label: "Personality Type", value: personalityLabel(profile.personality_type) },
        { label: "Sleep Schedule", value: text(profile.sleep_schedule) },
        { label: "Fitness Level", value: text(profile.fitness_level) },
        { label: "Pets", value: text(profile.pets) },
        { label: "Travel Frequency", value: text(profile.travel_frequency) },
        { label: "Cooking Skills", value: text(profile.cooking_skills) },
        { label: "Reading Habits", value: text(profile.reading_habits) },
        { label: "Outdoor Activities", value: text(profile.outdoor_activities) },
      ]),
      chips: list(profile.interests),
    }),
    section({
      id: "personality",
      title: "Personality Traits",
      subtitle: "Self-rated qualities from 1 to 10",
      tone: "lavender",
      traits: TRAITS.map((trait) => {
        const value = profile[trait.key];
        return typeof value === "number" && value > 0 && value !== 5
          ? { label: trait.label, value }
          : null;
      }).filter((trait): trait is { label: string; value: number } => trait !== null),
    }),
    section({
      id: "health",
      title: "Health & Wellbeing",
      subtitle: "Shared in confidence",
      tone: "ivory",
      fields: fields([
        { label: "General Health", value: text(profile.general_health) },
        { label: "Disabilities", value: text(profile.disabilities) },
        { label: "Chronic Illness", value: text(profile.chronic_illness) },
        { label: "Allergies", value: text(profile.allergies) },
        { label: "Mental Health", value: text(profile.mental_health) },
        { label: "Genetic Conditions", value: text(profile.genetic_conditions) },
      ]),
    }),
  ];

  return built.filter((item): item is WaliSection => item !== null);
}

export const SECTION_TONES: Record<WaliSection["tone"], string> = {
  sage: "#D8E6CC",
  lavender: "#E0D9F0",
  butter: "#F3EBB8",
  peach: "#F0DFD0",
  periwinkle: "#E2E5EC",
  rose: "#F0D5D7",
  ivory: "#FFFCF8",
};
