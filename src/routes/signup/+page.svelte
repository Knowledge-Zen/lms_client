<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import Auth from '$lib/ui/components/Auth/index.svelte';
  import PrimaryButton from '$lib/ui/components/Button/PrimaryButton/index.svelte';
  import TextField from '$lib/ui/components/Form/TextField/index.svelte';

  import { getSupabase } from '$lib/supabase';
  import { currentOrg } from '$lib/store/org';
  import { profile } from '$lib/store/user';

  import {
    authValidation,
    getConfirmPasswordError,
    getDisableSubmit,
  } from '$lib/utils/functions/validator';

  import { SIGNUP_FIELDS } from '$lib/utils/constants/authentication';

  let supabase = getSupabase();
  let formRef: HTMLFormElement;
  let loading = false;
  let success = false;

  let fields = Object.assign({}, SIGNUP_FIELDS);
  let errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  } = {};

  let submitError: string;
  let disableSubmit = false;
  let query = new URLSearchParams($page.url.search);
  let redirect = query.get('redirect');

  $: errors.confirmPassword = getConfirmPasswordError(fields);
  $: disableSubmit = getDisableSubmit(fields);

  async function handleSubmit() {
    const validationRes = authValidation(fields);

    if (Object.keys(validationRes).length) {
      errors = Object.assign(errors, validationRes);
      return;
    }

    try {
      loading = true;

      const { data, error } = await supabase.auth.signUp({
        email: fields.email,
        password: fields.password,
      });

      console.log('Data:', data);
      console.log('Error:', error);

      if (error) {
        console.error('Sign-up error:', error);
        throw error;
      }

      const { session } = data;
      const { user: authUser } = session || {};
      if (!authUser) {
        throw new Error('Error creating user: authUser is null');
      }

      if (!$currentOrg.id) {
        throw new Error('Current organization ID is missing');
      }

      const [regexUsernameMatch] = [
        ...(authUser.email?.matchAll(/(.*)@/g) || []),
      ];

      const response = await fetch('https://api.ipregistry.co/?key=tryout');
      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }
      const metadata = await response.json();

      const profileRes = await supabase
        .from('profile')
        .insert({
          id: authUser.id,
          username: regexUsernameMatch[1] + `${new Date().getTime()}`,
          fullname: regexUsernameMatch[1],
          email: authUser.email,
          metadata,
        })
        .select();

      if (profileRes.error) {
        console.error('Profile creation error:', profileRes.error);
        throw profileRes.error;
      }

      // Setting profile
      profile.set(profileRes.data[0]);

      if (redirect) {
        await goto(redirect);
      } else {
        await goto('/login');
      }

      formRef?.reset();
      success = true;
      fields = Object.assign({}, SIGNUP_FIELDS);
    } catch (error: any) {
      console.error('Error during sign-up process:', error);
      submitError = error.error_description || error.message || String(error);
    } finally {
      loading = false;
    }
  }
</script>

<Auth
  {supabase}
  isLogin={false}
  {handleSubmit}
  isLoading={loading}
  bind:formRef
>
  <div class="mt-4 w-full">
    <p class="text-lg font-semibold mb-6">Create a free account</p>
    <TextField
      label="Your Email"
      bind:value={fields.email}
      type="email"
      placeholder="your_email@mail.com"
      className="mb-6"
      inputClassName="w-full"
      isDisabled={loading}
      errorMessage={errors.email}
      isRequired
    />
    <TextField
      label="Your Password"
      bind:value={fields.password}
      type="password"
      placeholder="************"
      className="mb-6"
      inputClassName="w-full"
      isDisabled={loading}
      errorMessage={errors.password}
      helperMessage="Password must be more than 6 characters"
      isRequired
    />
    <TextField
      label="Confirm Password"
      bind:value={fields.confirmPassword}
      type="password"
      placeholder="************"
      className="mb-6"
      inputClassName="w-full"
      isDisabled={loading}
      errorMessage={errors.confirmPassword}
      isRequired
    />
    {#if submitError}
      <p class="text-sm text-red-500">{submitError}</p>
    {/if}
  </div>

  <div class="my-4 w-full flex justify-end items-center">
    <PrimaryButton
      label="Create Account"
      type="submit"
      className="sm:w-full w-full"
      isDisabled={disableSubmit || loading}
      isLoading={loading}
    />
  </div>
</Auth>

<!-- Todo: Redirection Logic not working. Need to fix that. -->
