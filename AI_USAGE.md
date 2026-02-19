# AI_USAGE.md

## 1. AI Tools Used

- ChatGPT (used as an architectural discussion and validation assistant)

---

## 2. Prompts Given

I used AI primarily for architectural brainstorming and exploring edge cases in a modular conversation flow system.

Example prompts:

- "How to separate active user state and conversation history in a modular flow system?"
- "Best way to implement checkpoint reset logic without deleting history?"
- "How to safely validate deep link access in a state-based backend?"

The purpose was to compare design approaches and understand trade-offs before implementation.

---

## 3. What I Modified From AI Output

AI initially suggested simpler approaches such as:

- Resetting or deleting previous history at checkpoints
- Updating active state through multiple separate database operations
- Basic deep link validation logic

I refined these suggestions by:

- Introducing `moduleSessionId` to logically isolate checkpoint sessions while preserving full history
- Ensuring history remains immutable for auditability
- Strengthening validation to confirm submitted options belong strictly to the user's current active question
- Structuring state updates carefully to avoid partial or inconsistent updates

All final implementations were written and adjusted manually after evaluating the suggested ideas.

---

## 4. What AI Got Wrong or Incomplete

- Early suggestions did not emphasize preserving complete historical data.
- Some validation logic did not fully consider outdated deep link scenarios.
- AI responses were generic and required adaptation to fit the actual database schema and business rules.

These gaps were identified during testing and corrected in the implementation.

---

## 5. How I Verified Correctness

All APIs were manually tested using Postman under multiple scenarios:

- Normal module progression
- Checkpoint transitions
- Deep link access to outdated questions
- Invalid option submission
- Back navigation within the same module session
- Switching modules mid-session

After each scenario, I inspected the database to verify:

- Session isolation using `moduleSessionId`
- Accurate active state updates
- Proper history preservation without unintended deletion

No AI-generated suggestion was accepted without manual validation and refinement.
