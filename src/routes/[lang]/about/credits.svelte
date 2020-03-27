<script>
  import { _, store as lang } from '@helpers/translation.js';
  const libraries = process.libraries;
</script>

<style lang="scss">
  section {
    & h4 {
      margin-bottom: 20px;
    }
    & ul {
      & li {
        margin-bottom: 10px;
      }
    }
  }
</style>

<section class="page">
  <h1>{$_('credits')}</h1>
  <h4>{$_('toolsMaterials')}</h4>
  <ul>
    <li>
      <a href="https://colorhunt.co/">Color Hunt</a>
    </li>
    <li>
      <a href="https://flatuicolors.com/">Flat UI Colors</a>
    </li>
    <li>
      <a href="https://colorswall.com/">Colors Wall</a>
    </li>
    <li>
      <a href="https://figma.com">Figma</a>
    </li>
    <li>
      {$_('iconsLicense')}
      <a href="https://creativecommons.org/licenses/by/4.0/">{$_('ccLicense')}</a>
      . {$_('faAttriution')}
      <a href="https://fontawesome.com/">Font Awesome</a>
      .
    </li>
  </ul>
  <h4>{$_('usedLibraries')}</h4>
  <ul>
    {#each libraries as library}
      <li>
        <a href={library[1]}>{library[0]}</a>
      </li>
    {/each}
  </ul>
</section>
