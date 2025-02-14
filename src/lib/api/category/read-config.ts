import fs from 'fs/promises'
import { isNodeError } from '$lib/types/node'
import type { Category } from 'content/config/categories'

export async function readCategoryConfig(
	targetDirectory: string,
	categoryName: string,
	lang: string
): Promise<Category | null> {
	try {
		const data = await fs.readFile(`${targetDirectory}/${categoryName}/${lang}.json`, 'utf8')
		const jsonData = JSON.parse(data) as Category
		const category = { ...jsonData, id: categoryName }
		return category
	} catch (err) {
		if (isNodeError(err) && err.code === 'ENOENT') {
			console.warn('File not found:', err.message)
			if (lang !== 'en') {
				// TODO - add to global config
				return await readCategoryConfig(targetDirectory, categoryName, 'en')
			}
		} else if (err instanceof SyntaxError) {
			console.error('Error parsing category config JSON:', err)
		} else {
			console.error('Error reading the category config file:', err)
		}
		return null
	}
}
