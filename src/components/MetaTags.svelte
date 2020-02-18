<script>
  export let lang;
  let description =
    lang === 'en'
      ? 'At CodingForYou, we create beautiful websites at a low cost'
      : 'Chez OnCodePourVous, nous vous créons de magnifiques sites web à bas prix';
  let subject = lang === 'en' ? 'websites at low cost' : 'sites web à bas prix';
</script>

<svelte:head>
  <!-- HTML -->
  <meta
    name="keywords"
    content="website, cheap, codingforyou, coding, for, you, site web, pour, vous, oncodepourvous,
    on, code" />
  <meta name="description" content={description} />
  <meta name="subject" content={subject} />
  <meta name="copyright" content="CodingForYou, Vu Dang Khoa Chiem & Samuel Martineau" />
  <meta name="language" content="FR,EN" />
  <meta name="Classification" content="Business" />
  <meta name="author" content="CodingForYou, contact@codingforyou.net" />
  <meta name="designer" content="CodingForYou, Vu Dang Khoa Chiem & Samuel Martineau" />
  <meta name="reply-to" content="contact@codingforyou.net" />
  <meta name="owner" content="CodingForYou, Vu Dang Khoa Chiem & Samuel Martineau" />
  <meta name="url" content="https://codingforyou.net" />
  <meta name="identifier-URL" content="https://codingforyou.net" />
  <meta name="directory" content="submission" />
  <meta name="target" content="all" />
  <meta name="audience" content="all" />
  <meta name="coverage" content="Worldwide" />
  <meta name="distribution" content="Global" />
  <meta name="og:type" content="website" />
  <meta name="rating" content="safe for kids" />
  <meta name="robots" content="archive,follow,imageindex,index,odp,snippet,translate" />
  <meta name="HandheldFriendly" content="True" />
  <!-- OpenGraph -->
  <meta name="og:title" content="CodingForYou" />
  <meta name="og:type" content="website" />
  <meta name="og:url" content="https://codingforyou.net" />
  <meta name="og:image" content="https://codingforyou.net/opengraph.png" />
  <meta name="og:site_name" content="CodingForYou.net" />
  <meta name="og:description" content={description} />
  <meta name="og:email" content="contact@codingforyou.net" />
  <meta name="og:locality" content="Monréal" />
  <meta name="og:region" content="QC" />
  <meta name="og:country-name" content="CA" />
  <meta property="og:type" content="website" />
</svelte:head>
