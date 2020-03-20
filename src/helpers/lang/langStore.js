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
      fetch(`/api/lang`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ lang: val }),
      });
    locale.set(val);
  },
};
