export function formSubmissionTemplate(fieldMap: Record<string, any>, title: string) {
  const rows = Object.entries(fieldMap)
    .map(
      ([k, v]) => `
              <div style="margin-bottom:12px;">
                <div style="font-size:12px;color:#6b7280;padding-bottom:4px;text-transform:uppercase;">${k}</div>
                <div style="font-size:16px;color:#111827;font-weight:500">${v}</div>
              </div>
            `,
    )
    .join('')

  const html = `
                <!DOCTYPE html>
                <html>
                <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
                  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

                    <div style="background:#3b82f6;color:#ffffff;padding:20px 24px;">
                      <h2 style="margin:0;font-size:20px;text-align:center">📩 News from ${title} Form</h2>
                    </div>

                    <div style="padding:24px;">
                      ${rows}
                    </div>

                    <div style="padding:16px 24px;background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;">
                      Sent from Omnistack System
                    </div>

                  </div>
                </body>
                </html>
                `

  return html
}
