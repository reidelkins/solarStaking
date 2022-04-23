<template>
    <div class="mb-2 titleWords text-2xl">Staking Guidelines </div>
    <div class="mb-2 words">1. The minimum staking period is 15 days</div>
    <div class="mb-2 words">2. Revenue sharing will be paid on the 28th of every month</div>
    <div class="mb-2 words">3. To move your sentries from your wallet to the staking wallet, click on them, click "Move", then click "Confirm Moves"</div>
    <div class="mb-2 words">4. You will need to confirm a transaction for each NFT you are moving</div>
    <div class="mb-2 words">5. Then to begin staking, click "Stake"</div>
    
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
    rarities: Object,
    gems: Object
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
