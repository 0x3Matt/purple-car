import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Purple Car - The Future of Car Buying and Selling'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #6F19BE 0%, #9F33E8 30%, #BE55FF 60%, #945DC4 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="white"
            style={{ marginRight: '16px' }}
          >
            <path d="M16 6l3 4h2c.5 0 1 .5 1 1v3c0 .5-.5 1-1 1h-1c0 1.66-1.34 3-3 3s-3-1.34-3-3h-4c0 1.66-1.34 3-3 3s-3-1.34-3-3H3c-.5 0-1-.5-1-1V9c0-.5.5-1 1-1h11l2-2h-3V4h5v2zM6.5 15c.83 0 1.5-.67 1.5-1.5S7.33 12 6.5 12 5 12.67 5 13.5 5.67 15 6.5 15zm11 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
          </svg>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Purple Car
          </div>
        </div>
        <div
          style={{
            fontSize: '36px',
            color: 'white',
            textAlign: 'center',
            marginTop: '24px',
          }}
        >
          Skip the Hassle of Buying & Selling Cars
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 