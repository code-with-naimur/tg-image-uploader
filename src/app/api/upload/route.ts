export async function POST(request: Request) {
  const TOKEN = process.env.TG_BOT_TOKEN
  const CHAT_ID = process.env.TG_CHAT_ID

  const reqFormData = await request.formData()
  const file = reqFormData.get('file')

  try {
    // Step 0: Getting a chat id
    // const botUpdates = await fetch(
    //   `https://api.telegram.org/bot${TOKEN}/getUpdates`
    // )
    // const botUpdatesJson = await botUpdates.json()
    // const chatId = botUpdatesJson.result[0].message.chat.id
    // console.log(chatId)

    // Step 1: Upload the document
    const formData = new FormData()
    formData.append('chat_id', CHAT_ID as string)
    formData.append('document', file as File)

    const uploadRes = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendDocument`,
      {
        method: 'POST',
        body: formData
      }
    )

    const uploadJson = await uploadRes.json()

    if (!uploadJson.ok) {
      return Response.json({ error: uploadJson.description })
    }

    // Step 2: Retrieve the file ID
    const fileId = uploadJson.result.document.file_id

    // Step 3: Get the file path
    const filePathRes = await fetch(
      `https://api.telegram.org/bot${TOKEN}/getFile?file_id=${fileId}`
    )
    const filePathJson = await filePathRes.json()
    const filePath = filePathJson.result.file_path

    return Response.json({ success: true, filePath })
  } catch (error) {
    return Response.json({ error: String(error) })
  }

  return Response.json({ success: true })
}
