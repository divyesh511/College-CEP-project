-- =============================================================================
-- CyberSafe Community – Sample Seed Data
-- Passwords:
-- Admin: Admin@123 -> $2a$10$3e8tGq5tQ3Xq1E6X2pY4O.W0vJvjK8L4yD9zZ2xX3c4v5b6n7m8a
-- User:  User@123  -> $2a$10$7p1zX8yW9vU0tS1rQ2pP3.k6e4d5c6b7a8Z9yX0wV1uT2sR3qP4o
-- Note: Spring Boot DataInitializer also checks and verifies defaults upon launch!
-- =============================================================================

USE `cybersafe_community`;

-- 1. Seed Roles
INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'ROLE_ADMIN', 'System Administrator with full management and moderation capabilities'),
(2, 'ROLE_USER', 'Standard community member with access to quizzes, resources, and helpdesk')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 2. Seed Default Accounts
-- Passwords both default to: Password@123 ($2a$10$fV3M4K8S2g9V3O1xN.w/e.iR9D6nL4lqX6P5eB6o7u0m5o9eY5v1y)
INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `phone`, `active`, `created_at`) VALUES
(1, 'CyberSafe Admin', 'admin@cybersafe.org', '$2a$10$e8wVfT5M4Wc2k7K8r9h3tO1u6a3Z9v0X7m1L4p3Q8k5S9t6V1a2b3', '+91 9876543210', TRUE, NOW()),
(2, 'Aarav Sharma (Student)', 'aarav@community.org', '$2a$10$e8wVfT5M4Wc2k7K8r9h3tO1u6a3Z9v0X7m1L4p3Q8k5S9t6V1a2b3', '+91 9876543211', TRUE, NOW()),
(3, 'Sunita Devi (Senior Citizen)', 'sunita@community.org', '$2a$10$e8wVfT5M4Wc2k7K8r9h3tO1u6a3Z9v0X7m1L4p3Q8k5S9t6V1a2b3', '+91 9876543212', TRUE, NOW())
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`);

-- 3. Assign User Roles
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1), -- Admin gets ROLE_ADMIN
(1, 2), -- Admin gets ROLE_USER
(2, 2), -- Aarav gets ROLE_USER
(3, 2)  -- Sunita gets ROLE_USER
ON DUPLICATE KEY UPDATE `role_id` = VALUES(`role_id`);

-- 4. Seed CEP Topics as Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `icon_class`, `created_at`) VALUES
(1, 'Phishing & Fraud Detection', 'phishing-fraud-detection', 'Learn to identify deceptive emails, SMS smishing, voice vishing, and lottery scams.', 'bi-envelope-exclamation', NOW()),
(2, 'UPI & Digital Payment Safety', 'upi-payment-safety', 'Essential guidelines for secure Google Pay, PhonePe, Paytm, and net-banking transactions.', 'bi-credit-card-2-front', NOW()),
(3, 'Password Hygiene & Data Privacy', 'password-hygiene-privacy', 'Best practices for multi-factor authentication, strong passphrases, and social privacy.', 'bi-key', NOW()),
(4, 'Children & Adolescent Safety', 'children-adolescent-safety', 'Protective tips on cyberbullying, predatory gaming chats, and screen time ethics.', 'bi-person-heart', NOW()),
(5, 'Cyber Ethics & Responsible Internet', 'cyber-ethics-responsibility', 'Digital citizenship, legal awareness under the IT Act, and avoiding spreading fake news.', 'bi-shield-check', NOW())
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 5. Seed Educational Articles
INSERT INTO `articles` (`id`, `title`, `slug`, `summary`, `content`, `threat_level`, `published`, `category_id`, `author_id`, `published_at`, `created_at`) VALUES
(1, 
 'The Golden Rule of UPI: Entering Your PIN Means Sending Money, Never Receiving It',
 'golden-rule-of-upi-pin-scams',
 'Fraudsters frequently create fake buyer listings on OLX and send QR codes claiming you must scan and enter your PIN to receive money.',
 '### The Deceptive QR Code & PIN Scam Explained\n\nMany community members, especially senior citizens and students selling used books or electronics online, fall victim to this widespread scam. Fraudsters pose as eager buyers and claim they want to pay an advance via UPI.\n\n#### How Fraudsters Operate:\n1. They contact you on marketplace platforms and agree to buy without bargaining.\n2. They send a screenshot or QR code on WhatsApp saying: *"Please scan this QR code and enter your UPI PIN to claim ₹2,500."*\n3. The moment you input your 4 or 6-digit UPI PIN, money is **debited from your bank account**, not credited.\n\n#### Crucial Facts to Remember:\n- **Receiving money via UPI never requires entering your UPI PIN.**\n- **Scanning a QR code is exclusively for sending money or approving payments.**\n- Never approve collect requests received from unknown VPA handles.',
 'CRITICAL', TRUE, 2, 1, NOW(), NOW()),

(2,
 'Spotting Phishing Emails and SMS (Smishing) Before Clicking',
 'spotting-phishing-emails-sms',
 'Analyze real examples of fake bank KYC alerts, electricity bill suspension notices, and suspicious parcel delivery links.',
 '### How to Recognize Deceptive Digital Traps\n\nPhishing attacks rely on creating urgent panic or excitement to make victims act without critical thinking.\n\n#### Common Red Flags:\n- **Artificial Urgency:** *"Your electricity will be disconnected tonight at 9:30 PM due to unpaid bills. Call this officer immediately."*\n- **Mismatched Sender Domains:** An email pretending to be from your bank originating from `@gmail.com` or `@support-bank-alert.xyz` instead of official bank domains.\n- **Grammar & Salutation Errors:** Generic greetings such as *"Dear Customer"* instead of your registered name.\n- **Unsolicited APK Attachments:** Fraudsters asking you to download `.apk` files on Android to "update KYC".\n\n#### Prevention Steps:\n- Never click links in unexpected SMS messages.\n- Always visit the official website directly by typing the URL in your browser.\n- Verify helpline numbers only on official bank statements or behind debit cards.',
 'HIGH', TRUE, 1, 1, NOW(), NOW()),

(3,
 'Creating Uncrackable Passwords and Enabling Two-Factor Authentication (2FA)',
 'creating-strong-passwords-2fa',
 'Why passwords like "India@123" are vulnerable to credential stuffing, and how passphrases combined with 2FA protect your identity.',
 '### The Science of Strong Password Hygiene\n\nUsing the same password across college portals, social media, and banking is one of the highest cyber security risks.\n\n#### The Anatomy of a Secure Passphrase:\n- Instead of short, hard-to-remember strings like `P@$$w0rd`, use 4-5 random words: `Bicycle#Mango*Thunder49`.\n- Length beats complexity: A 16-character passphrase takes billions of years to crack with brute-force dictionary tools.\n- Never save passwords in plain text on WhatsApp or sticky notes.\n\n#### The Power of Two-Factor Authentication (2FA):\nEven if a hacker steals your password, 2FA prevents them from accessing your account without your secondary device or authenticator app. Always enable 2FA on Google, Instagram, WhatsApp, and financial accounts.',
 'MEDIUM', TRUE, 3, 1, NOW(), NOW()),

(4,
 'Protecting Children from Cyberbullying and Online Predators in Gaming',
 'protecting-children-online-safety',
 'Guidance for parents and young adolescents on navigating multiplayer gaming lobbies, chat apps, and social sharing safely.',
 '### Creating Safe Digital Havens for Young Students\n\nWith online classes and interactive multiplayer gaming, young students spend hours online daily.\n\n#### Key Safety Guidelines:\n- **Keep Personal Details Private:** Never disclose school name, home address, age, or phone number in in-game chatrooms.\n- **Screen Name Privacy:** Use gamer handles that do not reveal your real name or birth year (e.g., use `SkyRunner77` instead of `Rohit_2012`).\n- **Recognizing Cyberbullying:** Being repeatedly insulted, excluded, or harassed online is unacceptable. Take screenshots and talk to a trusted parent or teacher immediately.\n- **Webcam Safety:** Never turn on cameras for strangers encountered in gaming forums or chat apps.',
 'HIGH', TRUE, 4, 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- 6. Seed Interactive Quizzes
INSERT INTO `quizzes` (`id`, `title`, `description`, `passing_score`, `time_limit_minutes`, `category_id`, `active`, `created_at`) VALUES
(1, 'UPI & Online Payment Scam Defense Quiz', 'Test your practical instincts against genuine payment fraud scenarios, fake buyer requests, and QR traps.', 70, 8, 2, TRUE, NOW()),
(2, 'Phishing & Fake Website Recognition Quiz', 'Can you spot the subtle clues that distinguish a genuine notification from a cybercriminal trick?', 60, 10, 1, TRUE, NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- 7. Seed Questions for Quiz 1 (UPI & Online Payment)
INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question_text`, `explanation`, `points`) VALUES
(1, 1, 'You are selling a bicycle online. A buyer sends you a QR code on WhatsApp stating: "Scan this and enter your UPI PIN to receive ₹4,000 in your bank account." What should you do?', 
 'Receiving money through UPI NEVER requires entering your UPI PIN. Entering your PIN always authorizes a debit (payment) from your account.', 1),

(2, 1, 'You receive an SMS: "Dear customer, your bank account will be blocked within 2 hours due to pending KYC. Click http://bit.ly/bank-kyc-update to verify." What is the safest response?', 
 'Banks never ask you to update KYC via shortened links in unsolicited SMS. Always contact your bank directly through official branch channels or the number printed on your card.', 1),

(3, 1, 'What is the purpose of a UPI PIN?', 
 'A UPI PIN functions like an ATM card PIN. It is strictly used to authenticate and approve deductions/payments from your bank account.', 1),

(4, 1, 'A caller claiming to be from customer care asks you to download "AnyDesk" or "TeamViewer" to fix a failed transaction refund. What happens if you install it?', 
 'Remote screen sharing apps like AnyDesk allow the scammer to see your screen, view your OTPs, and steal complete control of your banking sessions.', 1)
ON DUPLICATE KEY UPDATE `question_text` = VALUES(`question_text`);

-- 8. Seed Options for Quiz 1
-- Question 1 Options
INSERT INTO `quiz_options` (`id`, `question_id`, `option_text`, `is_correct`) VALUES
(1, 1, 'Scan the QR code and enter your PIN immediately to get paid.', FALSE),
(2, 1, 'Refuse and block the buyer, because receiving money never requires entering a UPI PIN.', TRUE),
(3, 1, 'Forward the QR code to your friend to see if it works for them.', FALSE),
(4, 1, 'Ask for a 50% advance first before entering your PIN.', FALSE),

-- Question 2 Options
(5, 2, 'Click the link immediately to prevent your account from being blocked.', FALSE),
(6, 2, 'Reply to the SMS with your Aadhaar number and account details.', FALSE),
(7, 2, 'Ignore the link, delete the message, and verify with your bank through official contact channels.', TRUE),
(8, 2, 'Forward the message to all your contacts to warn them.', FALSE),

-- Question 3 Options
(9, 3, 'To receive cashback and rewards into your account.', FALSE),
(10, 3, 'To verify your identity when receiving money from a friend.', FALSE),
(11, 3, 'To authorize and deduct money from your account for a payment.', TRUE),
(12, 3, 'To check your daily internet speed.', FALSE),

-- Question 4 Options
(13, 4, 'It speeds up your official refund by 5 minutes.', FALSE),
(14, 4, 'It gives the scammer remote view and control over your phone to steal OTPs and bank credentials.', TRUE),
(15, 4, 'It protects your phone from external malware.', FALSE),
(16, 4, 'It automatically validates your KYC with the government.', FALSE)
ON DUPLICATE KEY UPDATE `option_text` = VALUES(`option_text`);

-- 9. Seed Sample Helpdesk Queries
INSERT INTO `helpdesk_queries` (`id`, `user_id`, `subject`, `category`, `description`, `status`, `admin_response`, `responder_id`, `resolved_at`, `created_at`) VALUES
(1, 2, 'Received suspicious WhatsApp message offering work from home reviewing hotels', 'Online Job Scams', 
 'Someone claiming to be from an HR consultancy sent a message offering ₹3000/day for liking YouTube videos and rating hotels on Google Maps. They asked me to join a Telegram group. Is this safe?',
 'RESOLVED',
 'This is a textbook "Part-Time Task Scam" (Prepaid Task Fraud). Scammers give a small initial payout (₹150-₹200) to build trust, then demand deposits of thousands of rupees into "crypto wallets" or "VIP task pools" that can never be withdrawn. Block the sender immediately and report the number on the National Cyber Crime Reporting Portal (cybercrime.gov.in or helpline 1930).',
 1, NOW(), DATE_SUB(NOW(), INTERVAL 2 DAY)),

(2, 3, 'Caller asked for OTP claiming electricity bill was unpaid', 'Utility Bill Scam',
 'I got a call yesterday from someone saying my electricity meter would be disconnected at 8 PM unless I paid an outstanding bill of ₹120. They asked for an OTP sent to my phone. I gave it, and ₹5,000 was deducted. What should I do right now?',
 'IN_PROGRESS',
 'Immediately call the National Cyber Crime Helpline at 1930 and report this to freeze the scammer bank account! Also call your bank to hotlist/block your debit card and net banking credentials. File a complaint at cybercrime.gov.in with transaction details.',
 1, NULL, DATE_SUB(NOW(), INTERVAL 3 HOUR))
ON DUPLICATE KEY UPDATE `subject` = VALUES(`subject`);
