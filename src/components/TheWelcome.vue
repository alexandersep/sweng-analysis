<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import MailIcon from './icons/IconMail.vue'
import CodeIcon from './icons/IconCode.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    The project's 
    <a href="https://github.com/alexandersep/sweng-analysis" target="_blank" rel="noopener">official documentation</a>
    is found on our github, please reference the README on how to get started and the we provide.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CodeIcon />
    </template>
    <template #heading>Tools</template>

    This project is written in 
    <a href="https://go.dev/" target="_blank" rel="noopener">GO</a> and 
    <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue</a>. 
    The API used for gathering github information was
    <a href="https://github.com/google/go-github " target="_blank" rel="noopener">go-github</a>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <MailIcon />
    </template>
    <template #heading>Contributors</template>

    <h2>Team Lead</h2>
    Brandon
    <a href="TODO" target="_blank" rel="noopener">TODO@tcd.ie</a>,
    <h3>Frontend</h3>
    Alexander Sepelenco:
    <a href="mailto:sepelena@tcd.ie" target="_blank" rel="noopener">sepelena@tcd.ie</a>,
    R(adri):
    <a href="TODO" target="_blank" rel="noopener">TODO@tcd.ie</a>
    <h3>Graphing</h3>
    Adam:
    <a href="TODO" target="_blank" rel="noopener">TODO@tcd.ie</a>,
    Gerald:
    <a href="TODO" target="_blank" rel="noopener">TODO@tcd.ie</a>
    <h3>Full-Stack</h3>
    Wesley Shaw:
    <a href="mailto:Weshaw@tcd.ie" target="_blank" rel="noopener">Weshaw@tcd.ie</a>
    <h3>Backend</h3>
    Niall Sauvage
    <a href="mailto:sauvagen@tcd.ie" target="_blank" rel="noopener">sauvagen@tcd.ie</a>,
    Daniel Penrose 
    <a href="mailto:sauvagen@tcd.ie" target="_blank" rel="noopener">sauvagen@tcd.ie</a>
  </WelcomeItem>

</template>
