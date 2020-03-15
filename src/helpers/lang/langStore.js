import { getLoggedIn } from '@helpers/user.js';
import { locale } from 'svelte-intl';

export default {
  subscribe(func) {
    return locale.subscribe((l) =>
      func({
        current: l,
        other: l === 'en' ? 'fr' : 'en',
      })
    );
  },
  set(val) {
    if (getLoggedIn())
      fetch(`/api/update-lang?lang=${val}`, { method: 'POST', credentials: 'include' });
    locale.set(val);
  },
};
