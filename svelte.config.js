import {mdsvex, escapeSvelte} from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import sectionize from 'remark-sectionize'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import rehypeSlug from 'rehype-slug'
import {createHighlighter} from 'shiki'
import toc from '@jsdevtools/rehype-toc'
import unwrapImages from 'remark-unwrap-images'

const highlightTheme = 'github-dark'
const highlightedLanguages = ['javascript', 'typescript', 'go', 'html', 'css', 'python', 'json', 'yaml']
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
    extensions: ['.md'],
    rehypePlugins: [rehypeUnwrapImages, rehypeSlug, [toc, {headings: ['h2']}]],
    remarkPlugins: [sectionize],
    highlight: {
        highlighter: async (code, lang = 'text') => {
            const highlighter = await createHighlighter({
                themes: [highlightTheme],
                langs: highlightedLanguages
            })

            await highlighter.loadLanguage(...highlightedLanguages)

            const html = escapeSvelte(highlighter.codeToHtml(code, {
                    lang,
                    theme: highlightTheme,
                }
            ))
            return `{@html \`${html}\` }`
        }
    },
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

    kit: {
        adapter: adapter({
            fallback: '404.html'
        }),
        alias: {
            'content/*': 'src/content/*'
        },
        paths: {
            base: process.argv.includes('dev') ? '' : ''
        },
        prerender: {
            handleHttpError: 'ignore'
        }
    },

    extensions: ['.svelte', '.md']
}

export default config
