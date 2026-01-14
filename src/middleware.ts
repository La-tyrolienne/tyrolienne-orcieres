import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed'
});

export const config = {
    // Match all pathnames except for
    // - API routes
    // - Static files (/_next, /images, etc.)
    // - Files with extensions (.ico, .png, etc.)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
