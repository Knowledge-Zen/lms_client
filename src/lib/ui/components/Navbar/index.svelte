<script lang="ts">
  import { page } from '$app/stores';

  import LMSNavbar from '$lib/ui/components/Navbar/LMSNavbar/index.svelte';
  import LandingNavbar from '$lib/ui/components/Navbar/LandingNavbar/index.svelte';

  let urlContainsLmsOrOrg = false;

  $: {
    const currentUrl = $page.url.href;
    urlContainsLmsOrOrg = currentUrl.includes('/lms') || currentUrl.includes('/org');
  }
</script>


{#if urlContainsLmsOrOrg}
    <LMSNavbar />
{:else}
    <LandingNavbar />
{/if}