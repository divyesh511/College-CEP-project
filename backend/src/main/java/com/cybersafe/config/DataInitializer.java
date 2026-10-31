package com.cybersafe.config;

import com.cybersafe.entity.*;
import com.cybersafe.enums.HelpdeskStatus;
import com.cybersafe.enums.RoleName;
import com.cybersafe.enums.ThreatLevel;
import com.cybersafe.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ArticleRepository articleRepository;
    private final QuizRepository quizRepository;
    private final HelpdeskQueryRepository helpdeskRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           CategoryRepository categoryRepository,
                           ArticleRepository articleRepository,
                           QuizRepository quizRepository,
                           HelpdeskQueryRepository helpdeskRepository,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.articleRepository = articleRepository;
        this.quizRepository = quizRepository;
        this.helpdeskRepository = helpdeskRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        logger.info("Checking and initializing CyberSafe Community database seed records...");

        // 1. Initialize Roles
        Role roleAdmin = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(RoleName.ROLE_ADMIN, "System Administrator")));

        Role roleUser = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseGet(() -> roleRepository.save(new Role(RoleName.ROLE_USER, "Community Member")));

        // 2. Initialize Default Admin User
        User adminUser = userRepository.findByEmail("admin@cybersafe.org").orElseGet(() -> {
            User admin = new User();
            admin.setFullName("CyberSafe Administrator");
            admin.setEmail("admin@cybersafe.org");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setPhone("+91 9876543210");
            admin.setActive(true);
            Set<Role> roles = new HashSet<>();
            roles.add(roleAdmin);
            roles.add(roleUser);
            admin.setRoles(roles);
            logger.info("Created default Administrator: admin@cybersafe.org / Admin@123");
            return userRepository.save(admin);
        });

        // 3. Initialize Default Sample User
        User demoUser = userRepository.findByEmail("aarav@community.org").orElseGet(() -> {
            User user = new User();
            user.setFullName("Aarav Sharma (Student)");
            user.setEmail("aarav@community.org");
            user.setPassword(passwordEncoder.encode("User@123"));
            user.setPhone("+91 9876543211");
            user.setActive(true);
            user.setRoles(Collections.singleton(roleUser));
            logger.info("Created sample User: aarav@community.org / User@123");
            return userRepository.save(user);
        });

        // 4. Initialize CEP Categories
        if (categoryRepository.count() == 0) {
            logger.info("Seeding CEP cyber awareness categories...");
            Category catPhishing = categoryRepository.save(new Category(
                    "Phishing & Fraud Detection",
                    "phishing-fraud-detection",
                    "Learn to identify deceptive emails, SMS smishing, voice vishing, and lottery scams.",
                    "bi-envelope-exclamation"
            ));

            Category catUpi = categoryRepository.save(new Category(
                    "UPI & Digital Payment Safety",
                    "upi-payment-safety",
                    "Essential guidelines for secure Google Pay, PhonePe, Paytm, and net-banking transactions.",
                    "bi-credit-card-2-front"
            ));

            Category catPassword = categoryRepository.save(new Category(
                    "Password Hygiene & Data Privacy",
                    "password-hygiene-privacy",
                    "Best practices for multi-factor authentication, strong passphrases, and social privacy.",
                    "bi-key"
            ));

            Category catChildren = categoryRepository.save(new Category(
                    "Children & Adolescent Safety",
                    "children-adolescent-safety",
                    "Protective tips on cyberbullying, predatory gaming chats, and screen time ethics.",
                    "bi-person-heart"
            ));

            Category catEthics = categoryRepository.save(new Category(
                    "Cyber Ethics & Responsible Internet",
                    "cyber-ethics-responsibility",
                    "Digital citizenship, legal awareness under the IT Act, and avoiding spreading fake news.",
                    "bi-shield-check"
            ));

            // 5. Initialize Educational Articles
            logger.info("Seeding educational articles...");
            Article art1 = new Article();
            art1.setTitle("The Golden Rule of UPI: Entering Your PIN Means Sending Money, Never Receiving It");
            art1.setSlug("golden-rule-of-upi-pin-scams");
            art1.setSummary("Fraudsters frequently pose as buyers on marketplace apps and send QR codes claiming you must scan and enter your PIN to claim an advance payment.");
            art1.setContent("### The Deceptive QR Code & PIN Scam Explained\n\nMany community members, especially senior citizens and students selling used items online, fall victim to this widespread scam. Fraudsters pose as eager buyers and agree to pay an advance.\n\n#### How Fraudsters Operate:\n1. They contact you on online platforms and agree to buy without bargaining.\n2. They send a QR code on WhatsApp saying: *'Please scan this QR code and enter your UPI PIN to claim ₹2,500.'*\n3. The moment you input your 4 or 6-digit UPI PIN, money is **debited from your bank account**, not credited.\n\n#### Crucial Facts to Remember:\n- **Receiving money via UPI never requires entering your UPI PIN.**\n- **Scanning a QR code is exclusively for sending money or approving payments.**\n- Never approve collect requests received from unknown VPA handles.");
            art1.setThreatLevel(ThreatLevel.CRITICAL);
            art1.setPublished(true);
            art1.setCategory(catUpi);
            art1.setAuthor(adminUser);
            art1.setPublishedAt(LocalDateTime.now().minusDays(3));
            articleRepository.save(art1);

            Article art2 = new Article();
            art2.setTitle("Spotting Phishing Emails and SMS (Smishing) Before Clicking");
            art2.setSlug("spotting-phishing-emails-sms");
            art2.setSummary("Analyze real examples of fake bank KYC alerts, electricity bill suspension notices, and suspicious parcel delivery links.");
            art2.setContent("### How to Recognize Deceptive Digital Traps\n\nPhishing attacks rely on creating urgent panic or excitement to make victims act without critical thinking.\n\n#### Common Red Flags:\n- **Artificial Urgency:** *'Your electricity will be disconnected tonight at 9:30 PM due to unpaid bills. Call this officer immediately.'*\n- **Mismatched Sender Domains:** An email pretending to be from your bank originating from `@gmail.com` or `@support-bank-alert.xyz` instead of official bank domains.\n- **Grammar & Salutation Errors:** Generic greetings such as *'Dear Customer'* instead of your registered name.\n- **Unsolicited APK Attachments:** Fraudsters asking you to download `.apk` files on Android to 'update KYC'.\n\n#### Prevention Steps:\n- Never click links in unexpected SMS messages.\n- Always visit the official website directly by typing the URL in your browser.\n- Verify helpline numbers only on official bank statements or behind debit cards.");
            art2.setThreatLevel(ThreatLevel.HIGH);
            art2.setPublished(true);
            art2.setCategory(catPhishing);
            art2.setAuthor(adminUser);
            art2.setPublishedAt(LocalDateTime.now().minusDays(2));
            articleRepository.save(art2);

            Article art3 = new Article();
            art3.setTitle("Creating Strong Passwords and Enabling Two-Factor Authentication (2FA)");
            art3.setSlug("creating-strong-passwords-2fa");
            art3.setSummary("Why passwords like 'India@123' are vulnerable to credential stuffing, and how passphrases combined with 2FA protect your identity.");
            art3.setContent("### The Science of Strong Password Hygiene\n\nUsing the same password across college portals, social media, and banking is one of the highest cyber security risks.\n\n#### The Anatomy of a Secure Passphrase:\n- Instead of short, hard-to-remember strings like `P@$$w0rd`, use 4-5 random words: `Bicycle#Mango*Thunder49`.\n- Length beats complexity: A 16-character passphrase takes billions of years to crack with brute-force dictionary tools.\n- Never save passwords in plain text on WhatsApp or sticky notes.\n\n#### The Power of Two-Factor Authentication (2FA):\nEven if a hacker steals your password, 2FA prevents them from accessing your account without your secondary device or authenticator app. Always enable 2FA on Google, Instagram, WhatsApp, and financial accounts.");
            art3.setThreatLevel(ThreatLevel.MEDIUM);
            art3.setPublished(true);
            art3.setCategory(catPassword);
            art3.setAuthor(adminUser);
            art3.setPublishedAt(LocalDateTime.now().minusDays(1));
            articleRepository.save(art3);

            // 6. Initialize Interactive Quizzes
            logger.info("Seeding interactive cyber safety quizzes...");
            Quiz quizUpi = new Quiz();
            quizUpi.setTitle("UPI & Digital Payment Fraud Defense Quiz");
            quizUpi.setDescription("Test your practical instincts against genuine payment fraud scenarios, fake buyer requests, and QR traps.");
            quizUpi.setPassingScore(70);
            quizUpi.setTimeLimitMinutes(8);
            quizUpi.setCategory(catUpi);
            quizUpi.setActive(true);

            // Question 1
            QuizQuestion q1 = new QuizQuestion();
            q1.setQuiz(quizUpi);
            q1.setQuestionText("You are selling a bicycle online. A buyer sends you a QR code on WhatsApp stating: 'Scan this and enter your UPI PIN to receive ₹4,000 in your bank account.' What should you do?");
            q1.setExplanation("Receiving money through UPI NEVER requires entering your UPI PIN. Entering your PIN always authorizes a debit (payment) from your account.");
            q1.setPoints(1);
            q1.getOptions().add(new QuizOption("Scan the QR code and enter your PIN immediately to get paid.", false));
            q1.getOptions().add(new QuizOption("Refuse and block the buyer, because receiving money never requires entering a UPI PIN.", true));
            q1.getOptions().add(new QuizOption("Forward the QR code to your friend to see if it works for them.", false));
            q1.getOptions().add(new QuizOption("Ask for a 50% advance first before entering your PIN.", false));
            q1.getOptions().forEach(o -> o.setQuestion(q1));
            quizUpi.getQuestions().add(q1);

            // Question 2
            QuizQuestion q2 = new QuizQuestion();
            q2.setQuiz(quizUpi);
            q2.setQuestionText("You receive an SMS: 'Dear customer, your bank account will be blocked within 2 hours due to pending KYC. Click http://bit.ly/bank-kyc to verify.' What is the safest response?");
            q2.setExplanation("Banks never ask you to update KYC via shortened links in unsolicited SMS. Always contact your bank directly through official branch channels.");
            q2.setPoints(1);
            q2.getOptions().add(new QuizOption("Click the link immediately to prevent account suspension.", false));
            q2.getOptions().add(new QuizOption("Ignore the link, delete the message, and verify with your bank through official contact channels.", true));
            q2.getOptions().add(new QuizOption("Reply to the SMS with your Aadhaar number and account details.", false));
            q2.getOptions().add(new QuizOption("Forward the message to social media groups.", false));
            q2.getOptions().forEach(o -> o.setQuestion(q2));
            quizUpi.getQuestions().add(q2);

            // Question 3
            QuizQuestion q3 = new QuizQuestion();
            q3.setQuiz(quizUpi);
            q3.setQuestionText("A caller claiming to be from customer care asks you to download 'AnyDesk' or 'TeamViewer' to fix a failed transaction refund. What happens if you install it?");
            q3.setExplanation("Remote screen sharing apps allow the scammer to see your screen, view your OTPs, and steal complete control of your banking sessions.");
            q3.setPoints(1);
            q3.getOptions().add(new QuizOption("It speeds up your official refund by 5 minutes.", false));
            q3.getOptions().add(new QuizOption("It gives the scammer remote view and control over your phone to steal OTPs and bank credentials.", true));
            q3.getOptions().add(new QuizOption("It protects your phone from external malware.", false));
            q3.getOptions().add(new QuizOption("It automatically validates your KYC with the government.", false));
            q3.getOptions().forEach(o -> o.setQuestion(q3));
            quizUpi.getQuestions().add(q3);

            quizRepository.save(quizUpi);

            // 7. Seed Sample Helpdesk Inquiry
            HelpdeskQuery query = new HelpdeskQuery();
            query.setUser(demoUser);
            query.setSubject("Received suspicious WhatsApp message offering work from home reviewing hotels");
            query.setCategory("Online Job Scams");
            query.setDescription("Someone claiming to be from an HR consultancy sent a message offering ₹3000/day for liking YouTube videos and rating hotels on Google Maps. They asked me to join a Telegram group. Is this safe?");
            query.setStatus(HelpdeskStatus.RESOLVED);
            query.setAdminResponse("This is a textbook 'Part-Time Task Scam' (Prepaid Task Fraud). Scammers give a small initial payout (₹150-₹200) to build trust, then demand deposits of thousands of rupees into 'task pools' that can never be withdrawn. Block the sender immediately and report the number on cybercrime.gov.in (Helpline 1930).");
            query.setResponder(adminUser);
            query.setResolvedAt(LocalDateTime.now().minusDays(1));
            helpdeskRepository.save(query);

            logger.info("Sample database records initialized successfully!");
        }
    }
}
