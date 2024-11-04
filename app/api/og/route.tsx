import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { allPrompts } from 'content-collections';

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (!slug) {
        return new Response('Slug parameter is required', { status: 400 })
    }

    const prompt = allPrompts.find(p => p._meta.path === slug)

    if (!prompt) {
        return new Response('Prompt not found', { status: 404 })
    }

    const { title, emoji, category } = prompt

    // Define colors
    const bgColor = '#000'
    const textColor = '#FFFFFF'
    const promptColor = '#4EAA25'

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    backgroundColor: bgColor,
                    padding: '40px',
                    fontFamily: 'monospace',
                }}
            >
                {/* Terminal window top bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    width: '100%',
                }}>
                    <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FF5F56', marginRight: '10px' }} />
                    <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FFBD2E', marginRight: '10px' }} />
                    <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                    <div style={{ flexGrow: 1, textAlign: 'center', color: textColor, fontSize: '24px', paddingLeft: '20px' }}>prompts.siya.digital</div>
                </div>

                {/* Terminal content */}
                <div style={{ color: textColor, fontSize: '28px', marginBottom: '20%' }}>
                    user@prompts:~$ prompt-info
                </div>
                <div style={{ color: textColor, fontSize: '64px' }}>
                    {emoji}
                </div>
                <div style={{ color: promptColor, fontSize: '64px', fontWeight: 'bolder', wordWrap: 'break-word', maxWidth: '100%' }}>
                    {title}
                </div>
                <div style={{ color: textColor, fontSize: '24px' }}>
                    {category}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}