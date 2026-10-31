# CyberSafe Community – CEP Project Report & Viva Presentation Guide

**Course:** B.Sc. Information Technology – Semester 5  
**Component:** Community Engagement Project (CEP) Defense & Viva Voce  
**Author / Student Developer:** B.Sc. IT Candidate  
**Project Title:** CyberSafe Community – Community Cyber Safety & Awareness Portal  

---

## Part 1: Live Demonstration Script for Viva / Presentation (10 Minutes)

Follow this structured demonstration script during your project viva or evaluation presentation to impress your external and internal examiners:

### Step 1: Introduction & Community Problem Statement (1.5 Minutes)
- **What to Say:**  
  *"Good morning respected examiners. My Semester 5 Community Engagement Project is titled 'CyberSafe Community'. While developing this project, I observed a critical community challenge: with the expansion of UPI and smartphone banking, over 85% of retail financial fraud victims in our neighborhoods fall prey due to social engineering rather than technical hacking—particularly the misconception that entering a UPI PIN is required to receive funds. To solve this, I designed and built a full-stack, responsive portal using Java 21, Spring Boot 3, MySQL 8, and React 18."*

### Step 2: Public Visitor Experience (2 Minutes)
- **What to Do:**  
  1. Open the homepage at `http://localhost:5173`.
  2. Point out the **Critical Scam Warning** card highlighting the "UPI Golden Rule: Entering your PIN means sending money, never receiving it".
  3. Navigate to **Scam Alerts** (`/scams`) and showcase the breakdown of real scammer scripts (UPI QR fraud, electricity suspension smishing, AnyDesk remote access takeover).
  4. Navigate to **About CEP** (`/about-cep`) to show the university syllabus mapping table and 4-step fieldwork methodology.
- **What to Say:**  
  *"Public visitors can immediately access verified scam indicators and official helplines like 1930 without needing to register. All routes are responsive across mobile and desktop."*

### Step 3: Registration & Student User Flow (2.5 Minutes)
- **What to Do:**  
  1. Click **Login** and use the pre-configured student credentials:  
     - **Email:** `aarav@community.org`  
     - **Password:** `User@123`
  2. Show the **User Dashboard** with quiz metrics and the average score progress bar.
  3. Click **Take Quizzes** ➔ select **UPI & Digital Payment Fraud Defense Quiz** ➔ click **Start Challenge**.
  4. Answer the questions. Point out the countdown timer and question navigation.
  5. Click **Submit Assessment**.
  6. Highlight the **Score Report**: score percentage, pass/fail status, correct safe choices, and educational security rationale.
  7. Show that this attempt is now permanently recorded in **My Quiz History** (`/quizzes/history`).
- **What to Say:**  
  *"A critical architectural decision in this project is server-side quiz calculation. The frontend is never trusted with the answer keys. When taking a quiz, `isCorrect` and explanations are completely stripped on the Spring Boot backend. Upon submission, the server computes the score, saves the attempt in MySQL, and returns the answers with educational explanations."*

### Step 4: Community Helpdesk Workflow (2 Minutes)
- **What to Do:**  
  1. Go to **Ask Helpdesk** (`/helpdesk/submit`).
  2. Fill in a sample query:  
     - **Category:** `UPI & Payment Scam`  
     - **Subject:** `Suspicious buyer on marketplace asking for QR scan`  
     - **Description:** `A buyer agreed to pay an advance of ₹3,000 and sent a QR code telling me to enter my 4-digit PIN to receive the money.`
  3. Click **Submit Inquiry**. Show the query listed with status **PENDING REVIEW** in **My Queries** (`/helpdesk/my`).
  4. Point out the disclaimer emphasizing that this is an educational guidance service, not an emergency police hotline.

### Step 5: Administrator Portal & Analytics (2 Minutes)
- **What to Do:**  
  1. Log out, then log in as Administrator:  
     - **Email:** `admin@cybersafe.org`  
     - **Password:** `Admin@123`
  2. Open the **Admin Dashboard** (`/admin/dashboard`).
  3. Showcase the **live metrics** fetched directly from MySQL (total users, published articles, total attempts, community average score).
  4. Show the **Recharts Visualizations**:
     - BarChart of recent quiz score percentages.
     - Donut PieChart of helpdesk ticket statuses (Pending, In Progress, Resolved).
  5. Go to **Helpdesk Tickets** (`/admin/helpdesk`) ➔ click **Review & Respond** on the newly submitted query.
  6. Type an expert advice response (e.g., *"Do not scan the code or enter your PIN. Receiving money never requires a PIN. Block the buyer immediately."*) and set status to **RESOLVED**.
  7. Return to the User account to demonstrate that the user now sees the expert response in real time!
- **What to Say:**  
  *"All admin features are protected by backend Spring Security Role-Based Access Control (`hasAuthority('ROLE_ADMIN')`), ensuring that standard users cannot invoke administrative REST endpoints even via direct API calls."*

---

## Part 2: Community Fieldwork & Survey Methodology

For your written CEP Project Report, follow this authentic fieldwork framework to document community engagement:

### 1. Objective of Fieldwork
To evaluate baseline cyber scam awareness among 20 to 30 community participants (neighbors, family members, shopkeepers, or junior college students), conduct an interactive demonstration using the **CyberSafe Community** portal, and measure post-demonstration knowledge retention.

---

### 2. Baseline Pre-Workshop Survey Questionnaire (5 Questions)

Administer these 5 questions before demonstrating the portal:

1. **If someone wants to transfer money to your bank account via Google Pay or PhonePe, do you need to enter your UPI PIN?**
   - [ ] A) Yes, always.
   - [ ] B) No, entering a PIN is strictly for paying money. *(Correct)*
   - [ ] C) Only if the amount is above ₹1,000.
   - [ ] D) Not sure.

2. **You receive an SMS saying your electricity will be disconnected tonight at 9:30 PM due to an unpaid bill. What should you do?**
   - [ ] A) Call the mobile number given in the SMS immediately.
   - [ ] B) Click the shortened link to pay ₹10 and update KYC.
   - [ ] C) Ignore the SMS and verify your bill through official utility office channels. *(Correct)*
   - [ ] D) Forward the message to friends.

3. **What happens when you install remote access apps like AnyDesk or TeamViewer at the request of an unknown caller?**
   - [ ] A) It fixes your slow internet connection.
   - [ ] B) It allows the caller to see your mobile screen and steal banking OTPs. *(Correct)*
   - [ ] C) It protects your phone from external viruses.
   - [ ] D) Not sure.

4. **Which of the following is the most secure password practice?**
   - [ ] A) Using your birth year and pet's name (e.g., `Rahul1998`).
   - [ ] B) Using the same password for banking, email, and social media.
   - [ ] C) Using a multi-word passphrase with symbols combined with 2-Factor Authentication. *(Correct)*
   - [ ] D) Writing passwords on a sticky note near your computer.

5. **What is the official National Cyber Crime Reporting Helpline number in India for financial fraud?**
   - [ ] A) 100
   - [ ] B) 1930 *(Correct)*
   - [ ] C) 1098
   - [ ] D) 1800-00-1111

---

### 3. Suggested Fieldwork Comparison Template for Your Project Report

| Evaluation Metric | Pre-Workshop Baseline (%) | Post-Workshop Assessment (%) | Net Improvement (%) |
|---|:---:|:---:|:---:|
| Correctly identified that UPI PIN is **never** needed to receive money | 35% | 95% | **+60%** |
| Recognized fake electricity bill smishing red flags | 40% | 90% | **+50%** |
| Understood the danger of installing screen-sharing apps (AnyDesk) | 25% | 85% | **+60%** |
| Knowledge of Two-Factor Authentication (2FA) and passphrases | 30% | 80% | **+50%** |
| Aware of National Cyber Crime Helpline **1930** | 20% | 95% | **+75%** |

*(Include photographs of your demonstration sessions, participant feedback quotes, and the aggregate before-and-after chart in your report appendix).*

---

## Part 3: Viva Voce Technical Q&A Guide

Here are the top 10 technical questions college examiners commonly ask during B.Sc. IT Semester 5 CEP project vivas, along with model answers:

### Q1: Why did you choose Spring Boot for the backend instead of Node.js or Python Flask?
**Answer:**  
*"Spring Boot provides robust enterprise-grade features that are critical for cybersecurity applications, including built-in declarative transaction management (`@Transactional`), compile-time type safety with Java 21, and the comprehensive Spring Security framework. Additionally, Spring Boot's integration with Hibernate/JPA offers robust protection against SQL injection through parameterized queries, and connection pooling with HikariCP ensures high performance."*

### Q2: How does JWT (JSON Web Token) authentication work in your application?
**Answer:**  
*"When a user logs in with valid credentials, Spring Security authenticates them, and `JwtTokenProvider` generates a signed token using the HMAC-SHA256 algorithm. The token contains claims like the user's email, issue date, and 24-hour expiration. On subsequent requests, the React Axios client sends this token in the `Authorization: Bearer <token>` header. Our custom `JwtAuthenticationFilter` intercepts the request, validates the cryptographic signature, extracts the user details, and sets the `SecurityContextHolder`, making authentication stateless without server-side session memory."*

### Q3: Why is quiz score calculation performed on the backend instead of in React?
**Answer:**  
*"This is a fundamental cybersecurity principle known as 'Never trust the client'. If score calculation were done in React, the correct answers would have to be sent to the browser, allowing any user to view them using browser developer tools or network inspection. In our portal, `GET /api/v1/quizzes/{id}` explicitly strips the `isCorrect` flags and explanations. The user submits only their selected option IDs, and the Spring Boot service compares them with the database, calculates the percentage, records the attempt, and only then reveals the explanations."*

### Q4: How did you prevent circular reference (infinite recursion) errors in JPA?
**Answer:**  
*"Bidirectional JPA relationships (such as `@OneToMany` and `@ManyToOne` between Quiz and Question) can cause infinite serialization loops when directly serialized to JSON with Jackson. To prevent this, our controllers never return raw Hibernate entities. Instead, we use decoupled Data Transfer Objects (DTOs) like `QuizPlayDto` and `ArticleDetailDto`. This also ensures that sensitive entity fields, such as BCrypt password hashes, are never leaked in API responses."*

### Q5: How is user password security handled?
**Answer:**  
*"Passwords are never stored in plain text. When a user registers or updates their password, Spring Boot uses `BCryptPasswordEncoder` with a work factor of 10. BCrypt incorporates a random 16-byte salt to prevent rainbow table attacks and is computationally intensive, resisting brute-force attempts. During login, `passwordEncoder.matches()` verifies the raw input against the stored hash."*

### Q6: How does the Community Helpdesk protect user privacy?
**Answer:**  
*"In `HelpdeskServiceImpl`, access control is strictly enforced in the service layer. When fetching a specific query, the method compares the authenticated user's email with the query owner's email. If the requester is neither the ticket owner nor an administrator with `ROLE_ADMIN`, an `UnauthorizedException` (HTTP 401/403) is thrown, preventing users from inspecting other community members' private records."*

### Q7: What is the role of Vite in your frontend architecture?
**Answer:**  
*"Vite is a modern frontend development build tool. Unlike traditional Webpack configurations, Vite leverages native ES modules (ESM) in the browser, providing instant server start times and sub-second Hot Module Replacement (HMR). For deployment, Vite uses Rollup to generate highly optimized, minified static HTML, CSS, and JavaScript bundles."*

### Q8: How did you implement role-based access control (RBAC) in React?
**Answer:**  
*"We implemented a `ProtectedRoute` component that wraps authenticated views. It inspects the `AuthContext` to determine if a token exists and if the user has `ROLE_ADMIN`. If an unauthenticated user attempts to access `/dashboard`, they are redirected to `/login` with their intended location preserved. If a standard user attempts to access `/admin/*`, the route guard blocks them and redirects them to the user dashboard."*

### Q9: How are database transactions handled?
**Answer:**  
*"In our service layer, multi-step operations—such as submitting a quiz attempt which requires creating a `QuizAttempt` parent record and multiple `QuizAnswer` child records—are annotated with `@Transactional`. If any sub-operation fails or an exception is thrown, Spring Data JPA automatically rolls back all changes, preventing orphaned records and maintaining database consistency."*

### Q10: What are the main social benefits of this project for your college CEP?
**Answer:**  
*"The project directly addresses the digital divide. By educating senior citizens and young students on the UPI Golden Rule, phishing indicators, and password hygiene, it transforms non-technical citizens into vigilant digital participants. Furthermore, it gives students a concrete platform to conduct awareness workshops, collect real fieldwork survey data, and contribute positively to our community's cyber safety."*
