<script lang="ts">
  import { onMount } from 'svelte';
  import emblaCarousel, { type EmblaCarouselType } from 'embla-carousel';

  export let id = '';

  let images = [
    '/screenshots/01_landing.png',
    '/screenshots/02_learning.png',
    '/screenshots/03_lessons.png',
    '/screenshots/04_tests.png',
    '/screenshots/05_test_submissions.png',
    '/screenshots/06_community.png',
  ];

  let embla: EmblaCarouselType | undefined;

  onMount(() => {
    const emblaNode = document.querySelector('.embla__viewport') as HTMLElement;
    if (emblaNode) {
      embla = emblaCarousel(emblaNode, {
        loop: true,
        align: 'center',
        containScroll: 'trimSnaps',
      });

      const updateSlideClasses = () => {
        const slides = emblaNode.querySelectorAll('.embla__slide');
        const selectedIndex = embla?.selectedScrollSnap();

        slides.forEach((slide, index) => {
          if (index === selectedIndex) {
            slide.classList.add('is-active');
          } else {
            slide.classList.remove('is-active');
          }
        });
      };

      embla.on('select', updateSlideClasses);
      updateSlideClasses();
    }
  });

  function scrollPrev() {
    embla?.scrollPrev();
  }

  function scrollNext() {
    embla?.scrollNext();
  }
</script>

<section
  {id}
  class="w-full py-28 bg-white relative flex flex-col items-center"
>
  <div class="w-[80vw] max-w-4xl flex flex-col items-center text-center mb-12">
    <h2 class="font-bold text-blue-900 text-3xl md:text-4xl mb-4">
      Learning Management System
    </h2>
    <p class="leading-7 md:text-lg text-gray-800 max-w-2xl">
      Transform the educational experience with our cutting-edge LMS, designed
      for seamless teaching and learning.
      <span class="block text-blue-900 font-semibold mt-4">
        Teach, create courses, conduct tests, manage grades, and track
        attendance - all in one place!
      </span>
    </p>
  </div>

  <div class="embla w-[80%] relative px-4 rounded-lg overflow-hidden shadow-md">
    <div class="embla__viewport">
      <div class="embla__container">
        {#each images as image}
          <div class="embla__slide">
            <div class="embla__slide__inner">
              <img
                src={image}
                alt="LMS screenshot"
                class="embla__slide__img w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        {/each}
      </div>
    </div>
    <!-- Navigation buttons -->
    <button class="embla__button embla__button--prev" on:click={scrollPrev}>
      <svg
        class="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>
    <button class="embla__button embla__button--next" on:click={scrollNext}>
      <svg
        class="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>
  </div>
</section>

<style>
  .embla {
    --slide-spacing: 1rem;
    --slide-size: 80%;
    --slide-height: auto;
  }
  .embla__viewport {
    overflow: hidden;
    border-radius: 0.5rem;
  }
  .embla__container {
    display: flex;
    touch-action: pan-y;
    margin-left: calc(var(--slide-spacing) * -1);
  }
  .embla__slide {
    flex: 0 0 var(--slide-size);
    padding-left: var(--slide-spacing);
    position: relative;
    transition: opacity 0.3s ease-in-out;
  }
  .embla__slide__inner {
    position: relative;
    overflow: hidden;
    height: var(--slide-height);
  }
  .embla__slide__img {
    object-fit: cover;
    border-radius: 0.5rem;
  }
  .embla__slide:not(.is-active) {
    filter: grayscale(95%) opacity(0.5);
    transition: filter 0.3s ease-in-out;
  }
  .embla__button {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 3.5rem;
    height: 3.5rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
  }
  .embla__button:hover {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
  }
  .embla__button svg {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .embla__button--prev {
    left: 1rem;
  }
  .embla__button--next {
    right: 1rem;
  }
</style>
