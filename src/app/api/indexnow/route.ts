import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'tyrolienne-indexnow-key-2026';
const SITE_HOST = 'www.latyrolienne.fr';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { urls } = body;

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json(
                { error: 'URLs array is required' },
                { status: 400 }
            );
        }

        // Normalize URLs
        const fullUrls = urls.map((url: string) =>
            url.startsWith('http') ? url : `https://${SITE_HOST}${url}`
        );

        // Submit to IndexNow (Bing, Yandex, Seznam, Naver)
        const indexNowPayload = {
            host: SITE_HOST,
            key: INDEXNOW_KEY,
            keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
            urlList: fullUrls,
        };

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(indexNowPayload),
        });

        if (response.ok || response.status === 202) {
            return NextResponse.json({
                success: true,
                message: `Submitted ${fullUrls.length} URL(s) to IndexNow`,
                urls: fullUrls,
            });
        } else {
            const errorText = await response.text();
            return NextResponse.json(
                {
                    error: 'IndexNow submission failed',
                    status: response.status,
                    details: errorText,
                },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('IndexNow error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET method to check API status
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'IndexNow API is ready',
        key: INDEXNOW_KEY,
        usage: 'POST /api/indexnow with body: { "urls": ["/fr/new-page"] }',
    });
}
