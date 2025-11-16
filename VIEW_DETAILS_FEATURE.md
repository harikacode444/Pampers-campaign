# 📋 "View Details" Feature Documentation

## What It Does

When you click **"View Details"** on a campaign card (from Drafts or Active Campaigns pages), it:

1. **Navigates to the main campaign page** (`/`)
2. **Loads the complete campaign data** from storage
3. **Displays all campaign details** in the existing sections

## What Details Are Shown

The "View Details" feature displays comprehensive campaign information across multiple sections:

### 1. **Chat Section** (Top)
- Shows the original campaign brief that was used to generate the campaign
- Displays the AI-generated natural language response

### 2. **Campaign Simulation Section**
- **Campaign Summary:**
  - Campaign name (friendly format with emoji)
  - Campaign type (Promotional/Informational)
  - Markets (all countries)
  - Languages (all supported languages)
  - Duration (Always On/Limited Time/One-Time)
  - Channels (Push, Email, Inbox, Slide Up)
  
- **Journey Timeline:**
  - All journey steps with:
    - Day number
    - Channel
    - Conditions (targeting rules)
    - Expiry days
    - Message keys
  
- **Localized Message Previews:**
  - All messages for all languages
  - Organized by language and message key
  - Shows title/subject and body for each message
  
- **Braze AI Features:**
  - Intelligent timing
  - Channel optimization
  - Variant optimization

### 3. **QA Section**
- **QA Status:** Pass/Fail/Warnings
- **All Issues:** Blocking problems that must be fixed
- **All Warnings:** Non-blocking recommendations
- Detailed messages for each issue/warning

### 4. **Go Live Section** (if draft)
- Campaign details summary
- Launch button (if QA passed)
- Warning if QA issues exist

### 5. **Hypercare Section** (if active)
- Real-time performance metrics
- AI-powered insights
- Optimization recommendations

## Additional Information Displayed

For **Active Campaigns**, the details also show:
- **Braze Campaign ID:** The ID assigned when the campaign went live
- **Go Live Result:** Status and message from Braze API
- **Performance Metrics:** (via Hypercare section)

For **Draft Campaigns**, the details show:
- All the above except Braze integration info
- Option to launch the campaign if QA passes

## Technical Implementation

1. **Navigation:** Uses React Router's `navigate()` with state containing `campaignId`
2. **Data Loading:** Uses `getCampaignById()` to fetch from localStorage (searches both drafts and active)
3. **State Management:** Populates all React state variables (spec, journey, messages, qa, etc.)
4. **Display:** Uses existing components (SimulationSection, QASection, etc.) to show all details

## User Experience

- **Seamless:** All details load instantly from local storage
- **Comprehensive:** Shows everything about the campaign in one view
- **Actionable:** Allows editing (by changing brief), launching (if draft), or viewing analytics (if active)
- **Visual:** Uses the same beautiful UI as campaign creation

## Example Use Cases

1. **Review a draft campaign** before launching
2. **Check campaign details** after it's been launched
3. **View all localized messages** to verify translations
4. **Review QA report** to understand any issues
5. **See journey structure** to understand the campaign flow
6. **Check Braze integration** status for active campaigns

