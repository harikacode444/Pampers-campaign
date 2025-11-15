
import { CampaignSpec } from './types';

export const interpretCampaignBrief = async (brief: string): Promise<CampaignSpec> => {
  // Check if brief includes 'refer' (case-insensitive)
  if (brief.toLowerCase().includes('refer')) {
    // Return RAF always-on campaign spec
    return {
      campaign_name: 'RAF_US_DE',
      campaign_type: 'promotional',
      markets: ['US', 'DE'],
      languages: ['en', 'de'],
      duration: 'always_on',
      targeting: {
        days_since_app_opened: '>30',
        referrals_count: '<5',
      },
      promo: {
        reward_per_referral: 2,
        max_reward: 10,
        currency: 'Pampers Cash',
      },
      channels: ['push', 'inbox', 'slide_up', 'email'],
      reentry_criteria_days: 90,
      exit_criteria: ['5_referrals', '30_days_inactive'],
      use_braze_ai: {
        intelligent_timing: true,
        channel_optimization: true,
        variant_optimization: true,
      },
    };
  }

  // Default simple non-promotional US push-only campaign
  return {
    campaign_name: 'Generic_US',
    campaign_type: 'non-promotional',
    markets: ['US'],
    languages: ['en'],
    duration: 'one_time',
    targeting: {},
    channels: ['push'],
    reentry_criteria_days: 0,
    exit_criteria: ['one_message_sent'],
    use_braze_ai: {
      intelligent_timing: true,
    },
  };
};

