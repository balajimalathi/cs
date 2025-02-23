// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import netlify from '@astrojs/netlify';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian'

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'UPSC',
          social: {
              github: 'https://github.com/balajimalathi/upsc',
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
              // {
              //     label: 'Mind Map',
              //     autogenerate: { directory: 'mind-map' },
              // },
              obsidianSidebarGroup,
          ],
          plugins: [
            // Generate the Obsidian vault pages.
            starlightObsidian({
              output: 'upsc',
              vault: 'C:/Users/Anavi/Documents/upsc-vault',
              skipGeneration: !!process.env['NETLIFY'],
            }),
          ],
      }),
	],
  output: 'server',
  adapter: netlify(),
});