<script lang="ts">
  export let id = '';

  const company_logos = [
    'google.png',
    'microsoft.png',
    'amazon.png',
    'samsung.png',
    'purplle.png',
    'newton.png',
    'abinbev.png',
    'infinitiresearch.png',
  ];

  function getLogoPosition(index: number) {
    const radius = 40;
    const angle = (index / company_logos.length) * 2 * Math.PI;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { left: `${x}%`, top: `${y}%` };
  }
</script>

<section
  {id}
  class="py-28 bg-zinc-900 border border-gray-200 overflow-hidden relative"
>
  <!-- Background elements -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="galaxy-spiral"></div>
    <div class="moving-dots"></div>
  </div>

  <div class="container mx-auto px-4 md:px-6 relative z-10">
    <div class="max-w-5xl mx-auto text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">
        Recruitment Solutions
      </h2>
      <p class="text-lg leading-7 text-gray-100">
        Empower your institute with our industry connections by obtaining direct
        employment opportunities for learners.
        <span class="p-2 block font-semibold text-gray-200">
          We ensure a sure interview call via our referral programs with the partner recruiters!
        </span>
      </p>
      <p class="text-white italic">* No hidden terms and conditions!</p>
    </div>

    <div class="relative h-[60vh] max-h-[600px]">
      {#each company_logos as logo, index}
        <div
          class="absolute w-[20%] logo-container"
          style="left: {getLogoPosition(index).left}; top: {getLogoPosition(
            index
          ).top};"
        >
          <img
            src="/images/companies/{logo}"
            alt="Company Logo"
            class="w-full h-full object-contain transition-opacity duration-300"
          />
        </div>
      {/each}
      
      <div
        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold"
      >
        ...and many more!
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes float {
    0%,
    100% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, calc(-50% - 10px));
    }
  }

  .logo-container {
    animation: float 3s ease-in-out infinite;
  }

  .logo-container:nth-child(even) {
    animation-delay: -1.5s;
  }

  .moving-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #ffffff 1px, transparent 1px);
    background-size: 50px 50px;
    animation: moveDots 30s linear infinite;
    filter: opacity(0.2);
  }

  @keyframes moveDots {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 50px;
    }
  }
</style>
