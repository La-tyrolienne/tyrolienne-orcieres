import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/fr/',
                    '/fr/billetterie',
                    '/fr/informations',
                    '/fr/histoire',
                    '/fr/cgv',
                    '/fr/mentions-legales',
                    '/fr/confidentialite',
                ],
                disallow: [
                    '/admin',
                    '/fr/admin',
                    '/api/',
                ],
            },
        ],
        sitemap: 'https://www.latyrolienne.fr/sitemap.xml',
    };
}
