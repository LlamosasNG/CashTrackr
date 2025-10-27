type EmailType = {
  name: string
  token: string
}

export const resetPasswordEmailTemplate = (
  user: EmailType,
  resetUrl: string
): string => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recupera tu contraseña - CrashTrackr</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <div style="background-color: rgba(255, 255, 255, 0.15); width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15V17M6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V13C20 12.4696 19.7893 11.9609 19.4142 11.5858C19.0391 11.2107 18.5304 11 18 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21ZM16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11H16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">CrashTrackr</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px; color: #333333; font-size: 24px; font-weight: 600;">Recuperación de contraseña 🔐</h2>
                            
                            <p style="margin: 0 0 20px; color: #666666; font-size: 16px; line-height: 1.6;">
                                Hola <strong>${user.name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.6;">
                                Recibimos una solicitud para restablecer la contraseña de tu cuenta en CrashTrackr. Si no fuiste tú, puedes ignorar este correo de forma segura.
                            </p>
                            
                            <!-- Alert Box -->
                            <div style="background: linear-gradient(135deg, #fff4e6 0%, #ffe6f0 100%); border-left: 4px solid #f59e0b; padding: 16px 20px; margin: 0 0 30px; border-radius: 4px;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
                                    ⚠️ <strong>Importante:</strong> Este enlace expirará en 24 horas por tu seguridad.
                                </p>
                            </div>
                            
                            <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.6;">
                                Para crear una nueva contraseña, haz clic en el siguiente botón:
                            </p>
                            
                            <!-- Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 0 0 30px;">
                                        <a href="${resetUrl}" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                            Restablecer mi contraseña
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Token Box -->
                            <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 0 0 30px; border-radius: 4px;">
                                <p style="margin: 0 0 10px; color: #333333; font-size: 14px; font-weight: 600;">
                                    Alternativamente, usa este código de verificación:
                                </p>
                                <p style="margin: 0; color: #667eea; font-size: 24px; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace;">
                                    ${user.token}
                                </p>
                            </div>
                            
                            <!-- Alternative Link -->
                            <div style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin: 0 0 30px;">
                                <p style="margin: 0 0 8px; color: #666666; font-size: 13px;">
                                    Si el botón no funciona, copia y pega este enlace en tu navegador:
                                </p>
                                <p style="margin: 0; word-break: break-all;">
                                    <a href="${resetUrl}" style="color: #667eea; text-decoration: none; font-size: 13px;">
                                        ${resetUrl}
                                    </a>
                                </p>
                            </div>
                            
                            <!-- Security Tips -->
                            <div style="background-color: #1a1a2e; border-radius: 6px; padding: 20px; margin: 0 0 20px;">
                                <p style="margin: 0 0 12px; color: #ffffff; font-size: 15px; font-weight: 600;">
                                    🛡️ Consejos de seguridad
                                </p>
                                <ul style="margin: 0; padding-left: 20px; color: #d1d5db; font-size: 14px; line-height: 1.8;">
                                    <li>Usa una contraseña única y fuerte</li>
                                    <li>Combina letras, números y símbolos</li>
                                    <li>Nunca compartas tu contraseña</li>
                                    <li>Considera usar un gestor de contraseñas</li>
                                </ul>
                            </div>
                            
                            <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.6;">
                                Si no solicitaste este cambio, tu cuenta permanece segura y no necesitas hacer nada.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                            <p style="margin: 0 0 10px; color: #999999; font-size: 14px;">
                                © ${new Date().getFullYear()} CrashTrackr. Todos los derechos reservados.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                Este es un correo automático, por favor no responder.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `
}
