import { getLoggedIn } from '@helpers/user.js';
import axios from 'axios';
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
    if (getLoggedIn()) axios.post('/api/update-lang', { lang: val });
    locale.set(val);
  },
};
