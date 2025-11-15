import { CampaignSpec, JourneyBlueprint, MultiLanguageMessages, ChannelMessage } from "./types";

export const generateMessages = async (
  spec: CampaignSpec,
  journey: JourneyBlueprint
): Promise<MultiLanguageMessages> => {
  const isRAF = spec.campaign_name.startsWith("RAF_");

  if (isRAF) {
    // Generate RAF campaign messages in English and German
    return {
      en: {
        raf_day1_push: {
          title: "Invite a friend, earn Pampers Cash",
          body: "Share your love for Pampers Club. When a friend joins and scans their first pack, you both earn rewards.",
        },
        raf_day1_inbox: {
          title: "Start earning with referrals",
          body: "Invite friends to join Pampers Club and earn Pampers Cash together. Every referral counts!",
        },
        raf_day14_push: {
          title: "Still time to refer friends",
          body: "You can still earn rewards by inviting friends to Pampers Club. Don't miss out on Pampers Cash!",
        },
        raf_day14_slideup: {
          title: "Refer a friend today",
          body: "Share Pampers Club with friends and earn rewards. The more you refer, the more you earn!",
        },
        raf_day14_email: {
          subject: "Earn more Pampers Cash by referring friends",
          body: "Hi there! You still have time to invite friends to Pampers Club and earn rewards. When your friends join and scan their first pack, you both get Pampers Cash. Start sharing today!",
        },
        raf_day30_push: {
          title: "Last chance to refer friends",
          body: "This is your final opportunity to earn Pampers Cash through referrals. Invite friends to Pampers Club now!",
        },
        raf_day30_slideup: {
          title: "Final referral opportunity",
          body: "Don't miss your last chance to earn rewards. Refer friends to Pampers Club and get Pampers Cash!",
        },
        raf_day30_inbox: {
          title: "One last referral reminder",
          body: "This is your final chance to earn Pampers Cash by referring friends. Share Pampers Club with your network today!",
        },
      },
      de: {
        raf_day1_push: {
          title: "Freund:in einladen, Pampers Cash sichern",
          body: "Empfiehl Pampers Club. Wenn eine Freund:in beitritt und zum ersten Mal scannt, erhaltet ihr beide eine Belohnung.",
        },
        raf_day1_inbox: {
          title: "Mit Empfehlungen verdienen",
          body: "Lade Freund:innen ein, Pampers Club beizutreten und verdiene gemeinsam Pampers Cash. Jede Empfehlung zählt!",
        },
        raf_day14_push: {
          title: "Noch Zeit, Freund:innen zu empfehlen",
          body: "Du kannst immer noch Belohnungen verdienen, indem du Freund:innen zu Pampers Club einlädst. Verpasse kein Pampers Cash!",
        },
        raf_day14_slideup: {
          title: "Heute eine Freund:in empfehlen",
          body: "Teile Pampers Club mit Freund:innen und verdiene Belohnungen. Je mehr du empfiehlst, desto mehr verdienst du!",
        },
        raf_day14_email: {
          subject: "Mehr Pampers Cash durch Empfehlungen verdienen",
          body: "Hallo! Du hast noch Zeit, Freund:innen zu Pampers Club einzuladen und Belohnungen zu verdienen. Wenn deine Freund:innen beitreten und zum ersten Mal scannen, erhaltet ihr beide Pampers Cash. Fang noch heute an zu teilen!",
        },
        raf_day30_push: {
          title: "Letzte Chance, Freund:innen zu empfehlen",
          body: "Dies ist deine letzte Gelegenheit, Pampers Cash durch Empfehlungen zu verdienen. Lade jetzt Freund:innen zu Pampers Club ein!",
        },
        raf_day30_slideup: {
          title: "Letzte Empfehlungsmöglichkeit",
          body: "Verpasse nicht deine letzte Chance, Belohnungen zu verdienen. Empfehle Freund:innen Pampers Club und erhalte Pampers Cash!",
        },
        raf_day30_inbox: {
          title: "Eine letzte Empfehlungserinnerung",
          body: "Dies ist deine letzte Chance, Pampers Cash durch Empfehlungen zu verdienen. Teile Pampers Club noch heute mit deinem Netzwerk!",
        },
      },
    };
  }

  // Default non-RAF campaign messages
  return {
    en: {
      generic_day1_push: {
        title: "Welcome to Pampers Club",
        body: "Thanks for joining! Stay tuned for updates and special offers.",
      },
    },
  };
};

