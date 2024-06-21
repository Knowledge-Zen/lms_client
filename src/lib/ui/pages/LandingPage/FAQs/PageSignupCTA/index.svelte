<script>
  export let header = '';
  export let subText = '';
  export let btnLabel = '';
  export let link = '';
  export let demo = true;
</script>

<div
  class="floating grad relative mx-auto my-[5%] flex h-[61vh] w-[100%] flex-col items-center justify-center px-[6%] py-[8%] text-center shadow-2xl lg:h-[54vh] lg:w-[70%] lg:rounded-3xl"
>
  <div>
    <h1
      class="font-display mt-3 text-3xl font-bold tracking-tight text-white lg:mt-2 lg:text-4xl max-w-2xl"
    >
      {header}
    </h1>
    <p class="mt-6 text-xl text-gray-300 lg:text-lg">
      {subText}
    </p>
  </div>

  {#if demo}
    <a href={link}>
      <button
        class="text-base mt-10 rounded-md bg-white px-6 py-4 font-semibold text-gray-900 lg:px-7 lg:py-3 lg:text-lg"
      >
        {btnLabel}
      </button>
    </a>
  {:else}
    <a
      class="text-base mt-10 rounded-md bg-white px-6 py-4 font-semibold text-gray-900 lg:px-7 lg:py-3 lg:text-lg"
      href={link}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      {btnLabel}
    </a>
  {/if}
</div>

<style>
  .grad {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('https://brand.cdn.clsrio.com/cta-bg.png');
  }
</style>
