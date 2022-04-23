<template>

      <div>      
        <div class="mb-2 titleWords text-2xl">Staking Rewards</div>
        <div class="mb-2 words">Each month, 37.5% of all exchange fees from Solar Dex will be paid out to Sentry Holders</div>
        <div class="mb-2 words">You qualify for your payout if you are staking on the 28th of each month and have been staking for over 15 days</div>
        <div class="mb-2 words">1/1 Sentries will earn 10x more than a common Sentry</div>
        <div class="mb-2 words">Epic Sentries, 11-500, will earn 6x more than a common Sentry</div>
        <div class="mb-2 words">Rare Sentries, 501-2000, will earn 3x more than a common Sentry</div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FixedScheduleDisplay from '@/components/gem-farm/FixedScheduleDisplay.vue';
import { parseDate } from '@/common/util';
import numeral from 'numeral';

export default defineComponent({
  components: { FixedScheduleDisplay },
  props: {
    reward: Object,
    farmReward: Object,
    title: String,
  },
  setup() {
    const parseRewardType = (reward: any): string => {
      //returns "variable" or "fixed"
      return Object.keys(reward.rewardType)[0];
    };

    return {
      parseRewardType,
      parseDate,
      numeral,
    };
  },
});
</script>

<style scoped></style>
