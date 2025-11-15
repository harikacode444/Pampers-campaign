import { interpretCampaignBrief } from "./campaignInterpreter";
import { buildJourneyFromSpec } from "./journeyBuilder";
import { generateMessages } from "./copyGenerator";
import { runQA } from "./qaEngine";
import { CampaignSpec, JourneyBlueprint, MultiLanguageMessages, QAReport } from "./types";

export const runCampaignAI = async (brief: string): Promise<{
  spec: CampaignSpec;
  journey: JourneyBlueprint;
  messages: MultiLanguageMessages;
  qa: QAReport;
}> => {
  // Step 1: Interpret the campaign brief into a spec
  const spec = await interpretCampaignBrief(brief);

  // Step 2: Build the journey from the spec
  const journey = await buildJourneyFromSpec(spec);

  // Step 3: Generate messages for the journey
  const messages = await generateMessages(spec, journey);

  // Step 4: Run QA checks
  const qa = await runQA(spec, journey, messages);

  return {
    spec,
    journey,
    messages,
    qa,
  };
};

