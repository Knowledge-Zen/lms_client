import { dev, browser } from '$app/environment';
import { getSupabase, supabase } from '$lib/supabase';
import type { CurrentOrg } from '$lib/types/org';
import { loadTranslations } from '$lib/translations/index.js';

if (!supabase) {
  getSupabase();
}

interface LoadOutput {
  orgSiteName: string;
  isOrgSite: boolean;
  skipAuth: boolean;
  org: CurrentOrg | null;
}

// Define getInitialLocale function
function getInitialLocale(): string {
  if (browser) {
    try {
      return window.navigator.language.split('-')[0];
    } catch (e) {
      return 'en';
    }
  }

  return 'en';
}

export const load = async ({ url, cookies }): Promise<LoadOutput> => {
  const response: LoadOutput = {
    orgSiteName: '',
    isOrgSite: false,
    skipAuth: false,
    org: null,
  };


  const isLocalHost = url.host.includes('localhost');

  const tempSiteName = url.searchParams.get('org');

  if (isLocalHost && tempSiteName) {
    console.log('setting sitename temp');
    cookies.set('_orgSiteName', tempSiteName, {
      path: '/',
    });
  }

  if (!url.host.includes('justed.in') && !isLocalHost) {
    // TODO: We can verify if custom domain here
    return response;
  }

  // Load translations
  const { pathname } = url;
  const initLocale = getInitialLocale();
  await loadTranslations(initLocale, pathname);

  return response;
};
