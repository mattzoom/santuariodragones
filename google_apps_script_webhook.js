/**
 * ==============================================================================
 * SANTUARIO DE DRAGONES - RECEPTOR DE REPORTES DE ERRORES Y SUGERENCIAS
 * Google Apps Script Webhook para Google Sheets
 * ==============================================================================
 * 
 * INSTRUCCIONES:
 * 1. Creá una nueva planilla en Google Drive: https://sheets.new
 * 2. Nombrala por ejemplo: "Reportes - Santuario de Dragones"
 * 3. En el menú superior ve a: Extensiones -> Apps Script
 * 4. Borrá todo el código que aparezca y pegá este código completo.
 * 5. Hacé clic en el botón "Implementar" (arriba a la derecha) -> "Nueva implementación".
 * 6. En el engranaje "Seleccionar tipo", elegí "Aplicación web".
 * 7. Configurá:
 *    - Descripción: Receptor Santuario de Dragones
 *    - Ejecutar como: "Yo" (tu cuenta de Google)
 *    - Quién tiene acceso: "Cualquier usuario" (Anyone) -> ¡CRÍTICO para que funcione!
 * 8. Hacé clic en "Implementar", autorizá los permisos con tu cuenta de Google.
 * 9. Copiá la "URL de la aplicación web" que termina en /exec y pegala en el Santuario.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Crear encabezados automáticamente si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha y Hora (Local)",
        "Tipo de Reporte",
        "Página / Sección",
        "Dragón o Modo",
        "Descripción del Reporte",
        "Email de Contacto",
        "URL Completa",
        "Navegador / Dispositivo",
        "Timestamp ISO"
      ]);
      
      // Formato visual para los encabezados
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground("#120f20");
      headerRange.setFontColor("#e9c46a");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = { message: e.postData.contents };
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone() || "America/Argentina/Buenos_Aires", "dd/MM/yyyy HH:mm:ss");
    
    // Mapear tipos a etiquetas legibles
    var typeLabels = {
      "errata": "📖 Errata / Mitología",
      "bug": "⚠️ Bug / Falla Técnica",
      "sugerencia": "💡 Sugerencia",
      "visual": "📱 Visual / Pantalla",
      "otro": "📝 Otro"
    };
    var displayType = typeLabels[data.type] || data.type || "General";
    
    // Agregar la fila con los datos del reporte
    sheet.appendRow([
      formattedDate,
      displayType,
      data.context || "",
      data.dragon_o_modo || "",
      data.message || "",
      data.email || "No provisto",
      data.url || "",
      data.userAgent || "",
      data.timestamp || now.toISOString()
    ]);
    
    // Autoajustar columnas para mejor lectura
    for (var col = 1; col <= 6; col++) {
      sheet.autoResizeColumn(col);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Reporte registrado en Google Sheets." }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("El receptor de reportes del Santuario de Dragones está activo y listo para recibir envíos POST.")
    .setMimeType(ContentService.MimeType.TEXT);
}
