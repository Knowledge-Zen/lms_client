<script lang="ts">
  import { services } from './services';

  export let id = '';
</script>

<section
  {id}
  class="py-24 bg-white border border-gray-200"
>
  <div class="container mx-auto px-4 md:px-6">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-red-600">
        Complete Personalized Services
      </h2>
      <p class="text-xl text-gray-700 leading-relaxed">
        We offer comprehensive services to set up successful academies, from
        student acquisition to making them job-ready!
      </p>
      <p class="mt-4 text-lg font-semibold text-red-600">
        Explore our personalized services offered below.
      </p>
    </div>

    <div class="space-y-10">
      {#each services as service, index}
        <div class="service-container flex flex-col md:flex-row md:space-x-6">
          <div
            class="service-image-wrapper md:order-{index % 2 === 0 ? '0' : '1'}"
          >
            <img
              src={service.image}
              alt={service.title}
              class="service-image rounded-lg shadow-lg"
            />
          </div>
          <div class="service-details md:order-{index % 2 === 0 ? '1' : '0'}">
            <h3 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              {service.title}
            </h3>
            <ul class="service-points space-y-4">
              {#each service.points as point}
                <li class="flex items-start">
                  <svg
                    class="w-6 h-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span class="text-lg text-gray-700">{point}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .service-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    transition: transform 0.3s ease-in-out;
    position: relative;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    overflow: hidden;
  }

  .service-container::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 100px;
    height: 100px;
    background-color: rgba(239, 68, 68, 0.1);
    border-radius: 50%;
    z-index: 0;
  }

  .service-container::after {
    content: '';
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 150px;
    height: 150px;
    background-color: rgba(239, 68, 68, 0.1);
    border-radius: 50%;
    z-index: 0;
  }

  .service-container:hover {
    transform: translateY(-5px);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .service-image-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .service-image {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .service-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
  }

  .service-points {
    list-style-type: none;
    padding-left: 0;
  }

  @media (min-width: 768px) {
    .service-container {
      flex-direction: row;
      align-items: center;
    }

    .service-image-wrapper,
    .service-details {
      flex: 0 0 42%;
    }
  }
</style>
