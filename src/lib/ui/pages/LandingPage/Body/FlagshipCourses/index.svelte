<script lang="ts">
  export let id = '';

  let domains = [
    {
      id: 'entrance',
      name: 'Entrance Exams',
      color: '--rose',
      description:
        'Prepare for the entrance exams like CAT, GRE, GMAT, TOEFL, IELTS, Bank PO, and more. Master aptitude tests, vocabulary building, logical reasoning, and quantitative skills.',
    },
    {
      id: 'problemsolving',
      name: 'Problem Solving',
      color: '--indigo',
      description:
        'Enhance problem-solving skills with our courses covering algorithms, data structures, and coding challenges. Learn to tackle complex problems efficiently and effectively.',
    },
    {
      id: 'softdev',
      name: 'Software Development',
      color: '--fuchsia',
      description:
        'Explore the world of software development with hands-on learning in programming languages, web development, and software engineering principles.',
    },
    {
      id: 'dsmlai',
      name: 'Data Science, Machine Learning and AI',
      color: '--amber',
      description:
        'Dive deep into data science, machine learning, and artificial intelligence. Gain expertise in data analysis, predictive modeling, deep learning, and applications across various domains.',
    },
    {
      id: 'finance',
      name: 'Finance',
      color: '--emerald',
      description:
        'Master financial markets, investment strategies, corporate finance, quantitative trading and financial modeling. Develop skills in analyzing financial data and making informed financial decisions.',
    },
    {
      id: 'entrepreneurship',
      name: 'Entrepreneurship and Innovation',
      color: '--sky',
      description:
        'Learn the essentials of entrepreneurship, from idea generation to business planning and growth strategies. Foster innovation and develop entrepreneurial skills for success.',
    },
  ];
</script>

<section {id} class="py-28 bg-gradient-to-br from-slate-100 to-slate-200 border border-gray-200">
  <div class="container mx-auto px-4 md:px-6">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Our Flagship Courses
      </h2>
      <p class="text-lg text-gray-700 leading-7">
        Creating initial course content can be time-consuming, but we've got you
        covered! Use our expertly crafted content, backed by extensive research
        and validated by hundreds of students.
        <span class="p-2 block font-semibold text-gray-900"
          >Explore our flagship courses in the following domains and enhance
          your offerings with our PDF notes, classroom slides, and test
          materials. Recorded video sessions are available too upon request.</span
        >
      </p>
    </div>

    <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {#each domains as domain}
        <a href="/course_list?filter={domain.id}">
          <div
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <div
              class="bg-gradient-to-r text-white p-4"
              style="background: linear-gradient(to right, var({domain.color}), black);"
            >
              <h3 class="text-lg font-bold mb-2">{domain.name}</h3>
            </div>
            <div class="p-4">
              <p class="text-gray-700">
                {domain.description}
              </p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  :root {
    --rose: #f43f5e;
    --indigo: #6366f1;
    --fuchsia: #d946ef;
    --amber: #f59e0b;
    --emerald: #10b981;
    --sky: #0ea5e9;
  }
</style>
