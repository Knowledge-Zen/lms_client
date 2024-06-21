<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';

  const names = [
    { label: 'Upskilling', color: '#3ADFEC' },
    { label: 'Courses', color: '#BF0696' },
    { label: 'Trainings', color: '#0233BD' },
    { label: 'Academy', color: '#9747FF' },
  ];

  let titleIndex = 0;
  let timeout: number | undefined;
  let animate = false;

  onMount(() => {
    timeout = setInterval(() => {
      const nextIndex = titleIndex + 1;
      titleIndex = names[nextIndex] ? nextIndex : 0;
    }, 3000);

    setTimeout(() => {
      animate = true;
    }, 70);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<div
  class="hero-bg relative border-b-2 text-center bg-[#F5F8FE] h-full mt-[4%] w-full px-20 py-[10%]"
>
  <div class="pt-24 w-full">
    <div
      class="justify-between w-[75%] absolute top-[15%] left-[10%] hidden lg:flex"
    >
      {#if animate}
        <div
          class="relative transition-all hover:scale-110 rotate-12"
          transition:fly={{ y: 100, delay: 0, easing: sineInOut }}
        >
          <a
            href="/#learningmanagement"
            class="px-6 py-2 border-[1.5px] border-red-700 rounded-[4px] bg-white text-red-700 text-lg font-bold"
            >Learning Management System</a
          >
          <svg
            class="absolute -right-1 -bottom-2.5"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="10.9223" height="10.9223" fill="#B91C1C" />
          </svg>
        </div>

        <div
          class="relative transition-all hover:scale-110 -rotate-12"
          transition:fly={{ x: 100, delay: 50, easing: sineInOut }}
        >
          <a
            href="/#flagshipcourses"
            class="px-6 py-2 border-[1.5px] border-[#BF0696] rounded-[4px] bg-white text-[#BF0696] text-lg font-bold"
            >Our Flagship Courses</a
          >
          <svg
            class="absolute -right-1 -bottom-2.5"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="10.9223" height="10.9223" fill="#BF0696" />
          </svg>
        </div>
      {/if}
    </div>

    <div
      class="justify-between w-[80%] absolute top-[70%] left-[8%] hidden lg:flex"
    >
      {#if animate}
        <div
          class="relative transition-all hover:scale-110 -rotate-12"
          transition:fly={{ x: -100, delay: 100, easing: sineInOut }}
        >
          <a
            href="/#personalizedservices"
            class="px-6 py-2 border-[1.5px] border-[#0233BD] rounded-[4px] bg-white text-[#0233BD] text-lg font-bold"
            >Complete Personalized Services</a
          >

          <svg
            class="absolute -right-1 -bottom-2.5"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="10.9223" height="10.9223" fill="#0233BD" />
          </svg>
        </div>
        <div
          class="relative transition-all hover:scale-110 rotate-12"
          transition:fly={{ y: 100, delay: 150, easing: sineInOut }}
        >
          <a
            href="/#recruitmentsolutions"
            class="px-6 py-2 border-[1.5px] border-[#9747FF] rounded-[4px] bg-white text-[#9747FF] text-lg font-bold"
            >Recruitment Solutions</a
          >

          <svg
            class="absolute -right-1 -bottom-2.5"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="10.9223" height="10.9223" fill="#9747FF" />
          </svg>
        </div>
      {/if}
    </div>

    <div class="w-full">
      <div
        class="font-bold md:leading-[1.5] text-left lg:text-center ml-6 text-slate-900 text-4xl lg:text-7xl"
      >
        <span>Launch Your Online</span> <br />
        <div class="flex-wrap flex items-center lg:gap-3">
          <span
            class="w-full lg:w-[48%] h-[40px] md:h-[50px] lg:h-[90px] mb-0 mt-1 md:mt-0 lg:-mb-4 relative inline-block overflow-hidden"
          >
            {#key titleIndex}
              <span
                class="absolute left-0 right-[unset] lg:right-0 lg:left-[unset]"
                style="color: {names[titleIndex].color}"
                transition:fly={{ y: 100, delay: 0, easing: sineInOut }}
              >
                {names[titleIndex].label}
              </span>
            {/key}
          </span>
          <span>In Minutes</span>
        </div>
      </div>

      <p
        class="text-base mx-auto mt-10 px-4 text-slate-700 md:text-xl xl:mt-6 xl:w-[42%] xl:p-0"
      >
        Empower your educational institute with our customizable LMS, flagship courses, personalized services and recruitment solutions.
      </p>
    </div>

    <div
      class="mt-14 flex flex-col items-center justify-center gap-4 md:flex-row"
    >
      <a
        class="md:text-base w-11/12 rounded-md bg-blue-700 px-6 py-3 text-sm font-medium text-white text-center transition-all delay-100 hover:bg-blue-800 hover:shadow-xl md:w-fit lg:px-6 lg:py-4 lg:font-semibold"
        href="/signup"
        rel="noopener noreferrer nofollow"
      >
        Create Your Organization For Free
      </a>
      <!-- <a
        class="font-medium lg:font-semibold text-sm md:text-base w-11/12 md:w-fit border px-6 py-3 lg:px-10 lg:py-5 rounded-md"
        href="/github"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        View on Github
      </a> -->
    </div>
  </div>
</div>
