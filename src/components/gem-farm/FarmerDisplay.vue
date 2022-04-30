<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 p-5">
      <div class="shadow-lg bg-white p-4 rounded-lg">
        <div class="mb-5 mainWords text-2xl">Solar Sentries</div>
        <div class="mb-5 mainWords text-lg">Sentry Owners Staking: {{farmAcc.stakedFarmerCount }}</div>
        <div class="mb-5 mainWords text-lg">Sentries Staked: {{farmAcc.gemsStaked}}</div>
      </div>

      <div class="shadow-lg bg-white p-4 rounded-lg">
        <div class="mb-2">
          <div class="titleWords text-2xl mb-2">Your Staking Session </div>
          <!-- <p class="words" v-if="parseFarmerState(farmerAcc) === 'staked'">You are staked</p>
          <p class="words" v-else>
            You are not staked
          </p> -->
        </div>
        
        <div class="mb-2 words">Your Sentries Staked:  {{ farmerAcc.gemsStaked }}</div>
        <div class="mb-2 words">
          You may first stop staking at: {{ parseDate(farmerAcc.minStakingEndsTs) }}
        </div> 
        <div class="mb-5 words">
          The next payday is: May 30.
        </div>   
      </div>
      <div class="shadow-lg bg-white p-4 rounded-lg">
        <FarmerMilez
          :key="farmerAcc.rewardA"
          :farmReward="farmAcc.rewardA"
          :reward="farmerAcc.rewardA"
          :rarities="farmerAcc.rarityPointsStaked"
          :gems="farmerAcc.gemsStaked"
        />
      </div>
      <div class="shadow-lg bg-white p-4 rounded-lg">
        <FarmerRewardDisplay
          :key="farmerAcc.rewardA"
          :farmReward="farmAcc.rewardA"
          :reward="farmerAcc.rewardA"
        />
      </div>
    </div>
    <div class="flex content-center">
      <div class="ml-5">
        <button class="refreshButton connectText is-primary mb-5 buttonBorder" @click="refreshFarmer">
              Refresh Info
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import FarmerRewardDisplay from '@/components/gem-farm/FarmerRewardDisplay.vue';
import FarmerMilez from '@/components/gem-farm/FarmerMilez.vue';
import useWallet from '@/composables/wallet';
import useCluster from '@/composables/cluster';
import { initGemFarm } from '@/common/gem-farm';
import { PublicKey } from '@solana/web3.js';
import { parseDate } from '@/common/util';

export default defineComponent({
  components: { FarmerRewardDisplay, FarmerMilez },
  props: {
    farm: String,
    farmAcc: Object,
    farmer: String,
    farmerAcc: Object,
  },
  emits: ['refresh-farmer'],
  setup(props, ctx) {
    const { wallet, getWallet } = useWallet();
    const { cluster, getConnection } = useCluster();

    let gf: any;
    watch([wallet, cluster], async () => {
      gf = await initGemFarm(getConnection(), getWallet()!);
    });

    //need an onmounted hook because this component isn't yet mounted when wallet/cluster are set
    onMounted(async () => {
      if (getWallet() && getConnection()) {
        gf = await initGemFarm(getConnection(), getWallet()!);
      }
    });

    // --------------------------------------- display farmer
    // todo ideally should be using one from client, but n/a during render
    const parseFarmerState = (farmer: any): string => {
      return Object.keys(farmer.state)[0];
    };

    const refreshFarmer = async () => {
      await gf.refreshFarmerWallet(
        new PublicKey(props.farm!),
        new PublicKey(props.farmer!)
      );
      ctx.emit('refresh-farmer');
    };

    return {
      refreshFarmer,
      parseFarmerState,
      parseDate,
    };
  },
});
</script>

<style scoped></style>
