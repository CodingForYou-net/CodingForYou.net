import { locale } from 'svelte-intl';

export default {
  subscribe(func) {
    return locale.subscribe((l) =>
      func({
        current: l,
        other: l === 'en' ? 'fr' : 'en',
      }),
    );
  },
  set: locale.set,
};
