export const DUMMY_CATEGORIES = [
  { id: 1, name: 'Phishing & Fraud Detection', slug: 'phishing-fraud-detection' },
  { id: 2, name: 'UPI & Digital Payment Safety', slug: 'upi-payment-safety' },
  { id: 3, name: 'Password Hygiene & Data Privacy', slug: 'password-hygiene-privacy' },
  { id: 4, name: 'Children & Adolescent Safety', slug: 'children-adolescent-safety' },
  { id: 5, name: 'Cyber Ethics & Responsible Internet', slug: 'cyber-ethics-responsibility' }
];

export const DUMMY_ARTICLES = [
  {
    id: 1,
    title: 'The Golden Rule of UPI: Entering Your PIN Means Sending Money, Never Receiving It',
    slug: 'golden-rule-of-upi-pin-scams',
    summary: 'Fraudsters frequently create fake buyer listings on OLX and send QR codes claiming you must scan and enter your PIN to receive money.',
    content: `### The Deceptive QR Code & PIN Scam Explained

Many community members, especially senior citizens and students selling used books or electronics online, fall victim to this widespread scam. Fraudsters pose as eager buyers and claim they want to pay an advance via UPI.

#### How Fraudsters Operate:
- They contact you on marketplace platforms and agree to buy without bargaining.
- They send a screenshot or QR code on WhatsApp saying: "Please scan this QR code and enter your UPI PIN to claim ₹2,500."
- The moment you input your 4 or 6-digit UPI PIN, money is debited from your bank account, not credited.

#### Crucial Facts to Remember:
- Receiving money via UPI never requires entering your UPI PIN.
- Scanning a QR code is exclusively for sending money or approving payments.
- Never approve collect requests received from unknown VPA handles.`,
    threatLevel: 'CRITICAL',
    published: true,
    categoryId: 2,
    categoryName: 'UPI & Digital Payment Safety',
    authorName: 'CyberSafe Administrator',
    publishedAt: '2026-10-28T10:00:00'
  },
  {
    id: 2,
    title: 'Spotting Phishing Emails and SMS (Smishing) Before Clicking',
    slug: 'spotting-phishing-emails-sms',
    summary: 'Analyze real examples of fake bank KYC alerts, electricity bill suspension notices, and suspicious parcel delivery links.',
    content: `### How to Recognize Deceptive Digital Traps

Phishing attacks rely on creating urgent panic or excitement to make victims act without critical thinking.

#### Common Red Flags:
- Artificial Urgency: "Your electricity will be disconnected tonight at 9:30 PM due to unpaid bills. Call this officer immediately."
- Mismatched Sender Domains: An email pretending to be from your bank originating from @gmail.com or @support-bank-alert.xyz instead of official bank domains.
- Grammar & Salutation Errors: Generic greetings such as "Dear Customer" instead of your registered name.
- Unsolicited APK Attachments: Fraudsters asking you to download .apk files on Android to "update KYC".

#### Prevention Steps:
- Never click links in unexpected SMS messages.
- Always visit the official website directly by typing the URL in your browser.
- Verify helpline numbers only on official bank statements or behind debit cards.`,
    threatLevel: 'HIGH',
    published: true,
    categoryId: 1,
    categoryName: 'Phishing & Fraud Detection',
    authorName: 'CyberSafe Administrator',
    publishedAt: '2026-10-29T11:30:00'
  },
  {
    id: 3,
    title: 'Creating Uncrackable Passwords and Enabling Two-Factor Authentication (2FA)',
    slug: 'creating-strong-passwords-2fa',
    summary: 'Why passwords like "India@123" are vulnerable to credential stuffing, and how passphrases combined with 2FA protect your identity.',
    content: `### The Science of Strong Password Hygiene

Using the same password across college portals, social media, and banking is one of the highest cyber security risks.

#### The Anatomy of a Secure Passphrase:
- Instead of short, hard-to-remember strings like P@$$w0rd, use 4-5 random words: Bicycle#Mango*Thunder49.
- Length beats complexity: A 16-character passphrase takes billions of years to crack with brute-force dictionary tools.
- Never save passwords in plain text on WhatsApp or sticky notes.

#### The Power of Two-Factor Authentication (2FA):
- Even if a hacker steals your password, 2FA prevents them from accessing your account without your secondary device or authenticator app.
- Always enable 2FA on Google, Instagram, WhatsApp, and financial accounts.`,
    threatLevel: 'MEDIUM',
    published: true,
    categoryId: 3,
    categoryName: 'Password Hygiene & Data Privacy',
    authorName: 'CyberSafe Administrator',
    publishedAt: '2026-10-30T09:15:00'
  },
  {
    id: 4,
    title: 'Protecting Children and Adolescents from Cyberbullying and Online Gaming Predators',
    slug: 'protecting-children-online-safety',
    summary: 'Guidance for parents and young adolescents on navigating multiplayer gaming lobbies, chat apps, and social sharing safely without exposing personal identities.',
    content: `### Creating Safe Digital Havens for Young Students

With digital classrooms and interactive multiplayer gaming, young students spend hours online daily, making proactive cyber safety vital.

#### 1. Recognizing and Responding to Cyberbullying:
- Never delete offensive or threatening messages immediately; take full-screen screenshots showing timestamps and usernames as proof.
- Do not retaliate or engage in arguments; bullies thrive on emotional reactions.
- Utilize platform block and report features immediately to restrict toxic accounts.
- Talk to a trusted parent, teacher, or elder without fear of losing internet privileges.

#### 2. Multiplayer Gaming & Chat Room Safety:
- Never disclose real names, birthdates, school names, home addresses, or phone numbers in gaming lobbies.
- Choose anonymous gamertags that reveal no demographic clues (e.g., use "CyberPhoenix88" instead of "Rahul_Delhi_2011").
- Never turn on webcams or participate in private video chats with strangers encountered in gaming groups.
- Beware of fake "Free In-Game Currency & Skins" links; they are designed to steal gaming accounts or install spyware.

#### 3. Healthy Screen Time and Digital Well-being:
- Establish screen-free zones during study hours and family dinners.
- Keep gaming consoles and laptops in shared living spaces rather than isolated bedrooms.`,
    threatLevel: 'HIGH',
    published: true,
    categoryId: 4,
    categoryName: 'Children & Adolescent Safety',
    authorName: 'CyberSafe Administrator',
    publishedAt: '2026-10-30T14:20:00'
  },
  {
    id: 5,
    title: 'Social Media Pressures, Digital Footprints, and Teen Privacy Protection',
    slug: 'teen-privacy-social-media-digital-footprints',
    summary: 'How adolescents can safeguard their long-term digital footprint, resist peer pressure online, and configure strict privacy controls on Instagram, Snapchat, and Discord.',
    content: `### The Permanence of Your Digital Footprint

What gets posted online can stay archived forever. Colleges, scholarship committees, and future employers increasingly review public social media footprints.

#### 1. Managing Your Online Presence:
- The "Billboard Test": Before publishing any photo, story, or comment, ask yourself if you would be comfortable seeing it displayed on a highway billboard in front of family and teachers.
- Beware of "Disappearing Media" Illusions: Ephemeral stories and vanishing photos can easily be recorded by screenshots or secondary cameras.
- Disable Geolocation Tagging: Turn off auto-tagging of precise GPS locations on photos, stories, and check-ins to prevent physical tracking.

#### 2. Safeguarding Against Private Photo Extortion:
- Never share private or compromising photographs with anyone online, regardless of emotional promises or peer pressure.
- If threatened or blackmailed, do not pay money or comply with demands.
- Immediately inform trusted adults and lodge a complaint on the National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in).`,
    threatLevel: 'MEDIUM',
    published: true,
    categoryId: 4,
    categoryName: 'Children & Adolescent Safety',
    authorName: 'CyberSafe Administrator',
    publishedAt: '2026-10-31T08:45:00'
  },
  {
    id: 6,
    title: 'Cyber Ethics, Digital Citizenship, and Legal Awareness under the IT Act',
    slug: 'cyber-ethics-digital-citizenship-it-act',
    summary: 'Understanding legal responsibilities under India\'s Information Technology (IT) Act, intellectual property respect, and cultivating constructive digital citizenship.',
    content: `### Cultivating Responsible Digital Citizenship

Just as physical communities have civic duties and traffic laws, the digital world demands ethical conduct, empathy, and respect for legal frameworks.

#### 1. Key Provisions of the Information Technology (IT) Act, 2000:
- Section 66C (Identity Theft): Fraudulently using another person\'s password, digital signature, or identification is punishable by up to 3 years imprisonment.
- Section 66D (Cheating by Personation): Creating fake social media profiles to deceive or impersonate others carries severe criminal penalties.
- Section 67 (Publishing Obscene Content): Transmitting sexually explicit or abusive material electronically is strictly prohibited under federal law.

#### 2. Digital Etiquette (Netiquette) and Intellectual Property:
- Respect Copyright and Attribution: Plagiarizing online essays, pirating licensed software, or using creators\' digital artwork without attribution breaches ethical standards.
- Constructive Communication: Avoid online dogpiling, hate speech, and derogatory comments in forums and public discussion threads.
- Respect Others\' Digital Boundaries: Never share private conversations, group chats, or candid photos without explicit mutual consent.`,
    threatLevel: 'MEDIUM',
    published: true,
    categoryId: 5,
    categoryName: 'Cyber Ethics & Responsible Internet',
    authorName: 'CyberSafe Administrator',
    publishedAt: '2026-10-31T11:00:00'
  },
  {
    id: 7,
    title: 'Combatting Fake News, Deepfakes, and Misinformation on Social Messaging Platforms',
    slug: 'combatting-fake-news-misinformation-deepfakes',
    summary: 'A practical guide to fact-checking viral forwards, recognizing AI-generated deepfakes, and preventing the dangerous spread of rumors on WhatsApp and Telegram.',
    content: `### The Viral Menace of Disinformation and Synthetic Media

Misinformation spreads 6 times faster than truthful reporting on social networks. As responsible internet users, verifying information before forwarding is a fundamental ethical duty.

#### 1. How to Spot Fabricated News and Scams:
- Sensationalized Headlines and Clickbait: Beware of emotional manipulation such as "Forward to 10 friends immediately or your account will be shut down!"
- Verify with Reliable Fact-Checkers: Check suspicious claims with government PIB Fact Check, Alt News, or Boom Live before broadcasting to family groups.
- Look for Original Sources: Genuine news articles include verified publication dates, author names, and direct links to official statements or gazettes.

#### 2. Identifying AI Deepfakes and Manipulated Audio:
- Scammers now use artificial intelligence voice clones to impersonate family members claiming an urgent accident or emergency bail requirement.
- Safety Protocol: Always establish a family "Safe Word" or hang up and call back the person directly on their known phone number before sending emergency funds.`,
    threatLevel: 'HIGH',
    published: true,
    categoryId: 5,
    categoryName: 'Cyber Ethics & Responsible Internet',
    authorName: 'CyberSafe Administrator',
    publishedAt: '2026-10-31T13:15:00'
  }
];

