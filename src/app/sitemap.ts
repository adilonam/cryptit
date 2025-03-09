import type { MetadataRoute } from 'next'
 


export default function sitemap(): MetadataRoute.Sitemap {
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/encrypt-text`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/encrypt-file`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}