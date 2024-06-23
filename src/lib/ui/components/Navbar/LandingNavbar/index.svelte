<script lang="ts">
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
  import {
    ChevronDown,
    Dashboard,
    UserFeedback,
    BuildingInsights_3,
    PackageTextAnalysis,
    TextAlignJustify,
    CloseLarge,
  } from 'carbon-icons-svelte';

  import PrimaryButton from '$lib/ui/components/Button/PrimaryButton/index.svelte';
  import { VARIANTS } from '../../Button/PrimaryButton/constants';

  let showsubNav = false;
  let showNav = false;
  let isSuperpowersActive = false;
  let activeHash = '';
  let activeLink = '';

  function handleShow() {
    showsubNav = !showsubNav;
  }

  function handleShowNav() {
    showNav = !showNav;
  }

  const superpowers = [
    {
      key: 'learningmanagement',
      title: 'Learning Management System',
      subtitle: 'Enhance your learning outcomes with our efficient LMS tools.',
    },
    {
      key: 'flagshipcourses',
      title: 'Our Flagship Courses',
      subtitle: 'Teach effectively with our tried and tested flagship courses.',
    },
    {
      key: 'personalizedservices',
      title: 'Complete Personalized Services',
      subtitle: 'Get all required services for your organization at one place.',
    },
    {
      key: 'recruitmentsolutions',
      title: 'Recruitment Solutions',
      subtitle:
        "Don't just make your learners job-ready. Provide them opportunities too.",
    },
  ];

  $: activeLink = $page.url.pathname;
  $: activeHash = $page.url.hash;
  $: isSuperpowersActive = superpowers.some((sp) =>
    activeHash.includes(sp.key)
  );
</script>

<div
  class="flex w-full justify-between items-center py-6 border-b-[1px] md:px-12 px-5 fixed top-0 z-[3000] filter backdrop-blur-xl shadow-sm bg-white"
>
  <a href="/" class="w-[20%]"
    ><h1 class="text-xl md:text-4xl font-medium ml-7">
      Just<span class="text-blue-700">Ed</span>
    </h1></a
  >

  <nav class="w-[40%] hidden md:hidden lg:block">
    <ul class="flex items-center justify-between w-full gap-2">
      <li class="text-gray-800 font-semibold text-sm cursor-pointer relative">
        <button
          class="flex items-center hover:bg-gray-100 px-4 py-2 rounded-md"
          on:click={() => (showNav = !showNav)}
          class:active={isSuperpowersActive}
        >
          Our Superpowers <ChevronDown class="ml-2" />
        </button>
        {#if showNav}
          <div
            class="absolute w-[24rem] top-12 -left-10 border px-5 py-5 rounded-[30px] shadow-slate-700 z-[3001] bg-white"
          >
            {#each superpowers as superpower}
              <a
                class="flex justify-between items-center w-full rounded-lg hover:bg-gray-100 p-2 mb-4"
                href="/#{superpower.key}"
                on:click={() => {
                  showNav = !showNav;
                }}
              >
                {#if superpower.key === 'learningmanagement'}
                  <Dashboard size={24} />
                {:else if superpower.key === 'flagshipcourses'}
                  <PackageTextAnalysis size={24} />
                {:else if superpower.key === 'personalizedservices'}
                  <UserFeedback size={24} />
                {:else if superpower.key === 'recruitmentsolutions'}
                  <BuildingInsights_3 size={24} />
                {/if}
                <div class="w-[86%] text-start">
                  <h3 class="font-semibold text-sm text-gray-700">
                    {superpower.title}
                  </h3>
                  <p class="font-normal text-sm text-gray-600">
                    {superpower.subtitle}
                  </p>
                </div>
              </a>
            {/each}
          </div>
        {/if}
      </li>
      <a
        href="/course_list"
        class="text-gray-800 font-semibold text-sm cursor-pointer"
        class:active={activeLink.startsWith('/course_list')}
      >
        <li class="hover:bg-gray-100 px-4 py-2 rounded-md">Our Courses</li>
      </a>
      <a
        href="/pricing"
        class="text-gray-800 font-semibold text-sm cursor-pointer"
        class:active={activeLink.startsWith('/pricing')}
      >
        <li class="hover:bg-gray-100 px-4 py-2 rounded-md">Pricing</li>
      </a>

      <a
        href="/blog"
        class="text-gray-800 font-semibold text-sm cursor-pointer"
        class:active={activeLink.startsWith('/blog')}
      >
        <li class="hover:bg-gray-100 px-4 py-2 rounded-md">Read More</li>
      </a>
    </ul>
  </nav>

  <div class="w-[20%] items-center flex-row hidden md:hidden lg:flex">
    <a href="/login">
      <PrimaryButton variant={VARIANTS.OUTLINED} className="m-2"
        >Login</PrimaryButton
      ></a
    >
    <a href="/signup"><PrimaryButton className="m-2">SignUp</PrimaryButton></a>
  </div>

  <button
    type="button"
    aria-label="Hamburger Menu"
    class="block md:block lg:hidden"
    on:click={handleShowNav}><TextAlignJustify size={24} /></button
  >

  {#if showNav}
    <div
      in:fly={{ x: 20, duration: 700 }}
      out:fly={{ x: 20, duration: 400 }}
      class="w-[60%] md:w-[40%] h-[100vh] border-2 sm:block lg:hidden px-3 pt-3 pb-2 md:p-7 absolute right-0 top-0 bg-white"
    >
      <div class="flex justify-between py-2 mb-5">
        <button on:click={handleShowNav}
          ><CloseLarge size={24} class="mr-5" /></button
        >
      </div>
      <nav>
        <ul
          class="flex items-center flex-col lg:flex-row justify-between w-full"
        >
          <li
            class="text-gray-800 font-semibold text-sm md:text-lg cursor-pointer w-full"
          >
            <button
              class="w-full flex items-center justify-between hover:bg-gray-100 py-3 px-4 rounded-lg"
              on:click={handleShow}
              class:active={isSuperpowersActive}
            >
              Our Superpowers <ChevronDown />
            </button>
            {#if showsubNav}
              <div
                in:fly={{ y: -20, duration: 700 }}
                out:fly={{ y: 20, duration: 400 }}
              >
                {#each superpowers as superpower}
                  <a
                    href="/#{superpower.key}"
                    on:click={() => {
                      handleShowNav();
                    }}
                  >
                    <p
                      class="font-normal text-xs text-gray-700 hover:bg-gray-100 rounded-lg py-2.5 pl-5"
                    >
                      {superpower.title}
                    </p>
                  </a>
                {/each}
              </div>
            {/if}
          </li>

          <a
            class="text-gray-800 font-semibold text-sm md:text-lg cursor-pointer hover:bg-gray-100 py-3 px-4 rounded-md w-full"
            on:click={() => {
              handleShowNav();
            }}
            class:active={activeLink.startsWith('/course_list')}
            href="/course_list"
          >
            <li>Our Courses</li>
          </a>

          <a
            class="text-gray-800 font-semibold text-sm md:text-lg cursor-pointer hover:bg-gray-100 py-3 px-4 rounded-xl w-full"
            on:click={() => {
              handleShowNav();
            }}
            href="/pricing"
            class:active={activeLink.startsWith('/pricing')}
          >
            <li>Pricing</li>
          </a>

          <a
            class="text-gray-800 font-semibold text-sm md:text-lg cursor-pointer hover:bg-gray-100 py-3 px-4 rounded-md w-full"
            on:click={() => {
              handleShowNav();
            }}
            class:active={activeLink.startsWith('/blog')}
            href="/blog"
          >
            <li>Read More</li>
          </a>
        </ul>
      </nav>
      <div class="flex items-start flex-col gap-y-2 mt-5 border-t-[1px] pt-5">
        <a href="/login">
          <PrimaryButton variant={VARIANTS.OUTLINED} className="m-2"
            >Login</PrimaryButton
          ></a
        >
        <a href="/signup"
          ><PrimaryButton className="m-2">SignUp</PrimaryButton></a
        >
      </div>
    </div>
  {/if}
</div>

<style>
  .active {
    background-color: #f3f4f6;
    border-radius: 6px;
  }
</style>
