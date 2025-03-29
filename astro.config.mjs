// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import netlify from '@astrojs/netlify';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'NET',
      social: {
        github: 'https://github.com/balajimalathi/net',
      },
      logo: {
        dark: './src/assets/logo.svg',
        light: './src/assets/logo_light.svg',
        replacesTitle: true,
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Syllabus',
          autogenerate: { directory: 'syllabus' },
        },
        obsidianSidebarGroup,
      ],
      plugins: [
        // Generate the Obsidian vault pages.
        starlightObsidian({
          output: 'net',
          sidebar: {
            collapsed: true,
            collapsedFolders: false,
            label: 'Net',
          },
          vault: 'C:/Users/Anavi/Documents/net-vault/net-vault',
          skipGeneration: !!process.env['NETLIFY'],
          ignore: [
            'private/**/*',
          ]
        }),
      ], 
      customCss: ['./src/styles/custom.scss'],
    }),
  ],
  output: 'server',
  adapter: netlify(),
});