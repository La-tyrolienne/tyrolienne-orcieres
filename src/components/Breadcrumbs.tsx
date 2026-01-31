'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    const baseUrl = 'https://www.latyrolienne.fr';

    // Generate JSON-LD schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: `${baseUrl}${item.href}`,
        })),
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Visual Breadcrumbs */}
            <nav aria-label="Fil d'Ariane" className={`flex items-center gap-2 text-sm ${className}`}>
                {items.map((item, index) => (
                    <span key={item.href} className="flex items-center gap-2">
                        {index === 0 && <Home className="w-4 h-4" />}
                        {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                        {index === items.length - 1 ? (
                            <span className="text-foreground font-medium">{item.label}</span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </span>
                ))}
            </nav>
        </>
    );
}
