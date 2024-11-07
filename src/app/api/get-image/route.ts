export async function GET(request: Request) {
  const TOKEN = process.env.TG_BOT_TOKEN
  const { searchParams } = new URL(request.url)
  const filePath = searchParams.get('filepath')

  // Step 1: Get the file from telegram
  const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`

  try {
    // Step 2: Stream the file content with the appropriate headers
    const fileRes = await fetch(fileUrl)

    if (!fileRes.ok) {
      return Response.json({ error: 'File not found' })
    }

    const fileBlob = await fileRes.blob()
    // Step 3: Return the response with cache

    return new Response(fileBlob, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cache-Tag': 'image'
      }
    })
  } catch (error) {
    return Response.json({ error: String(error) })
  }
}
