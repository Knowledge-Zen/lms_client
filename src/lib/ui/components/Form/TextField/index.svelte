<script lang="ts">
  import { onMount } from 'svelte';
  import IconButton from '$lib/ui/components/Button/IconButton/index.svelte';
  import PasswordEye from '$lib/ui/icons/PasswordEye.svelte';

  export let label = '';
  export let placeholder = '';
  export let value: string | number | null = null;
  export let name = '';
  export let onKeyDown = (e: any) => {};
  export let className = '';
  export let inputClassName = '';
  export let labelClassName = 'font-light';
  export let bgColor =
    'bg-gray-100 focus:bg-blue-50  ';
  export let type = 'text';
  export let isPassword = false;
  export let autoFocus = false;
  export let isRequired = false;
  export let isDisabled = false;
  export let min: string | number | null | undefined = undefined;
  export let max: string | number | null | undefined = undefined;
  export let errorMessage = '';
  export let helperMessage = '';
  export let autoComplete = true;
  export let onChange = (e: FocusEvent & { currentTarget: EventTarget & HTMLInputElement; }) => {}; // This is to know if element is 'dirty'
  export let onInputChange = () => {};

  let ref: HTMLInputElement | undefined = undefined;
  let fieldNode: HTMLInputElement | undefined = undefined;
  let focusClass = '';

  function typeAction(node: HTMLInputElement | undefined) {
    if (!node) return;

    node.type = type || 'text';

    if (isRequired) {
      node.required = true;
    }

    fieldNode = node;
  }

  function handlePasswordEye() {
    type = type === 'password' ? 'text' : 'password';
    typeAction(fieldNode);
  }

  onMount(() => {
    if (autoFocus && ref) {
      ref.focus();
    }

    if (type === 'password') {
      isPassword = true;
    }
  });
</script>

<label class="block relative {className}">
  {#if label}
    <p
      class="text-sm  text-left m-0 {labelClassName}"
    >
      {label}

      {#if isRequired}
        <span class="text-red-700">*</span>
      {/if}
    </p>
  {/if}
  <input
    use:typeAction
    class="form-input border-l-0 border-r-0 border-t-0 border-b-2 border-gray-200  focus:border-l-0 focus:border-r-0 rounded-t-md focus:border-t-0 focus:border-b-2 {inputClassName} {focusClass} {isDisabled &&
      'hover:cursor-not-allowed opacity-50'}  p-3 mt-1 block w-full {bgColor} {errorMessage
      ? 'border-red-600'
      : ''}"
    on:keydown={onKeyDown}
    on:change={onInputChange}
    {placeholder}
    bind:value
    bind:this={ref}
    required={isRequired}
    disabled={isDisabled}
    autocomplete={autoComplete ? 'on' : 'off'}
    on:blur={(e) => {
      if (focusClass.includes('border-blue-600')) {
        focusClass = focusClass.replace('border-blue-600', '');
      }
      onChange(e);
    }}
    on:focus={() => (focusClass += ' border-blue-600')}
    {name}
    {min}
    {max}
  />
  {#if isPassword}
    <span class="password-eye">
      <IconButton value="write-code" onClick={handlePasswordEye}>
        <PasswordEye isClosed={type === 'password' ? true : false} />
      </IconButton>
    </span>
  {/if}
  {#if errorMessage}
    <p class="text-sm text-red-500">{errorMessage}</p>
  {:else if helperMessage}
    <p class=" text-sm">
      {helperMessage}
    </p>
  {/if}
</label>

<style>
  .form-input {
    box-shadow: none !important;
  }
  .password-eye {
    position: absolute;
    top: 30px;
    right: 6px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

</style>
